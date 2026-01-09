var bt=Object.defineProperty;var Ie=e=>{throw TypeError(e)};var vt=(e,t,s)=>t in e?bt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var g=(e,t,s)=>vt(e,typeof t!="symbol"?t+"":t,s),$e=(e,t,s)=>t.has(e)||Ie("Cannot "+s);var l=(e,t,s)=>($e(e,t,"read from private field"),s?s.call(e):t.get(e)),m=(e,t,s)=>t.has(e)?Ie("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,s),p=(e,t,s,r)=>($e(e,t,"write to private field"),r?r.call(e,s):t.set(e,s),s),v=(e,t,s)=>($e(e,t,"access private method"),s);var Fe=(e,t,s,r)=>({set _(n){p(e,t,n,s)},get _(){return l(e,t,r)}});var qe=(e,t,s)=>(r,n)=>{let i=-1;return a(0);async function a(u){if(u<=i)throw new Error("next() called multiple times");i=u;let c,o=!1,d;if(e[u]?(d=e[u][0][0],r.req.routeIndex=u):d=u===e.length&&n||void 0,d)try{c=await d(r,()=>a(u+1))}catch(h){if(h instanceof Error&&t)r.error=h,c=await t(h,r),o=!0;else throw h}else r.finalized===!1&&s&&(c=await s(r));return c&&(r.finalized===!1||o)&&(r.res=c),r}},wt=Symbol(),yt=async(e,t=Object.create(null))=>{const{all:s=!1,dot:r=!1}=t,i=(e instanceof nt?e.raw.headers:e.headers).get("Content-Type");return i!=null&&i.startsWith("multipart/form-data")||i!=null&&i.startsWith("application/x-www-form-urlencoded")?Rt(e,{all:s,dot:r}):{}};async function Rt(e,t){const s=await e.formData();return s?Et(s,t):{}}function Et(e,t){const s=Object.create(null);return e.forEach((r,n)=>{t.all||n.endsWith("[]")?jt(s,n,r):s[n]=r}),t.dot&&Object.entries(s).forEach(([r,n])=>{r.includes(".")&&(St(s,r,n),delete s[r])}),s}var jt=(e,t,s)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(s):e[t]=[e[t],s]:t.endsWith("[]")?e[t]=[s]:e[t]=s},St=(e,t,s)=>{let r=e;const n=t.split(".");n.forEach((i,a)=>{a===n.length-1?r[i]=s:((!r[i]||typeof r[i]!="object"||Array.isArray(r[i])||r[i]instanceof File)&&(r[i]=Object.create(null)),r=r[i])})},Ze=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},Ot=e=>{const{groups:t,path:s}=At(e),r=Ze(s);return Ct(r,t)},At=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(s,r)=>{const n=`@${r}`;return t.push([n,s]),n}),{groups:t,path:e}},Ct=(e,t)=>{for(let s=t.length-1;s>=0;s--){const[r]=t[s];for(let n=e.length-1;n>=0;n--)if(e[n].includes(r)){e[n]=e[n].replace(r,t[s][1]);break}}return e},Se={},Pt=(e,t)=>{if(e==="*")return"*";const s=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(s){const r=`${e}#${t}`;return Se[r]||(s[2]?Se[r]=t&&t[0]!==":"&&t[0]!=="*"?[r,s[1],new RegExp(`^${s[2]}(?=/${t})`)]:[e,s[1],new RegExp(`^${s[2]}$`)]:Se[r]=[e,s[1],!0]),Se[r]}return null},De=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,s=>{try{return t(s)}catch{return s}})}},Tt=e=>De(e,decodeURI),et=e=>{const t=e.url,s=t.indexOf("/",t.indexOf(":")+4);let r=s;for(;r<t.length;r++){const n=t.charCodeAt(r);if(n===37){const i=t.indexOf("?",r),a=t.slice(s,i===-1?void 0:i);return Tt(a.includes("%25")?a.replace(/%25/g,"%2525"):a)}else if(n===63)break}return t.slice(s,r)},Nt=e=>{const t=et(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},ie=(e,t,...s)=>(s.length&&(t=ie(t,...s)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),tt=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),s=[];let r="";return t.forEach(n=>{if(n!==""&&!/\:/.test(n))r+="/"+n;else if(/\:/.test(n))if(/\?/.test(n)){s.length===0&&r===""?s.push("/"):s.push(r);const i=n.replace("?","");r+="/"+i,s.push(r)}else r+="/"+n}),s.filter((n,i,a)=>a.indexOf(n)===i)},Le=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?De(e,rt):e):e,st=(e,t,s)=>{let r;if(!s&&t&&!/[%+]/.test(t)){let a=e.indexOf("?",8);if(a===-1)return;for(e.startsWith(t,a+1)||(a=e.indexOf(`&${t}`,a+1));a!==-1;){const u=e.charCodeAt(a+t.length+1);if(u===61){const c=a+t.length+2,o=e.indexOf("&",c);return Le(e.slice(c,o===-1?void 0:o))}else if(u==38||isNaN(u))return"";a=e.indexOf(`&${t}`,a+1)}if(r=/[%+]/.test(e),!r)return}const n={};r??(r=/[%+]/.test(e));let i=e.indexOf("?",8);for(;i!==-1;){const a=e.indexOf("&",i+1);let u=e.indexOf("=",i);u>a&&a!==-1&&(u=-1);let c=e.slice(i+1,u===-1?a===-1?void 0:a:u);if(r&&(c=Le(c)),i=a,c==="")continue;let o;u===-1?o="":(o=e.slice(u+1,a===-1?void 0:a),r&&(o=Le(o))),s?(n[c]&&Array.isArray(n[c])||(n[c]=[]),n[c].push(o)):n[c]??(n[c]=o)}return t?n[t]:n},Ut=st,kt=(e,t)=>st(e,t,!0),rt=decodeURIComponent,ze=e=>De(e,rt),le,C,F,it,at,_e,B,Ke,nt=(Ke=class{constructor(e,t="/",s=[[]]){m(this,F);g(this,"raw");m(this,le);m(this,C);g(this,"routeIndex",0);g(this,"path");g(this,"bodyCache",{});m(this,B,e=>{const{bodyCache:t,raw:s}=this,r=t[e];if(r)return r;const n=Object.keys(t)[0];return n?t[n].then(i=>(n==="json"&&(i=JSON.stringify(i)),new Response(i)[e]())):t[e]=s[e]()});this.raw=e,this.path=t,p(this,C,s),p(this,le,{})}param(e){return e?v(this,F,it).call(this,e):v(this,F,at).call(this)}query(e){return Ut(this.url,e)}queries(e){return kt(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((s,r)=>{t[r]=s}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await yt(this,e))}json(){return l(this,B).call(this,"text").then(e=>JSON.parse(e))}text(){return l(this,B).call(this,"text")}arrayBuffer(){return l(this,B).call(this,"arrayBuffer")}blob(){return l(this,B).call(this,"blob")}formData(){return l(this,B).call(this,"formData")}addValidatedData(e,t){l(this,le)[e]=t}valid(e){return l(this,le)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[wt](){return l(this,C)}get matchedRoutes(){return l(this,C)[0].map(([[,e]])=>e)}get routePath(){return l(this,C)[0].map(([[,e]])=>e)[this.routeIndex].path}},le=new WeakMap,C=new WeakMap,F=new WeakSet,it=function(e){const t=l(this,C)[0][this.routeIndex][1][e],s=v(this,F,_e).call(this,t);return s&&/\%/.test(s)?ze(s):s},at=function(){const e={},t=Object.keys(l(this,C)[0][this.routeIndex][1]);for(const s of t){const r=v(this,F,_e).call(this,l(this,C)[0][this.routeIndex][1][s]);r!==void 0&&(e[s]=/\%/.test(r)?ze(r):r)}return e},_e=function(e){return l(this,C)[1]?l(this,C)[1][e]:e},B=new WeakMap,Ke),$t={Stringify:1},ot=async(e,t,s,r,n)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const i=e.callbacks;return i!=null&&i.length?(n?n[0]+=e:n=[e],Promise.all(i.map(u=>u({phase:t,buffer:n,context:r}))).then(u=>Promise.all(u.filter(Boolean).map(c=>ot(c,t,!1,r,n))).then(()=>n[0]))):Promise.resolve(e)},Lt="text/plain; charset=UTF-8",He=(e,t)=>({"Content-Type":e,...t}),ve,we,_,ce,D,A,ye,ue,de,Q,Re,Ee,W,ae,Ve,Ht=(Ve=class{constructor(e,t){m(this,W);m(this,ve);m(this,we);g(this,"env",{});m(this,_);g(this,"finalized",!1);g(this,"error");m(this,ce);m(this,D);m(this,A);m(this,ye);m(this,ue);m(this,de);m(this,Q);m(this,Re);m(this,Ee);g(this,"render",(...e)=>(l(this,ue)??p(this,ue,t=>this.html(t)),l(this,ue).call(this,...e)));g(this,"setLayout",e=>p(this,ye,e));g(this,"getLayout",()=>l(this,ye));g(this,"setRenderer",e=>{p(this,ue,e)});g(this,"header",(e,t,s)=>{this.finalized&&p(this,A,new Response(l(this,A).body,l(this,A)));const r=l(this,A)?l(this,A).headers:l(this,Q)??p(this,Q,new Headers);t===void 0?r.delete(e):s!=null&&s.append?r.append(e,t):r.set(e,t)});g(this,"status",e=>{p(this,ce,e)});g(this,"set",(e,t)=>{l(this,_)??p(this,_,new Map),l(this,_).set(e,t)});g(this,"get",e=>l(this,_)?l(this,_).get(e):void 0);g(this,"newResponse",(...e)=>v(this,W,ae).call(this,...e));g(this,"body",(e,t,s)=>v(this,W,ae).call(this,e,t,s));g(this,"text",(e,t,s)=>!l(this,Q)&&!l(this,ce)&&!t&&!s&&!this.finalized?new Response(e):v(this,W,ae).call(this,e,t,He(Lt,s)));g(this,"json",(e,t,s)=>v(this,W,ae).call(this,JSON.stringify(e),t,He("application/json",s)));g(this,"html",(e,t,s)=>{const r=n=>v(this,W,ae).call(this,n,t,He("text/html; charset=UTF-8",s));return typeof e=="object"?ot(e,$t.Stringify,!1,{}).then(r):r(e)});g(this,"redirect",(e,t)=>{const s=String(e);return this.header("Location",/[^\x00-\xFF]/.test(s)?encodeURI(s):s),this.newResponse(null,t??302)});g(this,"notFound",()=>(l(this,de)??p(this,de,()=>new Response),l(this,de).call(this,this)));p(this,ve,e),t&&(p(this,D,t.executionCtx),this.env=t.env,p(this,de,t.notFoundHandler),p(this,Ee,t.path),p(this,Re,t.matchResult))}get req(){return l(this,we)??p(this,we,new nt(l(this,ve),l(this,Ee),l(this,Re))),l(this,we)}get event(){if(l(this,D)&&"respondWith"in l(this,D))return l(this,D);throw Error("This context has no FetchEvent")}get executionCtx(){if(l(this,D))return l(this,D);throw Error("This context has no ExecutionContext")}get res(){return l(this,A)||p(this,A,new Response(null,{headers:l(this,Q)??p(this,Q,new Headers)}))}set res(e){if(l(this,A)&&e){e=new Response(e.body,e);for(const[t,s]of l(this,A).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const r=l(this,A).headers.getSetCookie();e.headers.delete("set-cookie");for(const n of r)e.headers.append("set-cookie",n)}else e.headers.set(t,s)}p(this,A,e),this.finalized=!0}get var(){return l(this,_)?Object.fromEntries(l(this,_)):{}}},ve=new WeakMap,we=new WeakMap,_=new WeakMap,ce=new WeakMap,D=new WeakMap,A=new WeakMap,ye=new WeakMap,ue=new WeakMap,de=new WeakMap,Q=new WeakMap,Re=new WeakMap,Ee=new WeakMap,W=new WeakSet,ae=function(e,t,s){const r=l(this,A)?new Headers(l(this,A).headers):l(this,Q)??new Headers;if(typeof t=="object"&&"headers"in t){const i=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[a,u]of i)a.toLowerCase()==="set-cookie"?r.append(a,u):r.set(a,u)}if(s)for(const[i,a]of Object.entries(s))if(typeof a=="string")r.set(i,a);else{r.delete(i);for(const u of a)r.append(i,u)}const n=typeof t=="number"?t:(t==null?void 0:t.status)??l(this,ce);return new Response(e,{status:n,headers:r})},Ve),R="ALL",_t="all",Dt=["get","post","put","delete","options","patch"],lt="Can not add a route since the matcher is already built.",ct=class extends Error{},Mt="__COMPOSED_HANDLER",It=e=>e.text("404 Not Found",404),Be=(e,t)=>{if("getResponse"in e){const s=e.getResponse();return t.newResponse(s.body,s)}return console.error(e),t.text("Internal Server Error",500)},N,E,ut,U,X,Oe,Ae,he,Ft=(he=class{constructor(t={}){m(this,E);g(this,"get");g(this,"post");g(this,"put");g(this,"delete");g(this,"options");g(this,"patch");g(this,"all");g(this,"on");g(this,"use");g(this,"router");g(this,"getPath");g(this,"_basePath","/");m(this,N,"/");g(this,"routes",[]);m(this,U,It);g(this,"errorHandler",Be);g(this,"onError",t=>(this.errorHandler=t,this));g(this,"notFound",t=>(p(this,U,t),this));g(this,"fetch",(t,...s)=>v(this,E,Ae).call(this,t,s[1],s[0],t.method));g(this,"request",(t,s,r,n)=>t instanceof Request?this.fetch(s?new Request(t,s):t,r,n):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${ie("/",t)}`,s),r,n)));g(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(v(this,E,Ae).call(this,t.request,t,void 0,t.request.method))})});[...Dt,_t].forEach(i=>{this[i]=(a,...u)=>(typeof a=="string"?p(this,N,a):v(this,E,X).call(this,i,l(this,N),a),u.forEach(c=>{v(this,E,X).call(this,i,l(this,N),c)}),this)}),this.on=(i,a,...u)=>{for(const c of[a].flat()){p(this,N,c);for(const o of[i].flat())u.map(d=>{v(this,E,X).call(this,o.toUpperCase(),l(this,N),d)})}return this},this.use=(i,...a)=>(typeof i=="string"?p(this,N,i):(p(this,N,"*"),a.unshift(i)),a.forEach(u=>{v(this,E,X).call(this,R,l(this,N),u)}),this);const{strict:r,...n}=t;Object.assign(this,n),this.getPath=r??!0?t.getPath??et:Nt}route(t,s){const r=this.basePath(t);return s.routes.map(n=>{var a;let i;s.errorHandler===Be?i=n.handler:(i=async(u,c)=>(await qe([],s.errorHandler)(u,()=>n.handler(u,c))).res,i[Mt]=n.handler),v(a=r,E,X).call(a,n.method,n.path,i)}),this}basePath(t){const s=v(this,E,ut).call(this);return s._basePath=ie(this._basePath,t),s}mount(t,s,r){let n,i;r&&(typeof r=="function"?i=r:(i=r.optionHandler,r.replaceRequest===!1?n=c=>c:n=r.replaceRequest));const a=i?c=>{const o=i(c);return Array.isArray(o)?o:[o]}:c=>{let o;try{o=c.executionCtx}catch{}return[c.env,o]};n||(n=(()=>{const c=ie(this._basePath,t),o=c==="/"?0:c.length;return d=>{const h=new URL(d.url);return h.pathname=h.pathname.slice(o)||"/",new Request(h,d)}})());const u=async(c,o)=>{const d=await s(n(c.req.raw),...a(c));if(d)return d;await o()};return v(this,E,X).call(this,R,ie(t,"*"),u),this}},N=new WeakMap,E=new WeakSet,ut=function(){const t=new he({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,p(t,U,l(this,U)),t.routes=this.routes,t},U=new WeakMap,X=function(t,s,r){t=t.toUpperCase(),s=ie(this._basePath,s);const n={basePath:this._basePath,path:s,method:t,handler:r};this.router.add(t,s,[r,n]),this.routes.push(n)},Oe=function(t,s){if(t instanceof Error)return this.errorHandler(t,s);throw t},Ae=function(t,s,r,n){if(n==="HEAD")return(async()=>new Response(null,await v(this,E,Ae).call(this,t,s,r,"GET")))();const i=this.getPath(t,{env:r}),a=this.router.match(n,i),u=new Ht(t,{path:i,matchResult:a,env:r,executionCtx:s,notFoundHandler:l(this,U)});if(a[0].length===1){let o;try{o=a[0][0][0][0](u,async()=>{u.res=await l(this,U).call(this,u)})}catch(d){return v(this,E,Oe).call(this,d,u)}return o instanceof Promise?o.then(d=>d||(u.finalized?u.res:l(this,U).call(this,u))).catch(d=>v(this,E,Oe).call(this,d,u)):o??l(this,U).call(this,u)}const c=qe(a[0],this.errorHandler,l(this,U));return(async()=>{try{const o=await c(u);if(!o.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return o.res}catch(o){return v(this,E,Oe).call(this,o,u)}})()},he),dt=[];function qt(e,t){const s=this.buildAllMatchers(),r=((n,i)=>{const a=s[n]||s[R],u=a[2][i];if(u)return u;const c=i.match(a[0]);if(!c)return[[],dt];const o=c.indexOf("",1);return[a[1][o],c]});return this.match=r,r(e,t)}var Pe="[^/]+",xe=".*",be="(?:|/.*)",oe=Symbol(),zt=new Set(".\\+*[^]$()");function Bt(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===xe||e===be?1:t===xe||t===be?-1:e===Pe?1:t===Pe?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var Z,ee,k,re,Wt=(re=class{constructor(){m(this,Z);m(this,ee);m(this,k,Object.create(null))}insert(t,s,r,n,i){if(t.length===0){if(l(this,Z)!==void 0)throw oe;if(i)return;p(this,Z,s);return}const[a,...u]=t,c=a==="*"?u.length===0?["","",xe]:["","",Pe]:a==="/*"?["","",be]:a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let o;if(c){const d=c[1];let h=c[2]||Pe;if(d&&c[2]&&(h===".*"||(h=h.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(h))))throw oe;if(o=l(this,k)[h],!o){if(Object.keys(l(this,k)).some(f=>f!==xe&&f!==be))throw oe;if(i)return;o=l(this,k)[h]=new re,d!==""&&p(o,ee,n.varIndex++)}!i&&d!==""&&r.push([d,l(o,ee)])}else if(o=l(this,k)[a],!o){if(Object.keys(l(this,k)).some(d=>d.length>1&&d!==xe&&d!==be))throw oe;if(i)return;o=l(this,k)[a]=new re}o.insert(u,s,r,n,i)}buildRegExpStr(){const s=Object.keys(l(this,k)).sort(Bt).map(r=>{const n=l(this,k)[r];return(typeof l(n,ee)=="number"?`(${r})@${l(n,ee)}`:zt.has(r)?`\\${r}`:r)+n.buildRegExpStr()});return typeof l(this,Z)=="number"&&s.unshift(`#${l(this,Z)}`),s.length===0?"":s.length===1?s[0]:"(?:"+s.join("|")+")"}},Z=new WeakMap,ee=new WeakMap,k=new WeakMap,re),Te,je,Je,Gt=(Je=class{constructor(){m(this,Te,{varIndex:0});m(this,je,new Wt)}insert(e,t,s){const r=[],n=[];for(let a=0;;){let u=!1;if(e=e.replace(/\{[^}]+\}/g,c=>{const o=`@\\${a}`;return n[a]=[o,c],a++,u=!0,o}),!u)break}const i=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let a=n.length-1;a>=0;a--){const[u]=n[a];for(let c=i.length-1;c>=0;c--)if(i[c].indexOf(u)!==-1){i[c]=i[c].replace(u,n[a][1]);break}}return l(this,je).insert(i,t,r,l(this,Te),s),r}buildRegExp(){let e=l(this,je).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const s=[],r=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(n,i,a)=>i!==void 0?(s[++t]=Number(i),"$()"):(a!==void 0&&(r[Number(a)]=++t),"")),[new RegExp(`^${e}`),s,r]}},Te=new WeakMap,je=new WeakMap,Je),Kt=[/^$/,[],Object.create(null)],Ce=Object.create(null);function ht(e){return Ce[e]??(Ce[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,s)=>s?`\\${s}`:"(?:|/.*)")}$`))}function Vt(){Ce=Object.create(null)}function Jt(e){var o;const t=new Gt,s=[];if(e.length===0)return Kt;const r=e.map(d=>[!/\*|\/:/.test(d[0]),...d]).sort(([d,h],[f,b])=>d?1:f?-1:h.length-b.length),n=Object.create(null);for(let d=0,h=-1,f=r.length;d<f;d++){const[b,w,S]=r[d];b?n[w]=[S.map(([y])=>[y,Object.create(null)]),dt]:h++;let x;try{x=t.insert(w,h,b)}catch(y){throw y===oe?new ct(w):y}b||(s[h]=S.map(([y,$])=>{const q=Object.create(null);for($-=1;$>=0;$--){const[P,T]=x[$];q[P]=T}return[y,q]}))}const[i,a,u]=t.buildRegExp();for(let d=0,h=s.length;d<h;d++)for(let f=0,b=s[d].length;f<b;f++){const w=(o=s[d][f])==null?void 0:o[1];if(!w)continue;const S=Object.keys(w);for(let x=0,y=S.length;x<y;x++)w[S[x]]=u[w[S[x]]]}const c=[];for(const d in a)c[d]=s[a[d]];return[i,c,n]}function ne(e,t){if(e){for(const s of Object.keys(e).sort((r,n)=>n.length-r.length))if(ht(s).test(t))return[...e[s]]}}var G,K,Ne,ft,Xe,Xt=(Xe=class{constructor(){m(this,Ne);g(this,"name","RegExpRouter");m(this,G);m(this,K);g(this,"match",qt);p(this,G,{[R]:Object.create(null)}),p(this,K,{[R]:Object.create(null)})}add(e,t,s){var u;const r=l(this,G),n=l(this,K);if(!r||!n)throw new Error(lt);r[e]||[r,n].forEach(c=>{c[e]=Object.create(null),Object.keys(c[R]).forEach(o=>{c[e][o]=[...c[R][o]]})}),t==="/*"&&(t="*");const i=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const c=ht(t);e===R?Object.keys(r).forEach(o=>{var d;(d=r[o])[t]||(d[t]=ne(r[o],t)||ne(r[R],t)||[])}):(u=r[e])[t]||(u[t]=ne(r[e],t)||ne(r[R],t)||[]),Object.keys(r).forEach(o=>{(e===R||e===o)&&Object.keys(r[o]).forEach(d=>{c.test(d)&&r[o][d].push([s,i])})}),Object.keys(n).forEach(o=>{(e===R||e===o)&&Object.keys(n[o]).forEach(d=>c.test(d)&&n[o][d].push([s,i]))});return}const a=tt(t)||[t];for(let c=0,o=a.length;c<o;c++){const d=a[c];Object.keys(n).forEach(h=>{var f;(e===R||e===h)&&((f=n[h])[d]||(f[d]=[...ne(r[h],d)||ne(r[R],d)||[]]),n[h][d].push([s,i-o+c+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(l(this,K)).concat(Object.keys(l(this,G))).forEach(t=>{e[t]||(e[t]=v(this,Ne,ft).call(this,t))}),p(this,G,p(this,K,void 0)),Vt(),e}},G=new WeakMap,K=new WeakMap,Ne=new WeakSet,ft=function(e){const t=[];let s=e===R;return[l(this,G),l(this,K)].forEach(r=>{const n=r[e]?Object.keys(r[e]).map(i=>[i,r[e][i]]):[];n.length!==0?(s||(s=!0),t.push(...n)):e!==R&&t.push(...Object.keys(r[R]).map(i=>[i,r[R][i]]))}),s?Jt(t):null},Xe),V,M,Ye,Yt=(Ye=class{constructor(e){g(this,"name","SmartRouter");m(this,V,[]);m(this,M,[]);p(this,V,e.routers)}add(e,t,s){if(!l(this,M))throw new Error(lt);l(this,M).push([e,t,s])}match(e,t){if(!l(this,M))throw new Error("Fatal error");const s=l(this,V),r=l(this,M),n=s.length;let i=0,a;for(;i<n;i++){const u=s[i];try{for(let c=0,o=r.length;c<o;c++)u.add(...r[c]);a=u.match(e,t)}catch(c){if(c instanceof ct)continue;throw c}this.match=u.match.bind(u),p(this,V,[u]),p(this,M,void 0);break}if(i===n)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,a}get activeRouter(){if(l(this,M)||l(this,V).length!==1)throw new Error("No active router has been determined yet.");return l(this,V)[0]}},V=new WeakMap,M=new WeakMap,Ye),me=Object.create(null),J,O,te,fe,j,I,Y,pe,Qt=(pe=class{constructor(t,s,r){m(this,I);m(this,J);m(this,O);m(this,te);m(this,fe,0);m(this,j,me);if(p(this,O,r||Object.create(null)),p(this,J,[]),t&&s){const n=Object.create(null);n[t]={handler:s,possibleKeys:[],score:0},p(this,J,[n])}p(this,te,[])}insert(t,s,r){p(this,fe,++Fe(this,fe)._);let n=this;const i=Ot(s),a=[];for(let u=0,c=i.length;u<c;u++){const o=i[u],d=i[u+1],h=Pt(o,d),f=Array.isArray(h)?h[0]:o;if(f in l(n,O)){n=l(n,O)[f],h&&a.push(h[1]);continue}l(n,O)[f]=new pe,h&&(l(n,te).push(h),a.push(h[1])),n=l(n,O)[f]}return l(n,J).push({[t]:{handler:r,possibleKeys:a.filter((u,c,o)=>o.indexOf(u)===c),score:l(this,fe)}}),n}search(t,s){var c;const r=[];p(this,j,me);let i=[this];const a=Ze(s),u=[];for(let o=0,d=a.length;o<d;o++){const h=a[o],f=o===d-1,b=[];for(let w=0,S=i.length;w<S;w++){const x=i[w],y=l(x,O)[h];y&&(p(y,j,l(x,j)),f?(l(y,O)["*"]&&r.push(...v(this,I,Y).call(this,l(y,O)["*"],t,l(x,j))),r.push(...v(this,I,Y).call(this,y,t,l(x,j)))):b.push(y));for(let $=0,q=l(x,te).length;$<q;$++){const P=l(x,te)[$],T=l(x,j)===me?{}:{...l(x,j)};if(P==="*"){const z=l(x,O)["*"];z&&(r.push(...v(this,I,Y).call(this,z,t,l(x,j))),p(z,j,T),b.push(z));continue}const[Ue,Me,ge]=P;if(!h&&!(ge instanceof RegExp))continue;const H=l(x,O)[Ue],xt=a.slice(o).join("/");if(ge instanceof RegExp){const z=ge.exec(xt);if(z){if(T[Me]=z[0],r.push(...v(this,I,Y).call(this,H,t,l(x,j),T)),Object.keys(l(H,O)).length){p(H,j,T);const ke=((c=z[0].match(/\//))==null?void 0:c.length)??0;(u[ke]||(u[ke]=[])).push(H)}continue}}(ge===!0||ge.test(h))&&(T[Me]=h,f?(r.push(...v(this,I,Y).call(this,H,t,T,l(x,j))),l(H,O)["*"]&&r.push(...v(this,I,Y).call(this,l(H,O)["*"],t,T,l(x,j)))):(p(H,j,T),b.push(H)))}}i=b.concat(u.shift()??[])}return r.length>1&&r.sort((o,d)=>o.score-d.score),[r.map(({handler:o,params:d})=>[o,d])]}},J=new WeakMap,O=new WeakMap,te=new WeakMap,fe=new WeakMap,j=new WeakMap,I=new WeakSet,Y=function(t,s,r,n){const i=[];for(let a=0,u=l(t,J).length;a<u;a++){const c=l(t,J)[a],o=c[s]||c[R],d={};if(o!==void 0&&(o.params=Object.create(null),i.push(o),r!==me||n&&n!==me))for(let h=0,f=o.possibleKeys.length;h<f;h++){const b=o.possibleKeys[h],w=d[o.score];o.params[b]=n!=null&&n[b]&&!w?n[b]:r[b]??(n==null?void 0:n[b]),d[o.score]=!0}}return i},pe),se,Qe,Zt=(Qe=class{constructor(){g(this,"name","TrieRouter");m(this,se);p(this,se,new Qt)}add(e,t,s){const r=tt(t);if(r){for(let n=0,i=r.length;n<i;n++)l(this,se).insert(e,r[n],s);return}l(this,se).insert(e,t,s)}match(e,t){return l(this,se).search(e,t)}},se=new WeakMap,Qe),pt=class extends Ft{constructor(e={}){super(e),this.router=e.router??new Yt({routers:[new Xt,new Zt]})}},es=e=>{const s={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},r=(i=>typeof i=="string"?i==="*"?()=>i:a=>i===a?a:null:typeof i=="function"?i:a=>i.includes(a)?a:null)(s.origin),n=(i=>typeof i=="function"?i:Array.isArray(i)?()=>i:()=>[])(s.allowMethods);return async function(a,u){var d;function c(h,f){a.res.headers.set(h,f)}const o=await r(a.req.header("origin")||"",a);if(o&&c("Access-Control-Allow-Origin",o),s.credentials&&c("Access-Control-Allow-Credentials","true"),(d=s.exposeHeaders)!=null&&d.length&&c("Access-Control-Expose-Headers",s.exposeHeaders.join(",")),a.req.method==="OPTIONS"){s.origin!=="*"&&c("Vary","Origin"),s.maxAge!=null&&c("Access-Control-Max-Age",s.maxAge.toString());const h=await n(a.req.header("origin")||"",a);h.length&&c("Access-Control-Allow-Methods",h.join(","));let f=s.allowHeaders;if(!(f!=null&&f.length)){const b=a.req.header("Access-Control-Request-Headers");b&&(f=b.split(/\s*,\s*/))}return f!=null&&f.length&&(c("Access-Control-Allow-Headers",f.join(",")),a.res.headers.append("Vary","Access-Control-Request-Headers")),a.res.headers.delete("Content-Length"),a.res.headers.delete("Content-Type"),new Response(null,{headers:a.res.headers,status:204,statusText:"No Content"})}await u(),s.origin!=="*"&&a.header("Vary","Origin",{append:!0})}},ts=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,We=(e,t=rs)=>{const s=/\.([a-zA-Z0-9]+?)$/,r=e.match(s);if(!r)return;let n=t[r[1]];return n&&n.startsWith("text")&&(n+="; charset=utf-8"),n},ss={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},rs=ss,ns=(...e)=>{let t=e.filter(n=>n!=="").join("/");t=t.replace(new RegExp("(?<=\\/)\\/+","g"),"");const s=t.split("/"),r=[];for(const n of s)n===".."&&r.length>0&&r.at(-1)!==".."?r.pop():n!=="."&&r.push(n);return r.join("/")||"."},gt={br:".br",zstd:".zst",gzip:".gz"},is=Object.keys(gt),as="index.html",os=e=>{const t=e.root??"./",s=e.path,r=e.join??ns;return async(n,i)=>{var d,h,f,b;if(n.finalized)return i();let a;if(e.path)a=e.path;else try{if(a=decodeURIComponent(n.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(a))throw new Error}catch{return await((d=e.onNotFound)==null?void 0:d.call(e,n.req.path,n)),i()}let u=r(t,!s&&e.rewriteRequestPath?e.rewriteRequestPath(a):a);e.isDir&&await e.isDir(u)&&(u=r(u,as));const c=e.getContent;let o=await c(u,n);if(o instanceof Response)return n.newResponse(o.body,o);if(o){const w=e.mimes&&We(u,e.mimes)||We(u);if(n.header("Content-Type",w||"application/octet-stream"),e.precompressed&&(!w||ts.test(w))){const S=new Set((h=n.req.header("Accept-Encoding"))==null?void 0:h.split(",").map(x=>x.trim()));for(const x of is){if(!S.has(x))continue;const y=await c(u+gt[x],n);if(y){o=y,n.header("Content-Encoding",x),n.header("Vary","Accept-Encoding",{append:!0});break}}}return await((f=e.onFound)==null?void 0:f.call(e,u,n)),n.body(o)}await((b=e.onNotFound)==null?void 0:b.call(e,u,n)),await i()}},ls=async(e,t)=>{let s;t&&t.manifest?typeof t.manifest=="string"?s=JSON.parse(t.manifest):s=t.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?s=JSON.parse(__STATIC_CONTENT_MANIFEST):s=__STATIC_CONTENT_MANIFEST;let r;t&&t.namespace?r=t.namespace:r=__STATIC_CONTENT;const n=s[e]||e;if(!n)return null;const i=await r.get(n,{type:"stream"});return i||null},cs=e=>async function(s,r){return os({...e,getContent:async i=>ls(i,{manifest:e.manifest,namespace:e.namespace?e.namespace:s.env?s.env.__STATIC_CONTENT:void 0})})(s,r)},us=e=>cs(e);const L=new pt;L.use("/api/*",es());L.use("/static/*",us({root:"./public"}));L.get("/",e=>e.html(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>스크린샷 자동 생성 도구</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-8">
        <div class="max-w-5xl mx-auto">
            <div class="bg-white rounded-xl shadow-2xl p-8">
                <h1 class="text-4xl font-bold text-gray-800 mb-3 flex items-center">
                    <i class="fas fa-camera text-indigo-600 mr-3"></i>
                    스크린샷 자동 생성 도구
                </h1>
                <p class="text-gray-600 mb-8">여러 URL의 전체 페이지 스크린샷을 한 번에 생성하세요</p>

                <!-- 사이트 분석 도구 -->
                <div class="mb-6">
                    <div class="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
                        <h3 class="text-sm font-bold text-purple-800 mb-3 flex items-center">
                            <i class="fas fa-search-plus mr-2"></i>
                            🔍 사이트 URL 자동 분석
                        </h3>
                        <p class="text-xs text-gray-600 mb-3">
                            웹사이트의 모든 페이지 URL을 자동으로 찾아드립니다. 시작 URL만 입력하세요!
                        </p>
                        <div class="flex gap-2">
                            <input 
                                type="text" 
                                id="analyzeUrl" 
                                placeholder="https://example.com" 
                                class="flex-1 px-4 py-2 border border-purple-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                            <button 
                                onclick="analyzeSite()"
                                class="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition duration-200 flex items-center text-sm"
                            >
                                <i class="fas fa-search mr-2"></i>
                                분석
                            </button>
                        </div>
                        
                        <!-- 분석 결과 영역 -->
                        <div id="analyzeResult" class="mt-4 hidden">
                            <div class="bg-white rounded-lg p-4 border border-purple-200">
                                <div class="flex justify-between items-center mb-2">
                                    <span class="text-sm font-semibold text-purple-800">
                                        <i class="fas fa-check-circle text-green-500 mr-1"></i>
                                        발견된 URL: <span id="foundUrlCount">0</span>개
                                    </span>
                                    <button 
                                        onclick="copyFoundUrls()"
                                        class="px-4 py-1 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold rounded transition duration-200"
                                    >
                                        <i class="fas fa-copy mr-1"></i>
                                        전체 복사
                                    </button>
                                </div>
                                <div id="foundUrlList" class="max-h-48 overflow-y-auto bg-gray-50 rounded p-3 font-mono text-xs">
                                    <!-- URL 목록이 여기에 표시됩니다 -->
                                </div>
                                <button 
                                    onclick="applyFoundUrls()"
                                    class="w-full mt-3 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-200"
                                >
                                    <i class="fas fa-arrow-down mr-2"></i>
                                    아래 URL 입력란에 적용하기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- URL 입력 영역 -->
                <div class="mb-6">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                        <i class="fas fa-link mr-2"></i>URL 목록 (한 줄에 하나씩)
                    </label>
                    <textarea 
                        id="urlInput" 
                        rows="8" 
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
                        placeholder="https://example.com&#10;https://another-site.com&#10;https://third-site.com"
                    ></textarea>
                    <p class="text-xs text-gray-500 mt-2">
                        <i class="fas fa-info-circle mr-1"></i>
                        각 URL은 새 줄로 구분하세요
                    </p>
                </div>

                <!-- 크롤링 모드 선택 -->
                <div class="mb-6">
                    <label class="block text-sm font-semibold text-gray-700 mb-3">
                        <i class="fas fa-spider mr-2"></i>크롤링 모드
                    </label>
                    <div class="flex gap-4">
                        <label class="flex items-center cursor-pointer">
                            <input type="radio" name="crawlMode" value="manual" checked class="mr-2">
                            <span class="text-sm">수동 입력 (URL 목록)</span>
                        </label>
                        <label class="flex items-center cursor-pointer">
                            <input type="radio" name="crawlMode" value="auto" class="mr-2">
                            <span class="text-sm">자동 크롤링 (전체 사이트)</span>
                        </label>
                    </div>
                    <p class="text-xs text-gray-500 mt-2">
                        <i class="fas fa-info-circle mr-1"></i>
                        자동 크롤링: 입력한 URL의 모든 내부 링크를 자동으로 찾아서 스크린샷 생성
                    </p>
                </div>

                <!-- 크롤링 옵션 (자동 모드일 때만 표시) -->
                <div id="crawlOptions" class="mb-6 hidden">
                    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 class="text-sm font-semibold text-yellow-800 mb-2">
                            <i class="fas fa-exclamation-triangle mr-2"></i>크롤링 옵션
                        </h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-xs font-semibold text-gray-700 mb-1">최대 페이지 수</label>
                                <input type="number" id="maxPages" value="20" min="1" max="100" 
                                    class="w-full px-3 py-2 border border-gray-300 rounded text-sm">
                            </div>
                            <div>
                                <label class="block text-xs font-semibold text-gray-700 mb-1">크롤링 깊이</label>
                                <input type="number" id="maxDepth" value="2" min="1" max="5" 
                                    class="w-full px-3 py-2 border border-gray-300 rounded text-sm">
                            </div>
                        </div>
                        <p class="text-xs text-gray-600 mt-2">
                            <i class="fas fa-lightbulb mr-1"></i>
                            시작 URL에서 링크를 따라가며 자동으로 페이지를 찾습니다 (같은 도메인만)
                        </p>
                    </div>
                </div>

                <!-- 옵션 설정 -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-tv mr-2"></i>화면 너비
                        </label>
                        <select id="widthSelect" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                            <option value="1920">Desktop (1920px)</option>
                            <option value="1366">Laptop (1366px)</option>
                            <option value="768">Tablet (768px)</option>
                            <option value="375">Mobile (375px)</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-file-image mr-2"></i>이미지 포맷
                        </label>
                        <select id="formatSelect" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                            <option value="png">PNG (고품질)</option>
                            <option value="jpeg">JPEG (작은 용량)</option>
                            <option value="webp">WebP (최적화)</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-expand-arrows-alt mr-2"></i>캡처 모드
                        </label>
                        <select id="fullPageSelect" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                            <option value="true">전체 페이지</option>
                            <option value="false">첫 화면만</option>
                        </select>
                    </div>
                </div>

                <!-- 실행 버튼 -->
                <button 
                    id="startBtn" 
                    onclick="startScreenshots()"
                    class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-lg transition duration-200 flex items-center justify-center text-lg shadow-lg"
                >
                    <i class="fas fa-play-circle mr-3 text-xl"></i>
                    스크린샷 생성 시작
                </button>

                <!-- 진행 상태 -->
                <div id="progressSection" class="mt-8 hidden">
                    <div class="bg-gray-50 rounded-lg p-6">
                        <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center">
                            <i class="fas fa-tasks mr-2 text-indigo-600"></i>
                            진행 상태
                        </h3>
                        <div class="mb-4">
                            <div class="flex justify-between text-sm text-gray-600 mb-2">
                                <span id="progressText">0 / 0 완료</span>
                                <span id="progressPercent">0%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                                <div id="progressBar" class="bg-gradient-to-r from-indigo-500 to-purple-600 h-4 rounded-full transition-all duration-300" style="width: 0%"></div>
                            </div>
                        </div>
                        <div id="logContainer" class="bg-white rounded border border-gray-200 p-4 max-h-64 overflow-y-auto font-mono text-xs">
                            <div class="text-gray-500">로그가 여기에 표시됩니다...</div>
                        </div>
                    </div>
                </div>

                <!-- 결과 영역 -->
                <div id="resultsSection" class="mt-8 hidden">
                    <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center">
                        <i class="fas fa-images mr-2 text-green-600"></i>
                        생성된 스크린샷
                    </h3>
                    <div id="resultsGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <!-- 결과가 여기에 추가됩니다 -->
                    </div>
                </div>
            </div>

            <!-- 사용 안내 -->
            <div class="mt-8 bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-lg font-bold text-gray-800 mb-3 flex items-center">
                    <i class="fas fa-question-circle text-blue-600 mr-2"></i>
                    사용 방법
                </h3>
                <ul class="space-y-2 text-gray-700">
                    <li class="flex items-start">
                        <i class="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                        <span>URL 목록 입력란에 스크린샷을 찍고 싶은 웹사이트 주소를 한 줄에 하나씩 입력하세요</span>
                    </li>
                    <li class="flex items-start">
                        <i class="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                        <span>화면 크기, 이미지 포맷, 캡처 모드를 선택하세요</span>
                    </li>
                    <li class="flex items-start">
                        <i class="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                        <span>"스크린샷 생성 시작" 버튼을 클릭하면 자동으로 모든 URL의 스크린샷이 생성됩니다</span>
                    </li>
                    <li class="flex items-start">
                        <i class="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                        <span>완료된 스크린샷은 개별적으로 다운로드하거나 일괄 다운로드할 수 있습니다</span>
                    </li>
                </ul>
            </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
        <script src="/static/app.js"><\/script>
    </body>
    </html>
  `));L.post("/api/screenshot",async e=>{var t,s;try{const{url:r,width:n=1920,format:i="png",fullPage:a=!0}=await e.req.json();if(!r)return e.json({error:"URL이 필요합니다"},400);const u="https://api.microlink.io",c=new URLSearchParams({url:r,screenshot:"true",meta:"false",viewport:JSON.stringify({width:n,height:1080}),fullPage:a.toString(),type:i}),o=await fetch(`${u}?${c.toString()}`);if(!o.ok)throw new Error(`스크린샷 API 오류: ${o.status}`);const d=await o.json();if(d.status!=="success"||!((s=(t=d.data)==null?void 0:t.screenshot)!=null&&s.url))throw new Error("스크린샷 URL을 가져올 수 없습니다");const h=await fetch(d.data.screenshot.url);if(!h.ok)throw new Error("스크린샷 이미지를 다운로드할 수 없습니다");const f=await h.arrayBuffer(),b=`screenshots/${Date.now()}-${Math.random().toString(36).substring(7)}.${i}`,{env:w}=e;return w.SCREENSHOTS&&await w.SCREENSHOTS.put(b,f,{httpMetadata:{contentType:`image/${i}`}}),e.json({success:!0,url:r,fileName:b,size:f.byteLength,timestamp:new Date().toISOString()})}catch(r){return console.error("스크린샷 생성 오류:",r),e.json({error:"스크린샷 생성 중 오류가 발생했습니다",details:r instanceof Error?r.message:String(r)},500)}});L.post("/api/analyze",async e=>{try{const{url:t}=await e.req.json();if(!t)return e.json({error:"URL이 필요합니다"},400);const r=new URL(t).origin,n=["/","/about","/contact","/faq","/login","/signup","/register","/settings","/profile","/dashboard","/courses","/courses/major","/courses/general","/subjects","/schedule","/requirements","/requirements/master","/requirements/doctoral","/graduation","/thesis","/credits","/papers","/papers/international-conference","/papers/domestic-conference","/papers/international-journal","/papers/domestic-journal","/products","/services","/pricing","/features","/blog","/news","/events","/gallery","/portfolio","/team","/careers","/support","/docs","/documentation","/api","/terms","/privacy","/sitemap"],i=[],a=[];for(const o of n){const d=`${r}${o}`;a.push(fetch(d,{method:"HEAD",headers:{"User-Agent":"Mozilla/5.0"}}).then(h=>h.ok?d:null).catch(()=>null))}const u=await Promise.all(a);for(const o of u)o&&i.push(o);const c=Array.from(new Set(i)).sort();return e.json({success:!0,baseUrl:t,foundUrls:c,count:c.length})}catch(t){return console.error("사이트 분석 오류:",t),e.json({error:"사이트 분석 중 오류가 발생했습니다",details:t instanceof Error?t.message:String(t)},500)}});L.post("/api/crawl",async e=>{var t;try{const{url:s,maxPages:r=20,maxDepth:n=2}=await e.req.json();if(!s)return e.json({error:"URL이 필요합니다"},400);const a=new URL(s).hostname,u=new Set,c=[{url:s,depth:0}],o=[];for(;c.length>0&&o.length<r;){const d=c.shift();if(!d)break;const h=d.url,f=d.depth;if(!(u.has(h)||f>n)){u.add(h),o.push(h);try{const b="https://api.microlink.io",w=new URLSearchParams({url:h,meta:"false",data:"links"}),S=await fetch(`${b}?${w.toString()}`);if(S.ok){const x=await S.json();if(x.status==="success"&&((t=x.data)!=null&&t.links)){const y=x.data.links;for(const $ of y)try{const q=$.href;if(!q)continue;const P=new URL(q,h).href;new URL(P).hostname===a&&!u.has(P)&&!c.some(Ue=>Ue.url===P)&&!P.includes("#")&&!P.match(/\.(pdf|jpg|jpeg|png|gif|zip|rar|exe|dmg)$/i)&&c.push({url:P,depth:f+1})}catch{}}}}catch(b){console.error(`크롤링 오류 (${h}):`,b)}}}return e.json({success:!0,baseUrl:s,foundUrls:o,count:o.length,maxPages:r,maxDepth:n})}catch(s){return console.error("크롤링 오류:",s),e.json({error:"크롤링 중 오류가 발생했습니다",details:s instanceof Error?s.message:String(s)},500)}});L.post("/api/screenshots/batch",async e=>{var t,s;try{const{urls:r,width:n=1920,format:i="png",fullPage:a=!0}=await e.req.json();if(!r||!Array.isArray(r)||r.length===0)return e.json({error:"URL 목록이 필요합니다"},400);const u=[];for(const c of r)try{const o="https://api.microlink.io",d=new URLSearchParams({url:c,screenshot:"true",meta:"false",viewport:JSON.stringify({width:n,height:1080}),fullPage:a.toString(),type:i}),h=await fetch(`${o}?${d.toString()}`);if(h.ok){const f=await h.json();if(f.status==="success"&&((s=(t=f.data)==null?void 0:t.screenshot)!=null&&s.url)){const w=await(await fetch(f.data.screenshot.url)).arrayBuffer(),S=`screenshots/${Date.now()}-${Math.random().toString(36).substring(7)}.${i}`,{env:x}=e;x.SCREENSHOTS&&await x.SCREENSHOTS.put(S,w,{httpMetadata:{contentType:`image/${i}`}}),u.push({success:!0,url:c,fileName:S,size:w.byteLength})}else u.push({success:!1,url:c,error:"스크린샷 URL을 가져올 수 없습니다"})}else u.push({success:!1,url:c,error:`API 오류: ${h.status}`})}catch(o){u.push({success:!1,url:c,error:o instanceof Error?o.message:String(o)})}return e.json({success:!0,total:r.length,succeeded:u.filter(c=>c.success).length,failed:u.filter(c=>!c.success).length,results:u})}catch(r){return console.error("일괄 스크린샷 생성 오류:",r),e.json({error:"일괄 스크린샷 생성 중 오류가 발생했습니다",details:r instanceof Error?r.message:String(r)},500)}});L.get("/api/screenshot/:fileName",async e=>{var t;try{const s=e.req.param("fileName"),{env:r}=e;if(!r.SCREENSHOTS)return e.json({error:"R2 bucket이 설정되지 않았습니다"},500);const n=await r.SCREENSHOTS.get(`screenshots/${s}`);return n?new Response(n.body,{headers:{"Content-Type":((t=n.httpMetadata)==null?void 0:t.contentType)||"image/png","Cache-Control":"public, max-age=31536000"}}):e.notFound()}catch(s){return console.error("스크린샷 조회 오류:",s),e.json({error:"스크린샷을 불러올 수 없습니다"},500)}});L.get("/api/screenshots",async e=>{try{const{env:t}=e;if(!t.SCREENSHOTS)return e.json({error:"R2 bucket이 설정되지 않았습니다"},500);const r=(await t.SCREENSHOTS.list({prefix:"screenshots/"})).objects.map(n=>({key:n.key,fileName:n.key.replace("screenshots/",""),size:n.size,uploaded:n.uploaded}));return e.json({success:!0,count:r.length,screenshots:r})}catch(t){return console.error("스크린샷 목록 조회 오류:",t),e.json({error:"스크린샷 목록을 불러올 수 없습니다"},500)}});const Ge=new pt,ds=Object.assign({"/src/index.tsx":L});let mt=!1;for(const[,e]of Object.entries(ds))e&&(Ge.all("*",t=>{let s;try{s=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,s)}),Ge.notFound(t=>{let s;try{s=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,s)}),mt=!0);if(!mt)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");export{Ge as default};
