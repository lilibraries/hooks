"use strict";(self.webpackChunk_lilib_hooks=self.webpackChunk_lilib_hooks||[]).push([[6789],{3724:(e,n,t)=>{t.d(n,{Z:()=>c});var i=t(7294),r=t(8134);const o=function(e,n){if(e===n)return!0;if(e.length!==n.length)return!1;let t=0,i=e.length;for(;t<i;t++)if(!Object.is(e[t],n[t]))return!1;return!0};var u=t(7541);const c=function(e){return function(n,t,c){const s=(0,i.useRef)(!1),d=(0,i.useRef)([]),a=(0,i.useRef)([]),l=(0,i.useRef)();function h(){null==l.current||l.current()}e((()=>{const e=c.map(u.Z);function i(){d.current=t,a.current=e,l.current=n()}s.current?o(t,d.current)&&o(e,a.current)||(h(),i()):(i(),s.current=!0)})),(0,r.Z)((()=>{h(),s.current=!1}))}}},4259:(e,n,t)=>{t.d(n,{Z:()=>s});var i=t(4708),r=t(3809),o=t(8298),u=t(7541);const c=function(e){return!!e&&!!e.addEventListener&&!!e.removeEventListener};const s=function(e,n,t,s){let d,a,l;"boolean"==typeof s?d=s:(0,o.Z)(s)&&(void 0!==s.capture&&(d=!!s.capture),void 0!==s.once&&(a=!!s.once),void 0!==s.passive&&(l=!!s.passive));const h=(0,i.Z)(t);(0,r.Z)((()=>{const t=(0,u.Z)(e);if(c(t))return t.addEventListener(n,h,{capture:d,once:a,passive:l}),()=>{t.removeEventListener(n,h,{capture:d})}}),[n,d,a,l],[e])}},8242:(e,n,t)=>{t.d(n,{Z:()=>r});var i=t(7294);const r=function(e){const n=(0,i.useRef)(e);return n.current=e,n}},4708:(e,n,t)=>{t.d(n,{Z:()=>o});var i=t(7294),r=t(8242);const o=function(e){const n=(0,i.useRef)(),t=(0,r.Z)(e);return n.current||(n.current=function(){for(var e=arguments.length,n=new Array(e),i=0;i<e;i++)n[i]=arguments[i];return t.current.apply(this,n)}),n.current}},3809:(e,n,t)=>{t.d(n,{Z:()=>r});var i=t(7294);const r=(0,t(3724).Z)(i.useEffect)},8134:(e,n,t)=>{t.d(n,{Z:()=>r});var i=t(7294);const r=function(e){const n=(0,i.useRef)(e);n.current=e,(0,i.useEffect)((()=>()=>{n.current()}),[])}},7541:(e,n,t)=>{t.d(n,{Z:()=>u});var i=t(9745),r=t(8298),o=t(2641);const u=function(e){return i.Z?(0,o.Z)(e)?e():(0,r.Z)(e)&&"current"in e?e.current:e:null}},9745:(e,n,t)=>{t.d(n,{Z:()=>i});const i=!("undefined"==typeof window||!window.document||!window.document.createElement)},2641:(e,n,t)=>{t.d(n,{Z:()=>i});const i=function(e){return"function"==typeof e}},8298:(e,n,t)=>{t.d(n,{Z:()=>i});const i=function(e){return"object"==typeof e&&null!==e}},5788:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>w,contentTitle:()=>f,default:()=>k,frontMatter:()=>h,metadata:()=>p,toc:()=>m});var i=t(7462),r=t(7294),o=t(3905),u=t(3066),c=t(2823),s=t(4259),d=t(9745);const a=function(){const[{width:e,height:n},t]=(0,r.useState)((()=>d.Z?{width:window.innerWidth,height:window.innerHeight}:{width:0,height:0}));function i(){t({width:window.innerWidth,height:window.innerHeight})}return(0,s.Z)((()=>window),"resize",i),(0,s.Z)((()=>window),"orientationchange",i),{width:e,height:n}};const l=function(){const{width:e,height:n}=a();return r.createElement(r.Fragment,null,"Width: ",e,"px; Height: ",n,"px")},h={},f=void 0,p={unversionedId:"useWindowSize",id:"useWindowSize",title:"useWindowSize",description:"Get window size.",source:"@site/docs/useWindowSize.mdx",sourceDirName:".",slug:"/useWindowSize",permalink:"/hooks/useWindowSize",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"useSize",permalink:"/hooks/useSize"},next:{title:"useClickAway",permalink:"/hooks/useClickAway"}},w={},m=[{value:"API",id:"api",level:2},{value:"Example",id:"example",level:2}],v={toc:m};function k(e){let{components:n,...t}=e;return(0,o.kt)("wrapper",(0,i.Z)({},v,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Get window size."),(0,o.kt)("h2",{id:"api"},"API"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"function useWindowSize(): { width: number; height: number };\n")),(0,o.kt)("h2",{id:"example"},"Example"),(0,o.kt)("p",null,"You can change the browser window size to see the effect."),(0,o.kt)(c.Z,{mdxType:"ExampleBlock"},(0,o.kt)(l,{mdxType:"Example"})),(0,o.kt)(u.Z,{language:"tsx",mdxType:"CodeBlock"},'import React from "react";\nimport { useWindowSize } from "@lilib/hooks";\n\nfunction Example() {\n  const { width, height } = useWindowSize();\n  return (\n    <>\n      Width: {width}px; Height: {height}px\n    </>\n  );\n}\n\nexport default Example;\n'))}k.isMDXComponent=!0}}]);