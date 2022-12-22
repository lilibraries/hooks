"use strict";(self.webpackChunk_lilib_hooks=self.webpackChunk_lilib_hooks||[]).push([[9120],{3904:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>u,contentTitle:()=>c,default:()=>l,frontMatter:()=>n,metadata:()=>i,toc:()=>r});var s=o(7462),a=(o(7294),o(3905));const n={},c=void 0,i={unversionedId:"useIsomorphicLayoutEffect",id:"useIsomorphicLayoutEffect",title:"useIsomorphicLayoutEffect",description:"In the DOM environment, this hook is the same as React.useLayoutEffect. In the SSR environment, it is the same as React.useEffect.",source:"@site/docs/useIsomorphicLayoutEffect.mdx",sourceDirName:".",slug:"/useIsomorphicLayoutEffect",permalink:"/hooks/useIsomorphicLayoutEffect",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"useLayoutTargetEffect",permalink:"/hooks/useLayoutTargetEffect"},next:{title:"useCache",permalink:"/hooks/useCache"}},u={},r=[{value:"API",id:"api",level:2},{value:"Example",id:"example",level:2}],f={toc:r};function l(e){let{components:t,...o}=e;return(0,a.kt)("wrapper",(0,s.Z)({},f,o,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"In the DOM environment, this hook is the same as React.useLayoutEffect. In the SSR environment, it is the same as React.useEffect."),(0,a.kt)("h2",{id:"api"},"API"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"function useIsomorphicLayoutEffect(\n  effect: React.EffectCallback,\n  deps?: React.DependencyList\n): void;\n")),(0,a.kt)("h2",{id:"example"},"Example"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},'import React from "react";\nimport { useIsomorphicLayoutEffect } from "@lilib/hooks";\n\nfunction Example() {\n  useIsomorphicLayoutEffect(() => {\n    console.log("Run effect");\n  });\n  ...\n}\n')))}l.isMDXComponent=!0}}]);