(self.webpackChunk_lilib_hooks=self.webpackChunk_lilib_hooks||[]).push([[310],{5122:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r=function(e,t){for(var n=arguments.length,r=new Array(n>2?n-2:0),o=2;o<n;o++)r[o-2]=arguments[o];var c=[e,t].concat(r);if(arguments.length<2)throw new TypeError("The length of `areArraysEqual`'s params must be >= 2.");if(c.some((function(e){return!Array.isArray(e)})))throw new TypeError("The params of `areArraysEqual` must be arrays.");for(var u=c[0],s=c.length,i=!0,a=1;a<s;a++)u!==c[a]&&(i=!1);if(i)return!0;for(var l=1;l<s;l++)if(u.length!==c[l].length)return!1;for(var f=1;f<s;f++)for(var p=c[f],d=u.length,v=0;v<d;v++)if(!Object.is(u[v],p[v]))return!1;return!0}},45153:(e,t,n)=>{"use strict";n.d(t,{Z:()=>i});var r=n(13218),o=n.n(r),c=n(23560),u=n.n(c),s=n(64635);const i=function(e){return s.Z?u()(e)?e():o()(e)&&"current"in e?e.current:e:null}},64635:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r=!("undefined"==typeof window||!window.document||!window.document.createElement)},48332:(e,t,n)=>{"use strict";n.d(t,{Z:()=>s});var r=n(67294),o=n(45153),c=n(5122),u=n(58134);const s=function(e){return function(t,n,s){const i=(0,r.useRef)(!1),a=(0,r.useRef)([]),l=(0,r.useRef)([]),f=(0,r.useRef)();function p(){f.current?.()}e((()=>{const e=s.map(o.Z);function r(){a.current=n,l.current=e,f.current=t()}i.current?(0,c.Z)(n,a.current)&&(0,c.Z)(e,l.current)||(p(),r()):(r(),i.current=!0)})),(0,u.Z)((()=>{p(),i.current=!1}))}}},27078:(e,t,n)=>{"use strict";n.d(t,{Z:()=>a});var r=n(13218),o=n.n(r),c=n(45153);const u=function(e){return!!e&&!!e.addEventListener&&!!e.removeEventListener};var s=n(14708),i=n(63809);const a=function(e,t,n,r){let a,l,f;"boolean"==typeof r?a=r:o()(r)&&(void 0!==r.capture&&(a=!!r.capture),void 0!==r.once&&(l=!!r.once),void 0!==r.passive&&(f=!!r.passive));const p=(0,s.Z)(n);(0,i.Z)((()=>{const n=(0,c.Z)(e);if(u(n))return n.addEventListener(t,p,{capture:a,once:l,passive:f}),()=>{n.removeEventListener(t,p,{capture:a})}}),[t,a,l,f],[e])}},14708:(e,t,n)=>{"use strict";n.d(t,{Z:()=>c});var r=n(67294),o=n(58242);const c=function(e){const t=(0,r.useRef)(),n=(0,o.Z)(e);return t.current||(t.current=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return n.current.apply(this,t)}),t.current}},75912:(e,t,n)=>{"use strict";n.d(t,{Z:()=>u});var r=n(67294),o=n(14708),c=n(72767);const u=function(e){const t=(0,c.Z)(),[n,u]=(0,r.useState)(e);return[n,(0,o.Z)((e=>{t.current||u(e)}))]}},63809:(e,t,n)=>{"use strict";n.d(t,{Z:()=>o});var r=n(67294);const o=(0,n(48332).Z)(r.useEffect)},58134:(e,t,n)=>{"use strict";n.d(t,{Z:()=>o});var r=n(67294);const o=function(e){const t=(0,r.useRef)(e);t.current=e,(0,r.useEffect)((()=>()=>{t.current()}),[])}},72767:(e,t,n)=>{"use strict";n.d(t,{Z:()=>o});var r=n(67294);const o=function(){const e=(0,r.useRef)(!1);return(0,r.useEffect)((()=>(e.current=!1,()=>{e.current=!0})),[]),e}},46969:(e,t,n)=>{"use strict";n.r(t),n.d(t,{assets:()=>h,contentTitle:()=>v,default:()=>b,frontMatter:()=>d,metadata:()=>m,toc:()=>k});var r=n(87462),o=n(67294),c=n(3905),u=n(90814),s=n(67030),i=n(64635),a=n(75912),l=n(27078);const f=function(){const[e,t]=(0,a.Z)((()=>!i.Z||window.navigator.onLine)),n=()=>{t(window.navigator.onLine)};return(0,l.Z)((()=>window),"online",n),(0,l.Z)((()=>window),"offline",n),(0,o.useDebugValue)(e),e};const p=function(){const e=f();return o.createElement(o.Fragment,null,"The network is: ",e?"online":"offline")},d={},v=void 0,m={unversionedId:"useOnline",id:"useOnline",title:"useOnline",description:"Detect whether the network is online.",source:"@site/docs/useOnline.mdx",sourceDirName:".",slug:"/useOnline",permalink:"/hooks/useOnline",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"useFavicon",permalink:"/hooks/useFavicon"},next:{title:"useDarkMode",permalink:"/hooks/useDarkMode"}},h={},k=[{value:"API",id:"api",level:2},{value:"Example",id:"example",level:2}],w={toc:k};function b(e){let{components:t,...n}=e;return(0,c.kt)("wrapper",(0,r.Z)({},w,n,{components:t,mdxType:"MDXLayout"}),(0,c.kt)("p",null,"Detect whether the network is online."),(0,c.kt)("h2",{id:"api"},"API"),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre",className:"language-ts"},"function useOnline(): boolean;\n")),(0,c.kt)("h2",{id:"example"},"Example"),(0,c.kt)(s.Z,{mdxType:"ExampleBlock"},(0,c.kt)(p,{mdxType:"Example"})),(0,c.kt)(u.Z,{language:"tsx",mdxType:"CodeBlock"},'import React from "react";\nimport { useOnline } from "@lilib/hooks";\n\nfunction Example() {\n  const online = useOnline();\n  return <>The network is: {online ? "online" : "offline"}</>;\n}\n\nexport default Example;\n'))}b.isMDXComponent=!0},62705:(e,t,n)=>{var r=n(55639).Symbol;e.exports=r},44239:(e,t,n)=>{var r=n(62705),o=n(89607),c=n(2333),u=r?r.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":u&&u in Object(e)?o(e):c(e)}},31957:(e,t,n)=>{var r="object"==typeof n.g&&n.g&&n.g.Object===Object&&n.g;e.exports=r},89607:(e,t,n)=>{var r=n(62705),o=Object.prototype,c=o.hasOwnProperty,u=o.toString,s=r?r.toStringTag:void 0;e.exports=function(e){var t=c.call(e,s),n=e[s];try{e[s]=void 0;var r=!0}catch(i){}var o=u.call(e);return r&&(t?e[s]=n:delete e[s]),o}},2333:e=>{var t=Object.prototype.toString;e.exports=function(e){return t.call(e)}},55639:(e,t,n)=>{var r=n(31957),o="object"==typeof self&&self&&self.Object===Object&&self,c=r||o||Function("return this")();e.exports=c},23560:(e,t,n)=>{var r=n(44239),o=n(13218);e.exports=function(e){if(!o(e))return!1;var t=r(e);return"[object Function]"==t||"[object GeneratorFunction]"==t||"[object AsyncFunction]"==t||"[object Proxy]"==t}},13218:e=>{e.exports=function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}}}]);