"use strict";(self.webpackChunk_lilib_hooks=self.webpackChunk_lilib_hooks||[]).push([[5501],{10351:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>r,contentTitle:()=>s,default:()=>c,frontMatter:()=>u,metadata:()=>i,toc:()=>l});var a=o(87462),n=(o(67294),o(3905));const u={},s=void 0,i={unversionedId:"useLayoutMount",id:"useLayoutMount",title:"useLayoutMount",description:"It's similar to useMount, except it uses useIsomorphicLayoutEffect internally.",source:"@site/docs/useLayoutMount.mdx",sourceDirName:".",slug:"/useLayoutMount",permalink:"/hooks/useLayoutMount",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"useTargetEffect",permalink:"/hooks/useTargetEffect"},next:{title:"useLayoutUpdate",permalink:"/hooks/useLayoutUpdate"}},r={},l=[{value:"API",id:"api",level:2},{value:"Example",id:"example",level:2}],p={toc:l};function c(e){let{components:t,...o}=e;return(0,n.kt)("wrapper",(0,a.Z)({},p,o,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"It's similar to ",(0,n.kt)("a",{parentName:"p",href:"./useMount"},(0,n.kt)("inlineCode",{parentName:"a"},"useMount")),", except it uses ",(0,n.kt)("a",{parentName:"p",href:"./useIsomorphicLayoutEffect"},(0,n.kt)("inlineCode",{parentName:"a"},"useIsomorphicLayoutEffect"))," internally."),(0,n.kt)("h2",{id:"api"},"API"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-ts"},"function useLayoutMount(effect: () => void): void;\n")),(0,n.kt)("h2",{id:"example"},"Example"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-tsx"},'import React from "react";\nimport { useLayoutMount } from "@lilib/hooks";\n\nfunction Example() {\n  useLayoutMount(() => {\n    console.log("Component is mounted");\n  });\n  ...\n}\n')))}c.isMDXComponent=!0}}]);