(self.webpackChunk_lilib_hooks=self.webpackChunk_lilib_hooks||[]).push([[915],{63339:(t,e,n)=>{"use strict";n.d(e,{Z:()=>a});var o=n(59496),r=n(63484);const a=function(t){const e=(0,o.useRef)(),n=(0,r.Z)(t);return e.current||(e.current=function(){for(var t=arguments.length,e=new Array(t),o=0;o<t;o++)e[o]=arguments[o];return n.current.apply(this,e)}),e.current}},20584:(t,e,n)=>{"use strict";n.d(e,{Z:()=>c});var o=n(59496),r=n(63339),a=n(23095);const c=function(t){const e=(0,a.Z)(),[n,c]=(0,o.useState)(t);return[n,(0,r.Z)((t=>{e.current||c(t)}))]}},1329:(t,e,n)=>{"use strict";n.d(e,{Z:()=>s});var o=n(92042),r=n.n(o),a=n(63339),c=n(20584);const s=function(t){const[e,n]=(0,c.Z)(t);return[e,(0,a.Z)((t=>{n((e=>{const n=r()(t)?t(e):t;return{...e,...n}}))}))]}},23095:(t,e,n)=>{"use strict";n.d(e,{Z:()=>r});var o=n(59496);const r=function(){const t=(0,o.useRef)(!1);return(0,o.useEffect)((()=>(t.current=!1,()=>{t.current=!0})),[]),t}},42718:(t,e,n)=>{"use strict";n.r(e),n.d(e,{assets:()=>f,contentTitle:()=>p,default:()=>v,frontMatter:()=>l,metadata:()=>d,toc:()=>S});var o=n(96600),r=n(59496),a=n(49613),c=n(65836),s=n(68892),u=n(1329);const i=function(){const[t,e]=(0,u.Z)({count1:0,count2:0}),{count1:n,count2:o}=t;return r.createElement(r.Fragment,null,r.createElement("div",null,r.createElement("button",{onClick:()=>{e({count1:n+1})}},"+1")," ",n),r.createElement("div",null,r.createElement("button",{onClick:()=>{e({count2:o+2})}},"+2")," ",o))},l={},p=void 0,d={unversionedId:"useSetState",id:"useSetState",title:"useSetState",description:"This hook is like this.setState method of class component. It requires an object as the initial state, and can update part of the state. The new state will be merged with the old state.",source:"@site/docs/useSetState.mdx",sourceDirName:".",slug:"/useSetState",permalink:"/hooks/useSetState",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"useToggle",permalink:"/hooks/useToggle"},next:{title:"useSafeState",permalink:"/hooks/useSafeState"}},f={},S=[{value:"API",id:"api",level:2},{value:"Example",id:"example",level:2}],m={toc:S};function v(t){let{components:e,...n}=t;return(0,a.kt)("wrapper",(0,o.Z)({},m,n,{components:e,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"This hook is like ",(0,a.kt)("inlineCode",{parentName:"p"},"this.setState")," method of class component. It requires an object as the initial state, and can update part of the state. The new state will be merged with the old state."),(0,a.kt)("h2",{id:"api"},"API"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"function useSetState<S extends object>(\n  initialState: S | (() => S)\n): [\n  state: S,\n  setState: (patch: Partial<S> | ((prevState: S) => Partial<S>)) => void\n];\n")),(0,a.kt)("h2",{id:"example"},"Example"),(0,a.kt)(s.Z,{mdxType:"ExampleBlock"},(0,a.kt)(i,{mdxType:"Example"})),(0,a.kt)(c.Z,{language:"tsx",mdxType:"CodeBlock"},'import React from "react";\nimport { useSetState } from "@lilib/hooks";\n\nfunction Example() {\n  const [state, setState] = useSetState({ count1: 0, count2: 0 });\n  const { count1, count2 } = state;\n\n  return (\n    <>\n      <div>\n        <button\n          onClick={() => {\n            setState({ count1: count1 + 1 });\n          }}\n        >\n          +1\n        </button>{" "}\n        {count1}\n      </div>\n      <div>\n        <button\n          onClick={() => {\n            setState({ count2: count2 + 2 });\n          }}\n        >\n          +2\n        </button>{" "}\n        {count2}\n      </div>\n    </>\n  );\n}\n\nexport default Example;\n'))}v.isMDXComponent=!0},74396:(t,e,n)=>{var o=n(29165).Symbol;t.exports=o},80732:(t,e,n)=>{var o=n(74396),r=n(31239),a=n(57058),c=o?o.toStringTag:void 0;t.exports=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":c&&c in Object(t)?r(t):a(t)}},96476:(t,e,n)=>{var o="object"==typeof n.g&&n.g&&n.g.Object===Object&&n.g;t.exports=o},31239:(t,e,n)=>{var o=n(74396),r=Object.prototype,a=r.hasOwnProperty,c=r.toString,s=o?o.toStringTag:void 0;t.exports=function(t){var e=a.call(t,s),n=t[s];try{t[s]=void 0;var o=!0}catch(u){}var r=c.call(t);return o&&(e?t[s]=n:delete t[s]),r}},57058:t=>{var e=Object.prototype.toString;t.exports=function(t){return e.call(t)}},29165:(t,e,n)=>{var o=n(96476),r="object"==typeof self&&self&&self.Object===Object&&self,a=o||r||Function("return this")();t.exports=a},92042:(t,e,n)=>{var o=n(80732),r=n(36838);t.exports=function(t){if(!r(t))return!1;var e=o(t);return"[object Function]"==e||"[object GeneratorFunction]"==e||"[object AsyncFunction]"==e||"[object Proxy]"==e}},36838:t=>{t.exports=function(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}}}]);