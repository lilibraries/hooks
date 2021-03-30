(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{84:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return a})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return r})),n.d(t,"default",(function(){return d}));var o=n(3),u=n(7),s=(n(0),n(110)),a={},c={unversionedId:"useMounted",id:"useMounted",isDocsHomePage:!1,title:"useMounted",description:"Returns a ref object to track if the component is mounted.",source:"@site/docs/useMounted.mdx",slug:"/useMounted",permalink:"/hooks/useMounted",version:"current",sidebar:"docs",previous:{title:"useAnimation",permalink:"/hooks/useAnimation"},next:{title:"useLastest",permalink:"/hooks/useLastest"}},r=[{value:"Usage",id:"usage",children:[]},{value:"Example",id:"example",children:[]}],i={toc:r};function d(e){var t=e.components,n=Object(u.a)(e,["components"]);return Object(s.b)("wrapper",Object(o.a)({},i,n,{components:t,mdxType:"MDXLayout"}),Object(s.b)("p",null,"Returns a ref object to track if the component is mounted."),Object(s.b)("h2",{id:"usage"},"Usage"),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-ts"},"function useMounted(): React.MutableRefObject<boolean>;\n")),Object(s.b)("h2",{id:"example"},"Example"),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-tsx"},'import React, { useEffect } from "react";\nimport { useMounted } from "@lilib/hooks";\n\nfunction Example() {\n  const mountedRef = useMounted();\n  console.log("Is the component mounted: ", mountedRef.current ? "yes" : "no");\n  ...\n}\n')))}d.isMDXComponent=!0}}]);