var e,t,n,i,r,o,a={},s=[],l=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function c(e,t){for(var n in t)e[n]=t[n];return e}function u(e){var t=e.parentNode;t&&t.removeChild(e)}function _(t,n,i){var r,o,a,s={};for(a in n)"key"==a?r=n[a]:"ref"==a?o=n[a]:s[a]=n[a];if(arguments.length>2&&(s.children=arguments.length>3?e.call(arguments,2):i),"function"==typeof t&&null!=t.defaultProps)for(a in t.defaultProps)void 0===s[a]&&(s[a]=t.defaultProps[a]);return f(t,s,r,o,null)}function f(e,i,r,o,a){var s={type:e,props:i,key:r,ref:o,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==a?++n:a};return null==a&&null!=t.vnode&&t.vnode(s),s}function p(e){return e.children}function d(e,t){this.props=e,this.context=t}function h(e,t){if(null==t)return e.__?h(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?h(e):null}function m(e){var t,n;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e){e.__e=e.__c.base=n.__e;break}return m(e)}}function v(e){(!e.__d&&(e.__d=!0)&&i.push(e)&&!g.__r++||r!==t.debounceRendering)&&((r=t.debounceRendering)||setTimeout)(g)}function g(){for(var e;g.__r=i.length;)e=i.sort((function(e,t){return e.__v.__b-t.__v.__b})),i=[],e.some((function(e){var t,n,i,r,o,a;e.__d&&(o=(r=(t=e).__v).__e,(a=t.__P)&&(n=[],(i=c({},r)).__v=r.__v+1,j(a,r,i,t.__n,void 0!==a.ownerSVGElement,null!=r.__h?[o]:null,n,null==o?h(r):o,r.__h),$(n,r),r.__e!=o&&m(r)))}))}function y(e,t,n,i,r,o,l,c,u,_){var d,m,v,g,y,k,C,T=i&&i.__k||s,S=T.length;for(n.__k=[],d=0;d<t.length;d++)if(null!=(g=n.__k[d]=null==(g=t[d])||"boolean"==typeof g?null:"string"==typeof g||"number"==typeof g||"bigint"==typeof g?f(null,g,null,null,g):Array.isArray(g)?f(p,{children:g},null,null,null):g.__b>0?f(g.type,g.props,g.key,g.ref?g.ref:null,g.__v):g)){if(g.__=n,g.__b=n.__b+1,null===(v=T[d])||v&&g.key==v.key&&g.type===v.type)T[d]=void 0;else for(m=0;m<S;m++){if((v=T[m])&&g.key==v.key&&g.type===v.type){T[m]=void 0;break}v=null}j(e,g,v=v||a,r,o,l,c,u,_),y=g.__e,(m=g.ref)&&v.ref!=m&&(C||(C=[]),v.ref&&C.push(v.ref,null,g),C.push(m,g.__c||y,g)),null!=y?(null==k&&(k=y),"function"==typeof g.type&&g.__k===v.__k?g.__d=u=b(g,u,e):u=w(e,g,v,T,y,u),"function"==typeof n.type&&(n.__d=u)):u&&v.__e==u&&u.parentNode!=e&&(u=h(v))}for(n.__e=k,d=S;d--;)null!=T[d]&&D(T[d],T[d]);if(C)for(d=0;d<C.length;d++)x(C[d],C[++d],C[++d])}function b(e,t,n){for(var i,r=e.__k,o=0;r&&o<r.length;o++)(i=r[o])&&(i.__=e,t="function"==typeof i.type?b(i,t,n):w(n,i,i,r,i.__e,t));return t}function k(e,t){return t=t||[],null==e||"boolean"==typeof e||(Array.isArray(e)?e.some((function(e){k(e,t)})):t.push(e)),t}function w(e,t,n,i,r,o){var a,s,l;if(void 0!==t.__d)a=t.__d,t.__d=void 0;else if(null==n||r!=o||null==r.parentNode)e:if(null==o||o.parentNode!==e)e.appendChild(r),a=null;else{for(s=o,l=0;(s=s.nextSibling)&&l<i.length;l+=1)if(s==r)break e;e.insertBefore(r,o),a=o}return void 0!==a?a:r.nextSibling}function C(e,t,n){"-"===t[0]?e.setProperty(t,n):e[t]=null==n?"":"number"!=typeof n||l.test(t)?n:n+"px"}function T(e,t,n,i,r){var o;e:if("style"===t)if("string"==typeof n)e.style.cssText=n;else{if("string"==typeof i&&(e.style.cssText=i=""),i)for(t in i)n&&t in n||C(e.style,t,"");if(n)for(t in n)i&&n[t]===i[t]||C(e.style,t,n[t])}else if("o"===t[0]&&"n"===t[1])o=t!==(t=t.replace(/Capture$/,"")),t=t.toLowerCase()in e?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+o]=n,n?i||e.addEventListener(t,o?O:S,o):e.removeEventListener(t,o?O:S,o);else if("dangerouslySetInnerHTML"!==t){if(r)t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("href"!==t&&"list"!==t&&"form"!==t&&"tabIndex"!==t&&"download"!==t&&t in e)try{e[t]=null==n?"":n;break e}catch(e){}"function"==typeof n||(null==n||!1===n&&-1==t.indexOf("-")?e.removeAttribute(t):e.setAttribute(t,n))}}function S(e){this.l[e.type+!1](t.event?t.event(e):e)}function O(e){this.l[e.type+!0](t.event?t.event(e):e)}function j(n,i,r,o,s,l,_,f,m){var v,g,b,k,w,C,S,O,j,$,x,D,R,A,F,P=i.type;if(void 0!==i.constructor)return null;null!=r.__h&&(m=r.__h,f=i.__e=r.__e,i.__h=null,l=[f]),(v=t.__b)&&v(i);try{e:if("function"==typeof P){if(O=i.props,j=(v=P.contextType)&&o[v.__c],$=v?j?j.props.value:v.__:o,r.__c?S=(g=i.__c=r.__c).__=g.__E:("prototype"in P&&P.prototype.render?i.__c=g=new P(O,$):(i.__c=g=new d(O,$),g.constructor=P,g.render=U),j&&j.sub(g),g.props=O,g.state||(g.state={}),g.context=$,g.__n=o,b=g.__d=!0,g.__h=[],g._sb=[]),null==g.__s&&(g.__s=g.state),null!=P.getDerivedStateFromProps&&(g.__s==g.state&&(g.__s=c({},g.__s)),c(g.__s,P.getDerivedStateFromProps(O,g.__s))),k=g.props,w=g.state,b)null==P.getDerivedStateFromProps&&null!=g.componentWillMount&&g.componentWillMount(),null!=g.componentDidMount&&g.__h.push(g.componentDidMount);else{if(null==P.getDerivedStateFromProps&&O!==k&&null!=g.componentWillReceiveProps&&g.componentWillReceiveProps(O,$),!g.__e&&null!=g.shouldComponentUpdate&&!1===g.shouldComponentUpdate(O,g.__s,$)||i.__v===r.__v){for(g.props=O,g.state=g.__s,i.__v!==r.__v&&(g.__d=!1),g.__v=i,i.__e=r.__e,i.__k=r.__k,i.__k.forEach((function(e){e&&(e.__=i)})),x=0;x<g._sb.length;x++)g.__h.push(g._sb[x]);g._sb=[],g.__h.length&&_.push(g);break e}null!=g.componentWillUpdate&&g.componentWillUpdate(O,g.__s,$),null!=g.componentDidUpdate&&g.__h.push((function(){g.componentDidUpdate(k,w,C)}))}if(g.context=$,g.props=O,g.__v=i,g.__P=n,D=t.__r,R=0,"prototype"in P&&P.prototype.render){for(g.state=g.__s,g.__d=!1,D&&D(i),v=g.render(g.props,g.state,g.context),A=0;A<g._sb.length;A++)g.__h.push(g._sb[A]);g._sb=[]}else do{g.__d=!1,D&&D(i),v=g.render(g.props,g.state,g.context),g.state=g.__s}while(g.__d&&++R<25);g.state=g.__s,null!=g.getChildContext&&(o=c(c({},o),g.getChildContext())),b||null==g.getSnapshotBeforeUpdate||(C=g.getSnapshotBeforeUpdate(k,w)),F=null!=v&&v.type===p&&null==v.key?v.props.children:v,y(n,Array.isArray(F)?F:[F],i,r,o,s,l,_,f,m),g.base=i.__e,i.__h=null,g.__h.length&&_.push(g),S&&(g.__E=g.__=null),g.__e=!1}else null==l&&i.__v===r.__v?(i.__k=r.__k,i.__e=r.__e):i.__e=function(t,n,i,r,o,s,l,c){var _,f,p,d=i.props,m=n.props,v=n.type,g=0;if("svg"===v&&(o=!0),null!=s)for(;g<s.length;g++)if((_=s[g])&&"setAttribute"in _==!!v&&(v?_.localName===v:3===_.nodeType)){t=_,s[g]=null;break}if(null==t){if(null===v)return document.createTextNode(m);t=o?document.createElementNS("http://www.w3.org/2000/svg",v):document.createElement(v,m.is&&m),s=null,c=!1}if(null===v)d===m||c&&t.data===m||(t.data=m);else{if(s=s&&e.call(t.childNodes),f=(d=i.props||a).dangerouslySetInnerHTML,p=m.dangerouslySetInnerHTML,!c){if(null!=s)for(d={},g=0;g<t.attributes.length;g++)d[t.attributes[g].name]=t.attributes[g].value;(p||f)&&(p&&(f&&p.__html==f.__html||p.__html===t.innerHTML)||(t.innerHTML=p&&p.__html||""))}if(function(e,t,n,i,r){var o;for(o in n)"children"===o||"key"===o||o in t||T(e,o,null,n[o],i);for(o in t)r&&"function"!=typeof t[o]||"children"===o||"key"===o||"value"===o||"checked"===o||n[o]===t[o]||T(e,o,t[o],n[o],i)}(t,m,d,o,c),p)n.__k=[];else if(g=n.props.children,y(t,Array.isArray(g)?g:[g],n,i,r,o&&"foreignObject"!==v,s,l,s?s[0]:i.__k&&h(i,0),c),null!=s)for(g=s.length;g--;)null!=s[g]&&u(s[g]);c||("value"in m&&void 0!==(g=m.value)&&(g!==t.value||"progress"===v&&!g||"option"===v&&g!==d.value)&&T(t,"value",g,d.value,!1),"checked"in m&&void 0!==(g=m.checked)&&g!==t.checked&&T(t,"checked",g,d.checked,!1))}return t}(r.__e,i,r,o,s,l,_,m);(v=t.diffed)&&v(i)}catch(n){i.__v=null,(m||null!=l)&&(i.__e=f,i.__h=!!m,l[l.indexOf(f)]=null),t.__e(n,i,r)}}function $(e,n){t.__c&&t.__c(n,e),e.some((function(n){try{e=n.__h,n.__h=[],e.some((function(e){e.call(n)}))}catch(e){t.__e(e,n.__v)}}))}function x(e,n,i){try{"function"==typeof e?e(n):e.current=n}catch(e){t.__e(e,i)}}function D(e,n,i){var r,o;if(t.unmount&&t.unmount(e),(r=e.ref)&&(r.current&&r.current!==e.__e||x(r,null,n)),null!=(r=e.__c)){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(e){t.__e(e,n)}r.base=r.__P=null,e.__c=void 0}if(r=e.__k)for(o=0;o<r.length;o++)r[o]&&D(r[o],n,i||"function"!=typeof e.type);i||null==e.__e||u(e.__e),e.__=e.__e=e.__d=void 0}function U(e,t,n){return this.constructor(e,n)}function R(n,i,r){var o,s,l;t.__&&t.__(n,i),s=(o="function"==typeof r)?null:r&&r.__k||i.__k,l=[],j(i,n=(!o&&r||i).__k=_(p,null,[n]),s||a,a,void 0!==i.ownerSVGElement,!o&&r?[r]:s?null:i.firstChild?e.call(i.childNodes):null,l,!o&&r?r:s?s.__e:i.firstChild,o),$(l,n)}function A(t,n,i){var r,o,a,s=c({},t.props);for(a in n)"key"==a?r=n[a]:"ref"==a?o=n[a]:s[a]=n[a];return arguments.length>2&&(s.children=arguments.length>3?e.call(arguments,2):i),f(t.type,s,r||t.key,o||t.ref,null)}e=s.slice,t={__e:function(e,t,n,i){for(var r,o,a;t=t.__;)if((r=t.__c)&&!r.__)try{if((o=r.constructor)&&null!=o.getDerivedStateFromError&&(r.setState(o.getDerivedStateFromError(e)),a=r.__d),null!=r.componentDidCatch&&(r.componentDidCatch(e,i||{}),a=r.__d),a)return r.__E=r}catch(t){e=t}throw e}},n=0,d.prototype.setState=function(e,t){var n;n=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=c({},this.state),"function"==typeof e&&(e=e(c({},n),this.props)),e&&c(n,e),null!=e&&this.__v&&(t&&this._sb.push(t),v(this))},d.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),v(this))},d.prototype.render=p,i=[],g.__r=0,o=0;var F=function(e,t,n,i){var r;t[0]=0;for(var o=1;o<t.length;o++){var a=t[o++],s=t[o]?(t[0]|=a?1:2,n[t[o++]]):t[++o];3===a?i[0]=s:4===a?i[1]=Object.assign(i[1]||{},s):5===a?(i[1]=i[1]||{})[t[++o]]=s:6===a?i[1][t[++o]]+=s+"":a?(r=e.apply(s,F(e,s,n,["",null])),i.push(r),s[0]?t[0]|=2:(t[o-2]=0,t[o]=r)):i.push(s)}return i},P=new Map;var I,E,N,H=[],M=[],L=t.__b,B=t.__r,W=t.diffed,V=t.__c,K=t.unmount;function q(){for(var e;e=H.shift();)if(e.__P&&e.__H)try{e.__H.__h.forEach(G),e.__H.__h.forEach(Q),e.__H.__h=[]}catch(n){e.__H.__h=[],t.__e(n,e.__v)}}t.__b=function(e){I=null,L&&L(e)},t.__r=function(e){B&&B(e),0;var t=(I=e.__c).__H;t&&(E===I?(t.__h=[],I.__h=[],t.__.forEach((function(e){e.__N&&(e.__=e.__N),e.__V=M,e.__N=e.i=void 0}))):(t.__h.forEach(G),t.__h.forEach(Q),t.__h=[])),E=I},t.diffed=function(e){W&&W(e);var n=e.__c;n&&n.__H&&(n.__H.__h.length&&(1!==H.push(n)&&N===t.requestAnimationFrame||((N=t.requestAnimationFrame)||z)(q)),n.__H.__.forEach((function(e){e.i&&(e.__H=e.i),e.__V!==M&&(e.__=e.__V),e.i=void 0,e.__V=M}))),E=I=null},t.__c=function(e,n){n.some((function(e){try{e.__h.forEach(G),e.__h=e.__h.filter((function(e){return!e.__||Q(e)}))}catch(i){n.some((function(e){e.__h&&(e.__h=[])})),n=[],t.__e(i,e.__v)}})),V&&V(e,n)},t.unmount=function(e){K&&K(e);var n,i=e.__c;i&&i.__H&&(i.__H.__.forEach((function(e){try{G(e)}catch(e){n=e}})),i.__H=void 0,n&&t.__e(n,i.__v))};var J="function"==typeof requestAnimationFrame;function z(e){var t,n=function(){clearTimeout(i),J&&cancelAnimationFrame(t),setTimeout(e)},i=setTimeout(n,100);J&&(t=requestAnimationFrame(n))}function G(e){var t=I,n=e.__c;"function"==typeof n&&(e.__c=void 0,n()),I=t}function Q(e){var t=I;e.__c=e.__(),I=t}var X={};function Y(e,t){for(var n in t)e[n]=t[n];return e}function Z(e,t,n){var i,r=/(?:\?([^#]*))?(#.*)?$/,o=e.match(r),a={};if(o&&o[1])for(var s=o[1].split("&"),l=0;l<s.length;l++){var c=s[l].split("=");a[decodeURIComponent(c[0])]=decodeURIComponent(c.slice(1).join("="))}e=ne(e.replace(r,"")),t=ne(t||"");for(var u=Math.max(e.length,t.length),_=0;_<u;_++)if(t[_]&&":"===t[_].charAt(0)){var f=t[_].replace(/(^:|[+*?]+$)/g,""),p=(t[_].match(/[+*?]+$/)||X)[0]||"",d=~p.indexOf("+"),h=~p.indexOf("*"),m=e[_]||"";if(!m&&!h&&(p.indexOf("?")<0||d)){i=!1;break}if(a[f]=decodeURIComponent(m),d||h){a[f]=e.slice(_).map(decodeURIComponent).join("/");break}}else if(t[_]!==e[_]){i=!1;break}return(!0===n.default||!1!==i)&&a}function ee(e,t){return e.rank<t.rank?1:e.rank>t.rank?-1:e.index-t.index}function te(e,t){return e.index=t,e.rank=function(e){return e.props.default?0:ne(e.props.path).map(ie).join("")}(e),e.props}function ne(e){return e.replace(/(^\/+|\/+$)/g,"").split("/")}function ie(e){return":"==e.charAt(0)?1+"*+?".indexOf(e.charAt(e.length-1))||4:5}var re,oe,ae={},se=[],le=[],ce=null,ue={url:fe()},_e=(oe={__c:re="__cC"+o++,__:ue,Consumer:function(e,t){return e.children(t)},Provider:function(e){var t,n;return this.getChildContext||(t=[],(n={})[re]=this,this.getChildContext=function(){return n},this.shouldComponentUpdate=function(e){this.props.value!==e.value&&t.some(v)},this.sub=function(e){t.push(e);var n=e.componentWillUnmount;e.componentWillUnmount=function(){t.splice(t.indexOf(e),1),n&&n.call(e)}}),e.children}}).Provider.__=oe.Consumer.contextType=oe;function fe(){var e;return""+((e=ce&&ce.location?ce.location:ce&&ce.getCurrentLocation?ce.getCurrentLocation():"undefined"!=typeof location?location:ae).pathname||"")+(e.search||"")}function pe(e,t){return void 0===t&&(t=!1),"string"!=typeof e&&e.url&&(t=e.replace,e=e.url),function(e){for(var t=se.length;t--;)if(se[t].canRoute(e))return!0;return!1}(e)&&function(e,t){void 0===t&&(t="push"),ce&&ce[t]?ce[t](e):"undefined"!=typeof history&&history[t+"State"]&&history[t+"State"](null,null,e)}(e,t?"replace":"push"),de(e)}function de(e){for(var t=!1,n=0;n<se.length;n++)se[n].routeTo(e)&&(t=!0);return t}function he(e){if(e&&e.getAttribute){var t=e.getAttribute("href"),n=e.getAttribute("target");if(t&&t.match(/^\//g)&&(!n||n.match(/^_?self$/i)))return pe(t)}}function me(e){return e.stopImmediatePropagation&&e.stopImmediatePropagation(),e.stopPropagation&&e.stopPropagation(),e.preventDefault(),!1}function ve(e){if(!(e.ctrlKey||e.metaKey||e.altKey||e.shiftKey||e.button)){var t=e.target;do{if("a"===t.localName&&t.getAttribute("href")){if(t.hasAttribute("data-native")||t.hasAttribute("native"))return;if(he(t))return me(e)}}while(t=t.parentNode)}}var ge=!1;function ye(e){e.history&&(ce=e.history),this.state={url:e.url||fe()}}Y(ye.prototype=new d,{shouldComponentUpdate:function(e){return!0!==e.static||e.url!==this.props.url||e.onChange!==this.props.onChange},canRoute:function(e){var t=k(this.props.children);return void 0!==this.g(t,e)},routeTo:function(e){this.setState({url:e});var t=this.canRoute(e);return this.p||this.forceUpdate(),t},componentWillMount:function(){this.p=!0},componentDidMount:function(){var e=this;ge||(ge=!0,ce||addEventListener("popstate",(function(){de(fe())})),addEventListener("click",ve)),se.push(this),ce&&(this.u=ce.listen((function(t){var n=t.location||t;e.routeTo(""+(n.pathname||"")+(n.search||""))}))),this.p=!1},componentWillUnmount:function(){"function"==typeof this.u&&this.u(),se.splice(se.indexOf(this),1)},componentWillUpdate:function(){this.p=!0},componentDidUpdate:function(){this.p=!1},g:function(e,t){e=e.filter(te).sort(ee);for(var n=0;n<e.length;n++){var i=e[n],r=Z(t,i.props.path,i.props);if(r)return[i,r]}},render:function(e,t){var n,i,r=e.onChange,o=t.url,a=this.c,s=this.g(k(e.children),o);if(s&&(i=A(s[0],Y(Y({url:o,matches:n=s[1]},n),{key:void 0,ref:void 0}))),o!==(a&&a.url)){Y(ue,a=this.c={url:o,previous:a&&a.url,current:i,path:i?i.props.path:null,matches:n}),a.router=this,a.active=i?[i]:[];for(var l=le.length;l--;)le[l]({});"function"==typeof r&&r(a)}return _(_e.Provider,{value:a},i)}});function be({updateTimeframe:e,updateCustomTimeframe:t,clearCustomTimeframe:n,updateResolution:i,filters:r}){return _("div",{class:"grid-lg contain"},[!r.from&&!r.to&&_("div",{class:"w-50-lg"},[_("h4",{},"Timeframe"),_("div",{},[o("today","Today"),o("past-day","Past day"),o("past-week","Past week")]),_("div",{},[o("past-month","Past month"),o("past-6-months","Past 6 months"),o("past-year","Past year")])]),!r.from&&!r.to&&_("div",{class:"w-50-lg"},[_("h4",{},"Resolution"),_("div",{},[["past-year","past-6-months"].includes(r.timeframe)&&a("monthly","Monthly"),["past-week","past-month","past-6-months","past-year"].includes(r.timeframe)&&a("daily","Daily"),["today","past-day","past-week","past-month","past-6-months"].includes(r.timeframe)&&a("hourly","Hourly"),["today","past-day","past-week"].includes(r.timeframe)&&a("minutes","Minutes")].filter(Boolean))]),(r.from||r.to)&&_("div",{class:"w-50-lg"},[_("h4",{},"Resolution"),_("div",{},[a("daily","Daily"),a("hourly","Hourly")])]),r.from&&_("div",{},[r.from&&_("span",{class:"filterable static-filter"},"From "),r.from&&_("input",{type:"datetime-local",onChange:e=>{t(+new Date(e.target.value),+r.to)},value:new Date(+r.from).toISOString().substring(0,16)})]),r.from&&r.to&&_("div",{},[r.to&&_("span",{class:"filterable static-filter"},"To "),r.to&&_("input",{type:"datetime-local",onChange:e=>{t(+r.from,+new Date(e.target.value))},value:new Date(+r.to).toISOString().substring(0,16)})]),(r.from||r.to)&&_("div",{class:"filterable static-filter",onClick:()=>n()},["Clear [x]"])].filter(Boolean));function o(t,n){return _("a",{href:"#",onClick:n=>{n.preventDefault(),e(t)},class:`select-timeframe filterable static-filter ${r.timeframe===t&&"active"}`,name:t,id:t},n)}function a(e,t){return _("a",{href:"#",onClick:t=>{t.preventDefault(),i(e)},class:`select-resolution filterable static-filter ${r.resolution===e&&"active"}`,name:e,id:e},t)}}function ke({theme:e,toggleTheme:t=Function.prototype}){return _("div",{class:"theme-toggle",onClick:t},[("dark"===e?"light":"dark")+" theme"])}function we({searchTerm:e="",updateSearchTerm:t=Function.prototype}={}){return _("div",{class:"contain"},[_("input",{class:"search",placeholder:"Filter by page or referrer",onKeyUp:e=>{console.log("changed",e.target.value),t(e.target.value)}})].filter(Boolean))}function Ce({data:e,filters:t={},updateCustomTimeframe:n}){if(!e)return null;if(!Array.isArray(e.chartData))return null;if(e.chartData.length<2)return _("div",{id:"pageviews-chart",style:{"text-align":"center"}},["Insufficient data to show chart..",_("br",{},[]),"Try to change timeframe or resolution."]);const i=Math.max(...e.chartData.map((e=>e[1])));return _("div",{id:"pageviews-chart"},[_("table",{class:"charts-css column show-labels show-primary-axis"},[_("thead",{},[_("tr",{},[_("th",{scope:"col"},"Date"),_("th",{scope:"col"},"Pageviews")])]),_("tbody",{},e.chartData.map(((o,a)=>_("tr",{key:o[0],onClick:()=>n(+new Date(o[0]))},[_("td",{style:{"--start":0===a?0:e.chartData[a-1][1]/i,"--size":o[1]/i}},[e.chartData.length<50&&_("span",{class:"data"},o[1]),_("span",{class:"tooltip"},[r(o[0],t.resolution),_("br",{},null),`${o[1]} pageviews`])].filter(Boolean))]))))])]);function r(e,t){return"daily"===t||"monthly"===t?new Date(e).toLocaleDateString():new Date(e).toLocaleString()}}function Te({data:e,filters:t={},toggleFilter:n}){if(!e)return null;if(!Number.isFinite(e.visitorsCount))return null;if(!Number.isFinite(e.pageviewsCount))return null;let i=e.live||{};return Object.keys(t).length>2&&(i=Object.keys(i).reduce(((e,n)=>Object.keys(t).filter((e=>["p","r","v"].includes(e))).every((e=>i[n].pageview[e]===t[e]))?Object.assign(e,{[n]:i[n]}):e),{})),_("div",{},[_("div",{class:"grid contain text-lg"},[_("div",{class:"w-50"},[_("h2",{},"Visitors"),_("div",{id:"visitors-count"},e.visitorsCount)]),_("div",{class:"w-50"},[_("h2",{},"Pageviews"),_("div",{id:"pageviews-count"},e.pageviewsCount)]),_("div",{class:"w-50"},[_("h2",{},"Bounce rate"),_("div",{id:"bounce-rate"},(e.visitorsCount/e.pageviewsCount*100).toFixed(0)+"%")]),_("div",{class:"w-50"},[_("h2",{},"Live"),_("div",{id:"live"},Object.keys(i).length)])]),_("div",{class:"contain",id:"live-pages"},[Object.keys(i).length>0&&_("h2",{},["Live pages ",_("span",{class:"live-dot"},[])]),_("ul",{},Object.keys(i).reduce(((e,t)=>{const n=e.find((({p:e})=>e===i[t].pageview.p));return n?(n.c++,e):e.concat([{p:i[t].pageview.p,c:1}])}),[]).sort(((e,t)=>e.c-t.c)).map((({p:e,c:i})=>_("li",{class:`filterable ${t.p===e&&"active"}`,onClick:()=>n("p",e),key:e},`${i} · ${e}`))))].filter(Boolean)),_("div",{class:"contain",id:"live-referrers"},[Object.keys(i).length>0&&_("h2",{},["Live referrers ",_("span",{class:"live-dot"},[])]),_("ul",{},Object.keys(i).reduce(((e,t)=>{const n=e.find((({r:e})=>e===i[t].pageview.r));return n?(n.c++,e):e.concat([{r:i[t].pageview.r,c:1}])}),[]).sort(((e,t)=>e.c-t.c)).map((({r:e,c:i})=>_("li",{class:`filterable ${t.r===e&&"active"}`,onClick:()=>n("r",e),key:e},`${i} · ${(e||"").replace("https://","").replace("http://","")||"none"}`))))].filter(Boolean))].filter(Boolean))}function Se(e){if(!e)return"/";const t=document.createElement("a");return t.href=e,t.hostname}function Oe({data:e,loading:t,filters:n={},toggleFilter:i}){if(!e)return null;const{referrers:r=[]}=e,{pages:o=[]}=e,{events:a=[]}=e,s=Math.max(...a.map((e=>e.views))),l=Math.max(...r.map((e=>e.views))),c=Math.max(...o.map((e=>e.views)));return _("div",{},[_("div",{class:`${t&&"loading"}`},[_("div",{class:"grid-lg contain"},[_("div",{class:"w-50-lg",id:"referrers"},[_("h2",{},"Top Referrers"),_("ul",{id:"top-referrers"},r.map((e=>{const t=`https://icons.duckduckgo.com/ip3/${Se(e.r)}.ico`;return _("li",{key:e.r,class:`filterable ${n.r===e.r&&"active"}`,style:{"--data-percentage":100-80*e.views/l+"%"},onClick:()=>i("r",e.r)},[_("div",{},[_("b",{class:"views"},e.views),_("img",{loading:"lazy",class:"favicon",src:t},[]),e.r.replace("https://","").replace("http://","")||"none"])])})))]),_("div",{class:"w-50-lg",id:"pages"},[_("h2",{},"Top Pages"),_("ul",{id:"top-pages"},o.map((e=>_("li",{key:e.p,onClick:()=>i("p",e.p),class:`filterable ${n.p===e.p&&"active"}`,style:{"--data-percentage":100-80*e.views/c+"%"}},[_("b",{class:"views"},e.views),e.p]))))])]),_("div",{class:"contain"},[_("h2",{},"Top Events"),_("ul",{id:"top-events"},a.map((e=>_("li",{key:e.e,style:{"--data-percentage":100-80*e.views/s+"%"}},[_("div",{},[_("b",{class:"views"},e.views),e.e])]))))])])])}function je({data:e,filters:t={},toggleFilter:n}){return e&&Array.isArray(e.data)?_("div",{class:"contain"},[_("ul",{},e.data.map(((e,i)=>{return"event"!==e.t&&_("li",{class:"pageview",key:e.d},[_("div",{class:`filterable ${t.v===e.v&&"active"}`,onClick:()=>n("v",e.v)},[_("time",{},e.d.substring(0,19)),e.v," ",_("span",{style:{"background-color":(r=e.v,"#"+function(e){const t=(16777215&e).toString(16).toUpperCase();return"00000".substring(0,6-t.length)+t}(function(e){let t=0;for(let n=0;n<e.length;n++)t=e.charCodeAt(n)+((t<<5)-t);return t}(r)))},class:"visitor dot"},[])]),_("div",{class:`filterable ${t.p===e.p&&"active"}`,onClick:()=>n("p",e.p)},[_("b",{},e.p)]),e.r&&_("div",{class:`filterable ${t.r===e.r&&"active"}`,onClick:()=>n("r",e.r)},["from ",_("img",{class:"favicon",src:`https://icons.duckduckgo.com/ip3/${Se(e.r)}.ico`}),e.r.replace("https://","").replace("http://","")])].filter(Boolean));var r})))]):null}class $e extends d{render({data:e,filters:t,loading:n,theme:i,searchTerm:r,updateResolution:o,updateTimeframe:a,updateCustomTimeframe:s,clearCustomTimeframe:l,toggleFilter:c,toggleTheme:u,updateSearchTerm:f}={}){return 0===Object.keys(e).length?null:_("div",{class:`${n&&"loading"}`},[_(ke,{theme:i,toggleTheme:u},[]),_(we,{searchTerm:r,updateSearchTerm:f},[]),_(be,{filters:t,clearCustomTimeframe:l,updateResolution:o,updateTimeframe:a,updateCustomTimeframe:s},[]),_(Ce,{data:e,filters:t,updateCustomTimeframe:s},[]),_(Te,{data:e,filters:t,toggleFilter:c},[]),_(Oe,{data:e,filters:t,toggleFilter:c},[]),_(je,{data:e,filters:t,toggleFilter:c},[])].filter(Boolean))}}const xe={data:{},mounted:!1,loading:!1,filters:{timeframe:"today",resolution:"hourly"},theme:"light"};localStorage.getItem("state")&&Object.assign(xe,JSON.parse(localStorage.getItem("state")));const De=function(e){var t=P.get(this);return t||(t=new Map,P.set(this,t)),(t=F(this,t.get(e)||(t.set(e,t=function(e){for(var t,n,i=1,r="",o="",a=[0],s=function(e){1===i&&(e||(r=r.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?a.push(0,e,r):3===i&&(e||r)?(a.push(3,e,r),i=2):2===i&&"..."===r&&e?a.push(4,e,0):2===i&&r&&!e?a.push(5,0,!0,r):i>=5&&((r||!e&&5===i)&&(a.push(i,0,r,n),i=6),e&&(a.push(i,e,0,n),i=6)),r=""},l=0;l<e.length;l++){l&&(1===i&&s(),s(l));for(var c=0;c<e[l].length;c++)t=e[l][c],1===i?"<"===t?(s(),a=[a],i=3):r+=t:4===i?"--"===r&&">"===t?(i=1,r=""):r=t+r[0]:o?t===o?o="":r+=t:'"'===t||"'"===t?o=t:">"===t?(s(),i=1):i&&("="===t?(i=5,n=r,r=""):"/"===t&&(i<5||">"===e[l][c+1])?(s(),3===i&&(a=a[0]),i=a,(a=a[0]).push(2,0,i),i=0):" "===t||"\t"===t||"\n"===t||"\r"===t?(s(),i=2):r+=t),3===i&&"!--"===r&&(i=4,a=a[0])}return s(),a}(e)),t),arguments,[])).length>1?t:t[0]}.bind(_);R(De`<${class extends d{state=xe;componentDidMount(){if(window.location.search){const e=window.location.search.substring(1).split("&").map((e=>e.split("="))).reduce(((e,t)=>Object.assign(e,{[t[0]]:decodeURIComponent(t[1])})),{});this.setState({mounted:!0,filters:Object.assign({},this.state.filters,e)},(()=>this.getData()))}else this.setState({mounted:!0},(()=>this.getData()));setInterval((()=>this.getData()),6e4);new window.EventSource("/").onmessage=e=>{if(!e||!e.data)return console.error("skipping empty message");try{const t=JSON.parse(e.data,{});this.setState({data:Object.assign({},this.state.data,{live:t})})}catch(e){console.error("sse parse error",e)}}}async handleRoute(e){if(this.state.mounted)if(window.location.search){const e=window.location.search.substring(1).split("&").map((e=>e.split("="))).reduce(((e,t)=>Object.assign(e,{[t[0]]:decodeURIComponent(t[1])})),{});this.setState({filters:Object.assign({},this.state.filters,e)},(()=>this.getData()))}else this.getData()}async getData(){if(this.state.loading)return;if(this.setState({loading:!0}),""!==this.state.filters.s){console.log("filtering by search term");let e="";const t=Object.assign({},this.state.filters);delete t.p,delete t.r,delete t.v,Object.keys(t).length>0&&(e="?"+Object.keys(t).reduce(((e,n)=>e.concat([`${n}=${encodeURIComponent(t[n])}`])),[]).join("&"));const n=/(localhost|127\.0\.0\.1|0\.0\.0\.0)/.test(window.location.origin)?"http://127.0.0.1:8080":window.location.origin,i=await window.fetch(n+"/api/"+e),r=await i.json();return void this.setState({data:r,loading:!1},(()=>localStorage.setItem("state",JSON.stringify(this.state))))}let e="";Object.keys(this.state.filters).length>0&&(e="?"+Object.keys(this.state.filters).reduce(((e,t)=>e.concat([`${t}=${encodeURIComponent(this.state.filters[t])}`])),[]).join("&"));const t=/(localhost|127\.0\.0\.1|0\.0\.0\.0)/.test(window.location.origin)?"http://127.0.0.1:8080":window.location.origin,n=await window.fetch(t+"/api/"+e),i=await n.json();this.setState({data:i,loading:!1},(()=>localStorage.setItem("state",JSON.stringify(this.state))))}clearCustomTimeframe(){const e=Object.assign({},this.state.filters,{timeframe:"past-day"});delete e.from,delete e.to,this.setState({filters:e},(()=>pe("?"+Object.keys(e).reduce(((t,n)=>t.concat([`${n}=${encodeURIComponent(e[n])}`])),[]).join("&"))))}updateCustomTimeframe(e,t=Date.now()){if(!Number.isFinite(+new Date(e)))return;if(!Number.isFinite(+new Date(t)))return;const n=Object.assign({},this.state.filters,{from:e,to:t});delete n.timeframe,this.setState({filters:n},(()=>pe("?"+Object.keys(n).reduce(((e,t)=>e.concat([`${t}=${encodeURIComponent(n[t])}`])),[]).join("&"))))}updateTimeframe(e){const t=Object.assign({},this.state.filters,{timeframe:e});["today","past-day"].includes(e)&&["monthly","daily"].includes(t.resolution)&&(t.resolution="hourly"),["past-week"].includes(e)&&["monthly"].includes(t.resolution)&&(t.resolution="daily"),["past-month"].includes(e)&&["minutes","monthly"].includes(t.resolution)&&(t.resolution="daily"),["past-6-months"].includes(e)&&["minutes"].includes(t.resolution)&&(t.resolution="daily"),["past-year"].includes(e)&&["minutes","hourly"].includes(t.resolution)&&(t.resolution="monthly"),this.setState({filters:t},(()=>pe("?"+Object.keys(t).reduce(((e,n)=>e.concat([`${n}=${encodeURIComponent(t[n])}`])),[]).join("&"))))}updateResolution(e){const t=Object.assign({},this.state.filters,{resolution:e});this.setState({filters:t},(()=>pe("?"+Object.keys(t).reduce(((e,n)=>e.concat([`${n}=${encodeURIComponent(t[n])}`])),[]).join("&"))))}toggleFilter(e,t){const n=Object.assign({},this.state.filters);n[e]===t?delete n[e]:n[e]=t,this.setState({filters:n},(()=>pe("?"+Object.keys(n).reduce(((e,t)=>e.concat([`${t}=${encodeURIComponent(n[t])}`])),[]).join("&"))))}toggleTheme(){this.setState({theme:"dark"===this.state.theme?"light":"dark"})}updateSearchTerm(e=""){const t=Object.assign({},this.state.filters,{s:e});this.setState({filters:t},(()=>pe("?"+Object.keys(this.state.filters).reduce(((e,t)=>e.concat([`${t}=${encodeURIComponent(this.state.filters[t])}`])),[]).join("&"))))}render(){return _("div",{id:"app",class:`theme-${this.state.theme}`},[_(ye,{onChange:this.handleRoute.bind(this)},[_($e,{data:this.state.data,filters:this.state.filters,loading:this.state.loading,theme:this.state.theme,updateResolution:this.updateResolution.bind(this),updateTimeframe:this.updateTimeframe.bind(this),updateCustomTimeframe:this.updateCustomTimeframe.bind(this),clearCustomTimeframe:this.clearCustomTimeframe.bind(this),toggleFilter:this.toggleFilter.bind(this),toggleTheme:this.toggleTheme.bind(this),updateSearchTerm:this.updateSearchTerm.bind(this),path:"/"},[])])])}}}/>`,document.body);
//# sourceMappingURL=index.116332dd.js.map
