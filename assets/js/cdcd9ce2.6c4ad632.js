(self.webpackChunk_lilib_hooks=self.webpackChunk_lilib_hooks||[]).push([[6789],{7030:(e,t,n)=>{"use strict";n.d(t,{Z:()=>i});var r=n(7294);const o="exampleBlock_ywu8",i=e=>{let{children:t}=e;return r.createElement("div",{className:o},t)}},5150:(e,t,n)=>{"use strict";n.d(t,{Z:()=>c});var r=n(7294),o=n(8134);const i=function(e,t){for(var n=arguments.length,r=new Array(n>2?n-2:0),o=2;o<n;o++)r[o-2]=arguments[o];const i=[e,t,...r];if(arguments.length<2)throw new TypeError("The length of `areArraysEqual`'s params must be >= 2.");if(i.some((e=>!Array.isArray(e))))throw new TypeError("The params of `areArraysEqual` must be arrays.");const s=i[0],c=i.length;let u=!0;for(let a=1;a<c;a++)s!==i[a]&&(u=!1);if(u)return!0;for(let a=1;a<c;a++)if(s.length!==i[a].length)return!1;for(let a=1;a<c;a++){const e=i[a],t=s.length;for(let n=0;n<t;n++)if(!Object.is(s[n],e[n]))return!1}return!0};var s=n(7921);const c=function(e){return function(t,n,c){const u=(0,r.useRef)(!1),a=(0,r.useRef)([]),d=(0,r.useRef)([]),l=(0,r.useRef)();function f(){l.current?.()}e((()=>{const e=c.map(s.Z);function r(){a.current=n,d.current=e,l.current=t()}u.current?i(n,a.current)&&i(e,d.current)||(f(),r()):(r(),u.current=!0)})),(0,o.Z)((()=>{f(),u.current=!1}))}}},4259:(e,t,n)=>{"use strict";n.d(t,{Z:()=>a});var r=n(3218),o=n.n(r),i=n(4708),s=n(3809);const c=function(e){return!!e&&!!e.addEventListener&&!!e.removeEventListener};var u=n(7921);const a=function(e,t,n,r){let a,d,l;"boolean"==typeof r?a=r:o()(r)&&(void 0!==r.capture&&(a=!!r.capture),void 0!==r.once&&(d=!!r.once),void 0!==r.passive&&(l=!!r.passive));const f=(0,i.Z)(n);(0,s.Z)((()=>{const n=(0,u.Z)(e);if(c(n))return n.addEventListener(t,f,{capture:a,once:d,passive:l}),()=>{n.removeEventListener(t,f,{capture:a})}}),[t,a,d,l],[e])}},8242:(e,t,n)=>{"use strict";n.d(t,{Z:()=>o});var r=n(7294);const o=function(e){const t=(0,r.useRef)(e);return t.current=e,t}},4708:(e,t,n)=>{"use strict";n.d(t,{Z:()=>i});var r=n(7294),o=n(8242);const i=function(e){const t=(0,r.useRef)(),n=(0,o.Z)(e);return t.current||(t.current=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return n.current.apply(this,t)}),t.current}},3809:(e,t,n)=>{"use strict";n.d(t,{Z:()=>o});var r=n(7294);const o=(0,n(5150).Z)(r.useEffect)},8134:(e,t,n)=>{"use strict";n.d(t,{Z:()=>o});var r=n(7294);const o=function(e){const t=(0,r.useRef)(e);t.current=e,(0,r.useEffect)((()=>()=>{t.current()}),[])}},7921:(e,t,n)=>{"use strict";n.d(t,{Z:()=>u});var r=n(3218),o=n.n(r),i=n(3560),s=n.n(i),c=n(1665);const u=function(e){return c.Z?s()(e)?e():o()(e)&&"current"in e?e.current:e:null}},1665:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r=!("undefined"==typeof window||!window.document||!window.document.createElement)},9268:(e,t,n)=>{"use strict";n.r(t),n.d(t,{assets:()=>w,contentTitle:()=>h,default:()=>g,frontMatter:()=>f,metadata:()=>p,toc:()=>v});var r=n(7462),o=n(7294),i=n(3905),s=n(814),c=n(7030),u=n(4259),a=n(1665);const d=function(){const[{width:e,height:t},n]=(0,o.useState)((()=>a.Z?{width:window.innerWidth,height:window.innerHeight}:{width:void 0,height:void 0}));function r(){n({width:window.innerWidth,height:window.innerHeight})}return(0,u.Z)((()=>window),"resize",r),(0,u.Z)((()=>window),"orientationchange",r),(0,o.useDebugValue)({width:e,height:t}),{width:e,height:t}};const l=function(){const{width:e=0,height:t=0}=d();return o.createElement(o.Fragment,null,"Window size: ",JSON.stringify({width:e,height:t}))},f={},h=void 0,p={unversionedId:"useWindowSize",id:"useWindowSize",title:"useWindowSize",description:"Get window size.",source:"@site/docs/useWindowSize.mdx",sourceDirName:".",slug:"/useWindowSize",permalink:"/hooks/useWindowSize",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"useMatchMedia",permalink:"/hooks/useMatchMedia"},next:{title:"useElementSize",permalink:"/hooks/useElementSize"}},w={},v=[{value:"API",id:"api",level:2},{value:"Example",id:"example",level:2}],m={toc:v};function g(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Get window size."),(0,i.kt)("h2",{id:"api"},"API"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"function useWindowSize(): {\n  width: number | undefined;\n  height: number | undefined;\n};\n")),(0,i.kt)("h2",{id:"example"},"Example"),(0,i.kt)("p",null,"You can change the browser window size to see the effect."),(0,i.kt)(c.Z,{mdxType:"ExampleBlock"},(0,i.kt)(l,{mdxType:"Example"})),(0,i.kt)(s.Z,{language:"tsx",mdxType:"CodeBlock"},'import React from "react";\nimport { useWindowSize } from "@lilib/hooks";\n\nfunction Example() {\n  const { width = 0, height = 0 } = useWindowSize();\n\n  return <>Window size: {JSON.stringify({ width, height })}</>;\n}\n\nexport default Example;\n'))}g.isMDXComponent=!0},2705:(e,t,n)=>{var r=n(5639).Symbol;e.exports=r},4239:(e,t,n)=>{var r=n(2705),o=n(9607),i=n(2333),s=r?r.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":s&&s in Object(e)?o(e):i(e)}},1957:(e,t,n)=>{var r="object"==typeof n.g&&n.g&&n.g.Object===Object&&n.g;e.exports=r},9607:(e,t,n)=>{var r=n(2705),o=Object.prototype,i=o.hasOwnProperty,s=o.toString,c=r?r.toStringTag:void 0;e.exports=function(e){var t=i.call(e,c),n=e[c];try{e[c]=void 0;var r=!0}catch(u){}var o=s.call(e);return r&&(t?e[c]=n:delete e[c]),o}},2333:e=>{var t=Object.prototype.toString;e.exports=function(e){return t.call(e)}},5639:(e,t,n)=>{var r=n(1957),o="object"==typeof self&&self&&self.Object===Object&&self,i=r||o||Function("return this")();e.exports=i},3560:(e,t,n)=>{var r=n(4239),o=n(3218);e.exports=function(e){if(!o(e))return!1;var t=r(e);return"[object Function]"==t||"[object GeneratorFunction]"==t||"[object AsyncFunction]"==t||"[object Proxy]"==t}},3218:e=>{e.exports=function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}}}]);