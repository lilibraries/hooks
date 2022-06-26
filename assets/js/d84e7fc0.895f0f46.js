"use strict";(self.webpackChunk_lilib_hooks=self.webpackChunk_lilib_hooks||[]).push([[3310],{6937:(t,e,n)=>{n.d(e,{Z:()=>a});var r=n(9051);const a=function(t,e){const[n,a]=(0,r.Z)((()=>{t(),n()}),e);return[n,a]}},8242:(t,e,n)=>{n.d(e,{Z:()=>a});var r=n(7294);const a=function(t){const e=(0,r.useRef)(t);return e.current=t,e}},4708:(t,e,n)=>{n.d(e,{Z:()=>o});var r=n(7294),a=n(8242);const o=function(t){const e=(0,r.useRef)(),n=(0,a.Z)(t);return e.current||(e.current=function(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];return n.current.apply(this,e)}),e.current}},9051:(t,e,n)=>{n.d(e,{Z:()=>l});var r=n(7294),a=n(8134),o=n(4708);const l=function(t,e){const n=(0,o.Z)(t),l=(0,r.useRef)(),u=(0,o.Z)((()=>{void 0!==l.current&&(clearTimeout(l.current),l.current=void 0)})),c=(0,o.Z)((()=>{u(),l.current=setTimeout(n,e)}));return(0,a.Z)(u),[c,u]}},8134:(t,e,n)=>{n.d(e,{Z:()=>a});var r=n(7294);const a=function(t){const e=(0,r.useRef)(t);e.current=t,(0,r.useEffect)((()=>()=>{e.current()}),[])}},394:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>k,contentTitle:()=>p,default:()=>f,frontMatter:()=>i,metadata:()=>m,toc:()=>d});var r=n(7462),a=n(7294),o=n(3905),l=n(3066),u=n(2823),c=n(6937);const s=function(){const[t,e]=(0,a.useState)(0),[n,r]=(0,c.Z)((()=>{e((t=>++t))}),1e3);return a.createElement(a.Fragment,null,a.createElement("button",{onClick:n},"Start")," ",a.createElement("button",{onClick:r},"Cancel")," Count: ",t)},i={},p=void 0,m={unversionedId:"useInterval",id:"useInterval",title:"useInterval",description:"Loop run callback.",source:"@site/docs/useInterval.mdx",sourceDirName:".",slug:"/useInterval",permalink:"/hooks/useInterval",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"useTimeout",permalink:"/hooks/useTimeout"},next:{title:"useAnimation",permalink:"/hooks/useAnimation"}},k={},d=[{value:"API",id:"api",level:2},{value:"Example",id:"example",level:2}],v={toc:d};function f(t){let{components:e,...n}=t;return(0,o.kt)("wrapper",(0,r.Z)({},v,n,{components:e,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Loop run callback."),(0,o.kt)("h2",{id:"api"},"API"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"function useInterval(\n  callback: () => void,\n  interval?: number\n): [start: () => void, cancel: () => void];\n")),(0,o.kt)("p",null,"Params:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"callback"),":")," The function that is called at intervals."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"interval"),":")," Optional interval time, in milliseconds.")),(0,o.kt)("p",null,"Results:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"start"),":")," Start loop. Automatically clear the previous loop."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"cancel"),":")," Cancel loop.")),(0,o.kt)("h2",{id:"example"},"Example"),(0,o.kt)(u.Z,{mdxType:"ExampleBlock"},(0,o.kt)(s,{mdxType:"Example"})),(0,o.kt)(l.Z,{language:"tsx",mdxType:"CodeBlock"},'import React, { useState } from "react";\nimport { useInterval } from "@lilib/hooks";\n\nfunction Example() {\n  const [count, setCount] = useState(0);\n  const [start, cancel] = useInterval(() => {\n    setCount((count) => ++count);\n  }, 1000);\n\n  return (\n    <>\n      <button onClick={start}>Start</button>{" "}\n      <button onClick={cancel}>Cancel</button> Count: {count}\n    </>\n  );\n}\n\nexport default Example;\n'))}f.isMDXComponent=!0}}]);