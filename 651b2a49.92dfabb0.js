(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{110:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return p})),n.d(t,"metadata",(function(){return m})),n.d(t,"toc",(function(){return d})),n.d(t,"default",(function(){return f}));var l=n(121),o=n(122),a=n(0),i=n.n(a),u=n(120),b=n(124),r=n(6),s=n.n(r),c=n(125);var g=function(){var e=Object(c.q)(!0),t=s()(e,2),n=t[0],l=t[1],o=l.toggle,a=l.toggleOn,u=l.toggleOff;return i.a.createElement(i.a.Fragment,null,i.a.createElement("button",{onClick:function(){return o()}},"Toggle"),i.a.createElement("button",{onClick:a},"Show"),i.a.createElement("button",{onClick:u},"Hide"),i.a.createElement("div",{style:{display:n?"block":"none"}},"Example text can be handled by the buttons above."))},p={},m={unversionedId:"useToggle",id:"useToggle",isDocsHomePage:!1,title:"useToggle",description:"Use boolean value.",source:"@site/docs/useToggle.mdx",slug:"/useToggle",permalink:"/hooks/useToggle",version:"current",sidebar:"docs",previous:{title:"useIsomorphicLayoutEffect",permalink:"/hooks/useIsomorphicLayoutEffect"},next:{title:"useDebounced",permalink:"/hooks/useDebounced"}},d=[{value:"Usage",id:"usage",children:[{value:"Params",id:"params",children:[]},{value:"Results",id:"results",children:[]}]},{value:"Example",id:"example",children:[]}],O={toc:d};function f(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(u.b)("wrapper",Object(l.a)({},O,n,{components:t,mdxType:"MDXLayout"}),Object(u.b)("p",null,"Use boolean value."),Object(u.b)("h2",{id:"usage"},"Usage"),Object(u.b)("pre",null,Object(u.b)("code",{parentName:"pre",className:"language-ts"},"function useToggle(\n  initialValue?: boolean\n): [\n  value: boolean,\n  actions: {\n    toggle: (newValue?: boolean) => void;\n    toggleOn: () => void;\n    toggleOff: () => void;\n  }\n];\n")),Object(u.b)("h3",{id:"params"},"Params"),Object(u.b)("ul",null,Object(u.b)("li",{parentName:"ul"},Object(u.b)("strong",{parentName:"li"},Object(u.b)("inlineCode",{parentName:"strong"},"initialValue"),":")," optional initial value, default is false.")),Object(u.b)("h3",{id:"results"},"Results"),Object(u.b)("ul",null,Object(u.b)("li",{parentName:"ul"},Object(u.b)("strong",{parentName:"li"},Object(u.b)("inlineCode",{parentName:"strong"},"value"),":")," a boolean value, can be changed by the following functions."),Object(u.b)("li",{parentName:"ul"},Object(u.b)("strong",{parentName:"li"},Object(u.b)("inlineCode",{parentName:"strong"},"toggle"),":")," toggle the value. If the newValue param is specified, the value will be set to the newValue."),Object(u.b)("li",{parentName:"ul"},Object(u.b)("strong",{parentName:"li"},Object(u.b)("inlineCode",{parentName:"strong"},"toggleOn"),":")," set the value to true."),Object(u.b)("li",{parentName:"ul"},Object(u.b)("strong",{parentName:"li"},Object(u.b)("inlineCode",{parentName:"strong"},"toggleOff"),":")," set the value to false.")),Object(u.b)("h2",{id:"example"},"Example"),Object(u.b)(b.a,{mdxType:"ExampleBox"},Object(u.b)(g,{mdxType:"UseToggleExample"})),Object(u.b)("pre",null,Object(u.b)("code",{parentName:"pre",className:"language-tsx"},'import React from "react";\nimport { useToggle } from "@lilib/hooks";\n\nfunction Example() {\n  const [visible, { toggle, toggleOn, toggleOff }] = useToggle(true);\n\n  return (\n    <>\n      <button onClick={() => toggle()}>Toggle</button>\n      <button onClick={toggleOn}>Show</button>\n      <button onClick={toggleOff}>Hide</button>\n      <div style={{ display: visible ? "block" : "none" }}>\n        Example text can be handled by the buttons above.\n      </div>\n    </>\n  );\n}\n\nexport default Example;\n')))}f.isMDXComponent=!0}}]);