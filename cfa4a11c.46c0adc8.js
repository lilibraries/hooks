(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{96:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return i})),t.d(n,"metadata",(function(){return c})),t.d(n,"toc",(function(){return s})),t.d(n,"default",(function(){return l}));var o=t(121),a=t(122),r=(t(0),t(120)),i={},c={unversionedId:"useFavicon",id:"useFavicon",isDocsHomePage:!1,title:"useFavicon",description:"Set document favicon.",source:"@site/docs/useFavicon.mdx",slug:"/useFavicon",permalink:"/hooks/useFavicon",version:"current",sidebar:"docs",previous:{title:"useTitle",permalink:"/hooks/useTitle"},next:{title:"useOnline",permalink:"/hooks/useOnline"}},s=[{value:"Usage",id:"usage",children:[{value:"Params",id:"params",children:[]}]},{value:"Example",id:"example",children:[]}],u={toc:s};function l(e){var n=e.components,t=Object(a.a)(e,["components"]);return Object(r.b)("wrapper",Object(o.a)({},u,t,{components:n,mdxType:"MDXLayout"}),Object(r.b)("p",null,"Set document favicon."),Object(r.b)("h2",{id:"usage"},"Usage"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-ts"},"function useFavicon(href: string, options?: { restore?: boolean }): void;\n")),Object(r.b)("h3",{id:"params"},"Params"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},Object(r.b)("inlineCode",{parentName:"strong"},"href"),":")," favicon url."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},Object(r.b)("inlineCode",{parentName:"strong"},"options.restore"),":")," restore previous favicon on the component unmount.")),Object(r.b)("h2",{id:"example"},"Example"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-tsx"},'import React from "react";\nimport { useFavicon } from "@lilib/hooks";\n\nfunction Example() {\n  useFavicon("https://reactjs.org/favicon.ico", { restore: true });\n  ...\n}\n')))}l.isMDXComponent=!0}}]);