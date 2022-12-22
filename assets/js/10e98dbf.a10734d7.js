"use strict";(self.webpackChunk_lilib_hooks=self.webpackChunk_lilib_hooks||[]).push([[3458],{7030:(e,t,n)=>{n.d(t,{Z:()=>r});var a=n(7294);const i="exampleBlock_ywu8",r=e=>{let{children:t}=e;return a.createElement("div",{className:i},t)}},8625:(e,t,n)=>{n.d(t,{c:()=>f});var a=n(7294),i=n(7557),r=n.n(i),s=n(1688),c=n(5141);class o extends c.Z{constructor(){super(...arguments),this._ready=!0,this._records=new Map,this._maxCacheTime=o.DEFAULT_MAX_CACHE_TIME,this._defaultCacheTime=o.DEFAULT_CACHE_TIME}_checkCacheKey(e){if(null==e)throw new TypeError(`Cache key can't be null or undefined. Received: ${String(e)}.`)}_checkCacheData(e){if(void 0===e)throw new TypeError("Cache data can't be undefined.")}_setDeleteRecordTimer(e,t){let n=0;return t>0&&t<=this._maxCacheTime&&t<Number.MAX_SAFE_INTEGER&&(n=+setTimeout((()=>{this.delete(e)}),t)),n}_clearDeleteRecordTimer(e){const t=this._records.get(e);t&&t.deleteTimer&&clearTimeout(t.deleteTimer)}isReady(){return this._ready}asReady(){return this._ready||(this._ready=!0,this.emit("ready")),this}getMaxCacheTime(){return this._maxCacheTime}setMaxCacheTime(e){return this._maxCacheTime=e,this}getDefaultCacheTime(){return this._defaultCacheTime}setDefaultCacheTime(e){return this._defaultCacheTime=e,this}memorize(e,t,n){void 0===n&&(n={}),this._checkCacheKey(e),this._checkCacheData(t),this._clearDeleteRecordTimer(e);const a=Date.now(),{cacheTimestamp:i=a}=n,{cacheTime:r=this._defaultCacheTime}=n,s=i-a+r;if(s>0){const n=this._setDeleteRecordTimer(e,s);this._records.set(e,{data:t,cacheTime:r,deleteTimer:n,cacheTimestamp:i})}else this._records.delete(e);return this}set(e,t,n){void 0===n&&(n={}),this._checkCacheKey(e),this._checkCacheData(t),this._clearDeleteRecordTimer(e);const{cacheTime:a=this._defaultCacheTime}=n;return a>0?(this._records.set(e,{data:t,cacheTime:a,deleteTimer:this._setDeleteRecordTimer(e,a),cacheTimestamp:Date.now()}),this.for(e).emit("set",t),this.emit("set",e,t)):this.delete(e),this}has(e){return this._records.has(e)}get(e){return this._records.get(e)?.data}getCacheTime(e){return this._records.get(e)?.cacheTime}getCacheTimestamp(e){return this._records.get(e)?.cacheTimestamp}delete(e){const t=this._records.get(e);return t&&(this._clearDeleteRecordTimer(e),this._records.delete(e),this.for(e).emit("delete",t.data),this.emit("delete",e,t.data)),this}clear(){const e=new Map(this._records);this._records.clear();for(const[t,n]of e)n.deleteTimer&&clearTimeout(n.deleteTimer),this.for(t).emit("delete",n.data),this.emit("delete",t,n.data);return this.emit("clear"),this}}o.DEFAULT_CACHE_TIME=3e5,o.DEFAULT_MAX_CACHE_TIME=Number.MAX_SAFE_INTEGER;const l=o;var h=n(4819);const u=globalThis,m="__LILIB_HOOKS_GLOBAL_CACHE__",d={global:!1,cacheTime:3e5,cacheSync:!1},p=(0,a.createContext)({...d,cache:new l}),f=()=>(0,a.useContext)(p),_=e=>{const t=f(),n=(0,a.useRef)();let i=r()(e,"inherit","children");i=e.inherit?(0,h.Z)(t,i):(0,h.Z)(d,i),i.global&&u[m]&&(i.cache=u[m]),i.cache||(n.current||(n.current=new l),i.cache=n.current),i.global&&!u[m]&&(u[m]=i.cache);const c=i.cache,o=(0,a.useCallback)((e=>c.isReady()?()=>{}:(c.once("ready",e),()=>{c.off("ready",e)})),[c]),_=(0,a.useCallback)((()=>c.isReady()),[c]),k=(0,s.useSyncExternalStore)(o,_);return(0,a.useDebugValue)(k?"Ready":"Unready"),(0,a.useDebugValue)(i),a.createElement(p.Provider,{value:i},k?e.children:i.fallback)};_.Context=p,_.useConfig=f},8242:(e,t,n)=>{n.d(t,{Z:()=>i});var a=n(7294);const i=function(e){const t=(0,a.useRef)(e);return t.current=e,t}},4708:(e,t,n)=>{n.d(t,{Z:()=>r});var a=n(7294),i=n(8242);const r=function(e){const t=(0,a.useRef)(),n=(0,i.Z)(e);return t.current||(t.current=function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];return n.current.apply(this,t)}),t.current}},5912:(e,t,n)=>{n.d(t,{Z:()=>s});var a=n(7294),i=n(4708),r=n(2767);const s=function(e){const t=(0,r.Z)(),[n,s]=(0,a.useState)(e);return[n,(0,i.Z)((e=>{t.current||s(e)}))]}},8134:(e,t,n)=>{n.d(t,{Z:()=>i});var a=n(7294);const i=function(e){const t=(0,a.useRef)(e);t.current=e,(0,a.useEffect)((()=>()=>{t.current()}),[])}},2767:(e,t,n)=>{n.d(t,{Z:()=>i});var a=n(7294);const i=function(){const e=(0,a.useRef)(!1);return(0,a.useEffect)((()=>(e.current=!1,()=>{e.current=!0})),[]),e}},2844:(e,t,n)=>{n.d(t,{Z:()=>r});var a=n(7294),i=n(8134);const r=function(e){return function(t,n){const r=(0,a.useRef)(!1);e((()=>{if(r.current)return t();r.current=!0}),n),(0,i.Z)((()=>{r.current=!1}))}}(a.useEffect)},5141:(e,t,n)=>{n.d(t,{Z:()=>h});var a=n(7037),i=n.n(a),r=n(3448),s=n.n(r),c=n(3560),o=n.n(c);class l{constructor(){this._topEmitter=null,this._parentEmitter=null,this._emitters=new Map,this._listeners=Object.create(null),this._maxListeners=l.DEFAULT_MAX_LISTENERS}_checkEventName(e){if(this._topEmitter)this._topEmitter._checkEventName(e);else{if(!i()(e)&&!s()(e))throw new TypeError(`Event name must be a string or a symbol. Received: ${typeof e}.`);if(""===e)throw new TypeError("Event name can not be an empty string.")}}_checkEventListener(e){if(this._topEmitter)this._topEmitter._checkEventListener(e);else if(!o()(e))throw new TypeError(`Event listener must be a function. Received: ${typeof e}.`)}_attach(){if(this._parentEmitter){const e=this._parentEmitter._emitters;e.has(this._forKey)||e.set(this._forKey,this),this._parentEmitter._attach()}}_prune(){this._parentEmitter&&(this._emitters.size||this.getListenersCount()||(this._parentEmitter._emitters.delete(this._forKey),this._parentEmitter._prune()))}getMaxListeners(){return this._topEmitter?this._topEmitter._maxListeners:this._maxListeners}setMaxListeners(e){return this._topEmitter?this._topEmitter.setMaxListeners(e):this._maxListeners=e,this}for(e){let t=this._emitters.get(e);return t||(t=new l,t._forKey=e,t._topEmitter=this._topEmitter||this,t._parentEmitter=this),t}on(e,t){this._checkEventName(e),this._checkEventListener(t);let n=this._listeners[e];return n?n.push(t):n=this._listeners[e]=[t],this._attach(),this}once(e,t){var n=this;this._checkEventName(e),this._checkEventListener(t);const a=function(){n.off(e,a.__RAW_LISTENER__),a.__RAW_LISTENER__(...arguments)};return a.__RAW_LISTENER__=t,this.on(e,a),this}off(e,t){this._checkEventName(e),this._checkEventListener(t);const n=this._listeners[e];if(n){let a=-1;for(let e=n.length-1;e>=0;e--)if(n[e]===t||n[e].__RAW_LISTENER__===t){a=e;break}a>=0&&n.splice(a,1),0===n.length&&delete this._listeners[e]}return this._prune(),this}emit(e){this._checkEventName(e);let t=this._listeners[e];if(t){t=[...t];for(var n=arguments.length,a=new Array(n>1?n-1:0),i=1;i<n;i++)a[i-1]=arguments[i];for(let e=0;e<t.length;e++)try{t[e](...a)}catch(r){console.error(r)}}return this}getEventNames(){return[...Object.getOwnPropertyNames(this._listeners),...Object.getOwnPropertySymbols(this._listeners)]}getListeners(e){return this._checkEventName(e),(this._listeners[e]||[]).map((e=>e.__RAW_LISTENER__||e))}getListenersCount(e){let t=0;return void 0!==e?(this._checkEventName(e),t=this._listeners[e]?.length||0):this.getEventNames().forEach((e=>{t+=this._listeners[e]?.length||0})),t}removeAllListeners(e){return void 0!==e?(this._checkEventName(e),delete this._listeners[e]):this._listeners=Object.create(null),this._prune(),this}}l.DEFAULT_MAX_LISTENERS=100;const h=l},4819:(e,t,n)=>{n.d(t,{Z:()=>r});var a=n(3706),i=n.n(a);const r=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return i()({},...t,((e,t)=>void 0===t?e:t))}},9306:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>E,contentTitle:()=>C,default:()=>T,frontMatter:()=>k,metadata:()=>v,toc:()=>y});var a=n(7462),i=n(7294),r=n(3905),s=n(814),c=n(7030),o=n(2844),l=n(4708),h=n(5912),u=n(8625);const m=function(e,t){void 0===t&&(t={});const n=(0,u.c)(),{defaultValue:a,validate:r,onSet:s,onDelete:c}=t,m=t.cache??n.cache,d=t.cacheTime??n.cacheTime,p=t.cacheSync??n.cacheSync;let f=!1,_=!1;!0===p?(f=!0,_=!0):p&&(f=!!p.set,_=!!p.delete);const k=()=>{const t=m.get(e);return void 0!==t?r?r(t)?t:a:t:a},[C,v]=(0,h.Z)(k),E=(0,l.Z)((t=>{void 0===t?m.delete(e):m.set(e,t,{cacheTime:d})})),y=!!s||f,g=!!c||_,T=(0,l.Z)((e=>{f&&v(k()),s&&s(e)})),N=(0,l.Z)((e=>{_&&v(k()),c&&c(e)}));return(0,i.useEffect)((()=>{if(y)return m.for(e).on("set",T),()=>{m.for(e).off("set",T)}}),[e,m,y,T]),(0,i.useEffect)((()=>{if(g)return m.for(e).on("delete",N),()=>{m.for(e).off("delete",N)}}),[e,m,g,N]),(0,o.Z)((()=>{v(k())}),[e,m]),(0,o.Z)((()=>{0}),[e]),(0,i.useDebugValue)(C),[C,E]};const d=function(){const[e,t]=m("cache-basic",{defaultValue:""}),[n,a]=(0,i.useState)(e);return i.createElement(i.Fragment,null,i.createElement("input",{value:n,onChange:e=>{e.target.value?(a(e.target.value),t(e.target.value)):(a(""),t(void 0))}})," ",i.createElement("span",null,"Initial cached data: ",e))};function p(){const[e,t]=m("cache-sync",{defaultValue:"",cacheSync:!0});return i.createElement(i.Fragment,null,i.createElement("input",{value:e,onChange:e=>{t(e.target.value||void 0)}})," ",i.createElement("span",null,"Cached data: ",e))}const f=function(){return i.createElement(i.Fragment,null,i.createElement(p,null),i.createElement("br",null),i.createElement(p,null))};const _=function(){const[e,t]=(0,i.useState)(""),[n,a]=m("cache-time",{defaultValue:"",cacheSync:!0,cacheTime:3e3,onSet:e=>t(e),onDelete:()=>t("deleted")});return i.createElement(i.Fragment,null,i.createElement("input",{value:n,onChange:e=>{a(e.target.value)}})," ","Data: ",e)},k={},C=void 0,v={unversionedId:"useCache",id:"useCache",title:"useCache",description:"Cache data for a certain period of time. And you can synchronize data in different components. The CacheConfig component can set some default options for this hook.",source:"@site/docs/useCache.mdx",sourceDirName:".",slug:"/useCache",permalink:"/hooks/useCache",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"useIsomorphicLayoutEffect",permalink:"/hooks/useIsomorphicLayoutEffect"},next:{title:"useToggle",permalink:"/hooks/useToggle"}},E={},y=[{value:"API",id:"api",level:2},{value:"Examples",id:"examples",level:2},{value:"Basic",id:"basic",level:3},{value:"Synchronization",id:"synchronization",level:3},{value:"Set cache time",id:"set-cache-time",level:3}],g={toc:y};function T(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},g,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Cache data for a certain period of time. And you can synchronize data in different components. The ",(0,r.kt)("a",{parentName:"p",href:"./CacheConfig"},(0,r.kt)("inlineCode",{parentName:"a"},"CacheConfig"))," component can set some default options for this hook."),(0,r.kt)("h2",{id:"api"},"API"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'function useCache<T>(\n  key: {},\n  options?: {\n    defaultValue?: T;\n    cache?: CacheInterface;\n    cacheTime?: number;\n    cacheSync?: boolean | { set?: boolean; delete?: boolean };\n    validate?: (value: any) => boolean;\n    onSet?: (value: any) => void;\n    onDelete?: (value: any) => void;\n  }\n): [value: T | undefined, setCache: (newValue: T | undefined) => void];\n\ninterface CacheInterface {\n  has(key: any): boolean;\n  get(key: any): any;\n  set(key: any, data: any, options?: { cacheTime?: number }): any;\n  delete(key: any): any;\n  isReady(): boolean;\n  once(name: "ready", listener: () => void): any;\n  off(name: "ready", listener: () => void): any;\n  for(key: any): {\n    on(name: "set" | "delete", listener: (data: any) => void): any;\n    off(name: "set" | "delete", listener: (data: any) => void): any;\n  };\n}\n')),(0,r.kt)("p",null,"Params:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"strong"},"key"),":")," Cache key. It can be any type except ",(0,r.kt)("inlineCode",{parentName:"li"},"null")," and ",(0,r.kt)("inlineCode",{parentName:"li"},"undefined"),"."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"strong"},"options"),":")," Options object.",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"strong"},"options.defaultValue"),":")," Default value when the cache value does not exist."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"strong"},"options.cache"),":")," Cache instance. Use memory cache by default. You can pass an instance that implements the ",(0,r.kt)("inlineCode",{parentName:"li"},"CacheInterface"),"."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"strong"},"options.cacheTime"),":")," Cache time, in milliseconds. Default is 5 minutes. You can set a permanent cache by setting this option greater than or equal to ",(0,r.kt)("inlineCode",{parentName:"li"},"Number.MAX_SAFE_INTEGER"),", for example ",(0,r.kt)("inlineCode",{parentName:"li"},"Infinity"),"."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"strong"},"options.cacheSync"),":")," Synchronize data on set and/or delete data. Default is ",(0,r.kt)("inlineCode",{parentName:"li"},"false"),". It can be an object to synchronize data in different events.",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"strong"},"options.cacheSync.set"),":")," Synchronize data on set cache."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"strong"},"options.cacheSync.delete"),":")," Synchronize data on delete cache or when cache time expires."))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"strong"},"options.validate"),":")," Validate the cache value. If it returns falsy, the ",(0,r.kt)("inlineCode",{parentName:"li"},"defaultValue")," will be used."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"strong"},"options.onSet"),":")," Data set event. The ",(0,r.kt)("inlineCode",{parentName:"li"},"value")," param will not be validated by the ",(0,r.kt)("inlineCode",{parentName:"li"},"validate")," function."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"strong"},"options.onDelete"),":")," Data delete event (cache time expired or ",(0,r.kt)("inlineCode",{parentName:"li"},"setCache(undefined)")," called). The ",(0,r.kt)("inlineCode",{parentName:"li"},"value")," param will not be validated by the ",(0,r.kt)("inlineCode",{parentName:"li"},"validate")," function.")))),(0,r.kt)("p",null,"Results:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"strong"},"value"),":")," Cache value or default value."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"strong"},"setCache"),":")," The function to set cache. It the ",(0,r.kt)("inlineCode",{parentName:"li"},"newValue")," param is ",(0,r.kt)("inlineCode",{parentName:"li"},"undefined"),", the cache will be deleted.")),(0,r.kt)("h2",{id:"examples"},"Examples"),(0,r.kt)("h3",{id:"basic"},"Basic"),(0,r.kt)("p",null,"You can input some text, jump to other page, and then go back to this page to see the effect."),(0,r.kt)(c.Z,{mdxType:"ExampleBlock"},(0,r.kt)(d,{mdxType:"BasicExample"})),(0,r.kt)(s.Z,{language:"tsx",mdxType:"CodeBlock"},'import React, { useState } from "react";\nimport { useCache } from "@lilib/hooks";\n\nfunction Example() {\n  const [cache, setCache] = useCache("cache-basic", { defaultValue: "" });\n  const [value, setValue] = useState(cache);\n\n  return (\n    <>\n      <input\n        value={value}\n        onChange={(event) => {\n          if (event.target.value) {\n            setValue(event.target.value);\n            setCache(event.target.value);\n          } else {\n            setValue("");\n            setCache(undefined);\n          }\n        }}\n      />{" "}\n      <span>Initial cached data: {cache}</span>\n    </>\n  );\n}\n\nexport default Example;\n'),(0,r.kt)("h3",{id:"synchronization"},"Synchronization"),(0,r.kt)(c.Z,{mdxType:"ExampleBlock"},(0,r.kt)(f,{mdxType:"CacheSyncExample"})),(0,r.kt)(s.Z,{language:"tsx",mdxType:"CodeBlock"},'import React from "react";\nimport { useCache } from "@lilib/hooks";\n\nfunction Component() {\n  const [cache, setCache] = useCache("cache-sync", {\n    defaultValue: "",\n    cacheSync: true,\n  });\n\n  return (\n    <>\n      <input\n        value={cache}\n        onChange={(event) => {\n          setCache(event.target.value || undefined);\n        }}\n      />{" "}\n      <span>Cached data: {cache}</span>\n    </>\n  );\n}\n\nfunction Example() {\n  return (\n    <>\n      <Component />\n      <br />\n      <Component />\n    </>\n  );\n}\n\nexport default Example;\n'),(0,r.kt)("h3",{id:"set-cache-time"},"Set cache time"),(0,r.kt)("p",null,"The cache data will be deleted after 3 seconds (default is 5 minutes)."),(0,r.kt)(c.Z,{mdxType:"ExampleBlock"},(0,r.kt)(_,{mdxType:"CacheTimeExample"})),(0,r.kt)(s.Z,{language:"tsx",mdxType:"CodeBlock"},'import React, { useState } from "react";\nimport { useCache } from "@lilib/hooks";\n\nfunction Example() {\n  const [data, setData] = useState("");\n  const [cache, setCache] = useCache("cache-time", {\n    defaultValue: "",\n    cacheSync: true,\n    cacheTime: 3000,\n    onSet: (data) => setData(data),\n    onDelete: () => setData("deleted"),\n  });\n\n  return (\n    <>\n      <input\n        value={cache}\n        onChange={(event) => {\n          setCache(event.target.value);\n        }}\n      />{" "}\n      Data: {data}\n    </>\n  );\n}\n\nexport default Example;\n'))}T.isMDXComponent=!0}}]);