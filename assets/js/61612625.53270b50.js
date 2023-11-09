"use strict";(self.webpackChunk_lilib_hooks=self.webpackChunk_lilib_hooks||[]).push([[2119],{86783:(e,t,l)=>{l.r(t),l.d(t,{assets:()=>r,contentTitle:()=>o,default:()=>c,frontMatter:()=>s,metadata:()=>i,toc:()=>u});var n=l(96600),a=(l(59496),l(49613));const s={},o=void 0,i={unversionedId:"useIdle",id:"useIdle",title:"useIdle",description:"Invoke the callback when the browser is idle. This hook uses window.requestIdleCallback by default. If the window.requestIdleCallback is non-existent, it uses setTimeout.",source:"@site/docs/useIdle.mdx",sourceDirName:".",slug:"/useIdle",permalink:"/hooks/useIdle",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"useRaf",permalink:"/hooks/useRaf"},next:{title:"useTimeout",permalink:"/hooks/useTimeout"}},r={},u=[{value:"API",id:"api",level:2},{value:"Example",id:"example",level:2}],d={toc:u};function c(e){let{components:t,...l}=e;return(0,a.kt)("wrapper",(0,n.Z)({},d,l,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Invoke the callback when the browser is idle. This hook uses ",(0,a.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback"},"window.requestIdleCallback")," by default. If the window.requestIdleCallback is non-existent, it uses setTimeout."),(0,a.kt)("h2",{id:"api"},"API"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"function useIdle(callback: () => void): [start: () => void, cancel: () => void];\n")),(0,a.kt)("p",null,"Params:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},(0,a.kt)("inlineCode",{parentName:"strong"},"callback"),":")," A function that will be invoked.")),(0,a.kt)("p",null,"Results:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},(0,a.kt)("inlineCode",{parentName:"strong"},"start"),":")," Start function."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},(0,a.kt)("inlineCode",{parentName:"strong"},"cancel"),":")," Cancel function.")),(0,a.kt)("h2",{id:"example"},"Example"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},'import React from "react";\nimport { useIdle } from "@lilib/hooks";\n\nfunction Example() {\n  const [start, cancel] = useIdle(() => {\n    // Do something\n  });\n}\n')))}c.isMDXComponent=!0}}]);