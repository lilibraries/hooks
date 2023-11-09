(self.webpackChunk_lilib_hooks=self.webpackChunk_lilib_hooks||[]).push([[2416],{53364:(e,t,r)=>{"use strict";r.d(t,{Z:()=>n});const n=function(e,t){for(var r=arguments.length,n=new Array(r>2?r-2:0),o=2;o<r;o++)n[o-2]=arguments[o];var s=[e,t].concat(n);if(arguments.length<2)throw new TypeError("The length of `areArraysEqual`'s params must be >= 2.");if(s.some((function(e){return!Array.isArray(e)})))throw new TypeError("The params of `areArraysEqual` must be arrays.");for(var c=s[0],u=s.length,a=!0,i=1;i<u;i++)c!==s[i]&&(a=!1);if(a)return!0;for(var l=1;l<u;l++)if(c.length!==s[l].length)return!1;for(var f=1;f<u;f++)for(var d=s[f],p=c.length,m=0;m<p;m++)if(!Object.is(c[m],d[m]))return!1;return!0}},7207:(e,t,r)=>{"use strict";r.d(t,{Z:()=>a});var n=r(36838),o=r.n(n),s=r(92042),c=r.n(s),u=r(44622);const a=function(e){return u.Z?c()(e)?e():o()(e)&&"current"in e?e.current:e:null}},44622:(e,t,r)=>{"use strict";r.d(t,{Z:()=>n});const n=!("undefined"==typeof window||!window.document||!window.document.createElement)},25325:(e,t,r)=>{"use strict";r.d(t,{Z:()=>u});var n=r(59496),o=r(7207),s=r(53364),c=r(89258);const u=function(e){return function(t,r,u){const a=(0,n.useRef)(!1),i=(0,n.useRef)([]),l=(0,n.useRef)([]),f=(0,n.useRef)();function d(){f.current?.()}e((()=>{const e=u.map(o.Z);function n(){i.current=r,l.current=e,f.current=t()}a.current?(0,s.Z)(r,i.current)&&(0,s.Z)(e,l.current)||(d(),n()):(n(),a.current=!0)})),(0,c.Z)((()=>{d(),a.current=!1}))}}},67390:(e,t,r)=>{"use strict";r.d(t,{Z:()=>i});var n=r(36838),o=r.n(n),s=r(7207);const c=function(e){return!!e&&!!e.addEventListener&&!!e.removeEventListener};var u=r(63339),a=r(44088);const i=function(e,t,r,n){let i,l,f;"boolean"==typeof n?i=n:o()(n)&&(void 0!==n.capture&&(i=!!n.capture),void 0!==n.once&&(l=!!n.once),void 0!==n.passive&&(f=!!n.passive));const d=(0,u.Z)(r);(0,a.Z)((()=>{const r=(0,s.Z)(e);if(c(r))return r.addEventListener(t,d,{capture:i,once:l,passive:f}),()=>{r.removeEventListener(t,d,{capture:i})}}),[t,i,l,f],[e])}},15163:(e,t,r)=>{"use strict";r.d(t,{Z:()=>u});var n=r(59496),o=r(44622),s=r(50054),c=r(67390);const u=function(e,t){const r=(0,n.useMemo)((()=>o.Z?window.matchMedia(e):null),[e]),[u,a]=(0,n.useState)(r?r.matches:!!t);return(0,s.Z)((()=>{a(r?r.matches:!!t)}),[r]),(0,c.Z)(r,"change",(e=>{a(e.matches)})),(0,n.useDebugValue)(e+" is "+u),u}},63339:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s});var n=r(59496),o=r(63484);const s=function(e){const t=(0,n.useRef)(),r=(0,o.Z)(e);return t.current||(t.current=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return r.current.apply(this,t)}),t.current}},44088:(e,t,r)=>{"use strict";r.d(t,{Z:()=>o});var n=r(59496);const o=(0,r(25325).Z)(n.useEffect)},89258:(e,t,r)=>{"use strict";r.d(t,{Z:()=>o});var n=r(59496);const o=function(e){const t=(0,n.useRef)(e);t.current=e,(0,n.useEffect)((()=>()=>{t.current()}),[])}},50054:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s});var n=r(59496),o=r(89258);const s=function(e){return function(t,r){const s=(0,n.useRef)(!1);e((()=>{if(s.current)return t();s.current=!0}),r),(0,o.Z)((()=>{s.current=!1}))}}(n.useEffect)},21796:(e,t,r)=>{"use strict";r.r(t),r.d(t,{assets:()=>m,contentTitle:()=>d,default:()=>k,frontMatter:()=>f,metadata:()=>p,toc:()=>v});var n=r(96600),o=r(59496),s=r(49613),c=r(65836),u=r(68892),a=r(15163);const i=function(){const e=(0,a.Z)("(prefers-color-scheme: dark)");return(0,o.useDebugValue)(e),e};const l=function(){const e=i();return o.createElement(o.Fragment,null,"Is dark mode: ",e.toString())},f={},d=void 0,p={unversionedId:"useDarkMode",id:"useDarkMode",title:"useDarkMode",description:"Detect whether the preferred color mode of the system is dark.",source:"@site/docs/useDarkMode.mdx",sourceDirName:".",slug:"/useDarkMode",permalink:"/hooks/useDarkMode",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"useOnline",permalink:"/hooks/useOnline"},next:{title:"usePageVisible",permalink:"/hooks/usePageVisible"}},m={},v=[{value:"API",id:"api",level:2},{value:"Example",id:"example",level:2}],h={toc:v};function k(e){let{components:t,...r}=e;return(0,s.kt)("wrapper",(0,n.Z)({},h,r,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("p",null,"Detect whether the preferred color mode of the system is dark."),(0,s.kt)("h2",{id:"api"},"API"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-ts"},"function useDarkMode(): boolean;\n")),(0,s.kt)("h2",{id:"example"},"Example"),(0,s.kt)(u.Z,{mdxType:"ExampleBlock"},(0,s.kt)(l,{mdxType:"Example"})),(0,s.kt)(c.Z,{language:"tsx",mdxType:"CodeBlock"},'import React from "react";\nimport { useDarkMode } from "@lilib/hooks";\n\nfunction Example() {\n  const isDarkMode = useDarkMode();\n  return <>Is dark mode: {isDarkMode.toString()}</>;\n}\n\nexport default Example;\n'))}k.isMDXComponent=!0},74396:(e,t,r)=>{var n=r(29165).Symbol;e.exports=n},80732:(e,t,r)=>{var n=r(74396),o=r(31239),s=r(57058),c=n?n.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":c&&c in Object(e)?o(e):s(e)}},96476:(e,t,r)=>{var n="object"==typeof r.g&&r.g&&r.g.Object===Object&&r.g;e.exports=n},31239:(e,t,r)=>{var n=r(74396),o=Object.prototype,s=o.hasOwnProperty,c=o.toString,u=n?n.toStringTag:void 0;e.exports=function(e){var t=s.call(e,u),r=e[u];try{e[u]=void 0;var n=!0}catch(a){}var o=c.call(e);return n&&(t?e[u]=r:delete e[u]),o}},57058:e=>{var t=Object.prototype.toString;e.exports=function(e){return t.call(e)}},29165:(e,t,r)=>{var n=r(96476),o="object"==typeof self&&self&&self.Object===Object&&self,s=n||o||Function("return this")();e.exports=s},92042:(e,t,r)=>{var n=r(80732),o=r(36838);e.exports=function(e){if(!o(e))return!1;var t=n(e);return"[object Function]"==t||"[object GeneratorFunction]"==t||"[object AsyncFunction]"==t||"[object Proxy]"==t}},36838:e=>{e.exports=function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}}}]);