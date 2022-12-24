"use strict";(self.webpackChunk_lilib_hooks=self.webpackChunk_lilib_hooks||[]).push([[7799],{4627:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>i,contentTitle:()=>a,default:()=>p,frontMatter:()=>s,metadata:()=>l,toc:()=>m});var o=t(87462),u=(t(67294),t(3905));const s={},a=void 0,l={unversionedId:"useUnmount",id:"useUnmount",title:"useUnmount",description:"Run effect on the component unmount.",source:"@site/docs/useUnmount.mdx",sourceDirName:".",slug:"/useUnmount",permalink:"/hooks/useUnmount",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"useUpdate",permalink:"/hooks/useUpdate"},next:{title:"useTargetEffect",permalink:"/hooks/useTargetEffect"}},i={},m=[{value:"API",id:"api",level:2},{value:"Example",id:"example",level:2}],r={toc:m};function p(e){let{components:n,...t}=e;return(0,u.kt)("wrapper",(0,o.Z)({},r,t,{components:n,mdxType:"MDXLayout"}),(0,u.kt)("p",null,"Run effect on the component unmount."),(0,u.kt)("h2",{id:"api"},"API"),(0,u.kt)("pre",null,(0,u.kt)("code",{parentName:"pre",className:"language-ts"},"function useUnmount(effect: () => void): void;\n")),(0,u.kt)("h2",{id:"example"},"Example"),(0,u.kt)("pre",null,(0,u.kt)("code",{parentName:"pre",className:"language-tsx"},'import React from "react";\nimport { useUnmount } from "@lilib/hooks";\n\nfunction Example() {\n  useUnmount(() => {\n    console.log("Component will unmount");\n  });\n  ...\n}\n')))}p.isMDXComponent=!0}}]);