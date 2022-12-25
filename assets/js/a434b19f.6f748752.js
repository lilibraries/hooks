(self.webpackChunk_lilib_hooks=self.webpackChunk_lilib_hooks||[]).push([[3339],{5122:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r=function(e,t){for(var n=arguments.length,r=new Array(n>2?n-2:0),o=2;o<n;o++)r[o-2]=arguments[o];var i=[e,t].concat(r);if(arguments.length<2)throw new TypeError("The length of `areArraysEqual`'s params must be >= 2.");if(i.some((function(e){return!Array.isArray(e)})))throw new TypeError("The params of `areArraysEqual` must be arrays.");for(var a=i[0],u=i.length,s=!0,c=1;c<u;c++)a!==i[c]&&(s=!1);if(s)return!0;for(var l=1;l<u;l++)if(a.length!==i[l].length)return!1;for(var f=1;f<u;f++)for(var p=i[f],d=a.length,m=0;m<d;m++)if(!Object.is(a[m],p[m]))return!1;return!0}},45153:(e,t,n)=>{"use strict";n.d(t,{Z:()=>s});var r=n(13218),o=n.n(r),i=n(23560),a=n.n(i),u=n(64635);const s=function(e){return u.Z?a()(e)?e():o()(e)&&"current"in e?e.current:e:null}},64635:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r=!("undefined"==typeof window||!window.document||!window.document.createElement)},48332:(e,t,n)=>{"use strict";n.d(t,{Z:()=>u});var r=n(67294),o=n(45153),i=n(5122),a=n(58134);const u=function(e){return function(t,n,u){const s=(0,r.useRef)(!1),c=(0,r.useRef)([]),l=(0,r.useRef)([]),f=(0,r.useRef)();function p(){f.current?.()}e((()=>{const e=u.map(o.Z);function r(){c.current=n,l.current=e,f.current=t()}s.current?(0,i.Z)(n,c.current)&&(0,i.Z)(e,l.current)||(p(),r()):(r(),s.current=!0)})),(0,a.Z)((()=>{p(),s.current=!1}))}}},63809:(e,t,n)=>{"use strict";n.d(t,{Z:()=>o});var r=n(67294);const o=(0,n(48332).Z)(r.useEffect)},58134:(e,t,n)=>{"use strict";n.d(t,{Z:()=>o});var r=n(67294);const o=function(e){const t=(0,r.useRef)(e);t.current=e,(0,r.useEffect)((()=>()=>{t.current()}),[])}},38503:(e,t,n)=>{"use strict";n.r(t),n.d(t,{assets:()=>g,contentTitle:()=>m,default:()=>N,frontMatter:()=>d,metadata:()=>k,toc:()=>v});var r=n(87462),o=n(67294),i=n(3905),a=n(90814),u=n(67030),s=n(45153),c=n(58242),l=n(63809);const f=function(e,t,n){const r=Array.isArray(e)?e:[e],{container:o,eventName:i="mousedown"}=n||{},a=Array.isArray(i)?i:[i],u=(0,c.Z)(t);(0,l.Z)((()=>{function e(e){for(const t of r.map(s.Z))if(t&&t.contains(e.target))return;u.current(e)}const t=(0,s.Z)(o)||document;for(const n of a)t.addEventListener(n,e);return()=>{for(const n of a)t.removeEventListener(n,e)}}),a,r)};const p=function(){const e=(0,o.useRef)(null),[t,n]=(0,o.useState)(0);return f(e,(()=>{n(t+1)})),o.createElement(o.Fragment,null,o.createElement("button",{ref:e},"Click outside")," Count: ",t)},d={},m=void 0,k={unversionedId:"useClickOutside",id:"useClickOutside",title:"useClickOutside",description:"Trigger a callback when clicking outside the target area.",source:"@site/docs/useClickOutside.mdx",sourceDirName:".",slug:"/useClickOutside",permalink:"/hooks/useClickOutside",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"useIntersecting",permalink:"/hooks/useIntersecting"},next:{title:"useEventListener",permalink:"/hooks/useEventListener"}},g={},v=[{value:"API",id:"api",level:2},{value:"Example",id:"example",level:2}],b={toc:v};function N(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,r.Z)({},b,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Trigger a callback when clicking outside the target area."),(0,i.kt)("h2",{id:"api"},"API"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"function useClickOutside<E extends Event = Event>(\n  target: EffectTarget<Node> | EffectTarget<Node>[],\n  listener: (event: E) => void,\n  options?: {\n    container?: EffectTarget<Element>;\n    eventName?: string | string[];\n  }\n): void;\n\ntype Nullable<T> = T | undefined | null;\ntype EffectTarget<T> =\n  | Nullable<T>\n  | (() => Nullable<T>)\n  | { current: Nullable<T> };\n")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"strong"},"target"),":")," Target node or nodes."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"strong"},"listener"),":")," Listener function."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"strong"},"options"),":")," Options object.",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"strong"},"options.container"),":")," Container for binding events. Default is ",(0,i.kt)("inlineCode",{parentName:"li"},"document"),"."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"strong"},"options.eventName"),":")," Event name or names. Default is ",(0,i.kt)("inlineCode",{parentName:"li"},'"mousedown"'),".")))),(0,i.kt)("h2",{id:"example"},"Example"),(0,i.kt)(u.Z,{mdxType:"ExampleBlock"},(0,i.kt)(p,{mdxType:"Example"})),(0,i.kt)(a.Z,{language:"tsx",mdxType:"CodeBlock"},'import React, { useRef, useState } from "react";\nimport { useClickOutside } from "@lilib/hooks";\n\nfunction Example() {\n  const buttonRef = useRef(null);\n  const [count, setCount] = useState(0);\n\n  useClickOutside(buttonRef, () => {\n    setCount(count + 1);\n  });\n\n  return (\n    <>\n      <button ref={buttonRef}>Click outside</button> Count: {count}\n    </>\n  );\n}\n\nexport default Example;\n'))}N.isMDXComponent=!0},62705:(e,t,n)=>{var r=n(55639).Symbol;e.exports=r},44239:(e,t,n)=>{var r=n(62705),o=n(89607),i=n(2333),a=r?r.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":a&&a in Object(e)?o(e):i(e)}},31957:(e,t,n)=>{var r="object"==typeof n.g&&n.g&&n.g.Object===Object&&n.g;e.exports=r},89607:(e,t,n)=>{var r=n(62705),o=Object.prototype,i=o.hasOwnProperty,a=o.toString,u=r?r.toStringTag:void 0;e.exports=function(e){var t=i.call(e,u),n=e[u];try{e[u]=void 0;var r=!0}catch(s){}var o=a.call(e);return r&&(t?e[u]=n:delete e[u]),o}},2333:e=>{var t=Object.prototype.toString;e.exports=function(e){return t.call(e)}},55639:(e,t,n)=>{var r=n(31957),o="object"==typeof self&&self&&self.Object===Object&&self,i=r||o||Function("return this")();e.exports=i},23560:(e,t,n)=>{var r=n(44239),o=n(13218);e.exports=function(e){if(!o(e))return!1;var t=r(e);return"[object Function]"==t||"[object GeneratorFunction]"==t||"[object AsyncFunction]"==t||"[object Proxy]"==t}},13218:e=>{e.exports=function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}}}]);