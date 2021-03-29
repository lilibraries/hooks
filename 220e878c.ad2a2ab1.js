(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{105:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return v})),t.d(n,"metadata",(function(){return f})),t.d(n,"toc",(function(){return N})),t.d(n,"default",(function(){return x}));var a=t(121),o=t(122),i=t(0),r=t.n(i),c=t(120),s=t(124),l=t(6),m=t.n(l),u=t(176),p=t(125),b=[],d={};for(var g in u.a)for(var h in u.a[g]){var j=g+h;"LinearNone"===j&&(j="Linear"),b.push(j),d[j]=u.a[g][h]}var O=function(){var e=Object(i.useState)(b[0]),n=m()(e,2),t=n[0],a=n[1],o=Object(i.useState)(0),c=m()(o,2),s=c[0],l=c[1],u=Object(p.a)((function(e){return l(e)}),{duration:1e3,algorithm:d[t]}),g=m()(u,2),h=g[0],j=g[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,r.a.createElement("button",{onClick:h},"Start"),r.a.createElement("button",{onClick:j},"Cancel"),r.a.createElement("select",{value:t,onChange:function(e){a(e.target.value)}},b.map((function(e){return r.a.createElement("option",{key:e,value:e},e)})))),r.a.createElement("div",{style:{height:8,width:100*s+"%",marginTop:8,backgroundColor:"orange"}}))},v={},f={unversionedId:"useAnimation",id:"useAnimation",isDocsHomePage:!1,title:"useAnimation",description:"Use this hook to perform JavaScript animation.",source:"@site/docs/useAnimation.mdx",slug:"/useAnimation",permalink:"/hooks/useAnimation",version:"current",sidebar:"docs",previous:{title:"useNextFrame",permalink:"/hooks/useNextFrame"},next:{title:"useMounted",permalink:"/hooks/useMounted"}},N=[{value:"Usage",id:"usage",children:[{value:"Params",id:"params",children:[]},{value:"Results",id:"results",children:[]}]},{value:"Example",id:"example",children:[]}],k={toc:N};function x(e){var n=e.components,t=Object(o.a)(e,["components"]);return Object(c.b)("wrapper",Object(a.a)({},k,t,{components:n,mdxType:"MDXLayout"}),Object(c.b)("p",null,"Use this hook to perform JavaScript animation."),Object(c.b)("h2",{id:"usage"},"Usage"),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-ts"},"function useAnimation(\n  callback: (percent: number) => void,\n  options:\n    | number\n    | { duration: number; algorithm?: (percent: number) => number }\n): [start: () => void, cancel: () => void];\n")),Object(c.b)("h3",{id:"params"},"Params"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},Object(c.b)("strong",{parentName:"li"},Object(c.b)("inlineCode",{parentName:"strong"},"callback"),":")," animation process function, it receives a percent number as the first param."),Object(c.b)("li",{parentName:"ul"},Object(c.b)("strong",{parentName:"li"},Object(c.b)("inlineCode",{parentName:"strong"},"options"),":")," animation duration time or an options object.",Object(c.b)("ul",{parentName:"li"},Object(c.b)("li",{parentName:"ul"},Object(c.b)("strong",{parentName:"li"},Object(c.b)("inlineCode",{parentName:"strong"},"options.duration"),":")," required animation duration time, in milliseconds."),Object(c.b)("li",{parentName:"ul"},Object(c.b)("strong",{parentName:"li"},Object(c.b)("inlineCode",{parentName:"strong"},"options.algorithm"),":")," optional algorithm function. Animation execution is linear by default, you can specify this option to change the default behavior.")))),Object(c.b)("h3",{id:"results"},"Results"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},Object(c.b)("strong",{parentName:"li"},Object(c.b)("inlineCode",{parentName:"strong"},"start"),":")," start function."),Object(c.b)("li",{parentName:"ul"},Object(c.b)("strong",{parentName:"li"},Object(c.b)("inlineCode",{parentName:"strong"},"cancel"),":")," cancel function.")),Object(c.b)("h2",{id:"example"},"Example"),Object(c.b)(s.a,{mdxType:"ExampleBox"},Object(c.b)(O,{mdxType:"UseAnimationExample"})),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-tsx"},'import React, { useState } from "react";\nimport { Easing } from "@tweenjs/tween.js";\nimport { useAnimation } from "@lilib/hooks";\n\nconst options: string[] = [];\nconst algorithms: { [name: string]: (percent: number) => number } = {};\n\nfor (let type in Easing) {\n  for (let mode in (Easing as any)[type]) {\n    let name = type + mode;\n    if (name === "LinearNone") {\n      name = "Linear";\n    }\n    options.push(name);\n    algorithms[name] = (Easing as any)[type][mode];\n  }\n}\n\nfunction Example() {\n  const [algorithmName, setAlgorithmName] = useState(options[0]);\n  const [percent, setPercent] = useState(0);\n  const [start, cancel] = useAnimation((percent) => setPercent(percent), {\n    duration: 1000,\n    algorithm: algorithms[algorithmName],\n  });\n\n  return (\n    <>\n      <div>\n        <button onClick={start}>Start</button>\n        <button onClick={cancel}>Cancel</button>\n        <select\n          value={algorithmName}\n          onChange={(event) => {\n            setAlgorithmName(event.target.value);\n          }}\n        >\n          {options.map((option) => (\n            <option key={option} value={option}>\n              {option}\n            </option>\n          ))}\n        </select>\n      </div>\n      <div\n        style={{\n          height: 8,\n          width: percent * 100 + "%",\n          marginTop: 8,\n          backgroundColor: "orange",\n        }}\n      ></div>\n    </>\n  );\n}\n\nexport default Example;\n')))}x.isMDXComponent=!0}}]);