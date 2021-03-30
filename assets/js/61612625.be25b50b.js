(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{83:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return i})),n.d(t,"toc",(function(){return r})),n.d(t,"default",(function(){return u}));var a=n(3),l=n(7),s=(n(0),n(110)),o={},i={unversionedId:"useIdle",id:"useIdle",isDocsHomePage:!1,title:"useIdle",description:"Invoke the callback when the browser is idle. This hook uses window.requestIdleCallback by default. If the window.requestIdleCallback is non-existent, it uses setTimeout.",source:"@site/docs/useIdle.mdx",slug:"/useIdle",permalink:"/hooks/useIdle",version:"current",sidebar:"docs",previous:{title:"useRaf",permalink:"/hooks/useRaf"},next:{title:"useNextFrame",permalink:"/hooks/useNextFrame"}},r=[{value:"Usage",id:"usage",children:[{value:"Params",id:"params",children:[]},{value:"Results",id:"results",children:[]}]},{value:"Example",id:"example",children:[]}],c={toc:r};function u(e){var t=e.components,n=Object(l.a)(e,["components"]);return Object(s.b)("wrapper",Object(a.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(s.b)("p",null,"Invoke the callback when the browser is idle. This hook uses ",Object(s.b)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback"},"window.requestIdleCallback")," by default. If the window.requestIdleCallback is non-existent, it uses setTimeout."),Object(s.b)("h2",{id:"usage"},"Usage"),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-ts"},"function useIdle(callback: () => void): [start: () => void, cancel: () => void];\n")),Object(s.b)("h3",{id:"params"},"Params"),Object(s.b)("ul",null,Object(s.b)("li",{parentName:"ul"},Object(s.b)("strong",{parentName:"li"},Object(s.b)("inlineCode",{parentName:"strong"},"callback"),":")," the function that will be invoked.")),Object(s.b)("h3",{id:"results"},"Results"),Object(s.b)("ul",null,Object(s.b)("li",{parentName:"ul"},Object(s.b)("strong",{parentName:"li"},Object(s.b)("inlineCode",{parentName:"strong"},"start"),":")," start function."),Object(s.b)("li",{parentName:"ul"},Object(s.b)("strong",{parentName:"li"},Object(s.b)("inlineCode",{parentName:"strong"},"cancel"),":")," cancel function.")),Object(s.b)("h2",{id:"example"},"Example"),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-tsx"},'import React from "react";\nimport { useIdle } from "@lilib/hooks";\n\nfunction Example() {\n  const [start, cancel] = useIdle(() => {\n    // Do something\n  });\n}\n')))}u.isMDXComponent=!0}}]);