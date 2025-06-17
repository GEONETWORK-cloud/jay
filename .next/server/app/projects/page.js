(()=>{var e={};e.id=895,e.ids=[895],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},6113:e=>{"use strict";e.exports=require("crypto")},9523:e=>{"use strict";e.exports=require("dns")},2361:e=>{"use strict";e.exports=require("events")},7147:e=>{"use strict";e.exports=require("fs")},3685:e=>{"use strict";e.exports=require("http")},5158:e=>{"use strict";e.exports=require("http2")},1808:e=>{"use strict";e.exports=require("net")},2037:e=>{"use strict";e.exports=require("os")},1017:e=>{"use strict";e.exports=require("path")},7282:e=>{"use strict";e.exports=require("process")},2781:e=>{"use strict";e.exports=require("stream")},4404:e=>{"use strict";e.exports=require("tls")},7310:e=>{"use strict";e.exports=require("url")},3837:e=>{"use strict";e.exports=require("util")},9796:e=>{"use strict";e.exports=require("zlib")},6211:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>i.a,__next_app__:()=>p,originalPathname:()=>u,pages:()=>d,routeModule:()=>f,tree:()=>l});var s=r(482),a=r(9108),o=r(2563),i=r.n(o),n=r(8300),c={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(c[e]=()=>n[e]);r.d(t,c);let l=["",{children:["projects",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,3236)),"D:\\Githubfiles\\x321\\app\\projects\\page.tsx"]}]},{layout:[()=>Promise.resolve().then(r.bind(r,7982)),"D:\\Githubfiles\\x321\\app\\projects\\layout.tsx"]}]},{layout:[()=>Promise.resolve().then(r.bind(r,8982)),"D:\\Githubfiles\\x321\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,9361,23)),"next/dist/client/components/not-found-error"]}],d=["D:\\Githubfiles\\x321\\app\\projects\\page.tsx"],u="/projects/page",p={require:r,loadChunk:()=>Promise.resolve()},f=new s.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/projects/page",pathname:"/projects",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},6939:(e,t,r)=>{Promise.resolve().then(r.bind(r,1235))},5303:()=>{},1235:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>m});var s=r(5344),a=r(7983),o=r.n(a),i=r(3729),n=r(8428),c=r(664),l=r(8536),d=r(7296),u=r(2456),p=r(6506),f=r(4669);function m(){let[e,t]=(0,i.useState)([]),[r,a]=(0,i.useState)(!0),[m,h]=(0,i.useState)("grid"),[x,g]=(0,i.useState)(null),[y,b]=(0,i.useState)(!0),j=(0,n.useRouter)(),{user:v}=(0,d.useAuth)();(0,i.useEffect)(()=>{async function e(){try{a(!0),b(!0);let e=(await (0,c.He)()).map(e=>({...e,id:e.id??""}));t(e),setTimeout(()=>{b(!1)},200*e.length+100)}catch(e){console.error("Error loading projects:",e)}finally{a(!1)}}v?e():j.push("/login")},[v,j]);let w=async(r,s)=>{if(s.stopPropagation(),window.confirm("Are you sure you want to delete this project? This action cannot be undone."))try{g(r),await (0,c.th)(r),t(e.filter(e=>e.id!==r)),f.Am.success("Project deleted successfully")}catch(e){console.error("Error deleting project:",e),f.Am.error("Failed to delete project")}finally{g(null)}};return(0,s.jsxs)("div",{className:"jsx-f967ca419f73d17f flex h-screen bg-gray-100",children:[s.jsx(l.Z,{}),(0,s.jsxs)("div",{className:"jsx-f967ca419f73d17f flex-1 overflow-auto p-6",children:[(0,s.jsxs)("div",{className:"jsx-f967ca419f73d17f flex items-center justify-between mb-6",children:[(0,s.jsxs)("div",{className:"jsx-f967ca419f73d17f flex items-center",children:[s.jsx("button",{onClick:()=>j.push("/"),title:"Back to dashboard","aria-label":"Back to dashboard",className:"jsx-f967ca419f73d17f mr-4 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50",children:s.jsx(u.Ao2,{size:18})}),s.jsx("h1",{className:"jsx-f967ca419f73d17f text-2xl font-bold text-gray-800",children:"All Projects"})]}),(0,s.jsxs)("div",{className:"jsx-f967ca419f73d17f flex gap-2",children:[(0,s.jsxs)(p.default,{href:"/projects/create",className:"p-2 px-4 rounded bg-indigo-500 text-white flex items-center gap-2 hover:bg-indigo-600",children:[s.jsx(u.O9D,{size:18}),s.jsx("span",{className:"jsx-f967ca419f73d17f",children:"Add Project"})]}),s.jsx("button",{onClick:()=>h("grid"),title:"Grid view","aria-label":"Grid view",className:`jsx-f967ca419f73d17f p-2 rounded ${"grid"===m?"bg-indigo-500 text-white":"bg-white text-gray-600"}`,children:s.jsx(u.aCJ,{size:18})}),s.jsx("button",{onClick:()=>h("list"),title:"List view","aria-label":"List view",className:`jsx-f967ca419f73d17f p-2 rounded ${"list"===m?"bg-indigo-500 text-white":"bg-white text-gray-600"}`,children:s.jsx(u.SnF,{size:18})})]})]}),r?s.jsx("div",{className:"jsx-f967ca419f73d17f flex justify-center items-center h-64",children:s.jsx("div",{className:"jsx-f967ca419f73d17f w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"})}):s.jsx("div",{className:"jsx-f967ca419f73d17f "+(("grid"===m?"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6":"space-y-4")||""),children:e.length>0?e.map((e,t)=>s.jsx("div",{style:{opacity:y?0:1,transform:y?"scale(0.95)":"scale(1)",animation:y?`popIn 0.3s ease-out ${.2*t}s forwards`:"none"},className:"jsx-f967ca419f73d17f "+(("list"===m?"bg-white rounded-lg shadow p-4":"")||""),children:"grid"===m?(0,s.jsxs)("div",{onClick:()=>j.push(`/projects/${e.id}`),className:"jsx-f967ca419f73d17f bg-white rounded-lg shadow overflow-hidden cursor-pointer transition-transform hover:scale-105 hover:shadow-lg relative group",children:[s.jsx("div",{className:"jsx-f967ca419f73d17f h-40 overflow-hidden",children:s.jsx("img",{src:e.imageUrl||"https://via.placeholder.com/300x150?text=No+Image",alt:e.title,className:"jsx-f967ca419f73d17f w-full h-full object-cover"})}),s.jsx("button",{onClick:t=>w(e.id,t),disabled:x===e.id,className:"jsx-f967ca419f73d17f absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600",children:x===e.id?s.jsx("div",{className:"jsx-f967ca419f73d17f w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"}):s.jsx(u.Ybf,{size:16})}),(0,s.jsxs)("div",{className:"jsx-f967ca419f73d17f p-4",children:[s.jsx("h2",{className:"jsx-f967ca419f73d17f text-lg font-semibold",children:e.title}),s.jsx("p",{className:"jsx-f967ca419f73d17f text-sm text-gray-600 mt-2 line-clamp-2",children:e.description}),(0,s.jsxs)("div",{className:"jsx-f967ca419f73d17f mt-3 flex flex-wrap gap-1",children:[e.tags.slice(0,3).map((e,t)=>{let r="string"==typeof e?e:e.name;return s.jsx("span",{className:"jsx-f967ca419f73d17f px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-full",children:r},t)}),e.tags.length>3&&(0,s.jsxs)("span",{className:"jsx-f967ca419f73d17f px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-full",children:["+",e.tags.length-3]})]})]})]}):(0,s.jsxs)("div",{onClick:()=>j.push(`/projects/${e.id}`),className:"jsx-f967ca419f73d17f flex cursor-pointer transition-all hover:bg-gray-50 relative group",children:[s.jsx("div",{className:"jsx-f967ca419f73d17f w-20 h-20 mr-4 overflow-hidden rounded",children:s.jsx("img",{src:e.imageUrl||"https://via.placeholder.com/300x150?text=No+Image",alt:e.title,className:"jsx-f967ca419f73d17f w-full h-full object-cover"})}),(0,s.jsxs)("div",{className:"jsx-f967ca419f73d17f flex-1",children:[(0,s.jsxs)("div",{className:"jsx-f967ca419f73d17f flex justify-between items-start",children:[(0,s.jsxs)("div",{className:"jsx-f967ca419f73d17f",children:[s.jsx("h2",{className:"jsx-f967ca419f73d17f text-lg font-semibold",children:e.title}),s.jsx("p",{className:"jsx-f967ca419f73d17f text-sm text-gray-600 mt-1 line-clamp-1",children:e.description})]}),s.jsx("button",{onClick:t=>w(e.id,t),disabled:x===e.id,className:"jsx-f967ca419f73d17f p-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-600",children:x===e.id?s.jsx("div",{className:"jsx-f967ca419f73d17f w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"}):s.jsx(u.Ybf,{size:16})})]}),(0,s.jsxs)("div",{className:"jsx-f967ca419f73d17f mt-2 flex flex-wrap gap-1",children:[e.tags.slice(0,2).map((e,t)=>{let r="string"==typeof e?e:e.name;return s.jsx("span",{className:"jsx-f967ca419f73d17f px-2 py-0.5 bg-gray-100 text-xs text-gray-600 rounded-full",children:r},t)}),e.tags.length>2&&(0,s.jsxs)("span",{className:"jsx-f967ca419f73d17f px-2 py-0.5 bg-gray-100 text-xs text-gray-600 rounded-full",children:["+",e.tags.length-2]})]})]})]})},e.id)):(0,s.jsxs)("div",{className:"jsx-f967ca419f73d17f text-center p-12 bg-white rounded-lg",children:[s.jsx("p",{className:"jsx-f967ca419f73d17f text-gray-500 mb-4",children:"No projects found"}),(0,s.jsxs)(p.default,{href:"/projects/create",className:"px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 flex items-center gap-2 mx-auto inline-flex",children:[s.jsx(u.O9D,{size:18}),s.jsx("span",{className:"jsx-f967ca419f73d17f",children:"Create Your First Project"})]})]})})]}),s.jsx(o(),{id:"f967ca419f73d17f",children:"@-webkit-keyframes popIn{0%{opacity:0;-webkit-transform:scale(.95);transform:scale(.95)}100%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}}@-moz-keyframes popIn{0%{opacity:0;-moz-transform:scale(.95);transform:scale(.95)}100%{opacity:1;-moz-transform:scale(1);transform:scale(1)}}@-o-keyframes popIn{0%{opacity:0;-o-transform:scale(.95);transform:scale(.95)}100%{opacity:1;-o-transform:scale(1);transform:scale(1)}}@keyframes popIn{0%{opacity:0;-webkit-transform:scale(.95);-moz-transform:scale(.95);-o-transform:scale(.95);transform:scale(.95)}100%{opacity:1;-webkit-transform:scale(1);-moz-transform:scale(1);-o-transform:scale(1);transform:scale(1)}}"})]})}},664:(e,t,r)=>{"use strict";r.d(t,{$B:()=>f,$L:()=>b,He:()=>c,OL:()=>d,TC:()=>n,b3:()=>u,e5:()=>m,h8:()=>y,j:()=>x,p_:()=>g,th:()=>l,ty:()=>h});var s=r(7521),a=r(7097),o=r(1626);async function i(e,t,r,o=[]){try{let i=(0,a.hJ)(s.db,"activities");await (0,a.ET)(i,{type:e,description:t,userId:r,timestamp:(0,a.Bt)(),tags:o}),console.log("Activity tracked successfully")}catch(e){throw console.error("Error tracking activity:",e),e}}async function n(e=5){try{let t=(0,a.hJ)(s.db,"activities"),r=(0,a.IO)(t,(0,a.Xo)("timestamp","desc"),(0,a.b9)(e));return(await (0,a.PL)(r)).docs.map(e=>({id:e.id,...e.data()}))}catch(e){throw console.error("Error loading recent activities:",e),e}}async function c(){try{let e=(0,a.hJ)(s.db,"projects"),t=(0,a.IO)(e,(0,a.Xo)("createdAt","desc"));return(await (0,a.PL)(t)).docs.map(e=>({id:e.id,...e.data()}))}catch(e){throw console.error("Error loading projects:",e),e}}async function l(e){try{return await (0,a.oe)((0,a.JU)(s.db,"projects",e)),(0,o.c0)("Project deleted successfully","success"),!0}catch(e){throw console.error("Error deleting project:",e),(0,o.c0)("Error deleting project","error"),e}}async function d(){try{let e=(0,a.IO)((0,a.hJ)(s.db,"projects")),t=(0,a.IO)((0,a.hJ)(s.db,"activities")),r=(0,a.IO)((0,a.hJ)(s.db,"users")),[o,i,n]=await Promise.all([(0,a.PL)(e),(0,a.PL)(t),(0,a.PL)(r)]),c=i.docs.map(e=>{let t=e.data();return{id:e.id,type:t.type,description:t.description,userId:t.userId,timestamp:t.timestamp instanceof a.EK?t.timestamp.toDate():new Date(t.timestamp)}}).sort((e,t)=>t.timestamp.getTime()-e.timestamp.getTime()).slice(0,5);return{projectsCount:o.size,activitiesCount:i.size,usersCount:n.size,recentActivities:c}}catch(e){throw console.error("Error loading dashboard stats:",e),e}}async function u(e){try{if("system"===e)return"System";let t=(0,a.JU)(s.db,"users",e),r=await (0,a.QT)(t);if(r.exists()){let e=r.data();if(e.email)return e.email;if(e.displayName)return e.displayName}return p(e)}catch(t){return console.error("Error getting user display name:",t),p(e)}}function p(e){let t=["gmail.com","outlook.com","yahoo.com","mail.com","example.com"],r=Math.abs(e.charCodeAt(0)+(e.charCodeAt(e.length-1)||0))%t.length,s=t[r],a="";if(e.length>20){let t=e.substring(0,2).toLowerCase(),r=e.substring(e.length-5).toLowerCase();a=`user.${t}${r}`}else a=`user.${e.toLowerCase()}`;return`${a}@${s}`}function f(e){let t={};e.forEach(e=>{if(!e.timestamp)return;let r=(e.timestamp instanceof a.EK?e.timestamp.toDate():new Date(e.timestamp)).toISOString().split("T")[0];t[r]?t[r]++:t[r]=1});let r=Object.keys(t).sort();return{labels:r.map(e=>new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"})),data:r.map(e=>t[e])}}async function m(e){try{let t=(0,a.JU)(s.db,"projects",e),r=await (0,a.QT)(t);if(r.exists())return{id:r.id,...r.data()};return null}catch(e){throw console.error("Error getting project:",e),(0,o.c0)("Error loading project details","error"),e}}async function h(e,t){try{let r=(0,a.JU)(s.db,"projects",e),i={...t,updatedAt:(0,a.Bt)()};return await (0,a.r7)(r,i),(0,o.c0)("Project updated successfully","success"),!0}catch(e){throw console.error("Error updating project:",e),(0,o.c0)("Error updating project","error"),e}}async function x(){try{let e=(0,a.hJ)(s.db,"activities"),t=(0,a.IO)(e,(0,a.Xo)("timestamp","desc"));return(await (0,a.PL)(t)).docs.map(e=>({id:e.id,...e.data()}))}catch(e){throw console.error("Error loading all activities:",e),e}}async function g(){try{let e=(0,a.hJ)(s.db,"users");return(await (0,a.PL)(e)).docs.map(e=>({id:e.id,...e.data()}))}catch(e){throw console.error("Error loading users:",e),e}}async function y(e){try{let t=(0,a.JU)(s.db,"users",e);if(!(await (0,a.QT)(t)).exists())throw Error("User not found");await (0,a.oe)(t);try{let t=await fetch("/api/users/delete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:e})});if(!t.ok){let e=await t.json();console.error("Error from delete API:",e)}}catch(e){console.error("Error calling auth delete API:",e)}return await i("delete","Deleted a user account","system",["user","account","delete"]),(0,o.c0)("User deleted successfully","success"),!0}catch(e){throw console.error("Error deleting user:",e),(0,o.c0)("Error deleting user","error"),e}}async function b(e){try{let t=(0,a.Bt)(),r=(0,a.hJ)(s.db,"projects"),n={...e,createdAt:t,updatedAt:t},c=await (0,a.ET)(r,n),l=e.tags.map(e=>"string"==typeof e?e:e.name);return await i("create",`Created a new project: ${e.title}`,e.createdBy,["project","create",...l]),(0,o.c0)("Project created successfully","success"),c.id}catch(e){throw console.error("Error creating project:",e),(0,o.c0)("Error creating project","error"),e}}},9408:()=>{},8630:(e,t,r)=>{"use strict";r(9408);var s=r(3729),a=function(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}(s);function o(e,t){for(var r=0;r<t.length;r++){var s=t[r];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}var i="undefined"!=typeof process&&process.env&&!0,n=function(e){return"[object String]"===Object.prototype.toString.call(e)},c=function(){function e(e){var t=void 0===e?{}:e,r=t.name,s=void 0===r?"stylesheet":r,a=t.optimizeForSpeed,o=void 0===a?i:a;l(n(s),"`name` must be a string"),this._name=s,this._deletedRulePlaceholder="#"+s+"-deleted-rule____{}",l("boolean"==typeof o,"`optimizeForSpeed` must be a boolean"),this._optimizeForSpeed=o,this._serverSheet=void 0,this._tags=[],this._injected=!1,this._rulesCount=0,this._nonce=null}var t,r=e.prototype;return r.setOptimizeForSpeed=function(e){l("boolean"==typeof e,"`setOptimizeForSpeed` accepts a boolean"),l(0===this._rulesCount,"optimizeForSpeed cannot be when rules have already been inserted"),this.flush(),this._optimizeForSpeed=e,this.inject()},r.isOptimizeForSpeed=function(){return this._optimizeForSpeed},r.inject=function(){var e=this;l(!this._injected,"sheet already injected"),this._injected=!0,this._serverSheet={cssRules:[],insertRule:function(t,r){return"number"==typeof r?e._serverSheet.cssRules[r]={cssText:t}:e._serverSheet.cssRules.push({cssText:t}),r},deleteRule:function(t){e._serverSheet.cssRules[t]=null}}},r.getSheetForTag=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]},r.getSheet=function(){return this.getSheetForTag(this._tags[this._tags.length-1])},r.insertRule=function(e,t){return l(n(e),"`insertRule` accepts only strings"),"number"!=typeof t&&(t=this._serverSheet.cssRules.length),this._serverSheet.insertRule(e,t),this._rulesCount++},r.replaceRule=function(e,t){this._optimizeForSpeed;var r=this._serverSheet;if(t.trim()||(t=this._deletedRulePlaceholder),!r.cssRules[e])return e;r.deleteRule(e);try{r.insertRule(t,e)}catch(s){i||console.warn("StyleSheet: illegal rule: \n\n"+t+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),r.insertRule(this._deletedRulePlaceholder,e)}return e},r.deleteRule=function(e){this._serverSheet.deleteRule(e)},r.flush=function(){this._injected=!1,this._rulesCount=0,this._serverSheet.cssRules=[]},r.cssRules=function(){return this._serverSheet.cssRules},r.makeStyleTag=function(e,t,r){t&&l(n(t),"makeStyleTag accepts only strings as second parameter");var s=document.createElement("style");this._nonce&&s.setAttribute("nonce",this._nonce),s.type="text/css",s.setAttribute("data-"+e,""),t&&s.appendChild(document.createTextNode(t));var a=document.head||document.getElementsByTagName("head")[0];return r?a.insertBefore(s,r):a.appendChild(s),s},o(e.prototype,[{key:"length",get:function(){return this._rulesCount}}]),t&&o(e,t),e}();function l(e,t){if(!e)throw Error("StyleSheet: "+t+".")}var d=function(e){for(var t=5381,r=e.length;r;)t=33*t^e.charCodeAt(--r);return t>>>0},u={};function p(e,t){if(!t)return"jsx-"+e;var r=String(t),s=e+r;return u[s]||(u[s]="jsx-"+d(e+"-"+r)),u[s]}function f(e,t){var r=e+(t=t.replace(/\/style/gi,"\\/style"));return u[r]||(u[r]=t.replace(/__jsx-style-dynamic-selector/g,e)),u[r]}var m=s.createContext(null);m.displayName="StyleSheetContext",a.default.useInsertionEffect||a.default.useLayoutEffect;var h=void 0;function x(e){var t=h||s.useContext(m);return t&&t.add(e),null}x.dynamic=function(e){return e.map(function(e){return p(e[0],e[1])}).join(" ")},t.style=x},7983:(e,t,r)=>{"use strict";e.exports=r(8630).style},7982:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>a});var s=r(5036);function a({children:e}){return s.jsx(s.Fragment,{children:e})}r(2)},3236:(e,t,r)=>{"use strict";r.r(t),r.d(t,{$$typeof:()=>o,__esModule:()=>a,default:()=>i});let s=(0,r(6843).createProxy)(String.raw`D:\Githubfiles\x321\app\projects\page.tsx`),{__esModule:a,$$typeof:o}=s,i=s.default},4669:(e,t,r)=>{"use strict";r.d(t,{Am:()=>A});var s,a=r(3729);let o={data:""},i=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||o,n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,d=(e,t)=>{let r="",s="",a="";for(let o in e){let i=e[o];"@"==o[0]?"i"==o[1]?r=o+" "+i+";":s+="f"==o[1]?d(i,o):o+"{"+d(i,"k"==o[1]?"":t)+"}":"object"==typeof i?s+=d(i,t?t.replace(/([^,])+/g,e=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):o):null!=i&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=d.p?d.p(o,i):o+":"+i+";")}return r+(t&&a?t+"{"+a+"}":a)+s},u={},p=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+p(e[r]);return t}return e},f=(e,t,r,s,a)=>{let o=p(e),i=u[o]||(u[o]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(o));if(!u[i]){let t=o!==e?e:(e=>{let t,r,s=[{}];for(;t=n.exec(e.replace(c,""));)t[4]?s.shift():t[3]?(r=t[3].replace(l," ").trim(),s.unshift(s[0][r]=s[0][r]||{})):s[0][t[1]]=t[2].replace(l," ").trim();return s[0]})(e);u[i]=d(a?{["@keyframes "+i]:t}:t,r?"":"."+i)}let f=r&&u.g?u.g:null;return r&&(u.g=u[i]),((e,t,r,s)=>{s?t.data=t.data.replace(s,e):-1===t.data.indexOf(e)&&(t.data=r?e+t.data:t.data+e)})(u[i],t,s,f),i},m=(e,t,r)=>e.reduce((e,s,a)=>{let o=t[a];if(o&&o.call){let e=o(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;o=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+s+(null==o?"":o)},"");function h(e){let t=this||{},r=e.call?e(t.p):e;return f(r.unshift?r.raw?m(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,i(t.target),t.g,t.o,t.k)}h.bind({g:1});let x,g,y,b=h.bind({k:1});function j(e,t){let r=this||{};return function(){let s=arguments;function a(o,i){let n=Object.assign({},o),c=n.className||a.className;r.p=Object.assign({theme:g&&g()},n),r.o=/ *go\d+/.test(c),n.className=h.apply(r,s)+(c?" "+c:""),t&&(n.ref=i);let l=e;return e[0]&&(l=n.as||e,delete n.as),y&&l[0]&&y(n),x(l,n)}return t?t(a):a}}var v=e=>"function"==typeof e,w=(e,t)=>v(e)?e(t):e,_=(()=>{let e=0;return()=>(++e).toString()})(),N=((()=>{let e;return()=>e})(),(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return N(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let a=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+a}))}}}),S=[],k={toasts:[],pausedAt:void 0},E=e=>{k=N(k,e),S.forEach(e=>{e(k)})},P={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},C=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||_()}),z=e=>(t,r)=>{let s=C(t,e,r);return E({type:2,toast:s}),s.id},A=(e,t)=>z("blank")(e,t);A.error=z("error"),A.success=z("success"),A.loading=z("loading"),A.custom=z("custom"),A.dismiss=e=>{E({type:3,toastId:e})},A.remove=e=>E({type:4,toastId:e}),A.promise=(e,t,r)=>{let s=A.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?w(t.success,e):void 0;return a?A.success(a,{id:s,...r,...null==r?void 0:r.success}):A.dismiss(s),e}).catch(e=>{let a=t.error?w(t.error,e):void 0;a?A.error(a,{id:s,...r,...null==r?void 0:r.error}):A.dismiss(s)}),e};var $=new Map,q=1e3,R=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,I=b`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,O=b`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,T=(j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${R} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${I} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${O} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,b`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`),F=(j("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${T} 1s linear infinite;
`,b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`),D=b`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,L=(j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${F} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${D} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,j("div")`
  position: absolute;
`,j("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,b`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`);j("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${L} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,j("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,j("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,s=a.createElement,d.p=void 0,x=s,g=void 0,y=void 0,h`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[638,318,506,432,538],()=>r(6211));module.exports=s})();