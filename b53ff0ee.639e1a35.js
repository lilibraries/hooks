(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{113:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return u})),t.d(n,"metadata",(function(){return c})),t.d(n,"toc",(function(){return p})),t.d(n,"default",(function(){return b}));var o=t(121),i=t(122),s=(t(0),t(120)),r=t(124),a=t(125);var l=function(){return"The network is: "+(Object(a.i)()?"online":"offline")},u={},c={unversionedId:"useOnline",id:"useOnline",isDocsHomePage:!1,title:"useOnline",description:"Detect whether the network is online.",source:"@site/docs/useOnline.mdx",slug:"/useOnline",permalink:"/hooks/useOnline",version:"current",sidebar:"docs",previous:{title:"useFavicon",permalink:"/hooks/useFavicon"},next:{title:"useDarkMode",permalink:"/hooks/useDarkMode"}},p=[{value:"Usage",id:"usage",children:[]},{value:"Example",id:"example",children:[]}],d={toc:p};function b(e){var n=e.components,t=Object(i.a)(e,["components"]);return Object(s.b)("wrapper",Object(o.a)({},d,t,{components:n,mdxType:"MDXLayout"}),Object(s.b)("p",null,"Detect whether the network is online."),Object(s.b)("h2",{id:"usage"},"Usage"),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-ts"},"function useOnline(): boolean;\n")),Object(s.b)("h2",{id:"example"},"Example"),Object(s.b)(r.a,{mdxType:"ExampleBox"},Object(s.b)(l,{mdxType:"UseOnlineExample"})),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-tsx"},'import { useOnline } from "@lilib/hooks";\n\nfunction Example() {\n  const online = useOnline();\n  return "The network is: " + (online ? "online" : "offline");\n}\n\nexport default Example;\n')))}b.isMDXComponent=!0}}]);