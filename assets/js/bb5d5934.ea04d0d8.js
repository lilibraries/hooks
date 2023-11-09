(self.webpackChunk_lilib_hooks=self.webpackChunk_lilib_hooks||[]).push([[4734],{63339:(e,t,n)=>{"use strict";n.d(t,{Z:()=>o});var r=n(59496),a=n(63484);const o=function(e){const t=(0,r.useRef)(),n=(0,a.Z)(e);return t.current||(t.current=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return n.current.apply(this,t)}),t.current}},20584:(e,t,n)=>{"use strict";n.d(t,{Z:()=>i});var r=n(59496),a=n(63339),o=n(23095);const i=function(e){const t=(0,o.Z)(),[n,i]=(0,r.useState)(e);return[n,(0,a.Z)((e=>{t.current||i(e)}))]}},43023:(e,t,n)=>{"use strict";n.d(t,{Z:()=>p});var r=n(59496),a=n(36838),o=n.n(a),i=n(38209),l=n.n(i),u=n(63339),s=n(89258),c=n(63484);const p=function(e,t){let n=0,a=!1,i=!0;"number"==typeof t?n=t:o()(t)&&(void 0!==t.wait&&(n=+t.wait),void 0!==t.leading&&(a=!!t.leading),void 0!==t.trailing&&(i=!!t.trailing));const p=(0,c.Z)(e),f=(0,r.useRef)();(0,r.useMemo)((()=>{f.current?.flush(),f.current=l()((function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return p.current.apply(this,t)}),n,{leading:a,trailing:i})}),[n,a,i]);const d=(0,u.Z)((function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return f.current?.apply(this,t)})),m=(0,u.Z)((()=>f.current?.flush())),v=(0,u.Z)((()=>{f.current?.cancel()}));return(0,s.Z)(v),[d,{flush:m,cancel:v}]}},89258:(e,t,n)=>{"use strict";n.d(t,{Z:()=>a});var r=n(59496);const a=function(e){const t=(0,r.useRef)(e);t.current=e,(0,r.useEffect)((()=>()=>{t.current()}),[])}},23095:(e,t,n)=>{"use strict";n.d(t,{Z:()=>a});var r=n(59496);const a=function(){const e=(0,r.useRef)(!1);return(0,r.useEffect)((()=>(e.current=!1,()=>{e.current=!0})),[]),e}},50054:(e,t,n)=>{"use strict";n.d(t,{Z:()=>o});var r=n(59496),a=n(89258);const o=function(e){return function(t,n){const o=(0,r.useRef)(!1);e((()=>{if(o.current)return t();o.current=!0}),n),(0,a.Z)((()=>{o.current=!1}))}}(r.useEffect)},91152:(e,t,n)=>{"use strict";n.r(t),n.d(t,{assets:()=>k,contentTitle:()=>g,default:()=>b,frontMatter:()=>v,metadata:()=>h,toc:()=>N});var r=n(96600),a=n(59496),o=n(49613),i=n(65836),l=n(68892),u=n(50054),s=n(63339),c=n(20584),p=n(63484),f=n(43023);const d=function(e,t){const n=(0,p.Z)(e),[r,o]=(0,c.Z)(e),[i,{cancel:l}]=(0,f.Z)(o,t),d=(0,s.Z)((function(e){l(),o(arguments.length>0?e:n.current)}));return(0,u.Z)((()=>{i(e)}),[e]),(0,a.useDebugValue)(r),[r,{flush:d,cancel:l}]};const m=function(){const[e,t]=(0,a.useState)(""),[n]=d(e,500);return a.createElement(a.Fragment,null,a.createElement("p",null,"Enter value:"," ",a.createElement("input",{value:e,onChange:e=>{t(e.target.value)}})),a.createElement("div",null,"Throttled value: ",n))},v={},g=void 0,h={unversionedId:"useThrottledValue",id:"useThrottledValue",title:"useThrottledValue",description:"Throttle a value.",source:"@site/docs/useThrottledValue.mdx",sourceDirName:".",slug:"/useThrottledValue",permalink:"/hooks/useThrottledValue",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"useMemoizedValue",permalink:"/hooks/useMemoizedValue"},next:{title:"useDebouncedValue",permalink:"/hooks/useDebouncedValue"}},k={},N=[{value:"API",id:"api",level:2},{value:"Example",id:"example",level:2}],x={toc:N};function b(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},x,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Throttle a value."),(0,o.kt)("h2",{id:"api"},"API"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"function useThrottledValue<T>(\n  value: T,\n  options?: number | { wait?: number; leading?: boolean; trailing?: boolean }\n): [\n  throttledValue: T,\n  actions: {\n    flush: (finalValue?: T) => void;\n    cancel: () => void;\n  }\n];\n")),(0,o.kt)("p",null,"Params:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"value"),":")," A value that will be throttled."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"options"),":")," Throttle wait time or an options object.",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"options.wait"),":")," Throttle wait time, in milliseconds. Default is ",(0,o.kt)("inlineCode",{parentName:"li"},"0"),"."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"options.leading"),":")," Change throttled value on the leading edge. Default is ",(0,o.kt)("inlineCode",{parentName:"li"},"false"),"."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"options.trailing"),":")," Change throttled value on the trailing edge. Default is ",(0,o.kt)("inlineCode",{parentName:"li"},"true"),".")))),(0,o.kt)("p",null,"Results:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"throttledValue"),":")," Throttled value."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"actions"),":")," Actions object.",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"actions.flush"),":")," Flush funciton. The ",(0,o.kt)("inlineCode",{parentName:"li"},"finalValue")," will be returned as ",(0,o.kt)("inlineCode",{parentName:"li"},"throttledValue")," if it is specified."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"actions.cancel"),":")," Cancel throttle timer.")))),(0,o.kt)("h2",{id:"example"},"Example"),(0,o.kt)(l.Z,{mdxType:"ExampleBlock"},(0,o.kt)(m,{mdxType:"Example"})),(0,o.kt)(i.Z,{language:"tsx",mdxType:"CodeBlock"},'import React, { useState } from "react";\nimport { useThrottledValue } from "@lilib/hooks";\n\nfunction Example() {\n  const [value, setValue] = useState("");\n  const [throttledValue] = useThrottledValue(value, 500);\n\n  return (\n    <>\n      <p>\n        Enter value:{" "}\n        <input\n          value={value}\n          onChange={(event) => {\n            setValue(event.target.value);\n          }}\n        />\n      </p>\n      <div>Throttled value: {throttledValue}</div>\n    </>\n  );\n}\n\nexport default Example;\n'))}b.isMDXComponent=!0},74396:(e,t,n)=>{var r=n(29165).Symbol;e.exports=r},80732:(e,t,n)=>{var r=n(74396),a=n(31239),o=n(57058),i=r?r.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":i&&i in Object(e)?a(e):o(e)}},33124:(e,t,n)=>{var r=n(82996),a=/^\s+/;e.exports=function(e){return e?e.slice(0,r(e)+1).replace(a,""):e}},96476:(e,t,n)=>{var r="object"==typeof n.g&&n.g&&n.g.Object===Object&&n.g;e.exports=r},31239:(e,t,n)=>{var r=n(74396),a=Object.prototype,o=a.hasOwnProperty,i=a.toString,l=r?r.toStringTag:void 0;e.exports=function(e){var t=o.call(e,l),n=e[l];try{e[l]=void 0;var r=!0}catch(u){}var a=i.call(e);return r&&(t?e[l]=n:delete e[l]),a}},57058:e=>{var t=Object.prototype.toString;e.exports=function(e){return t.call(e)}},29165:(e,t,n)=>{var r=n(96476),a="object"==typeof self&&self&&self.Object===Object&&self,o=r||a||Function("return this")();e.exports=o},82996:e=>{var t=/\s/;e.exports=function(e){for(var n=e.length;n--&&t.test(e.charAt(n)););return n}},66292:(e,t,n)=>{var r=n(36838),a=n(76668),o=n(12448),i=Math.max,l=Math.min;e.exports=function(e,t,n){var u,s,c,p,f,d,m=0,v=!1,g=!1,h=!0;if("function"!=typeof e)throw new TypeError("Expected a function");function k(t){var n=u,r=s;return u=s=void 0,m=t,p=e.apply(r,n)}function N(e){return m=e,f=setTimeout(b,t),v?k(e):p}function x(e){var n=e-d;return void 0===d||n>=t||n<0||g&&e-m>=c}function b(){var e=a();if(x(e))return T(e);f=setTimeout(b,function(e){var n=t-(e-d);return g?l(n,c-(e-m)):n}(e))}function T(e){return f=void 0,h&&u?k(e):(u=s=void 0,p)}function y(){var e=a(),n=x(e);if(u=arguments,s=this,d=e,n){if(void 0===f)return N(d);if(g)return clearTimeout(f),f=setTimeout(b,t),k(d)}return void 0===f&&(f=setTimeout(b,t)),p}return t=o(t)||0,r(n)&&(v=!!n.leading,c=(g="maxWait"in n)?i(o(n.maxWait)||0,t):c,h="trailing"in n?!!n.trailing:h),y.cancel=function(){void 0!==f&&clearTimeout(f),m=0,u=d=s=f=void 0},y.flush=function(){return void 0===f?p:T(a())},y}},36838:e=>{e.exports=function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}},55073:e=>{e.exports=function(e){return null!=e&&"object"==typeof e}},16764:(e,t,n)=>{var r=n(80732),a=n(55073);e.exports=function(e){return"symbol"==typeof e||a(e)&&"[object Symbol]"==r(e)}},76668:(e,t,n)=>{var r=n(29165);e.exports=function(){return r.Date.now()}},38209:(e,t,n)=>{var r=n(66292),a=n(36838);e.exports=function(e,t,n){var o=!0,i=!0;if("function"!=typeof e)throw new TypeError("Expected a function");return a(n)&&(o="leading"in n?!!n.leading:o,i="trailing"in n?!!n.trailing:i),r(e,t,{leading:o,maxWait:t,trailing:i})}},12448:(e,t,n)=>{var r=n(33124),a=n(36838),o=n(16764),i=/^[-+]0x[0-9a-f]+$/i,l=/^0b[01]+$/i,u=/^0o[0-7]+$/i,s=parseInt;e.exports=function(e){if("number"==typeof e)return e;if(o(e))return NaN;if(a(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=a(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=r(e);var n=l.test(e);return n||u.test(e)?s(e.slice(2),n?2:8):i.test(e)?NaN:+e}}}]);