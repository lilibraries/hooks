(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{115:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return p})),n.d(t,"metadata",(function(){return d})),n.d(t,"toc",(function(){return k})),n.d(t,"default",(function(){return v}));var o=n(121),a=n(122),i=n(0),r=n.n(i),s=n(120),u=n(124),l=n(6),c=n.n(l),b=n(125);var m=function(){var e=Object(b.b)("name","default value"),t=c()(e,2),n=t[0],o=t[1],a=o.set,i=o.remove;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,r.a.createElement("button",{onClick:function(){return a("new value")}},"Set"),r.a.createElement("button",{onClick:i},"Remove")),r.a.createElement("div",null,"Cookie value: ",n))},p={},d={unversionedId:"useCookie",id:"useCookie",isDocsHomePage:!1,title:"useCookie",description:"This hook use js-cookie as the parser. You can use this hook to get, set and/or remove cookies.",source:"@site/docs/useCookie.mdx",slug:"/useCookie",permalink:"/hooks/useCookie",version:"current",sidebar:"docs",previous:{title:"useEventListener",permalink:"/hooks/useEventListener"},next:{title:"useLocalStorage",permalink:"/hooks/useLocalStorage"}},k=[{value:"Usage",id:"usage",children:[{value:"Params",id:"params",children:[]},{value:"Results",id:"results",children:[]}]},{value:"Example",id:"example",children:[]}],j={toc:k};function v(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(s.b)("wrapper",Object(o.a)({},j,n,{components:t,mdxType:"MDXLayout"}),Object(s.b)("p",null,"This hook use ",Object(s.b)("a",{parentName:"p",href:"https://github.com/js-cookie/js-cookie"},"js-cookie")," as the parser. You can use this hook to get, set and/or remove cookies."),Object(s.b)("h2",{id:"usage"},"Usage"),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-ts"},"function useCookie(\n  name: string,\n  defaultValue?: string,\n  options?: Cookies.CookieAttributes\n): [\n  value: string | undefined,\n  actions: {\n    set: (newValue: string) => void;\n    remove: () => void;\n  }\n];\n")),Object(s.b)("h3",{id:"params"},"Params"),Object(s.b)("ul",null,Object(s.b)("li",{parentName:"ul"},Object(s.b)("strong",{parentName:"li"},Object(s.b)("inlineCode",{parentName:"strong"},"name"),":")," cookie name."),Object(s.b)("li",{parentName:"ul"},Object(s.b)("strong",{parentName:"li"},Object(s.b)("inlineCode",{parentName:"strong"},"defaultValue"),":")," default value, it will be returnd when the specified cookie is non-existant."),Object(s.b)("li",{parentName:"ul"},Object(s.b)("strong",{parentName:"li"},Object(s.b)("inlineCode",{parentName:"strong"},"options"),":")," ",Object(s.b)("a",{parentName:"li",href:"https://github.com/js-cookie/js-cookie#cookie-attributes"},"js-cookie attributes"),".")),Object(s.b)("h3",{id:"results"},"Results"),Object(s.b)("ul",null,Object(s.b)("li",{parentName:"ul"},Object(s.b)("strong",{parentName:"li"},Object(s.b)("inlineCode",{parentName:"strong"},"value"),":")," cookie value, it may be undefined."),Object(s.b)("li",{parentName:"ul"},Object(s.b)("strong",{parentName:"li"},Object(s.b)("inlineCode",{parentName:"strong"},"set"),":")," a function that can set the named cookie a new value."),Object(s.b)("li",{parentName:"ul"},Object(s.b)("strong",{parentName:"li"},Object(s.b)("inlineCode",{parentName:"strong"},"remove"),":")," a function that can remove the named cookie, and return the defaultValue.")),Object(s.b)("h2",{id:"example"},"Example"),Object(s.b)(u.a,{mdxType:"ExampleBox"},Object(s.b)(m,{mdxType:"UseCookieExample"})),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-tsx"},'import React from "react";\nimport { useCookie } from "@lilib/hooks";\n\nfunction Example() {\n  const [value, { set, remove }] = useCookie("name", "default value");\n\n  return (\n    <>\n      <div>\n        <button onClick={() => set("new value")}>Set</button>\n        <button onClick={remove}>Remove</button>\n      </div>\n      <div>Cookie value: {value}</div>\n    </>\n  );\n}\n\nexport default Example;\n')))}v.isMDXComponent=!0}}]);