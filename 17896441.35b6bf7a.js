(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{101:function(e,t,a){"use strict";a.r(t);var n=a(129),l=a.n(n),r=a(0),c=a.n(r),i=a(25),o=a(123),m=a(23),s=a(133),d=a(131);var u=function(e){var t=e.metadata;return c.a.createElement("nav",{className:"pagination-nav","aria-label":"Blog list page navigation"},c.a.createElement("div",{className:"pagination-nav__item"},t.previous&&c.a.createElement(d.a,{className:"pagination-nav__link",to:t.previous.permalink},c.a.createElement("div",{className:"pagination-nav__sublabel"},"Previous"),c.a.createElement("div",{className:"pagination-nav__label"},"\xab ",t.previous.title))),c.a.createElement("div",{className:"pagination-nav__item pagination-nav__item--next"},t.next&&c.a.createElement(d.a,{className:"pagination-nav__link",to:t.next.permalink},c.a.createElement("div",{className:"pagination-nav__sublabel"},"Next"),c.a.createElement("div",{className:"pagination-nav__label"},t.next.title," \xbb"))))},v=a(130);var E=function(){var e=Object(m.default)().siteConfig.title,t=Object(v.useActivePlugin)({failfast:!0}).pluginId,a=Object(o.useDocsPreferredVersion)(t).savePreferredVersionName,n=Object(v.useActiveVersion)(t),l=Object(v.useDocVersionSuggestions)(t),r=l.latestDocSuggestion,i=l.latestVersionSuggestion;if(!i)return c.a.createElement(c.a.Fragment,null);var s,u=null!=r?r:(s=i).docs.find((function(e){return e.id===s.mainDocId}));return c.a.createElement("div",{className:"alert alert--warning margin-bottom--md",role:"alert"},"current"===n.name?c.a.createElement("div",null,"This is unreleased documentation for ",e," ",c.a.createElement("strong",null,n.label)," version."):c.a.createElement("div",null,"This is documentation for ",e," ",c.a.createElement("strong",null,n.label),", which is no longer actively maintained."),c.a.createElement("div",{className:"margin-top--md"},"For up-to-date documentation, see the"," ",c.a.createElement("strong",null,c.a.createElement(d.a,{to:u.path,onClick:function(){return a(i.name)}},"latest version"))," ","(",i.label,")."))},g=a(127),f=a(6),p=a.n(f);var b=function(e,t,a){var n=Object(r.useState)(void 0),l=p()(n,2),c=l[0],i=l[1];Object(r.useEffect)((function(){function n(){var n=function(){var e=Array.from(document.getElementsByClassName("anchor")),t=e.find((function(e){return e.getBoundingClientRect().top>=a}));if(t){if(t.getBoundingClientRect().top>=a){var n=e[e.indexOf(t)-1];return null!=n?n:t}return t}return e[e.length-1]}();if(n)for(var l=0,r=!1,o=document.getElementsByClassName(e);l<o.length&&!r;){var m=o[l],s=m.href,d=decodeURIComponent(s.substring(s.indexOf("#")+1));n.id===d&&(c&&c.classList.remove(t),m.classList.add(t),i(m),r=!0),l+=1}}return document.addEventListener("scroll",n),document.addEventListener("resize",n),n(),function(){document.removeEventListener("scroll",n),document.removeEventListener("resize",n)}}))},N=a(77),h=a.n(N),_="table-of-contents__link";function O(e){var t=e.toc,a=e.isChild;return t.length?c.a.createElement("ul",{className:a?"":"table-of-contents table-of-contents__left-border"},t.map((function(e){return c.a.createElement("li",{key:e.id},c.a.createElement("a",{href:"#".concat(e.id),className:_,dangerouslySetInnerHTML:{__html:e.value}}),c.a.createElement(O,{isChild:!0,toc:e.children}))}))):null}var w=function(e){var t=e.toc;return b(_,"table-of-contents__link--active",100),c.a.createElement("div",{className:Object(g.a)(h.a.tableOfContents,"thin-scrollbar")},c.a.createElement(O,{toc:t}))},j=a(126),k=a.n(j),y=a(128),C=a.n(y),x=a(78),L=a.n(x),I=function(e){var t=e.className,a=C()(e,["className"]);return c.a.createElement("svg",k()({fill:"currentColor",height:"1.2em",width:"1.2em",preserveAspectRatio:"xMidYMid meet",role:"img",viewBox:"0 0 40 40",className:Object(g.a)(L.a.iconEdit,t)},a),c.a.createElement("g",null,c.a.createElement("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})))},A=a(79),S=a.n(A);t.default=function(e){var t=Object(m.default)().siteConfig.url,a=e.content,n=a.metadata,r=a.frontMatter,d=r.image,f=r.keywords,p=r.hide_title,b=r.hide_table_of_contents,N=n.description,h=n.title,_=n.permalink,O=n.editUrl,j=n.lastUpdatedAt,k=n.lastUpdatedBy,y=Object(v.useActivePlugin)({failfast:!0}).pluginId,C=Object(v.useVersions)(y),x=Object(v.useActiveVersion)(y),L=C.length>1,A=Object(o.useTitleFormatter)(h),V=Object(s.a)(d,{absolute:!0});return c.a.createElement(c.a.Fragment,null,c.a.createElement(i.a,null,c.a.createElement("title",null,A),c.a.createElement("meta",{property:"og:title",content:A}),N&&c.a.createElement("meta",{name:"description",content:N}),N&&c.a.createElement("meta",{property:"og:description",content:N}),f&&f.length&&c.a.createElement("meta",{name:"keywords",content:f.join(",")}),d&&c.a.createElement("meta",{property:"og:image",content:V}),d&&c.a.createElement("meta",{name:"twitter:image",content:V}),d&&c.a.createElement("meta",{name:"twitter:image:alt",content:"Image for ".concat(h)}),_&&c.a.createElement("meta",{property:"og:url",content:t+_}),_&&c.a.createElement("link",{rel:"canonical",href:t+_})),c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:Object(g.a)("col",l()({},S.a.docItemCol,!b))},c.a.createElement(E,null),c.a.createElement("div",{className:S.a.docItemContainer},c.a.createElement("article",null,L&&c.a.createElement("div",null,c.a.createElement("span",{className:"badge badge--secondary"},"Version: ",x.label)),!p&&c.a.createElement("header",null,c.a.createElement("h1",{className:S.a.docTitle},h)),c.a.createElement("div",{className:"markdown"},c.a.createElement(a,null))),(O||j||k)&&c.a.createElement("div",{className:"margin-vert--xl"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col"},O&&c.a.createElement("a",{href:O,target:"_blank",rel:"noreferrer noopener"},c.a.createElement(I,null),"Edit this page")),(j||k)&&c.a.createElement("div",{className:"col text--right"},c.a.createElement("em",null,c.a.createElement("small",null,"Last updated"," ",j&&c.a.createElement(c.a.Fragment,null,"on"," ",c.a.createElement("time",{dateTime:new Date(1e3*j).toISOString(),className:S.a.docLastUpdatedAt},new Date(1e3*j).toLocaleDateString()),k&&" "),k&&c.a.createElement(c.a.Fragment,null,"by ",c.a.createElement("strong",null,k)),!1))))),c.a.createElement("div",{className:"margin-vert--lg"},c.a.createElement(u,{metadata:n})))),!b&&a.toc&&c.a.createElement("div",{className:"col col--3"},c.a.createElement(w,{toc:a.toc}))))}}}]);