(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{1295:function(e,t,a){"use strict";var n=a(181);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a(0)),l=(0,n(a(253)).default)(r.default.createElement("path",{d:"M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"PersonAdd");t.default=l},1296:function(e,t,a){"use strict";var n=a(181);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a(0)),l=(0,n(a(253)).default)(r.default.createElement("path",{d:"M6 19h4V5H6v14zm8-14v14h4V5h-4z"}),"Pause");t.default=l},1297:function(e,t,a){"use strict";var n=a(181);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a(0)),l=(0,n(a(253)).default)(r.default.createElement("path",{d:"M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"}),"VolumeUp");t.default=l},561:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(7),o=a(51),c=a(502),i=a(242),u=a(99),s=a(551),d=a(474),m=a(100),f=a(175),p=a(174),v=a(1295),b=a.n(v),h=a(1296),g=a.n(h),y=a(1297),E=a.n(y),k=a(182),w=a.n(k),z=a(73);function x(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var a=[],n=!0,r=!1,l=void 0;try{for(var o,c=e[Symbol.iterator]();!(n=(o=c.next()).done)&&(a.push(o.value),!t||a.length!==t);n=!0);}catch(e){r=!0,l=e}finally{try{n||null==c.return||c.return()}finally{if(r)throw l}}return a}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return j(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return j(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function j(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}function O(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var S=Object(c.a)((function(e){var t;return{wrapper:{height:"100%",background:e.palette.secondary.main},content:(t={height:"90.5%",padding:15,overflowY:"auto",overflowX:"hidden"},O(t,"padding",10),O(t,"&::-webkit-scrollbar",{width:6}),O(t,"&::-webkit-scrollbar-thumb",{background:"#ffffff52"}),O(t,"&::-webkit-scrollbar-thumb:hover",{background:e.palette.primary.main}),O(t,"&::-webkit-scrollbar-track",{background:"transparent"}),t),tabPanel:{height:"100%"},phoneTab:{minWidth:"33.3%"},avatar:{height:100,width:100,fontSize:35,color:e.palette.text.dark,display:"block",textAlign:"center",lineHeight:"100px",margin:"auto",transition:"border 0.15s ease-in"},avatarFav:{height:100,width:100,fontSize:35,color:e.palette.text.dark,display:"block",textAlign:"center",lineHeight:"100px",margin:"auto",border:"2px solid gold",transition:"border 0.15s ease-in"},callData:{textAlign:"center",marginTop:"10%",fontSize:35,"& small":{display:"block",fontSize:20,marginTop:"2%"}},phoneBottom:{marginTop:"25%",textAlign:"center"},keypadBtn:{textAlign:"center",height:75,fontSize:"25px",width:"100%"},keypadAction:{padding:20,color:e.palette.getContrastText(m.a[500]),backgroundColor:m.a[500],"&:hover":{backgroundColor:m.a[700]}}}}));t.default=Object(l.b)(null,{addToCall:z.addToCall,endCall:z.endCall})((function(e){var t=S(),a=Object(o.e)(),c=e.match.params.number,m=Object(l.d)((function(e){return e.data.data.contacts})),v=Object(l.d)((function(e){return e.call.call})),h=Object(l.d)((function(e){return e.call.duration})),y=m.filter((function(e){return e.number===c}))[0],k=x(Object(n.useState)(!1),2),z=k[0],j=k[1];Object(n.useEffect)((function(){j(null)}),[]),Object(n.useEffect)((function(){var e=null;return null==v&&(j(!0),e=setTimeout((function(){a.goBack()}),2500)),function(){clearTimeout(e)}}),[v]);var O,A,C,N,T;return r.a.createElement("div",{className:t.wrapper},r.a.createElement("div",{className:t.phoneTop},null!=y?null!=y.avatar&&""!==y.avatar?r.a.createElement(i.a,{className:y.favorite?t.avatarFav:t.avatar,src:y.avatar,alt:y.name.charAt(0)}):r.a.createElement(i.a,{className:y.favorite?t.avatarFav:t.avatar,style:{background:y.color}},y.name.charAt(0)):r.a.createElement(i.a,{className:t.avatar,style:{background:"#333"}},"#"),r.a.createElement("div",{className:t.callData},null!=y?y.name:c,z?r.a.createElement("small",null,"Call Ended"):r.a.createElement("small",null,null!=v?v.state>0?(O=function(e,t){return("000"+e).slice(-1*t)},A=parseFloat(h).toFixed(3),C=Math.floor(A/60/60),N=Math.floor(A/60)%60,T=Math.floor(A-60*N),O(C,2)+":"+O(N,2)+":"+O(T,2)):r.a.createElement("span",null,"Calling ",r.a.createElement(p.a,{size:12,color:f.a[50]})):r.a.createElement("span",null,"Pending ",r.a.createElement(p.a,{size:12,color:f.a[50]}))))),r.a.createElement("div",{className:t.phoneBottom},r.a.createElement(u.a,{container:!0},r.a.createElement(u.a,{item:!0,xs:4},r.a.createElement(s.a,{color:"primary",className:t.keypadBtn,onClick:function(t){e.addToCall(c)}},r.a.createElement(b.a,{style:{fontSize:40}}))),r.a.createElement(u.a,{item:!0,xs:4},r.a.createElement(s.a,{color:"primary",className:t.keypadBtn,onClick:function(e){}},r.a.createElement(g.a,{style:{fontSize:40}}))),r.a.createElement(u.a,{item:!0,xs:4},r.a.createElement(s.a,{color:"primary",className:t.keypadBtn,onClick:function(e){}},r.a.createElement(E.a,{style:{fontSize:40}}))),r.a.createElement(u.a,{item:!0,xs:12,className:t.keypadBtn,style:{marginTop:"42%"}},r.a.createElement(d.a,{className:t.keypadAction,onClick:function(t){console.log(JSON.stringify(v,null,4)),console.log(z),console.log(null==v||z),null==v||z||e.endCall()},disabled:null==v},r.a.createElement(w.a,{style:{fontSize:40}}))))))}))}}]);