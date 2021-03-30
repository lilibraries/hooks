(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{109:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return d})),t.d(n,"metadata",(function(){return g})),t.d(n,"toc",(function(){return p})),t.d(n,"default",(function(){return O}));var a=t(3),l=t(7),o=t(0),i=t.n(o),u=t(110),c=t(112),r=t(113);function b(){return Math.ceil(5e3*Math.random())}var s=function(){var e=Object(o.useState)(b()),n=e[0],t=e[1],a=Object(r.q)(!1),l=a[0],u=a[1].toggle,c=Object(r.q)(!0),s=c[0],d=c[1].toggle,g=Object(o.useState)(""),p=g[0],m=g[1],O={wait:n,leading:l,trailing:s},j=Object(r.e)(p,O),h=j[0],f=j[1],v=f.flush,N=f.cancel;return i.a.createElement(i.a.Fragment,null,i.a.createElement("p",null,"Actions:"," ",i.a.createElement("button",{onClick:function(){return t(b())}},"Change wait time"),i.a.createElement("button",{onClick:function(){return u()}},"Toggle leading"),i.a.createElement("button",{onClick:function(){return d()}},"Toggle trailing")),i.a.createElement("p",null,"Options:"," ","{ wait: "+n+", leading: "+l+", trailing: "+s+" }"),i.a.createElement("p",null,"Enter value:"," ",i.a.createElement("input",{value:p,onChange:function(e){m(e.target.value)}}),i.a.createElement("button",{onClick:function(){return v()}},"Flush"),i.a.createElement("button",{onClick:function(){return v("final value")}},'Flush with "final value"'),i.a.createElement("button",{onClick:N},"Cancel")),i.a.createElement("div",null,"Debounced value: ",h))},d={},g={unversionedId:"useDebounced",id:"useDebounced",isDocsHomePage:!1,title:"useDebounced",description:"Debounce a value.",source:"@site/docs/useDebounced.mdx",slug:"/useDebounced",permalink:"/hooks/useDebounced",version:"current",sidebar:"docs",previous:{title:"useToggle",permalink:"/hooks/useToggle"},next:{title:"useThrottled",permalink:"/hooks/useThrottled"}},p=[{value:"Usage",id:"usage",children:[{value:"Params",id:"params",children:[]},{value:"Results",id:"results",children:[]}]},{value:"Example",id:"example",children:[]}],m={toc:p};function O(e){var n=e.components,t=Object(l.a)(e,["components"]);return Object(u.b)("wrapper",Object(a.a)({},m,t,{components:n,mdxType:"MDXLayout"}),Object(u.b)("p",null,"Debounce a value."),Object(u.b)("h2",{id:"usage"},"Usage"),Object(u.b)("pre",null,Object(u.b)("code",{parentName:"pre",className:"language-ts"},"function useDebounced<T = any>(\n  value: T,\n  options: number | { wait: number; leading?: boolean; trailing?: boolean }\n): [\n  debouncedValue: T,\n  {\n    flush: (finalValue?: T) => void;\n    cancel: () => void;\n  }\n];\n")),Object(u.b)("h3",{id:"params"},"Params"),Object(u.b)("ul",null,Object(u.b)("li",{parentName:"ul"},Object(u.b)("strong",{parentName:"li"},Object(u.b)("inlineCode",{parentName:"strong"},"value"),":")," the value that will be changed."),Object(u.b)("li",{parentName:"ul"},Object(u.b)("strong",{parentName:"li"},Object(u.b)("inlineCode",{parentName:"strong"},"options"),":")," debounce wait time or an options object.",Object(u.b)("ul",{parentName:"li"},Object(u.b)("li",{parentName:"ul"},Object(u.b)("strong",{parentName:"li"},Object(u.b)("inlineCode",{parentName:"strong"},"options.wait"),":")," debounce wait time, in milliseconds."),Object(u.b)("li",{parentName:"ul"},Object(u.b)("strong",{parentName:"li"},Object(u.b)("inlineCode",{parentName:"strong"},"options.leading"),":")," change debouncedValue on the leading edge, default is false."),Object(u.b)("li",{parentName:"ul"},Object(u.b)("strong",{parentName:"li"},Object(u.b)("inlineCode",{parentName:"strong"},"options.trailing"),":")," change debouncedValue on the trailing edge, default is true.")))),Object(u.b)("h3",{id:"results"},"Results"),Object(u.b)("ul",null,Object(u.b)("li",{parentName:"ul"},Object(u.b)("strong",{parentName:"li"},Object(u.b)("inlineCode",{parentName:"strong"},"debouncedValue"),":")," debounced value."),Object(u.b)("li",{parentName:"ul"},Object(u.b)("strong",{parentName:"li"},Object(u.b)("inlineCode",{parentName:"strong"},"flush"),":")," flush funciton. The finalValue will be returned as debouncedValue if it is specified."),Object(u.b)("li",{parentName:"ul"},Object(u.b)("strong",{parentName:"li"},Object(u.b)("inlineCode",{parentName:"strong"},"cancel"),":")," cancel debounce timer.")),Object(u.b)("h2",{id:"example"},"Example"),Object(u.b)(c.a,{mdxType:"ExampleBox"},Object(u.b)(s,{mdxType:"UseDebouncedExample"})),Object(u.b)("pre",null,Object(u.b)("code",{parentName:"pre",className:"language-tsx"},'import React, { useState } from "react";\nimport { useDebounced, useToggle } from "@lilib/hooks";\n\nfunction random() {\n  return Math.ceil(Math.random() * 5000);\n}\n\nfunction Example() {\n  const [wait, setWait] = useState(random());\n  const [leading, { toggle: toggleLeading }] = useToggle(false);\n  const [trailing, { toggle: toggleTrailing }] = useToggle(true);\n\n  const [value, setValue] = useState("");\n  const options = { wait, leading, trailing };\n  const [debouncedValue, { flush, cancel }] = useDebounced(value, options);\n\n  return (\n    <>\n      <p>\n        Actions:{" "}\n        <button onClick={() => setWait(random())}>Change wait time</button>\n        <button onClick={() => toggleLeading()}>Toggle leading</button>\n        <button onClick={() => toggleTrailing()}>Toggle trailing</button>\n      </p>\n      <p>\n        Options:{" "}\n        {`{ wait: ${wait}, leading: ${leading}, trailing: ${trailing} }`}\n      </p>\n      <p>\n        Enter value:{" "}\n        <input\n          value={value}\n          onChange={(event) => {\n            setValue(event.target.value);\n          }}\n        />\n        <button onClick={() => flush()}>Flush</button>\n        <button onClick={() => flush("final value")}>\n          Flush with "final value"\n        </button>\n        <button onClick={cancel}>Cancel</button>\n      </p>\n      <div>Debounced value: {debouncedValue}</div>\n    </>\n  );\n}\n\nexport default Example;\n')))}O.isMDXComponent=!0}}]);