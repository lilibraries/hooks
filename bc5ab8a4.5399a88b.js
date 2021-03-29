(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{114:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return p})),t.d(n,"metadata",(function(){return m})),t.d(n,"toc",(function(){return b})),t.d(n,"default",(function(){return h}));var r=t(121),o=t(122),a=t(0),u=t.n(a),c=t(120),s=t(124),d=t(125),i=0;var l=function(){var e=Object(d.k)();return u.a.createElement(u.a.Fragment,null,u.a.createElement("button",{onClick:function(){i++,e()}},"+1")," ",i)},p={},m={unversionedId:"useRerender",id:"useRerender",isDocsHomePage:!1,title:"useRerender",description:"This hook returns a function that you can use to rerender the component. It is usually used to rerender mutable data.",source:"@site/docs/useRerender.mdx",slug:"/useRerender",permalink:"/hooks/useRerender",version:"current",sidebar:"docs",previous:{title:"useCreate",permalink:"/hooks/useCreate"}},b=[{value:"Usage",id:"usage",children:[]},{value:"Example",id:"example",children:[]}],f={toc:b};function h(e){var n=e.components,t=Object(o.a)(e,["components"]);return Object(c.b)("wrapper",Object(r.a)({},f,t,{components:n,mdxType:"MDXLayout"}),Object(c.b)("p",null,"This hook returns a function that you can use to rerender the component. It is usually used to rerender mutable data."),Object(c.b)("h2",{id:"usage"},"Usage"),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-ts"},"function useRerender(): () => void;\n")),Object(c.b)("h2",{id:"example"},"Example"),Object(c.b)(s.a,{mdxType:"ExampleBox"},Object(c.b)(l,{mdxType:"UseRerenderExample"})),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-tsx"},'import React from "react";\nimport { useRerender } from "@lilib/hooks";\n\nlet count = 0;\n\nfunction Example() {\n  const rerender = useRerender();\n\n  function handleClick() {\n    count++;\n    rerender();\n  }\n\n  return (\n    <>\n      <button onClick={handleClick}>+1</button> {count}\n    </>\n  );\n}\n\nexport default Example;\n')))}h.isMDXComponent=!0}}]);