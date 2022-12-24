"use strict";(self.webpackChunk_lilib_hooks=self.webpackChunk_lilib_hooks||[]).push([[2544],{2165:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>r,contentTitle:()=>u,default:()=>m,frontMatter:()=>l,metadata:()=>s,toc:()=>i});var n=a(87462),o=(a(67294),a(3905));const l={},u=void 0,s={unversionedId:"useMemoizedValue",id:"useMemoizedValue",title:"useMemoizedValue",description:"Return the previous value when the value has not changed. Use deep comparison by default.",source:"@site/docs/useMemoizedValue.mdx",sourceDirName:".",slug:"/useMemoizedValue",permalink:"/hooks/useMemoizedValue",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"useSafeState",permalink:"/hooks/useSafeState"},next:{title:"useThrottledValue",permalink:"/hooks/useThrottledValue"}},r={},i=[{value:"API",id:"api",level:2},{value:"Example",id:"example",level:2}],p={toc:i};function m(e){let{components:t,...a}=e;return(0,o.kt)("wrapper",(0,n.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Return the previous value when the value has not changed. Use deep comparison by default."),(0,o.kt)("h2",{id:"api"},"API"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"function useMemoizedValue<T>(\n  value: T,\n  compare?: (x: any, y: any) => boolean\n): T;\n")),(0,o.kt)("p",null,"Params:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"value"),":")," The value."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"strong"},"compare"),":")," Comparison function.")),(0,o.kt)("h2",{id:"example"},"Example"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'import { useMemo, DependencyList } from "react";\nimport { useMemoizedValue } from "@lilib/hooks";\n\nfunction useDeepCompareMemo<T>(factory: () => T, deps?: DependencyList): T {\n  return useMemo(factory, useMemoizedValue(deps));\n}\n\nexport default useDeepCompareMemo;\n')))}m.isMDXComponent=!0}}]);