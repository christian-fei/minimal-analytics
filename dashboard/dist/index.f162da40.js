var e,t,n,i,r,o,a,l={},s=[],u=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function c(e,t){for(var n in t)e[n]=t[n];return e}function _(e){var t=e.parentNode;t&&t.removeChild(e)}function f(t,n,i){var r,o,a,l={};for(a in n)"key"==a?r=n[a]:"ref"==a?o=n[a]:l[a]=n[a];if(arguments.length>2&&(l.children=arguments.length>3?e.call(arguments,2):i),"function"==typeof t&&null!=t.defaultProps)for(a in t.defaultProps)void 0===l[a]&&(l[a]=t.defaultProps[a]);return p(t,l,r,o,null)}function p(e,i,r,o,a){var l={type:e,props:i,key:r,ref:o,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==a?++n:a};return null==a&&null!=t.vnode&&t.vnode(l),l}function d(e){return e.children}function h(e,t){this.props=e,this.context=t}function m(e,t){if(null==t)return e.__?m(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?m(e):null}function v(e){var t,n;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e){e.__e=e.__c.base=n.__e;break}return v(e)}}function g(e){(!e.__d&&(e.__d=!0)&&i.push(e)&&!y.__r++||o!==t.debounceRendering)&&((o=t.debounceRendering)||r)(y)}function y(){for(var e;y.__r=i.length;)e=i.sort((function(e,t){return e.__v.__b-t.__v.__b})),i=[],e.some((function(e){var t,n,i,r,o,a;e.__d&&(o=(r=(t=e).__v).__e,(a=t.__P)&&(n=[],(i=c({},r)).__v=r.__v+1,D(a,r,i,t.__n,void 0!==a.ownerSVGElement,null!=r.__h?[o]:null,n,null==o?m(r):o,r.__h),$(n,r),r.__e!=o&&v(r)))}))}function b(e,t,n,i,r,o,a,u,c,_){var f,h,v,g,y,b,w,T=i&&i.__k||s,S=T.length;for(n.__k=[],f=0;f<t.length;f++)if(null!=(g=n.__k[f]=null==(g=t[f])||"boolean"==typeof g?null:"string"==typeof g||"number"==typeof g||"bigint"==typeof g?p(null,g,null,null,g):Array.isArray(g)?p(d,{children:g},null,null,null):g.__b>0?p(g.type,g.props,g.key,null,g.__v):g)){if(g.__=n,g.__b=n.__b+1,null===(v=T[f])||v&&g.key==v.key&&g.type===v.type)T[f]=void 0;else for(h=0;h<S;h++){if((v=T[h])&&g.key==v.key&&g.type===v.type){T[h]=void 0;break}v=null}D(e,g,v=v||l,r,o,a,u,c,_),y=g.__e,(h=g.ref)&&v.ref!=h&&(w||(w=[]),v.ref&&w.push(v.ref,null,g),w.push(h,g.__c||y,g)),null!=y?(null==b&&(b=y),"function"==typeof g.type&&g.__k===v.__k?g.__d=c=k(g,c,e):c=C(e,g,v,T,y,c),"function"==typeof n.type&&(n.__d=c)):c&&v.__e==c&&c.parentNode!=e&&(c=m(v))}for(n.__e=b,f=S;f--;)null!=T[f]&&("function"==typeof n.type&&null!=T[f].__e&&T[f].__e==n.__d&&(n.__d=m(i,f+1)),P(T[f],T[f]));if(w)for(f=0;f<w.length;f++)j(w[f],w[++f],w[++f])}function k(e,t,n){for(var i,r=e.__k,o=0;r&&o<r.length;o++)(i=r[o])&&(i.__=e,t="function"==typeof i.type?k(i,t,n):C(n,i,i,r,i.__e,t));return t}function w(e,t){return t=t||[],null==e||"boolean"==typeof e||(Array.isArray(e)?e.some((function(e){w(e,t)})):t.push(e)),t}function C(e,t,n,i,r,o){var a,l,s;if(void 0!==t.__d)a=t.__d,t.__d=void 0;else if(null==n||r!=o||null==r.parentNode)e:if(null==o||o.parentNode!==e)e.appendChild(r),a=null;else{for(l=o,s=0;(l=l.nextSibling)&&s<i.length;s+=2)if(l==r)break e;e.insertBefore(r,o),a=o}return void 0!==a?a:r.nextSibling}function T(e,t,n){"-"===t[0]?e.setProperty(t,n):e[t]=null==n?"":"number"!=typeof n||u.test(t)?n:n+"px"}function S(e,t,n,i,r){var o;e:if("style"===t)if("string"==typeof n)e.style.cssText=n;else{if("string"==typeof i&&(e.style.cssText=i=""),i)for(t in i)n&&t in n||T(e.style,t,"");if(n)for(t in n)i&&n[t]===i[t]||T(e.style,t,n[t])}else if("o"===t[0]&&"n"===t[1])o=t!==(t=t.replace(/Capture$/,"")),t=t.toLowerCase()in e?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+o]=n,n?i||e.addEventListener(t,o?x:O,o):e.removeEventListener(t,o?x:O,o);else if("dangerouslySetInnerHTML"!==t){if(r)t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("href"!==t&&"list"!==t&&"form"!==t&&"tabIndex"!==t&&"download"!==t&&t in e)try{e[t]=null==n?"":n;break e}catch(e){}"function"==typeof n||(null!=n&&(!1!==n||"a"===t[0]&&"r"===t[1])?e.setAttribute(t,n):e.removeAttribute(t))}}function O(e){this.l[e.type+!1](t.event?t.event(e):e)}function x(e){this.l[e.type+!0](t.event?t.event(e):e)}function D(n,i,r,o,a,s,u,f,p){var v,g,y,k,w,C,T,O,x,D,$,j,P,A=i.type;if(void 0!==i.constructor)return null;null!=r.__h&&(p=r.__h,f=i.__e=r.__e,i.__h=null,s=[f]),(v=t.__b)&&v(i);try{e:if("function"==typeof A){if(O=i.props,x=(v=A.contextType)&&o[v.__c],D=v?x?x.props.value:v.__:o,r.__c?T=(g=i.__c=r.__c).__=g.__E:("prototype"in A&&A.prototype.render?i.__c=g=new A(O,D):(i.__c=g=new h(O,D),g.constructor=A,g.render=U),x&&x.sub(g),g.props=O,g.state||(g.state={}),g.context=D,g.__n=o,y=g.__d=!0,g.__h=[]),null==g.__s&&(g.__s=g.state),null!=A.getDerivedStateFromProps&&(g.__s==g.state&&(g.__s=c({},g.__s)),c(g.__s,A.getDerivedStateFromProps(O,g.__s))),k=g.props,w=g.state,y)null==A.getDerivedStateFromProps&&null!=g.componentWillMount&&g.componentWillMount(),null!=g.componentDidMount&&g.__h.push(g.componentDidMount);else{if(null==A.getDerivedStateFromProps&&O!==k&&null!=g.componentWillReceiveProps&&g.componentWillReceiveProps(O,D),!g.__e&&null!=g.shouldComponentUpdate&&!1===g.shouldComponentUpdate(O,g.__s,D)||i.__v===r.__v){g.props=O,g.state=g.__s,i.__v!==r.__v&&(g.__d=!1),g.__v=i,i.__e=r.__e,i.__k=r.__k,i.__k.forEach((function(e){e&&(e.__=i)})),g.__h.length&&u.push(g);break e}null!=g.componentWillUpdate&&g.componentWillUpdate(O,g.__s,D),null!=g.componentDidUpdate&&g.__h.push((function(){g.componentDidUpdate(k,w,C)}))}if(g.context=D,g.props=O,g.__v=i,g.__P=n,$=t.__r,j=0,"prototype"in A&&A.prototype.render)g.state=g.__s,g.__d=!1,$&&$(i),v=g.render(g.props,g.state,g.context);else do{g.__d=!1,$&&$(i),v=g.render(g.props,g.state,g.context),g.state=g.__s}while(g.__d&&++j<25);g.state=g.__s,null!=g.getChildContext&&(o=c(c({},o),g.getChildContext())),y||null==g.getSnapshotBeforeUpdate||(C=g.getSnapshotBeforeUpdate(k,w)),P=null!=v&&v.type===d&&null==v.key?v.props.children:v,b(n,Array.isArray(P)?P:[P],i,r,o,a,s,u,f,p),g.base=i.__e,i.__h=null,g.__h.length&&u.push(g),T&&(g.__E=g.__=null),g.__e=!1}else null==s&&i.__v===r.__v?(i.__k=r.__k,i.__e=r.__e):i.__e=function(t,n,i,r,o,a,s,u){var c,f,p,d=i.props,h=n.props,v=n.type,g=0;if("svg"===v&&(o=!0),null!=a)for(;g<a.length;g++)if((c=a[g])&&"setAttribute"in c==!!v&&(v?c.localName===v:3===c.nodeType)){t=c,a[g]=null;break}if(null==t){if(null===v)return document.createTextNode(h);t=o?document.createElementNS("http://www.w3.org/2000/svg",v):document.createElement(v,h.is&&h),a=null,u=!1}if(null===v)d===h||u&&t.data===h||(t.data=h);else{if(a=a&&e.call(t.childNodes),f=(d=i.props||l).dangerouslySetInnerHTML,p=h.dangerouslySetInnerHTML,!u){if(null!=a)for(d={},g=0;g<t.attributes.length;g++)d[t.attributes[g].name]=t.attributes[g].value;(p||f)&&(p&&(f&&p.__html==f.__html||p.__html===t.innerHTML)||(t.innerHTML=p&&p.__html||""))}if(function(e,t,n,i,r){var o;for(o in n)"children"===o||"key"===o||o in t||S(e,o,null,n[o],i);for(o in t)r&&"function"!=typeof t[o]||"children"===o||"key"===o||"value"===o||"checked"===o||n[o]===t[o]||S(e,o,t[o],n[o],i)}(t,h,d,o,u),p)n.__k=[];else if(g=n.props.children,b(t,Array.isArray(g)?g:[g],n,i,r,o&&"foreignObject"!==v,a,s,a?a[0]:i.__k&&m(i,0),u),null!=a)for(g=a.length;g--;)null!=a[g]&&_(a[g]);u||("value"in h&&void 0!==(g=h.value)&&(g!==t.value||"progress"===v&&!g||"option"===v&&g!==d.value)&&S(t,"value",g,d.value,!1),"checked"in h&&void 0!==(g=h.checked)&&g!==t.checked&&S(t,"checked",g,d.checked,!1))}return t}(r.__e,i,r,o,a,s,u,p);(v=t.diffed)&&v(i)}catch(e){i.__v=null,(p||null!=s)&&(i.__e=f,i.__h=!!p,s[s.indexOf(f)]=null),t.__e(e,i,r)}}function $(e,n){t.__c&&t.__c(n,e),e.some((function(n){try{e=n.__h,n.__h=[],e.some((function(e){e.call(n)}))}catch(e){t.__e(e,n.__v)}}))}function j(e,n,i){try{"function"==typeof e?e(n):e.current=n}catch(e){t.__e(e,i)}}function P(e,n,i){var r,o;if(t.unmount&&t.unmount(e),(r=e.ref)&&(r.current&&r.current!==e.__e||j(r,null,n)),null!=(r=e.__c)){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(e){t.__e(e,n)}r.base=r.__P=null}if(r=e.__k)for(o=0;o<r.length;o++)r[o]&&P(r[o],n,"function"!=typeof e.type);i||null==e.__e||_(e.__e),e.__e=e.__d=void 0}function U(e,t,n){return this.constructor(e,n)}function A(n,i,r){var o,a,s;t.__&&t.__(n,i),a=(o="function"==typeof r)?null:r&&r.__k||i.__k,s=[],D(i,n=(!o&&r||i).__k=f(d,null,[n]),a||l,l,void 0!==i.ownerSVGElement,!o&&r?[r]:a?null:i.firstChild?e.call(i.childNodes):null,s,!o&&r?r:a?a.__e:i.firstChild,o),$(s,n)}function R(t,n,i){var r,o,a,l=c({},t.props);for(a in n)"key"==a?r=n[a]:"ref"==a?o=n[a]:l[a]=n[a];return arguments.length>2&&(l.children=arguments.length>3?e.call(arguments,2):i),p(t.type,l,r||t.key,o||t.ref,null)}e=s.slice,t={__e:function(e,t,n,i){for(var r,o,a;t=t.__;)if((r=t.__c)&&!r.__)try{if((o=r.constructor)&&null!=o.getDerivedStateFromError&&(r.setState(o.getDerivedStateFromError(e)),a=r.__d),null!=r.componentDidCatch&&(r.componentDidCatch(e,i||{}),a=r.__d),a)return r.__E=r}catch(t){e=t}throw e}},n=0,h.prototype.setState=function(e,t){var n;n=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=c({},this.state),"function"==typeof e&&(e=e(c({},n),this.props)),e&&c(n,e),null!=e&&this.__v&&(t&&this.__h.push(t),g(this))},h.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),g(this))},h.prototype.render=d,i=[],r="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,y.__r=0,a=0;var F=function(e,t,n,i){var r;t[0]=0;for(var o=1;o<t.length;o++){var a=t[o++],l=t[o]?(t[0]|=a?1:2,n[t[o++]]):t[++o];3===a?i[0]=l:4===a?i[1]=Object.assign(i[1]||{},l):5===a?(i[1]=i[1]||{})[t[++o]]=l:6===a?i[1][t[++o]]+=l+"":a?(r=e.apply(l,F(e,l,n,["",null])),i.push(r),l[0]?t[0]|=2:(t[o-2]=0,t[o]=r)):i.push(l)}return i},E=new Map;var I,M,H,N=[],L=[],W=t.__b,B=t.__r,V=t.diffed,q=t.__c,K=t.unmount;function z(){for(var e;e=N.shift();)if(e.__P)try{e.__H.__h.forEach(G),e.__H.__h.forEach(Q),e.__H.__h=[]}catch(n){e.__H.__h=[],t.__e(n,e.__v)}}t.__b=function(e){I=null,W&&W(e)},t.__r=function(e){B&&B(e),0;var t=(I=e.__c).__H;t&&(M===I?(t.__h=[],I.__h=[],t.__.forEach((function(e){e.__V=L,e.u=void 0}))):(t.__h.forEach(G),t.__h.forEach(Q),t.__h=[])),M=I},t.diffed=function(e){V&&V(e);var n=e.__c;n&&n.__H&&(n.__H.__h.length&&(1!==N.push(n)&&H===t.requestAnimationFrame||((H=t.requestAnimationFrame)||function(e){var t,n=function(){clearTimeout(i),J&&cancelAnimationFrame(t),setTimeout(e)},i=setTimeout(n,100);J&&(t=requestAnimationFrame(n))})(z)),n.__H.__.forEach((function(e){e.u&&(e.__H=e.u),e.__V!==L&&(e.__=e.__V),e.u=void 0,e.__V=L}))),M=I=null},t.__c=function(e,n){n.some((function(e){try{e.__h.forEach(G),e.__h=e.__h.filter((function(e){return!e.__||Q(e)}))}catch(i){n.some((function(e){e.__h&&(e.__h=[])})),n=[],t.__e(i,e.__v)}})),q&&q(e,n)},t.unmount=function(e){K&&K(e);var n,i=e.__c;i&&i.__H&&(i.__H.__.forEach((function(e){try{G(e)}catch(e){n=e}})),n&&t.__e(n,i.__v))};var J="function"==typeof requestAnimationFrame;function G(e){var t=I,n=e.__c;"function"==typeof n&&(e.__c=void 0,n()),I=t}function Q(e){var t=I;e.__c=e.__(),I=t}var X={};function Y(e,t){for(var n in t)e[n]=t[n];return e}function Z(e,t,n){var i,r=/(?:\?([^#]*))?(#.*)?$/,o=e.match(r),a={};if(o&&o[1])for(var l=o[1].split("&"),s=0;s<l.length;s++){var u=l[s].split("=");a[decodeURIComponent(u[0])]=decodeURIComponent(u.slice(1).join("="))}e=ne(e.replace(r,"")),t=ne(t||"");for(var c=Math.max(e.length,t.length),_=0;_<c;_++)if(t[_]&&":"===t[_].charAt(0)){var f=t[_].replace(/(^:|[+*?]+$)/g,""),p=(t[_].match(/[+*?]+$/)||X)[0]||"",d=~p.indexOf("+"),h=~p.indexOf("*"),m=e[_]||"";if(!m&&!h&&(p.indexOf("?")<0||d)){i=!1;break}if(a[f]=decodeURIComponent(m),d||h){a[f]=e.slice(_).map(decodeURIComponent).join("/");break}}else if(t[_]!==e[_]){i=!1;break}return(!0===n.default||!1!==i)&&a}function ee(e,t){return e.rank<t.rank?1:e.rank>t.rank?-1:e.index-t.index}function te(e,t){return e.index=t,e.rank=(n=e).props.default?0:ne(n.props.path).map(ie).join(""),e.props;var n}function ne(e){return e.replace(/(^\/+|\/+$)/g,"").split("/")}function ie(e){return":"==e.charAt(0)?1+"*+?".indexOf(e.charAt(e.length-1))||4:5}var re,oe,ae={},le=[],se=[],ue=null,ce={url:fe()},_e=(oe={__c:re="__cC"+a++,__:ce,Consumer:function(e,t){return e.children(t)},Provider:function(e){var t,n;return this.getChildContext||(t=[],(n={})[re]=this,this.getChildContext=function(){return n},this.shouldComponentUpdate=function(e){this.props.value!==e.value&&t.some(g)},this.sub=function(e){t.push(e);var n=e.componentWillUnmount;e.componentWillUnmount=function(){t.splice(t.indexOf(e),1),n&&n.call(e)}}),e.children}}).Provider.__=oe.Consumer.contextType=oe;function fe(){var e;return""+((e=ue&&ue.location?ue.location:ue&&ue.getCurrentLocation?ue.getCurrentLocation():"undefined"!=typeof location?location:ae).pathname||"")+(e.search||"")}function pe(e,t){return void 0===t&&(t=!1),"string"!=typeof e&&e.url&&(t=e.replace,e=e.url),function(e){for(var t=le.length;t--;)if(le[t].canRoute(e))return!0;return!1}(e)&&(n=e,void 0===(i=t?"replace":"push")&&(i="push"),ue&&ue[i]?ue[i](n):"undefined"!=typeof history&&history[i+"State"]&&history[i+"State"](null,null,n)),de(e);var n,i}function de(e){for(var t=!1,n=0;n<le.length;n++)le[n].routeTo(e)&&(t=!0);return t}function he(e){if(e&&e.getAttribute){var t=e.getAttribute("href"),n=e.getAttribute("target");if(t&&t.match(/^\//g)&&(!n||n.match(/^_?self$/i)))return pe(t)}}function me(e){if(!(e.ctrlKey||e.metaKey||e.altKey||e.shiftKey||e.button)){var t=e.target;do{if("a"===t.localName&&t.getAttribute("href")){if(t.hasAttribute("data-native")||t.hasAttribute("native"))return;if(he(t))return(n=e).stopImmediatePropagation&&n.stopImmediatePropagation(),n.stopPropagation&&n.stopPropagation(),n.preventDefault(),!1}}while(t=t.parentNode)}var n}var ve=!1;function ge(e){e.history&&(ue=e.history),this.state={url:e.url||fe()}}Y(ge.prototype=new h,{shouldComponentUpdate:function(e){return!0!==e.static||e.url!==this.props.url||e.onChange!==this.props.onChange},canRoute:function(e){var t=w(this.props.children);return void 0!==this.g(t,e)},routeTo:function(e){this.setState({url:e});var t=this.canRoute(e);return this.p||this.forceUpdate(),t},componentWillMount:function(){this.p=!0},componentDidMount:function(){var e=this;ve||(ve=!0,ue||addEventListener("popstate",(function(){de(fe())})),addEventListener("click",me)),le.push(this),ue&&(this.u=ue.listen((function(t){var n=t.location||t;e.routeTo(""+(n.pathname||"")+(n.search||""))}))),this.p=!1},componentWillUnmount:function(){"function"==typeof this.u&&this.u(),le.splice(le.indexOf(this),1)},componentWillUpdate:function(){this.p=!0},componentDidUpdate:function(){this.p=!1},g:function(e,t){e=e.filter(te).sort(ee);for(var n=0;n<e.length;n++){var i=e[n],r=Z(t,i.props.path,i.props);if(r)return[i,r]}},render:function(e,t){var n,i,r=e.onChange,o=t.url,a=this.c,l=this.g(w(e.children),o);if(l&&(i=R(l[0],Y(Y({url:o,matches:n=l[1]},n),{key:void 0,ref:void 0}))),o!==(a&&a.url)){Y(ce,a=this.c={url:o,previous:a&&a.url,current:i,path:i?i.props.path:null,matches:n}),a.router=this,a.active=i?[i]:[];for(var s=se.length;s--;)se[s]({});"function"==typeof r&&r(a)}return f(_e.Provider,{value:a},i)}});function ye({updateTimeframe:e,updateCustomTimeframe:t,clearCustomTimeframe:n,updateResolution:i,filters:r}){return f("div",{class:"grid-lg contain"},[!r.from&&!r.to&&f("div",{class:"w-50-lg"},[f("h4",{},"Timeframe"),f("div",{},[o("today","Today"),o("past-day","Past day"),o("past-week","Past week")]),f("div",{},[o("past-month","Past month"),o("past-6-months","Past 6 months"),o("past-year","Past year")])]),!r.from&&!r.to&&f("div",{class:"w-50-lg"},[f("h4",{},"Resolution"),f("div",{},[["past-year"].includes(r.timeframe)&&a("monthly","Monthly"),["past-week","past-month","past-6-months","past-year"].includes(r.timeframe)&&a("daily","Daily"),["today","past-day","past-week","past-month"].includes(r.timeframe)&&a("hourly","Hourly"),["today","past-day"].includes(r.timeframe)&&a("minutes","Minutes")].filter(Boolean))]),(r.from||r.to)&&f("div",{class:"w-50-lg"},[f("h4",{},"Resolution"),f("div",{},[a("daily","Daily"),a("hourly","Hourly")])]),r.from&&f("div",{},[r.from&&f("span",{class:"filterable static-filter"},"From "),r.from&&f("input",{type:"datetime-local",onChange:e=>{console.log(e.target.value),t(+new Date(e.target.value),+r.to)},value:new Date(+r.from).toISOString().substring(0,16)})]),r.from&&r.to&&f("div",{},[r.to&&f("span",{class:"filterable static-filter"},"To "),r.to&&f("input",{type:"datetime-local",onChange:e=>{console.log(e.target.value),t(+r.from,+new Date(e.target.value))},value:new Date(+r.to).toISOString().substring(0,16)})]),(r.from||r.to)&&f("div",{class:"filterable static-filter",onClick:()=>n()},["Clear [x]"])].filter(Boolean));function o(t,n){return f("span",{onClick:()=>e(t),class:`select-timeframe filterable static-filter ${r.timeframe===t&&"active"}`,name:t,id:t},n)}function a(e,t){return f("span",{onClick:()=>i(e),class:`select-resolution filterable static-filter ${r.resolution===e&&"active"}`,name:e,id:e},t)}}function be({theme:e,toggleTheme:t=Function.prototype}){return f("div",{class:"theme-toggle",onClick:t},[("dark"===e?"light":"dark")+" theme"])}function ke({data:e,filters:t={},updateCustomTimeframe:n}){if(!e)return null;if(!Array.isArray(e.chartData))return null;if(e.chartData.length<2)return f("div",{id:"pageviews-chart",style:{"text-align":"center"}},["Insufficient data to show chart..",f("br",{},[]),"Try to change timeframe or resolution."]);const i=Math.max(...e.chartData.map((e=>e[1])));return f("div",{id:"pageviews-chart"},[f("table",{class:"charts-css column show-labels show-primary-axis"},[f("thead",{},[f("tr",{},[f("th",{scope:"col"},"Date"),f("th",{scope:"col"},"Pageviews")])]),f("tbody",{},e.chartData.map(((o,a)=>f("tr",{key:o[0],onClick:()=>n(+new Date(o[0]))},[f("td",{style:{"--start":0===a?0:e.chartData[a-1][1]/i,"--size":o[1]/i}},[e.chartData.length<50&&f("span",{class:"data"},o[1]),f("span",{class:"tooltip"},[r(o[0],t.resolution),f("br",{},null),`${o[1]} pageviews`])].filter(Boolean))]))))])]);function r(e,t){return"daily"===t||"monthly"===t?new Date(e).toLocaleDateString():new Date(e).toLocaleString()}}function we({data:e,filters:t={},toggleFilter:n}){if(!e)return null;if(!Number.isFinite(e.visitorsCount))return null;if(!Number.isFinite(e.pageviewsCount))return null;let i=e.live||{};return Object.keys(t).length>2&&(i=Object.keys(i).reduce(((e,n)=>Object.keys(t).filter((e=>["p","r","v"].includes(e))).every((e=>i[n].pageview[e]===t[e]))?Object.assign(e,{[n]:i[n]}):e),{})),f("div",{},[f("div",{class:"grid contain text-lg"},[f("div",{class:"w-50"},[f("h2",{},"Visitors"),f("div",{id:"visitors-count"},e.visitorsCount)]),f("div",{class:"w-50"},[f("h2",{},"Pageviews"),f("div",{id:"pageviews-count"},e.pageviewsCount)]),f("div",{class:"w-50"},[f("h2",{},"Bounce rate"),f("div",{id:"bounce-rate"},(e.visitorsCount/e.pageviewsCount*100).toFixed(0)+"%")]),f("div",{class:"w-50"},[f("h2",{},"Live"),f("div",{id:"live"},Object.keys(i).length)])]),f("div",{class:"contain",id:"live-pages"},[Object.keys(i).length>0&&f("h2",{},["Live pages ",f("span",{class:"live-dot"},[])]),f("ul",{},Object.keys(i).reduce(((e,t)=>{const n=e.find((({p:e})=>e===i[t].pageview.p));return n?(n.c++,e):e.concat([{p:i[t].pageview.p,c:1}])}),[]).sort(((e,t)=>e.c-t.c)).map((({p:e,c:i})=>f("li",{class:`filterable ${t.p===e&&"active"}`,onClick:()=>n("p",e),key:e},`${i} · ${e}`))))].filter(Boolean)),f("div",{class:"contain",id:"live-referrers"},[Object.keys(i).length>0&&f("h2",{},["Live referrers ",f("span",{class:"live-dot"},[])]),f("ul",{},Object.keys(i).reduce(((e,t)=>{const n=e.find((({r:e})=>e===i[t].pageview.r));return n?(n.c++,e):e.concat([{r:i[t].pageview.r,c:1}])}),[]).sort(((e,t)=>e.c-t.c)).map((({r:e,c:i})=>f("li",{class:`filterable ${t.r===e&&"active"}`,onClick:()=>n("r",e),key:e},`${i} · ${(e||"").replace("https://","").replace("http://","")||"none"}`))))].filter(Boolean))].filter(Boolean))}function Ce({data:e,loading:t,filters:n={},toggleFilter:i}){if(!e)return null;const{referrers:r=[]}=e,{pages:o=[]}=e,a=Math.max(...r.map((e=>e.views))),l=Math.max(...o.map((e=>e.views)));return f("div",{},[f("div",{class:`grid-lg contain ${t&&"loading"}`},[f("div",{class:"w-50-lg",id:"referrers"},[f("h2",{},"Top Referrers"),f("ul",{id:"top-referrers"},r.map((e=>{const t=`https://icons.duckduckgo.com/ip3/${function(e){if(!e)return"/";const t=document.createElement("a");return t.href=e,t.hostname}(e.r)}.ico`;return f("li",{key:e.r,class:`filterable ${n.r===e.r&&"active"}`,style:{"--data-percentage":100-80*e.views/a+"%"},onClick:()=>i("r",e.r)},[f("div",{},[f("b",{class:"views"},e.views),f("img",{loading:"lazy",class:"favicon",src:t},[]),e.r.replace("https://","").replace("http://","")||"none"])])})))]),f("div",{class:"w-50-lg",id:"pages"},[f("h2",{},"Top Pages"),f("ul",{id:"top-pages"},o.map((e=>f("li",{key:e.p,onClick:()=>i("p",e.p),class:`filterable ${n.p===e.p&&"active"}`,style:{"--data-percentage":100-80*e.views/l+"%"}},[f("b",{class:"views"},e.views),e.p]))))])])])}function Te({data:e,filters:t={},toggleFilter:n}){return e&&Array.isArray(e.data)?f("div",{class:"contain"},[f("ul",{},e.data.map(((e,i)=>f("li",{class:"pageview",key:e.d},[f("div",{class:`filterable ${t.v===e.v&&"active"}`,onClick:()=>n("v",e.v)},[f("time",{},e.d.substring(0,19)),e.v," ",f("span",{style:{"background-color":Oe(e.v)},class:"visitor dot"},[])]),f("div",{class:`filterable ${t.p===e.p&&"active"}`,onClick:()=>n("p",e.p)},[f("b",{},e.p)]),e.r&&f("div",{class:`filterable ${t.r===e.r&&"active"}`,onClick:()=>n("r",e.r)},["from ",f("img",{class:"favicon",src:`https://icons.duckduckgo.com/ip3/${Se(e.r)}.ico`}),e.r.replace("https://","").replace("http://","")])].filter(Boolean)))))]):null}function Se(e){if(!e)return"/";const t=document.createElement("a");return t.href=e,t.hostname}function Oe(e){return"#"+function(e){const t=(16777215&e).toString(16).toUpperCase();return"00000".substring(0,6-t.length)+t}(function(e){let t=0;for(let n=0;n<e.length;n++)t=e.charCodeAt(n)+((t<<5)-t);return t}(e))}class xe extends h{render({data:e,filters:t,loading:n,theme:i,updateResolution:r,updateTimeframe:o,updateCustomTimeframe:a,clearCustomTimeframe:l,toggleFilter:s,toggleTheme:u}={}){return 0===Object.keys(e).length?null:f("div",{class:`${n&&"loading"}`},[f(be,{theme:i,toggleTheme:u},[]),f(ye,{updateResolution:r,updateTimeframe:o,updateCustomTimeframe:a,clearCustomTimeframe:l,filters:t},[]),f(ke,{filters:t,data:e,updateCustomTimeframe:a},[]),f(we,{toggleFilter:s,filters:t,data:e},[]),f(Ce,{data:e,filters:t,toggleFilter:s},[]),f(Te,{data:e,filters:t,toggleFilter:s},[])].filter(Boolean))}}const De={data:{},mounted:!1,loading:!1,filters:{timeframe:"today",resolution:"hourly"},theme:"light"};localStorage.getItem("state")&&Object.assign(De,JSON.parse(localStorage.getItem("state")));A(function(e){var t=E.get(this);return t||(t=new Map,E.set(this,t)),(t=F(this,t.get(e)||(t.set(e,t=function(e){for(var t,n,i=1,r="",o="",a=[0],l=function(e){1===i&&(e||(r=r.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?a.push(0,e,r):3===i&&(e||r)?(a.push(3,e,r),i=2):2===i&&"..."===r&&e?a.push(4,e,0):2===i&&r&&!e?a.push(5,0,!0,r):i>=5&&((r||!e&&5===i)&&(a.push(i,0,r,n),i=6),e&&(a.push(i,e,0,n),i=6)),r=""},s=0;s<e.length;s++){s&&(1===i&&l(),l(s));for(var u=0;u<e[s].length;u++)t=e[s][u],1===i?"<"===t?(l(),a=[a],i=3):r+=t:4===i?"--"===r&&">"===t?(i=1,r=""):r=t+r[0]:o?t===o?o="":r+=t:'"'===t||"'"===t?o=t:">"===t?(l(),i=1):i&&("="===t?(i=5,n=r,r=""):"/"===t&&(i<5||">"===e[s][u+1])?(l(),3===i&&(a=a[0]),i=a,(a=a[0]).push(2,0,i),i=0):" "===t||"\t"===t||"\n"===t||"\r"===t?(l(),i=2):r+=t),3===i&&"!--"===r&&(i=4,a=a[0])}return l(),a}(e)),t),arguments,[])).length>1?t:t[0]}.bind(f)`<${class extends h{state=De;componentDidMount(){if(window.location.search){const e=window.location.search.substring(1).split("&").map((e=>e.split("="))).reduce(((e,t)=>Object.assign(e,{[t[0]]:decodeURIComponent(t[1])})),{});this.setState({mounted:!0,filters:Object.assign({},this.state.filters,e)},(()=>this.getData()))}else this.setState({mounted:!0},(()=>this.getData()));setInterval((()=>this.getData()),6e4);new window.EventSource("/").onmessage=e=>{if(!e||!e.data)return console.error("skipping empty message");try{const t=JSON.parse(e.data,{});this.setState({data:Object.assign({},this.state.data,{live:t})})}catch(e){console.error("sse parse error",e)}}}async handleRoute(e){if(this.state.mounted)if(window.location.search){const e=window.location.search.substring(1).split("&").map((e=>e.split("="))).reduce(((e,t)=>Object.assign(e,{[t[0]]:decodeURIComponent(t[1])})),{});this.setState({filters:Object.assign({},this.state.filters,e)},(()=>this.getData()))}else this.getData()}async getData(){if(this.state.loading)return;this.setState({loading:!0});let e="";Object.keys(this.state.filters).length>0&&(e="?"+Object.keys(this.state.filters).reduce(((e,t)=>e.concat([`${t}=${encodeURIComponent(this.state.filters[t])}`])),[]).join("&"));const t=/(localhost|127\.0\.0\.1|0\.0\.0\.0)/.test(window.location.origin)?"http://127.0.0.1:8080":window.location.origin,n=await window.fetch(t+"/api/"+e),i=await n.json();this.setState({data:i,loading:!1},(()=>localStorage.setItem("state",JSON.stringify(this.state))))}clearCustomTimeframe(){const e=Object.assign({},this.state.filters,{timeframe:"past-day"});delete e.from,delete e.to,this.setState({filters:e},(()=>pe("?"+Object.keys(e).reduce(((t,n)=>t.concat([`${n}=${encodeURIComponent(e[n])}`])),[]).join("&"))))}updateCustomTimeframe(e,t=Date.now()){if(!Number.isFinite(+new Date(e)))return;if(!Number.isFinite(+new Date(t)))return;const n=Object.assign({},this.state.filters,{from:e,to:t});delete n.timeframe,this.setState({filters:n},(()=>pe("?"+Object.keys(n).reduce(((e,t)=>e.concat([`${t}=${encodeURIComponent(n[t])}`])),[]).join("&"))))}updateTimeframe(e){const t=Object.assign({},this.state.filters,{timeframe:e});["today","past-day"].includes(e)&&["monthly","daily"].includes(t.resolution)&&(t.resolution="hourly"),["past-week"].includes(e)&&["minutes","monthly"].includes(t.resolution)&&(t.resolution="daily"),["past-month"].includes(e)&&["minutes","monthly"].includes(t.resolution)&&(t.resolution="daily"),["past-6-months"].includes(e)&&["minutes","hourly"].includes(t.resolution)&&(t.resolution="daily"),["past-year"].includes(e)&&["minutes","hourly","daily"].includes(t.resolution)&&(t.resolution="monthly"),this.setState({filters:t},(()=>pe("?"+Object.keys(t).reduce(((e,n)=>e.concat([`${n}=${encodeURIComponent(t[n])}`])),[]).join("&"))))}updateResolution(e){const t=Object.assign({},this.state.filters,{resolution:e});this.setState({filters:t},(()=>pe("?"+Object.keys(t).reduce(((e,n)=>e.concat([`${n}=${encodeURIComponent(t[n])}`])),[]).join("&"))))}toggleFilter(e,t){const n=Object.assign({},this.state.filters);n[e]===t?delete n[e]:n[e]=t,this.setState({filters:n},(()=>pe("?"+Object.keys(n).reduce(((e,t)=>e.concat([`${t}=${encodeURIComponent(n[t])}`])),[]).join("&"))))}toggleTheme(){this.setState({theme:"dark"===this.state.theme?"light":"dark"})}render(){return f("div",{id:"app",class:`theme-${this.state.theme}`},[f(ge,{onChange:this.handleRoute.bind(this)},[f(xe,{data:this.state.data,filters:this.state.filters,loading:this.state.loading,theme:this.state.theme,updateResolution:this.updateResolution.bind(this),updateTimeframe:this.updateTimeframe.bind(this),updateCustomTimeframe:this.updateCustomTimeframe.bind(this),clearCustomTimeframe:this.clearCustomTimeframe.bind(this),toggleFilter:this.toggleFilter.bind(this),toggleTheme:this.toggleTheme.bind(this),path:"/"},[])])])}}}/>`,document.body);
//# sourceMappingURL=index.f162da40.js.map