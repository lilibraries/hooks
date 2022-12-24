(self.webpackChunk_lilib_hooks=self.webpackChunk_lilib_hooks||[]).push([[4734],{67030:(e,t,n)=>{"use strict";n.d(t,{Z:()=>o});var r=n(67294);const a="exampleBlock_ywu8",o=e=>{let{children:t}=e;return r.createElement("div",{className:a},t)}},58242:(e,t,n)=>{"use strict";n.d(t,{Z:()=>a});var r=n(67294);const a=function(e){const t=(0,r.useRef)(e);return t.current=e,t}},14708:(e,t,n)=>{"use strict";n.d(t,{Z:()=>o});var r=n(67294),a=n(58242);const o=function(e){const t=(0,r.useRef)(),n=(0,a.Z)(e);return t.current||(t.current=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return n.current.apply(this,t)}),t.current}},75912:(e,t,n)=>{"use strict";n.d(t,{Z:()=>i});var r=n(67294),a=n(14708),o=n(72767);const i=function(e){const t=(0,o.Z)(),[n,i]=(0,r.useState)(e);return[n,(0,a.Z)((e=>{t.current||i(e)}))]}},12230:(e,t,n)=>{"use strict";n.d(t,{Z:()=>p});var r=n(67294),a=n(13218),o=n.n(a),i=n(23493),l=n.n(i),u=n(14708),s=n(58134),c=n(58242);const p=function(e,t){let n=0,a=!1,i=!0;"number"==typeof t?n=t:o()(t)&&(void 0!==t.wait&&(n=+t.wait),void 0!==t.leading&&(a=!!t.leading),void 0!==t.trailing&&(i=!!t.trailing));const p=(0,c.Z)(e),f=(0,r.useRef)();(0,r.useMemo)((()=>{f.current?.flush(),f.current=l()((function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return p.current.apply(this,t)}),n,{leading:a,trailing:i})}),[n,a,i]);const d=(0,u.Z)((function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return f.current?.apply(this,t)})),m=(0,u.Z)((()=>f.current?.flush())),v=(0,u.Z)((()=>{f.current?.cancel()}));return(0,s.Z)(v),[d,{flush:m,cancel:v}]}},58134:(e,t,n)=>{"use strict";n.d(t,{Z:()=>a});var r=n(67294);const a=function(e){const t=(0,r.useRef)(e);t.current=e,(0,r.useEffect)((()=>()=>{t.current()}),[])}},72767:(e,t,n)=>{"use strict";n.d(t,{Z:()=>a});var r=n(67294);const a=function(){const e=(0,r.useRef)(!1);return(0,r.useEffect)((()=>(e.current=!1,()=>{e.current=!0})),[]),e}},72844:(e,t,n)=>{"use strict";n.d(t,{Z:()=>o});var r=n(67294),a=n(58134);const o=function(e){return function(t,n){const o=(0,r.useRef)(!1);e((()=>{if(o.current)return t();o.current=!0}),n),(0,a.Z)((()=>{o.current=!1}))}}(r.useEffect)},90691:(e,t,n)=>{"use strict";n.r(t),n.d(t,{assets:()=>k,contentTitle:()=>g,default:()=>b,frontMatter:()=>v,metadata:()=>h,toc:()=>N});var r=n(87462),a=n(67294),o=n(3905),i=n(90814),l=n(67030),u=n(72844),s=n(14708),c=n(75912),p=n(58242),f=n(12230);const d=function(e,t){const n=(0,p.Z)(e),[r,o]=(0,c.Z)(e),[i,{cancel:l}]=(0,f.Z)(o,t),d=(0,s.Z)((function(e){l(),o(arguments.length>0?e:n.current)}));return(0,u.Z)((()=>{i(e)}),[e]),(0,a.useDebugValue)(r),[r,{flush:d,cancel:l}]};const m=function(){const[e,t]=(0,a.useState)(""),[n]=d(e,500);return a.createElement(a.Fragment,null,a.createElement("p",null,"Enter value:"," ",a.createElement("input",{value:e,onChange:e=>{t(e.target.value)}})),a.createElement("div",null,"Throttled value: ",n))},v={},g=void 0,h={unversionedId:"useThrottledValue",id:"useThrottledValue",title:"useThrottledValue",description:"Throttle a value.",source:"@site/docs/useThrottledValue.mdx",sourceDirName:".",slug:"/useThrottledValue",permalink:"/hooks/useThrottledValue",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"useMemoizedValue",permalink:"/hooks/useMemoizedValue"},next:{title:"useDebouncedValue",permalink:"/hooks/useDebouncedValue"}},k={},N=[{value:"API",id:"api",level:2},{value:"Example",id:"example",level:2}],x={toc:N};function b(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},x,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Throttle a value."),(0,o.kt)("h2",{id:"api"},"API"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"function useThrottledValue<T>(\n  value: T,\n  options?: number | { wait?: number; leading?: boolean; trailing?: boolean }\n): [\n  throttledValue: T,\n  actions: {\n    flush: (finalValue?: T) => void;\n    cancel: () => void;\n  }\n];\n")),(0,o.kt)("p",null,"Params:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"value"),":")," A value that will be throttled."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"options"),":")," Throttle wait time or an options object.",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"options.wait"),":")," Throttle wait time, in milliseconds. Default is ",(0,o.kt)("inlineCode",{parentName:"li"},"0"),"."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"options.leading"),":")," Change throttled value on the leading edge. Default is ",(0,o.kt)("inlineCode",{parentName:"li"},"false"),"."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"options.trailing"),":")," Change throttled value on the trailing edge. Default is ",(0,o.kt)("inlineCode",{parentName:"li"},"true"),".")))),(0,o.kt)("p",null,"Results:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"throttledValue"),":")," Throttled value."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"actions"),":")," Actions object.",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"actions.flush"),":")," Flush funciton. The ",(0,o.kt)("inlineCode",{parentName:"li"},"finalValue")," will be returned as ",(0,o.kt)("inlineCode",{parentName:"li"},"throttledValue")," if it is specified."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"actions.cancel"),":")," Cancel throttle timer.")))),(0,o.kt)("h2",{id:"example"},"Example"),(0,o.kt)(l.Z,{mdxType:"ExampleBlock"},(0,o.kt)(m,{mdxType:"Example"})),(0,o.kt)(i.Z,{language:"tsx",mdxType:"CodeBlock"},'import React, { useState } from "react";\nimport { useThrottledValue } from "@lilib/hooks";\n\nfunction Example() {\n  const [value, setValue] = useState("");\n  const [throttledValue] = useThrottledValue(value, 500);\n\n  return (\n    <>\n      <p>\n        Enter value:{" "}\n        <input\n          value={value}\n          onChange={(event) => {\n            setValue(event.target.value);\n          }}\n        />\n      </p>\n      <div>Throttled value: {throttledValue}</div>\n    </>\n  );\n}\n\nexport default Example;\n'))}b.isMDXComponent=!0},62705:(e,t,n)=>{var r=n(55639).Symbol;e.exports=r},44239:(e,t,n)=>{var r=n(62705),a=n(89607),o=n(2333),i=r?r.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":i&&i in Object(e)?a(e):o(e)}},27561:(e,t,n)=>{var r=n(67990),a=/^\s+/;e.exports=function(e){return e?e.slice(0,r(e)+1).replace(a,""):e}},31957:(e,t,n)=>{var r="object"==typeof n.g&&n.g&&n.g.Object===Object&&n.g;e.exports=r},89607:(e,t,n)=>{var r=n(62705),a=Object.prototype,o=a.hasOwnProperty,i=a.toString,l=r?r.toStringTag:void 0;e.exports=function(e){var t=o.call(e,l),n=e[l];try{e[l]=void 0;var r=!0}catch(u){}var a=i.call(e);return r&&(t?e[l]=n:delete e[l]),a}},2333:e=>{var t=Object.prototype.toString;e.exports=function(e){return t.call(e)}},55639:(e,t,n)=>{var r=n(31957),a="object"==typeof self&&self&&self.Object===Object&&self,o=r||a||Function("return this")();e.exports=o},67990:e=>{var t=/\s/;e.exports=function(e){for(var n=e.length;n--&&t.test(e.charAt(n)););return n}},23279:(e,t,n)=>{var r=n(13218),a=n(7771),o=n(14841),i=Math.max,l=Math.min;e.exports=function(e,t,n){var u,s,c,p,f,d,m=0,v=!1,g=!1,h=!0;if("function"!=typeof e)throw new TypeError("Expected a function");function k(t){var n=u,r=s;return u=s=void 0,m=t,p=e.apply(r,n)}function N(e){return m=e,f=setTimeout(b,t),v?k(e):p}function x(e){var n=e-d;return void 0===d||n>=t||n<0||g&&e-m>=c}function b(){var e=a();if(x(e))return T(e);f=setTimeout(b,function(e){var n=t-(e-d);return g?l(n,c-(e-m)):n}(e))}function T(e){return f=void 0,h&&u?k(e):(u=s=void 0,p)}function y(){var e=a(),n=x(e);if(u=arguments,s=this,d=e,n){if(void 0===f)return N(d);if(g)return clearTimeout(f),f=setTimeout(b,t),k(d)}return void 0===f&&(f=setTimeout(b,t)),p}return t=o(t)||0,r(n)&&(v=!!n.leading,c=(g="maxWait"in n)?i(o(n.maxWait)||0,t):c,h="trailing"in n?!!n.trailing:h),y.cancel=function(){void 0!==f&&clearTimeout(f),m=0,u=d=s=f=void 0},y.flush=function(){return void 0===f?p:T(a())},y}},13218:e=>{e.exports=function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}},37005:e=>{e.exports=function(e){return null!=e&&"object"==typeof e}},33448:(e,t,n)=>{var r=n(44239),a=n(37005);e.exports=function(e){return"symbol"==typeof e||a(e)&&"[object Symbol]"==r(e)}},7771:(e,t,n)=>{var r=n(55639);e.exports=function(){return r.Date.now()}},23493:(e,t,n)=>{var r=n(23279),a=n(13218);e.exports=function(e,t,n){var o=!0,i=!0;if("function"!=typeof e)throw new TypeError("Expected a function");return a(n)&&(o="leading"in n?!!n.leading:o,i="trailing"in n?!!n.trailing:i),r(e,t,{leading:o,maxWait:t,trailing:i})}},14841:(e,t,n)=>{var r=n(27561),a=n(13218),o=n(33448),i=/^[-+]0x[0-9a-f]+$/i,l=/^0b[01]+$/i,u=/^0o[0-7]+$/i,s=parseInt;e.exports=function(e){if("number"==typeof e)return e;if(o(e))return NaN;if(a(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=a(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=r(e);var n=l.test(e);return n||u.test(e)?s(e.slice(2),n?2:8):i.test(e)?NaN:+e}}}]);