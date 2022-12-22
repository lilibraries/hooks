"use strict";(self.webpackChunk_lilib_hooks=self.webpackChunk_lilib_hooks||[]).push([[4165],{6997:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>m,frontMatter:()=>r,metadata:()=>o,toc:()=>u});var s=n(7462),a=(n(7294),n(3905));const r={},i=void 0,o={unversionedId:"usePersist",id:"usePersist",title:"usePersist",description:"It returns the same function identifier no matter whether the callback parameter is changed or not. The returned function is used in the same way as the callback.",source:"@site/docs/usePersist.mdx",sourceDirName:".",slug:"/usePersist",permalink:"/hooks/usePersist",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"useAnimation",permalink:"/hooks/useAnimation"},next:{title:"useRerender",permalink:"/hooks/useRerender"}},l={},u=[{value:"API",id:"api",level:2},{value:"Example",id:"example",level:2}],c={toc:u};function m(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,s.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"It returns the same function identifier no matter whether the ",(0,a.kt)("inlineCode",{parentName:"p"},"callback")," parameter is changed or not. The returned function is used in the same way as the ",(0,a.kt)("inlineCode",{parentName:"p"},"callback"),"."),(0,a.kt)("h2",{id:"api"},"API"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"function usePersist<T extends (...args: any[]) => any>(\n  callback: T\n): (...args: Parameters<T>) => ReturnType<T>;\n")),(0,a.kt)("h2",{id:"example"},"Example"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},'import React from "react";\nimport { usePersist } from "@lilib/hooks";\n\nfunction Example() {\n  const callback = usePersist(() => {\n    // Do something.\n  });\n  ...\n}\n')))}m.isMDXComponent=!0}}]);