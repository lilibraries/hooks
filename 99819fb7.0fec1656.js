(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{112:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return m})),n.d(t,"metadata",(function(){return p})),n.d(t,"toc",(function(){return h})),n.d(t,"default",(function(){return j}));var a=n(121),l=n(122),o=n(0),r=n.n(o),i=n(120),c=n(124),u=n(6),s=n.n(u),b=n(125);function g(){return Math.ceil(5e3*Math.random())}var d=function(){var e=Object(o.useState)(g()),t=s()(e,2),n=t[0],a=t[1],l=Object(b.q)(!1),i=s()(l,2),c=i[0],u=i[1].toggle,d=Object(b.q)(!0),m=s()(d,2),p=m[0],h=m[1].toggle,O=Object(o.useState)(""),j=s()(O,2),f=j[0],T=j[1],k=Object(o.useState)(""),v=s()(k,2),C=v[0],N=v[1],w=Object(b.m)((function(){N(f)}),{wait:n,leading:c,trailing:p}),E=s()(w,2),x=E[0],y=E[1],M=y.flush,S=y.cancel;return Object(b.r)(x,[f]),r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,"Actions:"," ",r.a.createElement("button",{onClick:function(){return a(g())}},"Change wait time"),r.a.createElement("button",{onClick:function(){return u()}},"Toggle leading"),r.a.createElement("button",{onClick:function(){return h()}},"Toggle trailing")),r.a.createElement("p",null,"Options:"," ","{ wait: ".concat(n,", leading: ").concat(c,", trailing: ").concat(p," }")),r.a.createElement("p",null,"Enter value:"," ",r.a.createElement("input",{value:f,onChange:function(e){T(e.target.value)}}),r.a.createElement("button",{onClick:function(){return M()}},"Flush"),r.a.createElement("button",{onClick:S},"Cancel")),r.a.createElement("div",null,"Throttled value: ",C))},m={},p={unversionedId:"useThrottle",id:"useThrottle",isDocsHomePage:!1,title:"useThrottle",description:"Use throttled callback.",source:"@site/docs/useThrottle.mdx",slug:"/useThrottle",permalink:"/hooks/useThrottle",version:"current",sidebar:"docs",previous:{title:"useDebounce",permalink:"/hooks/useDebounce"},next:{title:"useTimeout",permalink:"/hooks/useTimeout"}},h=[{value:"Usage",id:"usage",children:[{value:"Params",id:"params",children:[]},{value:"Results",id:"results",children:[]}]},{value:"Example",id:"example",children:[]}],O={toc:h};function j(e){var t=e.components,n=Object(l.a)(e,["components"]);return Object(i.b)("wrapper",Object(a.a)({},O,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"Use throttled callback."),Object(i.b)("h2",{id:"usage"},"Usage"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-ts"},"function useThrottle<T extends (...args: any[]) => any>(\n  callback: T,\n  options: number | { wait: number; leading?: boolean; trailing?: boolean }\n): [\n  throttledCallback: (...args: Parameters<T>) => ReturnType<T> | undefined,\n  {\n    flush: () => ReturnType<T> | undefined;\n    cancel: () => void;\n  }\n];\n")),Object(i.b)("h3",{id:"params"},"Params"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},Object(i.b)("inlineCode",{parentName:"strong"},"callback"),":")," original callback function."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},Object(i.b)("inlineCode",{parentName:"strong"},"options"),":")," throttle wait time or an options object.",Object(i.b)("ul",{parentName:"li"},Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},Object(i.b)("inlineCode",{parentName:"strong"},"options.wait"),":")," throttle wait time, in milliseconds."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},Object(i.b)("inlineCode",{parentName:"strong"},"options.leading"),":")," run callback on the leading edge, default is false."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},Object(i.b)("inlineCode",{parentName:"strong"},"options.trailing"),":")," run callback on the trailing edge, default is true.")))),Object(i.b)("h3",{id:"results"},"Results"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},Object(i.b)("inlineCode",{parentName:"strong"},"throttledCallback"),":")," throttled callback."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},Object(i.b)("inlineCode",{parentName:"strong"},"flush"),":")," flush funciton, run callback immediately."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},Object(i.b)("inlineCode",{parentName:"strong"},"cancel"),":")," cancel throttle timer.")),Object(i.b)("h2",{id:"example"},"Example"),Object(i.b)(c.a,{mdxType:"ExampleBox"},Object(i.b)(d,{mdxType:"UseThrottleExample"})),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-tsx"},'import React, { useState } from "react";\nimport { useThrottle, useToggle, useUpdate } from "@lilib/hooks";\n\nfunction random() {\n  return Math.ceil(Math.random() * 5000);\n}\n\nfunction Example() {\n  const [wait, setWait] = useState(random());\n  const [leading, { toggle: toggleLeading }] = useToggle(false);\n  const [trailing, { toggle: toggleTrailing }] = useToggle(true);\n\n  const [value, setValue] = useState("");\n  const [throttledValue, setThrottledValue] = useState("");\n  const [throttledCallback, { flush, cancel }] = useThrottle(\n    () => {\n      setThrottledValue(value);\n    },\n    { wait, leading, trailing }\n  );\n\n  useUpdate(throttledCallback, [value]);\n\n  return (\n    <>\n      <p>\n        Actions:{" "}\n        <button onClick={() => setWait(random())}>Change wait time</button>\n        <button onClick={() => toggleLeading()}>Toggle leading</button>\n        <button onClick={() => toggleTrailing()}>Toggle trailing</button>\n      </p>\n      <p>\n        Options:{" "}\n        {`{ wait: ${wait}, leading: ${leading}, trailing: ${trailing} }`}\n      </p>\n      <p>\n        Enter value:{" "}\n        <input\n          value={value}\n          onChange={(event) => {\n            setValue(event.target.value);\n          }}\n        />\n        <button onClick={() => flush()}>Flush</button>\n        <button onClick={cancel}>Cancel</button>\n      </p>\n      <div>Throttled value: {throttledValue}</div>\n    </>\n  );\n}\n\nexport default Example;\n')))}j.isMDXComponent=!0}}]);