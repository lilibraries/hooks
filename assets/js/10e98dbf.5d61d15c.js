"use strict";(self.webpackChunk_lilib_hooks=self.webpackChunk_lilib_hooks||[]).push([[3458],{75649:(e,n,t)=>{t.d(n,{c:()=>h});var a=t(67294),l=t(57557),o=t.n(l),c=t(61688),i=t(1820),r=t(13027);const u=globalThis,s="__LILIB_HOOKS_GLOBAL_CACHE__",d={global:!1,cacheTime:3e5,cacheSync:!1},m=(0,a.createContext)({...d,cache:new i.Z}),h=()=>(0,a.useContext)(m),p=e=>{const n=h(),t=(0,a.useRef)();let l=o()(e,"inherit","children");l=e.inherit?(0,r.Z)(n,l):(0,r.Z)(d,l),l.global&&u[s]&&(l.cache=u[s]),l.cache||(t.current||(t.current=new i.Z),l.cache=t.current),l.global&&!u[s]&&(u[s]=l.cache);const p=l.cache,f=(0,a.useCallback)((e=>p.isReady()?()=>{}:(p.once("ready",e),()=>{p.off("ready",e)})),[p]),k=(0,a.useCallback)((()=>p.isReady()),[p]),C=(0,c.useSyncExternalStore)(f,k);return(0,a.useDebugValue)(C?"Ready":"Unready"),(0,a.useDebugValue)(l),a.createElement(m.Provider,{value:l},C?e.children:l.fallback)};p.Context=m,p.useConfig=h},14708:(e,n,t)=>{t.d(n,{Z:()=>o});var a=t(67294),l=t(58242);const o=function(e){const n=(0,a.useRef)(),t=(0,l.Z)(e);return n.current||(n.current=function(){for(var e=arguments.length,n=new Array(e),a=0;a<e;a++)n[a]=arguments[a];return t.current.apply(this,n)}),n.current}},75912:(e,n,t)=>{t.d(n,{Z:()=>c});var a=t(67294),l=t(14708),o=t(72767);const c=function(e){const n=(0,o.Z)(),[t,c]=(0,a.useState)(e);return[t,(0,l.Z)((e=>{n.current||c(e)}))]}},58134:(e,n,t)=>{t.d(n,{Z:()=>l});var a=t(67294);const l=function(e){const n=(0,a.useRef)(e);n.current=e,(0,a.useEffect)((()=>()=>{n.current()}),[])}},72767:(e,n,t)=>{t.d(n,{Z:()=>l});var a=t(67294);const l=function(){const e=(0,a.useRef)(!1);return(0,a.useEffect)((()=>(e.current=!1,()=>{e.current=!0})),[]),e}},72844:(e,n,t)=>{t.d(n,{Z:()=>o});var a=t(67294),l=t(58134);const o=function(e){return function(n,t){const o=(0,a.useRef)(!1);e((()=>{if(o.current)return n();o.current=!0}),t),(0,l.Z)((()=>{o.current=!1}))}}(a.useEffect)},39306:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>g,contentTitle:()=>y,default:()=>x,frontMatter:()=>C,metadata:()=>v,toc:()=>N});var a=t(87462),l=t(67294),o=t(3905),c=t(90814),i=t(67030),r=t(72844),u=t(14708),s=t(75912),d=t(75649);const m=function(e,n){void 0===n&&(n={});const t=(0,d.c)(),{defaultValue:a,validate:o,onSet:c,onDelete:i}=n,m=n.cache??t.cache,h=n.cacheTime??t.cacheTime,p=n.cacheSync??t.cacheSync;let f=!1,k=!1;!0===p?(f=!0,k=!0):p&&(f=!!p.set,k=!!p.delete);const C=()=>{const n=m.get(e);return void 0!==n?o?o(n)?n:a:n:a},[y,v]=(0,s.Z)(C),g=(0,u.Z)((n=>{void 0===n?m.delete(e):m.set(e,n,{cacheTime:h})})),N=!!c||f,b=!!i||k,x=(0,u.Z)((e=>{f&&v(C()),c&&c(e)})),E=(0,u.Z)((e=>{k&&v(C()),i&&i(e)}));return(0,l.useEffect)((()=>{if(N)return m.for(e).on("set",x),()=>{m.for(e).off("set",x)}}),[e,m,N,x]),(0,l.useEffect)((()=>{if(b)return m.for(e).on("delete",E),()=>{m.for(e).off("delete",E)}}),[e,m,b,E]),(0,r.Z)((()=>{v(C())}),[e,m]),(0,r.Z)((()=>{0}),[e]),(0,l.useDebugValue)(y),[y,g]};const h=function(){const[e,n]=m("cache-basic",{defaultValue:""}),[t,a]=(0,l.useState)(e);return l.createElement(l.Fragment,null,l.createElement("input",{value:t,onChange:e=>{e.target.value?(a(e.target.value),n(e.target.value)):(a(""),n(void 0))}})," ",l.createElement("span",null,"Initial cached data: ",e))};function p(){const[e,n]=m("cache-sync",{defaultValue:"",cacheSync:!0});return l.createElement(l.Fragment,null,l.createElement("input",{value:e,onChange:e=>{n(e.target.value||void 0)}})," ",l.createElement("span",null,"Cached data: ",e))}const f=function(){return l.createElement(l.Fragment,null,l.createElement(p,null),l.createElement("br",null),l.createElement(p,null))};const k=function(){const[e,n]=(0,l.useState)(""),[t,a]=m("cache-time",{defaultValue:"",cacheSync:!0,cacheTime:3e3,onSet:e=>n(e),onDelete:()=>n("deleted")});return l.createElement(l.Fragment,null,l.createElement("input",{value:t,onChange:e=>{a(e.target.value)}})," ","Data: ",e)},C={},y=void 0,v={unversionedId:"useCache",id:"useCache",title:"useCache",description:"Cache data for a certain period of time. And you can synchronize data in different components. The CacheConfig component can set some default options for this hook.",source:"@site/docs/useCache.mdx",sourceDirName:".",slug:"/useCache",permalink:"/hooks/useCache",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"useIsomorphicLayoutEffect",permalink:"/hooks/useIsomorphicLayoutEffect"},next:{title:"useToggle",permalink:"/hooks/useToggle"}},g={},N=[{value:"API",id:"api",level:2},{value:"Examples",id:"examples",level:2},{value:"Basic",id:"basic",level:3},{value:"Synchronization",id:"synchronization",level:3},{value:"Set cache time",id:"set-cache-time",level:3}],b={toc:N};function x(e){let{components:n,...t}=e;return(0,o.kt)("wrapper",(0,a.Z)({},b,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Cache data for a certain period of time. And you can synchronize data in different components. The ",(0,o.kt)("a",{parentName:"p",href:"./CacheConfig"},(0,o.kt)("inlineCode",{parentName:"a"},"CacheConfig"))," component can set some default options for this hook."),(0,o.kt)("h2",{id:"api"},"API"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'function useCache<T>(\n  key: {},\n  options?: {\n    defaultValue?: T;\n    cache?: CacheInterface;\n    cacheTime?: number;\n    cacheSync?: boolean | { set?: boolean; delete?: boolean };\n    validate?: (value: any) => boolean;\n    onSet?: (value: any) => void;\n    onDelete?: (value: any) => void;\n  }\n): [value: T | undefined, setCache: (newValue: T | undefined) => void];\n\ninterface CacheInterface {\n  has(key: any): boolean;\n  get(key: any): any;\n  getCacheTimestamp(key: any): number | undefined;\n  set(key: any, data: any, options?: { cacheTime?: number }): any;\n  delete(key: any): any;\n  isReady(): boolean;\n  once(name: "ready", listener: () => void): any;\n  off(name: "ready", listener: () => void): any;\n  for(key: any): {\n    on(name: "set" | "delete", listener: (data: any) => void): any;\n    off(name: "set" | "delete", listener: (data: any) => void): any;\n  };\n}\n')),(0,o.kt)("p",null,"Params:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"key"),":")," Cache key. It can be any type except ",(0,o.kt)("inlineCode",{parentName:"li"},"null")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"undefined"),"."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"options"),":")," Options object.",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"options.defaultValue"),":")," Default value when the cache value does not exist."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"options.cache"),":")," Cache instance. Use ",(0,o.kt)("a",{parentName:"li",href:"https://lilibraries.github.io/utils/MemoryCache"},"MemoryCache")," by default. You can pass an instance that implements the ",(0,o.kt)("inlineCode",{parentName:"li"},"CacheInterface"),"."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"options.cacheTime"),":")," Cache time, in milliseconds. Default is 5 minutes. You can set a permanent cache by setting this option greater than or equal to ",(0,o.kt)("inlineCode",{parentName:"li"},"Number.MAX_SAFE_INTEGER"),", for example ",(0,o.kt)("inlineCode",{parentName:"li"},"Infinity"),"."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"options.cacheSync"),":")," Synchronize data on set and/or delete data. Default is ",(0,o.kt)("inlineCode",{parentName:"li"},"false"),". It can be an object to synchronize data in different events.",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"options.cacheSync.set"),":")," Synchronize data on set cache."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"options.cacheSync.delete"),":")," Synchronize data on delete cache or when cache time expires."))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"options.validate"),":")," Validate the cache value. If it returns falsy, the ",(0,o.kt)("inlineCode",{parentName:"li"},"defaultValue")," will be used."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"options.onSet"),":")," Data set event. The ",(0,o.kt)("inlineCode",{parentName:"li"},"value")," param will not be validated by the ",(0,o.kt)("inlineCode",{parentName:"li"},"validate")," function."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"options.onDelete"),":")," Data delete event (cache time expired or ",(0,o.kt)("inlineCode",{parentName:"li"},"setCache(undefined)")," called). The ",(0,o.kt)("inlineCode",{parentName:"li"},"value")," param will not be validated by the ",(0,o.kt)("inlineCode",{parentName:"li"},"validate")," function.")))),(0,o.kt)("p",null,"Results:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"value"),":")," Cache value or default value."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"setCache"),":")," The function to set cache. It the ",(0,o.kt)("inlineCode",{parentName:"li"},"newValue")," param is ",(0,o.kt)("inlineCode",{parentName:"li"},"undefined"),", the cache will be deleted.")),(0,o.kt)("h2",{id:"examples"},"Examples"),(0,o.kt)("h3",{id:"basic"},"Basic"),(0,o.kt)("p",null,"You can input some text, jump to other page, and then go back to this page to see the effect."),(0,o.kt)(i.Z,{mdxType:"ExampleBlock"},(0,o.kt)(h,{mdxType:"BasicExample"})),(0,o.kt)(c.Z,{language:"tsx",mdxType:"CodeBlock"},'import React, { useState } from "react";\nimport { useCache } from "@lilib/hooks";\n\nfunction Example() {\n  const [cache, setCache] = useCache("cache-basic", { defaultValue: "" });\n  const [value, setValue] = useState(cache);\n\n  return (\n    <>\n      <input\n        value={value}\n        onChange={(event) => {\n          if (event.target.value) {\n            setValue(event.target.value);\n            setCache(event.target.value);\n          } else {\n            setValue("");\n            setCache(undefined);\n          }\n        }}\n      />{" "}\n      <span>Initial cached data: {cache}</span>\n    </>\n  );\n}\n\nexport default Example;\n'),(0,o.kt)("h3",{id:"synchronization"},"Synchronization"),(0,o.kt)(i.Z,{mdxType:"ExampleBlock"},(0,o.kt)(f,{mdxType:"CacheSyncExample"})),(0,o.kt)(c.Z,{language:"tsx",mdxType:"CodeBlock"},'import React from "react";\nimport { useCache } from "@lilib/hooks";\n\nfunction Component() {\n  const [cache, setCache] = useCache("cache-sync", {\n    defaultValue: "",\n    cacheSync: true,\n  });\n\n  return (\n    <>\n      <input\n        value={cache}\n        onChange={(event) => {\n          setCache(event.target.value || undefined);\n        }}\n      />{" "}\n      <span>Cached data: {cache}</span>\n    </>\n  );\n}\n\nfunction Example() {\n  return (\n    <>\n      <Component />\n      <br />\n      <Component />\n    </>\n  );\n}\n\nexport default Example;\n'),(0,o.kt)("h3",{id:"set-cache-time"},"Set cache time"),(0,o.kt)("p",null,"The cache data will be deleted after 3 seconds (default is 5 minutes)."),(0,o.kt)(i.Z,{mdxType:"ExampleBlock"},(0,o.kt)(k,{mdxType:"CacheTimeExample"})),(0,o.kt)(c.Z,{language:"tsx",mdxType:"CodeBlock"},'import React, { useState } from "react";\nimport { useCache } from "@lilib/hooks";\n\nfunction Example() {\n  const [data, setData] = useState("");\n  const [cache, setCache] = useCache("cache-time", {\n    defaultValue: "",\n    cacheSync: true,\n    cacheTime: 3000,\n    onSet: (data) => setData(data),\n    onDelete: () => setData("deleted"),\n  });\n\n  return (\n    <>\n      <input\n        value={cache}\n        onChange={(event) => {\n          setCache(event.target.value);\n        }}\n      />{" "}\n      Data: {data}\n    </>\n  );\n}\n\nexport default Example;\n'))}x.isMDXComponent=!0}}]);