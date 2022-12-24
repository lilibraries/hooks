"use strict";(self.webpackChunk_lilib_hooks=self.webpackChunk_lilib_hooks||[]).push([[3034],{64635:(e,t,n)=>{n.d(t,{Z:()=>o});const o=!("undefined"==typeof window||!window.document||!window.document.createElement)},67030:(e,t,n)=>{n.d(t,{Z:()=>r});var o=n(67294);const l="exampleBlock_ywu8",r=e=>{let{children:t}=e;return o.createElement("div",{className:l},t)}},19601:(e,t,n)=>{n.d(t,{Z:()=>l});var o=n(67294);const l=function(){const e=(0,o.useRef)(!1);return(0,o.useEffect)((()=>(e.current=!0,()=>{e.current=!1})),[]),e}},58134:(e,t,n)=>{n.d(t,{Z:()=>l});var o=n(67294);const l=function(e){const t=(0,o.useRef)(e);t.current=e,(0,o.useEffect)((()=>()=>{t.current()}),[])}},1737:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>g,contentTitle:()=>f,default:()=>T,frontMatter:()=>k,metadata:()=>v,toc:()=>h});var o=n(87462),l=n(67294),r=n(3905),i=n(90814),u=n(67030),s=n(64635),a=n(58134),c=n(19601);const p=function(e){const t=(0,c.Z)(),n=(0,l.useRef)(e),o=(0,l.useRef)();return t.current&&(o.current=n.current),n.current=e,o};const m=function(e,t){const n=(0,l.useRef)(s.Z?document.title:""),o=p(e);s.Z&&null!=e&&e!==o.current&&(document.title=e),(0,a.Z)((()=>{s.Z&&t&&t.restore&&(document.title=n.current)}))};const d=function(){const[e,t]=(0,l.useState)("");return m(e,{restore:!0}),l.createElement("input",{placeholder:"Enter title",value:e,onChange:e=>{t(e.target.value)}})},k={},f=void 0,v={unversionedId:"useTitle",id:"useTitle",title:"useTitle",description:"Set document title.",source:"@site/docs/useTitle.mdx",sourceDirName:".",slug:"/useTitle",permalink:"/hooks/useTitle",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"useUnmountedRef",permalink:"/hooks/useUnmountedRef"},next:{title:"useFavicon",permalink:"/hooks/useFavicon"}},g={},h=[{value:"API",id:"api",level:2},{value:"Example",id:"example",level:2}],x={toc:h};function T(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,o.Z)({},x,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Set document title."),(0,r.kt)("h2",{id:"api"},"API"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"function useTitle(title: string | null, options?: { restore?: boolean }): void;\n")),(0,r.kt)("p",null,"Params:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"strong"},"title"),":")," Required document title. If it is ",(0,r.kt)("inlineCode",{parentName:"li"},"null"),", do nothing."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"strong"},"options"),":")," Options object.",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"strong"},"options.restore"),":")," Restore old title on the component unmount.")))),(0,r.kt)("h2",{id:"example"},"Example"),(0,r.kt)(u.Z,{mdxType:"ExampleBlock"},(0,r.kt)(d,{mdxType:"Example"})),(0,r.kt)(i.Z,{language:"tsx",mdxType:"CodeBlock"},'import React, { useState } from "react";\nimport { useTitle } from "@lilib/hooks";\n\nfunction Example() {\n  const [title, setTitle] = useState("");\n  useTitle(title, { restore: true });\n\n  return (\n    <input\n      placeholder="Enter title"\n      value={title}\n      onChange={(event) => {\n        setTitle(event.target.value);\n      }}\n    />\n  );\n}\n\nexport default Example;\n'))}T.isMDXComponent=!0}}]);