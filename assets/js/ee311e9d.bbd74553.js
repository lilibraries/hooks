"use strict";(self.webpackChunk_lilib_hooks=self.webpackChunk_lilib_hooks||[]).push([[4872],{44270:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>c,frontMatter:()=>u,metadata:()=>i,toc:()=>r});var o=n(87462),s=(n(67294),n(3905));const u={},a=void 0,i={unversionedId:"useMount",id:"useMount",title:"useMount",description:"Run effect after the component is mounted.",source:"@site/docs/useMount.mdx",sourceDirName:".",slug:"/useMount",permalink:"/hooks/useMount",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"useOnce",permalink:"/hooks/useOnce"},next:{title:"useUpdate",permalink:"/hooks/useUpdate"}},l={},r=[{value:"API",id:"api",level:2},{value:"Example",id:"example",level:2}],p={toc:r};function c(e){let{components:t,...n}=e;return(0,s.kt)("wrapper",(0,o.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("p",null,"Run effect after the component is mounted."),(0,s.kt)("h2",{id:"api"},"API"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-ts"},"function useMount(effect: () => void): void;\n")),(0,s.kt)("h2",{id:"example"},"Example"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-tsx"},'import React from "react";\nimport { useMount } from "@lilib/hooks";\n\nfunction Example() {\n  useMount(() => {\n    console.log("Component is mounted");\n  });\n  ...\n}\n')))}c.isMDXComponent=!0}}]);