(window.webpackJsonp=window.webpackJsonp||[]).push([[9,55],{1030:function(e,a,t){"use strict";t.d(a,"a",(function(){return l}));var n=t(1),r=t(0),c=t.n(r),o=t(148);function l(e,a){var t=c.a.memo(c.a.forwardRef((function(a,t){return c.a.createElement(o.a,Object(n.a)({ref:t},a),e)})));return t.muiName=o.a.muiName,t}},533:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),c=t(7),o=t(51),l=t(8),i=t(1186),m=t(502),s=t(540),u=t(1169),d=t(99),p=t(242),f=t(1170),b=t(1055),h=t.n(b),v=t(18),E=t(1030),g=Object(E.a)(r.a.createElement("path",{d:"M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5z"}),"CallMade"),x=Object(E.a)(r.a.createElement("path",{d:"M20 5.41L18.59 4 7 15.59V9H5v10h10v-2H8.41z"}),"CallReceived"),y=Object(E.a)(r.a.createElement("path",{d:"M6.5 5.5L12 11l7-7-1-1-6 6-4.5-4.5H11V3H5v6h1.5V5.5zm17.21 11.17C20.66 13.78 16.54 12 12 12 7.46 12 3.34 13.78.29 16.67c-.18.18-.29.43-.29.71s.11.53.29.71l2.48 2.48c.18.18.43.29.71.29.27 0 .52-.11.7-.28.79-.74 1.69-1.36 2.66-1.85.33-.16.56-.5.56-.9v-3.1c1.45-.48 3-.73 4.6-.73 1.6 0 3.15.25 4.6.72v3.1c0 .39.23.74.56.9.98.49 1.87 1.12 2.67 1.85.18.18.43.28.7.28.28 0 .53-.11.71-.29l2.48-2.48c.18-.18.29-.43.29-.71s-.12-.52-.3-.7z"}),"PhoneMissed"),N=t(103),j=t.n(N),w=t(73),O=Object(l.a)({root:{border:"1px solid rgba(0, 0, 0, .25)",boxShadow:"none","&:not(:last-child)":{borderBottom:0},"&:before":{display:"none"},"&$expanded":{margin:"auto"}},expanded:{}})(i.a),k=Object(m.a)((function(e){return{contact:{"&::before":{background:"transparent !important"},background:e.palette.secondary.dark,"&:hover":{background:e.palette.secondary.main,transition:"background ease-in 0.15s",cursor:"pointer"}},paper:{background:e.palette.secondary.dark},expandoContainer:{textAlign:"center",fontSize:30},expandoItem:{"&:hover":{color:e.palette.primary.main,transition:"color ease-in 0.15s"}},avatar:{color:"#fff",height:45,width:45},avatarFav:{color:"#fff",height:45,width:45,border:"2px solid gold"},contactName:{fontSize:18,color:e.palette.text.light},contactNumber:{fontSize:16,color:e.palette.text.main},expanded:{margin:0},missedIcon:{height:16,width:16,color:e.palette.error.main},incomingIcon:{height:16,width:16,color:"#5ec750"},outgoingIcon:{height:16,width:16,color:"#50a2c7"},callDate:{textAlign:"right",fontSize:12}}}));a.default=Object(c.b)(null,{createCall:w.createCall})((function(e){var a,t=k(),n=Object(o.e)(),l=Object(c.d)((function(e){return e.data.data.contacts})),i=Object(c.d)((function(e){return e.call.call})),m=l.filter((function(a){return a.number===e.call.number}))[0];return r.a.createElement(s.a,{className:t.paper},r.a.createElement(O,{className:t.contact,expanded:e.expanded==e.index,onChange:e.onClick},r.a.createElement(u.a,{expandIcon:r.a.createElement(h.a,null)},r.a.createElement(d.a,{container:!0},r.a.createElement(d.a,{item:!0,xs:2},null!=m&&null!=m.avatar&&""!==m.avatar?r.a.createElement(p.a,{className:m.favorite?t.avatarFav:t.avatar,src:m.avatar,alt:m.name.charAt(0)}):r.a.createElement(p.a,{className:null!=m&&m.favorite?t.avatarFav:t.avatar,style:{background:null!=m&&m.color?m.color:"#333"}},null!=m?m.name.charAt(0):"#")),r.a.createElement(d.a,{item:!0,xs:10},r.a.createElement("div",{className:t.contactName},null!=m?m.name:"Unkown Caller"),r.a.createElement(d.a,{container:!0,className:t.contactNumber},r.a.createElement(d.a,{item:!0,xs:6},(a=e.call).duration>-1?a.method?r.a.createElement(g,{className:t.outgoingIcon}):r.a.createElement(x,{className:t.incomingIcon}):a.method?r.a.createElement(g,{className:t.missedIcon}):r.a.createElement(y,{className:t.missedIcon})," ",e.call.number),r.a.createElement(d.a,{item:!0,xs:6,className:t.callDate},r.a.createElement(j.a,{fromNow:!0},+e.call.time)))))),r.a.createElement(f.a,null,r.a.createElement(d.a,{container:!0,className:t.expandoContainer},r.a.createElement(d.a,{item:!0,xs:4,className:t.expandoItem,onClick:function(){null==i&&(e.createCall(e.call.number),n.push("/apps/phone/call/".concat(e.call.number)))}},r.a.createElement(v.a,{icon:"phone"})),r.a.createElement(d.a,{item:!0,xs:4,className:t.expandoItem,onClick:function(){n.push("/apps/messages/convo/".concat(e.call.number))}},r.a.createElement(v.a,{icon:"sms"})),null!=m?r.a.createElement(d.a,{item:!0,xs:4,className:t.expandoItem,onClick:function(){n.push("/apps/contacts/edit/".concat(m._id))}},r.a.createElement(v.a,{icon:"user-edit"})):r.a.createElement(d.a,{item:!0,xs:4,className:t.expandoItem,onClick:function(){n.push("/apps/contacts/add/".concat(e.call.number))}},r.a.createElement(v.a,{icon:"user-plus"}))))))}))},537:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),c=t(7),o=t(51),l=t(502),i=(t(18),t(533));function m(e,a){return function(e){if(Array.isArray(e))return e}(e)||function(e,a){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var t=[],n=!0,r=!1,c=void 0;try{for(var o,l=e[Symbol.iterator]();!(n=(o=l.next()).done)&&(t.push(o.value),!a||t.length!==a);n=!0);}catch(e){r=!0,c=e}finally{try{n||null==l.return||l.return()}finally{if(r)throw c}}return t}(e,a)||function(e,a){if(!e)return;if("string"==typeof e)return s(e,a);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return s(e,a)}(e,a)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(e,a){(null==a||a>e.length)&&(a=e.length);for(var t=0,n=new Array(a);t<a;t++)n[t]=e[t];return n}var u=Object(l.a)((function(e){return{wrapper:{height:"100%",background:e.palette.secondary.main}}}));a.default=Object(c.b)()((function(e){var a=u(),t=(Object(o.e)(),Object(c.d)((function(e){return e.data.data}))),l=m(Object(n.useState)(-1),2),s=l[0],d=l[1],p=m(Object(n.useState)([]),2),f=p[0],b=p[1];Object(n.useEffect)((function(){b(t.calls)}),[t]);return r.a.createElement("div",{className:a.wrapper},f.sort((function(e,a){return a.time-e.time})).map((function(e,a){return r.a.createElement(i.default,{key:a,expanded:s,index:a,call:e,onClick:(t=a,function(e,a){d(a?t:-1)})});var t})))}))}}]);