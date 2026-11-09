const fs = require("node:fs");
const path = require("node:path");

const CODE_BLOCK_CLOSE = "</CodeBlock>";
const EXAMPLE_BLOCK_CLOSE = "</ExampleBlock>";
const RAW_LOADER_PREFIX = "!!raw-loader!";

const IMPORT_PATTERN = /^import\s+([A-Za-z_$][\w$]*)\s+from\s+["'](.+)["'];?$/;
const FRONTMATTER_FIELD_PATTERN = /^([A-Za-z_][\w-]*):\s*(.*)$/;
const DOC_LINK_PATTERN = /\]\(\.\/([A-Za-z0-9_-]+)(#[^)]*)?\)/g;
const CODE_REFERENCE_PATTERN = /^\{([A-Za-z_$][\w$]*)\}$/;
const CODE_LITERAL_PATTERN = /^\{("(?:[^"\\]|\\.)*")\}$/;

/**
 * Split the flat YAML frontmatter from the MDX body. Only the `key: value`
 * fields used by this site's docs are supported.
 */
function readFrontmatter(source) {
  if (!source.startsWith("---\n")) {
    return { data: {}, content: source };
  }

  const end = source.indexOf("\n---\n", 4);
  if (end === -1) {
    return { data: {}, content: source };
  }

  const data = {};
  for (const line of source.slice(4, end).split("\n")) {
    const match = FRONTMATTER_FIELD_PATTERN.exec(line);
    if (match) {
      data[match[1]] = match[2].trim().replace(/^["']|["']$/g, "");
    }
  }

  return { data, content: source.slice(end + 5) };
}

function resolveSourceFile(docsDir, specifier) {
  const file = path.join(docsDir, specifier);
  for (const extension of ["", ".tsx", ".ts", ".jsx", ".js"]) {
    if (fs.existsSync(file + extension) && fs.statSync(file + extension).isFile()) {
      return file + extension;
    }
  }
  return null;
}

/**
 * Resolve the content of a `<CodeBlock>{Name}</CodeBlock>` placeholder: either
 * a raw-loader import of an example file, or an inline string literal.
 */
function readCodeContent(inner, imports, docsDir) {
  const reference = CODE_REFERENCE_PATTERN.exec(inner);
  if (reference) {
    const specifier = imports.get(reference[1]);
    if (specifier && specifier.startsWith(RAW_LOADER_PREFIX)) {
      const file = resolveSourceFile(docsDir, specifier.slice(RAW_LOADER_PREFIX.length));
      if (file) {
        return fs.readFileSync(file, "utf8").trimEnd();
      }
    }
    return null;
  }

  const literal = CODE_LITERAL_PATTERN.exec(inner);
  if (literal) {
    return JSON.parse(literal[1]);
  }

  return null;
}

/**
 * Convert an MDX page into self-contained Markdown: imports, example wrappers
 * and JSX tags are dropped, and every code block is inlined with its real
 * source so the output is readable without the React examples.
 */
function convertDoc(source, docsDir) {
  const { data, content } = readFrontmatter(source);
  const lines = content.split("\n");
  const imports = new Map();

  for (const line of lines) {
    const match = IMPORT_PATTERN.exec(line.trim());
    if (match) {
      imports.set(match[1], match[2]);
    }
  }

  const output = [];
  let inCodeFence = false;
  let inExampleBlock = false;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const trimmed = line.trim();

    if (inCodeFence) {
      output.push(line);
      if (trimmed.startsWith("```")) {
        inCodeFence = false;
      }
      continue;
    }

    if (trimmed.startsWith("```")) {
      inCodeFence = true;
      output.push(line);
      continue;
    }

    if (IMPORT_PATTERN.test(trimmed)) {
      continue;
    }

    if (inExampleBlock) {
      if (trimmed === EXAMPLE_BLOCK_CLOSE) {
        inExampleBlock = false;
      }
      continue;
    }

    if (trimmed === "<ExampleBlock>") {
      inExampleBlock = true;
      continue;
    }

    if (trimmed.startsWith("<CodeBlock")) {
      let end = index;
      while (end < lines.length && !lines[end].includes(CODE_BLOCK_CLOSE)) {
        end += 1;
      }

      const block = lines.slice(index, end + 1).join("\n");
      const language = /language="([^"]+)"/.exec(block);
      const title = /title="([^"]+)"/.exec(block);
      const inner = block.slice(block.indexOf(">") + 1, block.lastIndexOf(CODE_BLOCK_CLOSE)).trim();
      const code = readCodeContent(inner, imports, docsDir);

      if (code === null) {
        throw new Error(`[docs-for-ai] Cannot resolve the code block at ${docsDir}: ${inner}`);
      }

      if (title) {
        output.push(`**${title[1]}**`, "");
      }
      output.push(`\`\`\`${language ? language[1] : "text"}`);
      output.push(code);
      output.push("```");

      index = end;
      continue;
    }

    if (trimmed === "<Tabs>" || trimmed === "</Tabs>") {
      continue;
    }
    if (trimmed.startsWith("<TabItem") || trimmed === "</TabItem>") {
      continue;
    }
    if (trimmed === "<details>" || trimmed === "</details>") {
      continue;
    }

    const summary = /^<summary>(.*)<\/summary>$/.exec(trimmed);
    if (summary) {
      output.push(`**${summary[1].replace(/<\/?code>/g, "`")}**`);
      continue;
    }

    output.push(line.replace(DOC_LINK_PATTERN, "]($1.md$2)"));
  }

  return {
    title: data.title,
    description: data.description,
    slug: data.slug,
    body: collapseBlankLines(output).join("\n").trim(),
  };
}

function readSidebarGroups(docsDir) {
  const sidebar = require(path.join(docsDir, "sidebars.js"));
  return sidebar.docs.map((item) =>
    typeof item === "string"
      ? { label: null, ids: [item] }
      : { label: item.label, ids: item.items },
  );
}

/** Drop repeated blank lines outside code fences, keeping fenced content intact. */
function collapseBlankLines(lines) {
  const result = [];
  let inCodeFence = false;

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCodeFence = !inCodeFence;
      result.push(line);
      continue;
    }

    if (!inCodeFence && line.trim() === "" && result[result.length - 1]?.trim() === "") {
      continue;
    }

    result.push(line);
  }

  return result;
}

function joinUrl(base, file) {
  return `${base}${file}`;
}

module.exports = function docsForAiPlugin(context) {
  const { siteDir, siteConfig } = context;

  return {
    name: "docusaurus-plugin-docs-for-ai",

    async postBuild({ outDir }) {
      const docsDir = path.join(siteDir, "docs");
      const pkg = JSON.parse(fs.readFileSync(path.join(siteDir, "package.json"), "utf8"));
      const base = `${siteConfig.url.replace(/\/$/, "")}${siteConfig.baseUrl}`;
      const repository = pkg.repository.url.replace(/^git\+/, "").replace(/\.git$/, "");

      const groups = readSidebarGroups(docsDir);
      const listedIds = new Set(groups.flatMap((group) => group.ids));
      for (const entry of fs.readdirSync(docsDir)) {
        const id = entry.replace(/\.mdx$/, "");
        if (entry.endsWith(".mdx") && !listedIds.has(id)) {
          console.warn(`[docs-for-ai] ${entry} is not listed in docs/sidebars.js and is skipped.`);
        }
      }

      const pages = new Map();
      for (const group of groups) {
        for (const id of group.ids) {
          const source = fs.readFileSync(path.join(docsDir, `${id}.mdx`), "utf8");
          const { title, description, slug, body } = convertDoc(source, docsDir);
          const route = slug || `/${id}`;
          const file = route === "/" ? "index" : route.replace(/^\//, "");
          const markdown = `# ${title || id}\n\n${body}\n`;

          pages.set(id, {
            id,
            file,
            markdown,
            title: title || id,
            description: description || "",
          });
          fs.writeFileSync(path.join(outDir, `${file}.md`), markdown);

          const htmlFile =
            route === "/"
              ? path.join(outDir, "index.html")
              : path.join(outDir, route.replace(/^\//, ""), "index.html");
          if (fs.existsSync(htmlFile)) {
            const html = fs.readFileSync(htmlFile, "utf8");
            if (!html.includes('type="text/markdown"')) {
              const link = `<link rel="alternate" type="text/markdown" href="${joinUrl(base, `${file}.md`)}">`;
              fs.writeFileSync(htmlFile, html.replace("</head>", `${link}</head>`));
            }
          }
        }
      }

      const llms = [
        `# ${pkg.name}`,
        "",
        `> ${pkg.description}`,
        "",
        `- Install: \`pnpm add ${pkg.name}\``,
        `- React peer dependency: ${pkg.peerDependencies.react}`,
        `- Repository: ${repository}`,
        "- Every page below is also available as raw Markdown (the `.md` links).",
      ];

      for (const group of groups) {
        llms.push("", `## ${group.label || "Getting Started"}`, "");
        for (const id of group.ids) {
          const page = pages.get(id);
          llms.push(
            `- [${page.title}](${joinUrl(base, `${page.file}.md`)})${
              page.description ? `: ${page.description}` : ""
            }`,
          );
        }
      }

      llms.push(
        "",
        "## Optional",
        "",
        `- [Full documentation](${joinUrl(base, "llms-full.txt")}): all pages above in a single file.`,
        `- [Changelog](${repository}/blob/master/CHANGELOG.md)`,
        `- [AGENTS.md](${repository}/blob/master/AGENTS.md): repository conventions for AI coding agents.`,
      );

      fs.writeFileSync(path.join(outDir, "llms.txt"), `${llms.join("\n")}\n`);

      const full = [`# ${pkg.name} — Full Documentation`, "", `> ${pkg.description}`];
      for (const page of pages.values()) {
        full.push("", "---", "", page.markdown.trimEnd());
      }
      fs.writeFileSync(path.join(outDir, "llms-full.txt"), `${full.join("\n")}\n`);
    },
  };
};
