(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();const de=new Map;function q(e){let t=de.get(e);return t===void 0&&(t=e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),de.set(e,t)),t}function G(e){return`<${String(e.tagName).toLowerCase()}>`}function K(e,t){e.nodeType===globalThis.Node.ELEMENT_NODE&&(t(e),e.shadowRoot&&K(e.shadowRoot,t));const n=globalThis.document.createTreeWalker(e,globalThis.NodeFilter.SHOW_ELEMENT,null,!1);for(;n.nextNode();){const o=n.currentNode;t(o),o.shadowRoot&&K(o.shadowRoot,t)}}const le=Promise.resolve(),Be=new WeakMap,oe=K.name==="walkInShadow",I=new Set;function Oe(e){I.size||le.then(qe),I.add(e)}function Ve(e){I.delete(e)}function qe(){for(const e of I)try{e()}catch(t){console.error(t)}I.clear()}const U=new WeakMap,z=new Set;function Le(e){const t=[];let n=0;for(;e;){if(e.resolved=!1,e.deps){for(const o of e.deps)o.contexts.delete(e);e.deps.clear()}if(e.contexts)for(const o of e.contexts)z.has(o)||(t.includes(o)||t.push(o),e.contexts.delete(o));e.observe&&Oe(e.observe),e=t[n++]}}function Q(e,t){let n=U.get(e);n||(n=new Map,U.set(e,n));let o=n.get(t);return o||(o={key:t,target:e,value:void 0,lastValue:void 0,resolved:!1,contexts:void 0,deps:void 0,observe:void 0},n.set(t,o)),o}let N=null;function Ae(e,t,n){const o=Q(e,t);if(N&&(o.contexts||(o.contexts=new Set),N.deps||(N.deps=new Set),o.contexts.add(N),N.deps.add(o)),o.resolved)return o.value;const i=N;try{if(z.has(o))throw Error(`Circular get invocation is forbidden: '${t}'`);N=o,z.add(o),o.value=n(e,o.value),o.resolved=!0,N=i,z.delete(o)}catch(s){throw N=i,z.delete(o),N&&(N.deps.delete(o),o.contexts.delete(N)),s}return o.value}function Xe(e,t,n,o){const i=Q(e,t),s=n(e,o,i.value);s!==i.value&&(i.value=s,Le(i))}function Fe(e,t,n,o){const i=Q(e,t);i.observe=()=>{const s=Ae(e,t,n);s!==i.lastValue&&(o(e,s,i.lastValue),i.lastValue=s)};try{i.observe()}catch(s){console.error(s)}return()=>{Ve(i.observe),i.observe=void 0,i.lastValue=void 0}}const X=new Set;function He(e){X.size||setTimeout(()=>{for(const t of X)if(!t.contexts||t.contexts.size===0){if(t.deps)for(const o of t.deps)o.contexts.delete(t);U.get(t.target).delete(t.key)}X.clear()}),X.add(e)}function Re(e,t){Le(e),t.clearValue&&(e.value=void 0,e.lastValue=void 0),t.deleteEntry&&He(e)}function je(e,t,n={}){const o=Q(e,t);Re(o,n)}function Ye(e,t={}){const n=U.get(e);if(n)for(const o of n.values())Re(o,t)}function fe(e,t){return{get:t?n=>{const o=e(n),i=n.shadowRoot||n.attachShadow({mode:"open",delegatesFocus:e.delegatesFocus||!1});return()=>(o(n,i),i)}:n=>{const o=e(n);return()=>(o(n,n),n)},observe(n,o){o()}}}const Pe={string:(e,t,n)=>{const o=t?String(t):"";return o?e.setAttribute(n,o):e.removeAttribute(n),o},number:(e,t,n)=>{const o=Number(t);return e.setAttribute(n,o),o},boolean:(e,t,n)=>{const o=!!t;return o?e.setAttribute(n,""):e.removeAttribute(n),o},undefined:(e,t,n)=>{const o=typeof t,i=o!=="undefined"&&Pe[o];return i?i(e,t,n):(e.hasAttribute(n)&&e.removeAttribute(n),t)}},Ge={string:(e,t)=>e.getAttribute(t),number:(e,t)=>Number(e.getAttribute(t))||0,boolean:(e,t)=>e.hasAttribute(t),undefined:(e,t)=>e.getAttribute(t)};function Ke(e,t){const n=typeof t.value,o=Pe[n],i=Ge[n];if(!o)throw TypeError(`Invalid default value for '${e}' property - it must be a string, number, boolean or undefined: ${n}`);const s=q(e);return{get:(r,l)=>l===void 0?i(r,s)||t.value:l,set:(r,l)=>o(r,l,s),connect:n!=="undefined"?(r,l,u)=>(!r.hasAttribute(s)&&r[l]===t.value&&(r[l]=o(r,t.value,s)),t.connect&&t.connect(r,l,u)):t.connect,observe:t.observe}}const D=new WeakMap,F=new WeakMap;function se(e,t){if(t){const s=D.get(t);if(e===s)return t;for(const r of Object.keys(s))r!=="tag"&&delete t.prototype[r]}else t=class extends globalThis.HTMLElement{connectedCallback(){for(const r of t.settable){if(!hasOwnProperty.call(this,r))continue;const l=this[r];delete this[r],this[r]=l}const s=new Set;F.set(this,s),Oe(()=>{if(s===F.get(this)){for(const r of t.connects)s.add(r(this));for(const r of t.observers)s.add(r(this))}})}disconnectedCallback(){const s=F.get(this);for(const r of s)r&&r();F.delete(this),Ye(this)}};D.set(t,Object.freeze(e));const n=new Set,o=new Set,i=new Set;for(const s of Object.keys(e)){if(s==="tag")continue;let r=e[s];const l=typeof r;if(l==="function")s==="render"?r=fe(r,!0):s==="content"?r=fe(r):r={get:r};else if(l!=="object"||r===null)r={value:r};else if(r.set){if(hasOwnProperty.call(r,"value"))throw TypeError(`Invalid property descriptor for '${s}' property - it must not have 'value' and 'set' properties at the same time.`);const u=q(s),m=r.get||((d,c)=>c);r.get=(d,c)=>(c===void 0&&(c=r.set(d,d.getAttribute(u)||c)),m(d,c))}if(hasOwnProperty.call(r,"value"))r=Ke(s,r);else if(!r.get)throw TypeError(`Invalid descriptor for '${s}' property - it must contain 'value' or 'get' option`);r.set&&i.add(s),Object.defineProperty(t.prototype,s,{get:function(){return Ae(this,s,r.get)},set:r.set&&function(m){Xe(this,s,r.set,m)},enumerable:!0,configurable:!0}),r.connect&&n.add(u=>r.connect(u,s,()=>{je(u,s)})),r.observe&&o.add(u=>Fe(u,s,r.get,r.observe))}return t.connects=n,t.observers=o,t.settable=i,t}const P=new Map;function Ue(e){P.size||le.then(()=>{K(globalThis.document.body,t=>{if(P.has(t.constructor)){const n=P.get(t.constructor),o=D.get(t.constructor);t.disconnectedCallback();for(const i of Object.keys(o)){const s=typeof o[i],r=s!=="object"&&s!=="function"&&o[i]!==n[i];r&&t.removeAttribute(q(i)),je(t,i,{clearValue:r})}t.connectedCallback()}}),P.clear()}),P.set(e,D.get(e))}function _e(e){if(!e.tag)throw TypeError("Error while defining hybrids: 'tag' property with dashed tag name is required");const t=globalThis.customElements.get(e.tag);if(t){if(D.get(t))return Ue(t),se(e,t),e;throw TypeError(`Custom element with '${e.tag}' tag name already defined outside of the hybrids context`)}return globalThis.customElements.define(e.tag,se(e)),e}function Qe(e,{root:t="",prefix:n}={}){for(const o of Object.keys(e)){const i=e[o];if(!i.tag){const s=q([].concat(t).reduce((r,l)=>r.replace(l,""),o).replace(/^[./]+/,"").replace(/\//g,"-").replace(/\.[a-zA-Z]+$/,""));i.tag=n?`${n}-${s}`:s}_e(i)}return e}const Ze=Object.freeze(Object.assign(_e,{compile:e=>se(e),from:Qe})),W=new WeakMap;function M(e){let t=W.get(e);return t||(W.set(e,t={}),t)}function Z(e){let t;for(;e&&(t=M(e))&&t.endNode;)e=t.endNode;return e}function B(e){if(e.nodeType===globalThis.Node.TEXT_NODE){const t=W.get(e);if(t&&t.startNode){const n=Z(t.endNode);let o=t.startNode;const i=n.nextSibling;for(;o;){const s=o.nextSibling;o.parentNode.removeChild(o),o=s!==i&&s}W.set(e,{})}}else{let t=e.childNodes[0];for(;t;)e.removeChild(t),t=e.childNodes[0];W.set(e,{})}}const Je=Date.now(),C=(e=0)=>`H-${Je}-${e}`,ce=!!(globalThis.document&&globalThis.document.adoptedStyleSheets),J=/^\d+$/,et={block:(e,t)=>({display:"block","text-align":t}),inline:({display:e})=>({display:`inline${e?`-${e}`:""}`}),contents:{display:"contents"},hidden:{display:"none"},...["row","row-reverse","column","column-reverse"].reduce((e,t)=>(e[t]=(n,o="nowrap")=>({display:"flex","flex-flow":`${t} ${o}`}),e),{}),grow:(e,t=1)=>({"flex-grow":t}),shrink:(e,t=1)=>({"flex-shrink":t}),basis:(e,t)=>({"flex-basis":y(t)}),order:(e,t=0)=>({order:t}),grid:(e,t="1",n="",o="",i="")=>({display:"grid",...["columns","rows"].reduce((s,r)=>{const l=r==="columns"?t:n;return s[`grid-template-${r}`]=l&&l.split("|").map(u=>u.match(J)?`repeat(${u}, minmax(0, 1fr))`:y(u)).join(" "),s},{}),"grid-auto-flow":`${o} ${i&&"dense"}`}),area:(e,t="",n="")=>({"grid-column":t.match(J)?`span ${t}`:t,"grid-row":n.match(J)?`span ${n}`:n}),gap:(e,t=1,n="")=>({"column-gap":y(t),"row-gap":y(n||t)}),items:(e,t="start",n="")=>({"place-items":`${t} ${n}`}),content:(e,t="start",n="")=>({"place-content":`${t} ${n}`}),self:(e,t="start",n="")=>({"place-self":`${t} ${n}`}),center:{"place-items":"center","place-content":"center"},size:(e,t,n=t)=>({width:y(t),height:y(n),"box-sizing":"border-box"}),width:(e,t,n,o)=>({width:y(t),"min-width":y(n),"max-width":y(o),"box-sizing":"border-box"}),height:(e,t,n,o)=>({height:y(t),"min-height":y(n),"max-height":y(o),"box-sizing":"border-box"}),ratio:(e,t)=>({"aspect-ratio":t}),overflow:(e,t="hidden",n="")=>{const o=n?`-${t}`:"",i=n||t;return{[`overflow${o}`]:i,...i==="scroll"?{"flex-grow":e["flex-grow"]||1,"flex-basis":0,"overscroll-behavior":"contain","--webkit-overflow-scrolling":"touch"}:{}}},margin:(e,t="1",n,o,i)=>t.match(/top|bottom|left|right/)?{[`margin-${t}`]:y(n||"1")}:{margin:`${y(t)} ${y(n)} ${y(o)} ${y(i)}`},padding:(e,t="1",n,o,i)=>t.match(/top|bottom|left|right/)?{[`padding-${t}`]:y(n||"1")}:{padding:`${y(t)} ${y(n)} ${y(o)} ${y(i)}`},absolute:{position:"absolute"},relative:{position:"relative"},fixed:{position:"fixed"},sticky:{position:"sticky"},static:{position:"static"},inset:(e,t=0)=>{const n=y(t);return{top:n,right:n,bottom:n,left:n}},top:(e,t=0)=>({top:y(t)}),bottom:(e,t=0)=>({bottom:y(t)}),left:(e,t=0)=>({left:y(t)}),right:(e,t=0)=>({right:y(t)}),layer:(e,t=1)=>({"z-index":t}),"":(e,t,...n)=>{if(n.length<2)throw new Error("Generic rule '::' requires at least two arguments, eg.: ::[property]:[name]");return{[n[n.length-2]]:`var(--${n.join("-")})`}},view:(e,t)=>({"view-transition-name":t})},tt={min:"min-content",max:"max-content",fit:"fit-content",full:"100%"},nt={portrait:"orientation: portrait",landscape:"orientation: landscape"};function y(e){return e=tt[e]||e,/^-?\d+(\.\d+)*$/.test(String(e))?`${e*8}px`:e||""}let L;function ze(){if(L)return L;if(ce)L=new globalThis.CSSStyleSheet;else{const e=globalThis.document.createElement("style");e.appendChild(globalThis.document.createTextNode("")),globalThis.document.head.appendChild(e),L=e.sheet}return L.insertRule(":host([hidden]) { display: none; }"),L}const ue=new WeakMap;let ie=new WeakSet;function ot(e){const t=e.getRootNode();if(ie.has(t))return;const n=ze();if(ce)t.adoptedStyleSheets=[...t.adoptedStyleSheets,n];else{if(t===globalThis.document)return;let o=ue.get(t);o||(o=globalThis.document.createElement("style"),t.appendChild(o),ue.set(t,o));let i="";for(let s=0;s<n.cssRules.length;s++)i+=n.cssRules[s].cssText;o.textContent=i}ie.add(t)}const pe=new Map;function he(e,t,n,o){let i=pe.get(e);i||(i=`l-${Math.random().toString(36).substr(2,5)}`,pe.set(e,i)),ce||(ie=new WeakSet);const s=ze(),[r,l=""]=t.split("@"),u=Object.entries(n.replace(/\s+/g," ").trim().split(" ").reduce((d,c)=>{const[h,...S]=c.split(":"),a=et[h];if(!a)throw TypeError(`Unsupported layout rule: '${h}'`);return Object.assign(d,typeof a=="function"?a(d,...S.map(f=>f.match(/--.*/)?`var(${f})`:f)):a)},{})).reduce((d,[c,h])=>h!==void 0&&h!==""?d+`${c}: ${h};`:d,""),m=l.split(":").reduce((d,c)=>c===""?d:d+` and (${nt[c]||`min-width: ${c}`})`,"@media screen");if(o){const d=`:host(:where(.${i}-s${r}))`,c=`:where(.${i}-c${r})`;[d,c].forEach(h=>{s.insertRule(l?`${m} { ${h} { ${u} } }`:`${h} { ${u} }`,s.cssRules.length-1)})}else{const d=`.${i}${r}`;s.insertRule(l?`${m} { ${d} { ${u} } }`:`${d} { ${u} }`,s.cssRules.length-1)}return i}const re=new WeakMap;function st(e,t){const n=M(e),o=n.startNode,i=Z(n.endNode);t.parentNode.insertBefore(e,t.nextSibling);let s=e,r=o;for(;r;){const l=r.nextSibling;s.parentNode.insertBefore(r,s.nextSibling),s=r,r=l!==i.nextSibling&&l}}function it(e,t,n,o,i){let s=re.get(t);const r=n.map((d,c)=>({id:hasOwnProperty.call(d,"id")?d.id:c,value:d,placeholder:null,available:!0}));if(re.set(t,r),s){const d=new Set;for(const c of r)d.add(c.id);s=s.filter(c=>d.has(c.id)?!0:(B(c.placeholder),c.placeholder.parentNode.removeChild(c.placeholder),!1))}let l=t;const u=n.length-1,m=M(t);for(let d=0;d<r.length;d+=1){const c=r[d];let h;if(s){for(let S=0;S<s.length;S+=1)if(s[S].available&&s[S].id===c.id){h=s[S];break}}h?(h.available=!1,c.placeholder=h.placeholder,c.placeholder.previousSibling!==l&&st(c.placeholder,l),h.value!==c.value&&o(e,c.placeholder,c.value,h.value,i)):(c.placeholder=globalThis.document.createTextNode(""),l.parentNode.insertBefore(c.placeholder,l.nextSibling),o(e,c.placeholder,c.value,void 0,i)),l=Z(M(c.placeholder).endNode||c.placeholder),d===0&&(m.startNode=c.placeholder),d===u&&(m.endNode=l)}if(s)for(const d of s)d.available&&(B(d.placeholder),d.placeholder.parentNode.removeChild(d.placeholder))}function rt(e,t,n){B(t);const o=M(t);o.startNode=o.endNode=n,t.parentNode.insertBefore(n,t.nextSibling)}function me(e){const t=typeof e;if(t==="object"){if(Array.isArray(e))return"array";if(e instanceof globalThis.Node)return"node"}return t}function V(e,t,n,o,i){const s=me(n),r=me(o);switch(r!=="undefined"&&s!==r&&(s!=="function"&&B(t),r==="array"?re.delete(t):r!=="node"&&r!=="function"&&(t.textContent="")),s){case"array":it(e,t,n,V,i);break;case"node":rt(e,t,n);break;case"function":i&&(n.useLayout=!0),n(e,t);break;default:t.textContent=s==="number"||n?n:""}}const ee=new WeakMap;function lt(e){return(t,n,o,i)=>{if(i){const s=ee.get(n);n.removeEventListener(e,s.get(i),i.options!==void 0?i.options:!1)}if(o){if(typeof o!="function")throw Error(`Event listener must be a function: ${typeof o}`);let s=ee.get(n);s||(s=new WeakMap,ee.set(n,s));const r=o.bind(null,t);s.set(o,r),n.addEventListener(e,r,o.options!==void 0?o.options:!1)}}}function ct(e,t=new Set){if(Array.isArray(e))for(const n of e)n&&t.add(n);else if(e!==null&&typeof e=="object")for(const[n,o]of Object.entries(e))n&&o&&t.add(n);else e&&t.add(e);return t}const ge=new WeakMap;function at(e,t,n){const o=ge.get(t)||new Set,i=ct(n);ge.set(t,i);for(const s of i)t.classList.add(s),o.delete(s);for(const s of o)t.classList.remove(s)}const be=new WeakMap;function dt(e,t,n){if(n===null||typeof n!="object")throw TypeError(`Style value must be an object in ${G(t)}:`,n);const o=be.get(t)||new Map,i=new Map;for(const s of Object.keys(n)){const r=q(s),l=n[s];!l&&l!==0?t.style.removeProperty(r):t.style.setProperty(r,l),i.set(r,l),o.delete(r)}for(const s of o.keys())t.style[s]="";be.set(t,i)}function ft(e,t,n){if(t.substr(0,2)==="on"){const o=t.substr(2);return lt(o)}switch(e){case"class":return at;case"style":return dt;default:{let o=!1;return(i,s,r)=>{if(o=o||!n&&!(s instanceof globalThis.SVGElement)&&t in s,o)s[t]=r;else if(r===!1||r===void 0||r===null)s.removeAttribute(e);else{const l=r===!0?"":String(r);s.setAttribute(e,l)}}}}}const We=C("(\\d+)"),_=new RegExp(`^${We}$`),A=new RegExp(We,"g"),ut=/^[^A-Za-z]+$/;function pt(e){let t=e[0],n=!1;for(let o=1;o<e.length;o+=1)n=n||t.match(/<\s*(table|th|tr|td|thead|tbody|tfoot|caption|colgroup)([^<>]|"[^"]*"|'[^']*')*>\s*$/),t+=(n?`<!--${C(o-1)}-->`:C(o-1))+e[o],n=n&&!t.match(/<\/\s*(table|th|tr|td|thead|tbody|tfoot|caption|colgroup)\s*>/);return t}function ht(e){return e.replace(/\s*=\s*['"]*$/g,"").split(/\s+/).pop()}function ye(e){return globalThis.document.createTreeWalker(e,globalThis.NodeFilter.SHOW_ELEMENT|globalThis.NodeFilter.SHOW_TEXT|globalThis.NodeFilter.SHOW_COMMENT,null,!1)}function mt(e,t=0){e=e.replace(/(^[\n\s\t ]+)|([\n\s\t ]+$)+/g,"");let n=e.indexOf(`
`);if(n>-1){let o=0-t-2;for(n+=1;e[n]===" "&&n<e.length;n+=1)o+=1;return e.replace(/\n +/g,i=>i.substr(0,Math.max(i.length-o,1)))}return e}function xe(e,t){const n=C(t);return`${mt(e).split(`
`).filter(i=>i).map(i=>{const s=i.indexOf(n);return s>-1?`| ${i}
--${"-".repeat(s)}${"^".repeat(6)}`:`| ${i}`}).join(`
`).replace(A,"${...}")}`}const we=new Map,ve=new WeakMap;function gt(e,t){const n=ve.get(e);if(!n&&!t)return;const o=t&&t.map(s=>{let r=s;return r instanceof globalThis.CSSStyleSheet||(r=we.get(s),r||(r=new globalThis.CSSStyleSheet,r.replaceSync(s),we.set(s,r))),r});let i;if(n){if(o&&o.length===n.length&&o.every((s,r)=>s===n[r]))return;i=e.adoptedStyleSheets.filter(s=>!n.includes(s))}o&&(i=(i||e.adoptedStyleSheets).concat(o)),e.adoptedStyleSheets=i,ve.set(e,o)}const te=new WeakMap;function Ie(e,t){let n=te.get(e);if(t){(!n||n.parentNode!==e)&&(n=globalThis.document.createElement("style"),te.set(e,n),e=Z(e),e.nodeType===globalThis.Node.TEXT_NODE?e.parentNode.insertBefore(n,e.nextSibling):e.appendChild(n));const o=[...t].join(`
/*------*/
`);n.textContent!==o&&(n.textContent=o)}else n&&(n.parentNode.removeChild(n),te.set(e,null))}const $e=new WeakMap;function bt(e,t){let n=$e.get(e);n||(n=e.adoptedStyleSheets?gt:Ie,$e.set(e,n)),n(e,t)}function yt(e,t,n,o){let i=globalThis.document.createElement("template");const s={},r=n?e:pt(e);if(i.innerHTML=t?`<svg>${r}</svg>`:r,t){const a=i.content.firstChild;i.content.removeChild(a);for(const f of Array.from(a.childNodes))i.content.appendChild(f)}let l;const u=i.content.children[0];if(u instanceof globalThis.HTMLTemplateElement){for(const a of Array.from(u.attributes)){const f=a.value.trim();if(f&&a.name.startsWith("layout")){if(f.match(A))throw Error("Layout attribute cannot contain expressions");l=he(u,a.name.substr(6),f,!0)}}if(l!==void 0&&i.content.children.length>1)throw Error("Template, which uses layout system must have only the '<template>' root element");o=l||u.hasAttribute("layout"),i=u}const m=ye(i.content),d=[];let c=0,h=null;for(;m.nextNode();){let a=m.currentNode;if(h&&!h.contains(a)&&(h=null),a.nodeType===globalThis.Node.COMMENT_NODE&&_.test(a.textContent)&&(a.parentNode.insertBefore(globalThis.document.createTextNode(a.textContent),a.nextSibling),m.nextNode(),a.parentNode.removeChild(a),a=m.currentNode),a.nodeType===globalThis.Node.TEXT_NODE){let f=a.textContent;const g=f.match(_);if(g)a.textContent="",s[g[1]]=[c,V];else{if(Pt()&&!n&&!h&&!f.match(/^\s*$/)){let v;const p=f.trim(),b=p.replace(/\s+/g," ").replace(A,(x,$)=>($=Number($),v===void 0&&(v=$),`\${${$-v}}`));if(!b.match(ut)){let x=a.previousSibling&&a.previousSibling.nodeType===globalThis.Node.COMMENT_NODE?a.previousSibling:"";x&&(x.parentNode.removeChild(x),c-=1,x=(x.textContent.split("|")[1]||"").trim().replace(/\s+/g," "));const $=_t(b,x).replace(/\${(\d+)}/g,(k,E)=>C(Number(E)+v));f=f.replace(p,$),a.textContent=f}}const w=f.match(A);if(w){let v=a;w.reduce((p,b)=>{const[x,$]=p.pop().split(b);return x&&p.push(x),p.push(b),$&&p.push($),p},[f]).forEach((p,b)=>{b===0?v.textContent=p:(v=v.parentNode.insertBefore(globalThis.document.createTextNode(p),v.nextSibling),m.currentNode=v,c+=1);const x=v.textContent.match(_);x&&(v.textContent="",s[x[1]]=[c,V])})}}}else if(a.nodeType===globalThis.Node.ELEMENT_NODE){if(!h&&(a.getAttribute("translate")==="no"||a.tagName.toLowerCase()==="script"||a.tagName.toLowerCase()==="style")&&(h=a),oe){const f=a.tagName.toLowerCase();f.match(/.+-.+/)&&!globalThis.customElements.get(f)&&!d.includes(f)&&d.push(f)}for(const f of Array.from(a.attributes)){const g=f.value.trim(),w=f.name;if(o&&w.startsWith("layout")&&g){if(g.match(A))throw Error("Layout attribute cannot contain expressions");const p=he(a,w.substr(6),g);a.removeAttribute(w),a.classList.add(p);continue}const v=g.match(_);if(v){const p=ht(e[v[1]]);s[v[1]]=[c,ft(w,p,t)],a.removeAttribute(f.name)}else{const p=g.match(A);if(p){const b=`attr__${w}`;for(const[x,$]of p.entries()){const[,k]=$.match(_);let E=!1;s[k]=[c,(R,T,O)=>{const j=M(T);j[b]=(j[b]||g).replace($,O??""),(p.length===1||x+1===p.length)&&(E=E||!t&&!(T instanceof globalThis.SVGElement)&&w in T,E?T[w]=j[b]:T.setAttribute(w,j[b]),j[b]=void 0)}]}f.value=""}}}}c+=1}oe&&d.length&&console.warn(`Not defined ${d.map(a=>`<${a}>`).join(", ")} element${d.length>1?"s":""} found in the template:
${xe(r,-1)}`);const S=Object.keys(s);return function(f,g,w,{styleSheets:v}){let p=M(g);if(i!==p.template){const b=globalThis.document.importNode(i.content,!0),x=ye(b),$=[];let k=0,E=0,R=s[S[E]];for(;x.nextNode();){const T=x.currentNode;for(;R&&R[0]===k;)$.push({index:S[E],node:T,fn:R[1]}),E+=1,R=s[S[E]];k+=1}if(p.hostLayout&&f.classList.remove(p.hostLayout),B(g),p=M(g),p.template=i,p.markers=$,g.nodeType===globalThis.Node.TEXT_NODE){Ie(g),p.startNode=b.childNodes[0],p.endNode=b.childNodes[b.childNodes.length-1];let T=g,O=b.childNodes[0];for(;O;)g.parentNode.insertBefore(O,T.nextSibling),T=O,O=b.childNodes[0]}else{if(o){const T=`${l}-${f===g?"c":"s"}`;f.classList.add(T),p.hostLayout=T}g.appendChild(b)}o&&ot(g)}bt(g,v);for(const b of p.markers){const x=w[b.index],$=p.prevArgs&&p.prevArgs[b.index];if(!(p.prevArgs&&x===$))try{b.fn(f,b.node,x,$,o)}catch(k){throw console.error(`Error while updating template expression in ${G(f)}:
${xe(r,b.index)}`),k}}p.prevArgs=w}}const ne=new WeakMap;function xt(e,t,n=200){return function o(i,s){const r=o.useLayout;let l;t&&(l=setTimeout(()=>{l=void 0,V(i,s,t,void 0,r)},n)),ne.set(s,e),e.then(u=>{l&&clearTimeout(l),ne.get(s)===e&&(V(i,s,u,t&&!l?t:void 0,r),ne.set(s,null))})}}function Se({target:e,detail:t},n){let o;switch(e.type){case"radio":case"checkbox":o=e.checked&&e.value;break;case"file":o=e.files;break;default:o=t&&hasOwnProperty.call(t,"value")?t.value:e.value}n(o)}function wt(e,t){return e.split(".").reverse().reduce((n,o)=>n?{[o]:n}:{[o]:t},null)}const Te=new Map;function vt(e,t){if(!e)throw Error(`The first argument must be a property name or an object instance: ${e}`);if(typeof e=="object"){if(t===void 0)throw Error("For model instance property the second argument must be defined");const o=Be.get(e);if(!o)throw Error("Provided object must be a model instance of the store");return t===null?()=>{o.set(e,null)}:(i,s)=>{Se(s,r=>{o.set(e,wt(t,r))})}}if(arguments.length===2)return o=>{o[e]=t};let n=Te.get(e);return n||(n=(o,i)=>{Se(i,s=>{o[e]=s})},Te.set(e,n)),n}let H;const $t=globalThis.document&&globalThis.document.startViewTransition!==void 0&&function(t){return function n(o,i){if(H){console.warn(`${G(o)}: view transition already started in ${G(H)}`),t(o,i);return}t.useLayout=n.useLayout,H=o,globalThis.document.startViewTransition(()=>(t(o,i),le.then(()=>{H=void 0})))}}||(e=>e),St=Object.freeze(Object.defineProperty({__proto__:null,resolve:xt,set:vt,transition:$t},Symbol.toStringTag,{value:"Module"}));function Tt(e){return this.id=e,this}function Nt(...e){return this.styleSheets=this.styleSheets||[],this.styleSheets.push(...e),this}function Et(e,...t){this.styleSheets=this.styleSheets||[];let n=e[0];for(let o=1;o<e.length;o++)n+=(t[o-1]!==void 0?t[o-1]:"")+e[o];return this.styleSheets.push(n),this}function Ct(e){return this.plugins=this.plugins||[],this.plugins.push(e),this}const Mt=Object.freeze(Object.defineProperty({__proto__:null,css:Et,key:Tt,style:Nt,use:Ct},Symbol.toStringTag,{value:"Module"})),kt=C(),Ot=C("svg"),Lt=C("msg"),At=C("layout"),Ne=new Map;function Rt(e,t,n,o){function i(s,r=s){let l=o?e+Lt:e.join(kt);n&&(l+=Ot);const u=i.useLayout;u&&(l+=At);let m=Ne.get(l);m||(m=yt(e,n,o,u),Ne.set(l,m)),i.plugins?i.plugins.reduce((d,c)=>c(d),()=>m(s,r,t,i))(s,r):m(s,r,t,i)}return Object.assign(i,Mt)}function ae(e,...t){return Rt(e,t,!1,!1)}Object.freeze(Object.assign(ae,St));const Y=new Map,Ee=new Map;let De=null;const jt=(()=>{let e;try{e=globalThis.navigator.languages||[globalThis.navigator.language]}catch{e=[]}return e.reduce((t,n)=>{const o=n.split("-")[0];return t.add(n),n!==o&&t.add(o),t},new Set)})();function Pt(){return De!==null||Y.size}const Ce=new Map;function _t(e,t,n=[]){e=e.trim().replace(/\s+/g," "),t=t.trim();const o=`${e} | ${t}`;let i=Ee.get(o);if(!i){if(Y.size)for(const s of jt){const r=Y.get(s);if(r&&(i=r[o]||r[e],i)){if(i=i.message,typeof i=="object"){let l=Ce.get(s);l||(l=new Intl.PluralRules(s),Ce.set(s,l));const u=i;i=m=>m===0&&u.zero||u[l.select(m)]||u.other||""}break}}i||i||(i=e,(Y.size||De)&&oe&&console.warn(`Missing translation: "${e}"${t?` [${t}]`:""}`)),Ee.set(o,i)}return typeof i=="function"?i(n[0]):i}const zt=`:host{display:flex;flex-direction:column;width:100%;box-sizing:border-box;margin:auto;width:max(80%,450px)}.channels{height:min(500px,70vh);border:1px solid grey;border-radius:5px;margin:1px;display:flex;flex-direction:column;width:100%;box-sizing:border-box}.channels .channel{box-sizing:border-box;border-radius:5px;border:1px solid grey;margin:1px}.virtualizer{position:relative;overflow:hidden;display:flex;flex-direction:column;width:100%;height:100%}.top-stack{position:relative;min-height:0px;height:0px;max-height:0px;overflow:visible;display:flex;flex-direction:column-reverse;width:100%}.main-stack{position:relative;min-height:0px;height:100%;max-height:100%;overflow:visible;display:flex;flex-direction:column;width:100%}
`;Ze({tag:"virtual-list",startIndex:0,endIndex:0,minChannelHeight:30,top:0,topStackChannels:{get:(e,t)=>t||[],set:(e,t)=>t},mainStackChannels:{get:(e,t)=>t||[],set:(e,t)=>t},channels:{get:(e,t)=>t||[],set:(e,t)=>t,connect:(e,t)=>{const n=(o={deltaY:0})=>ke(e,o);return setTimeout(n),e.parentElement.addEventListener("wheel",n,{passive:!1}),()=>{e.parentElement.removeEventListener("wheel",n)}},observe:(e,t)=>{ke(e,{deltaY:0})}},render:({name:e,channels:t,top:n,mainStackChannels:o,topStackChannels:i})=>ae`<p>Virtual List</p>
      <div class="channels">
        <div class="virtualizer">
          <div class="top-stack" style="top: ${n}px">
            ${i.map(Me)}
          </div>
          <div class="main-stack" style="top: ${n}px">
            ${o.map(Me)}
          </div>
        </div>
      </div>`.style(zt)});function Me({height:e,color:t,name:n}){return ae`<div
    class="channel"
    style="
      background-color: ${t};
      min-height: ${e}px;
      "
  >
    <b> # ${n} </b>
    <slot />
  </div>`}function Wt(e,t){var i,s;t*=.2,e.top-=t;const n=[...((i=e.shadowRoot)==null?void 0:i.querySelector(".virtualizer .main-stack").children)||[]],o=(s=e.shadowRoot)==null?void 0:s.querySelector(".virtualizer");if(o){const r=o.querySelector(".top-stack"),l=o.querySelector(".main-stack"),{height:u,top:m}=o.getBoundingClientRect(),{top:d}=l.getBoundingClientRect(),c=d-m;if(t>=0){let h=0,S,a,f=0;for([S,a]of n.entries()){f+=1;const{height:w}=a.getBoundingClientRect();if(h-=w,h>c){e.top-=h,e.startIndex+=f;break}}const g=Math.ceil(u/e.minChannelHeight);if(e.endIndex=e.startIndex+g,n.length){const{height:w,top:v}=n[n.length-1].getBoundingClientRect();v-w<u-m&&(e.top+=t)}}else{const h=[...(r==null?void 0:r.children)||[]],S=h.map(f=>f.getBoundingClientRect()).reduce((f,{height:g})=>f+g,0);e.top-=S,e.startIndex-=h.length,e.topStackChannels.length=0;const a=d-m;if(a>0){const f=Math.ceil(a/e.minChannelHeight);e.topStackChannels=e.channels.slice(e.startIndex-f,e.startIndex)}for(let f=n.length-1;f>=0;f-=1){const g=n[f],{top:w}=g.getBoundingClientRect();if(w>u+m)e.endIndex-=1;else break}e.startIndex===0&&e.top>0&&(e.top=0)}e.endIndex=Math.max(e.startIndex+1,e.endIndex),e.mainStackChannels=e.channels.slice(e.startIndex,e.endIndex)}}function ke(e,t){t.preventDefault&&t.preventDefault(),t.stopPropagation&&t.stopPropagation(),Wt(e,(t==null?void 0:t.deltaY)||0)}const It=1e3;document.querySelector("virtual-list").channels=Array.from(Array(It)).map((e,t)=>{const n=Math.floor(30+50*Math.random());return{name:`channel-${t} (${n}px)`,height:n,color:`hsl(${360*Math.random()}deg 84.19% 49.61% / 25%)`}});