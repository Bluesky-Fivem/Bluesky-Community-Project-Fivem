(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{1030:function(e,a,t){"use strict";t.d(a,"a",(function(){return o}));var n=t(1),c=t(0),l=t.n(c),r=t(148);function o(e,a){var t=l.a.memo(l.a.forwardRef((function(a,t){return l.a.createElement(r.a,Object(n.a)({ref:t},a),e)})));return t.muiName=r.a.muiName,t}},533:function(e,a,t){"use strict";t.r(a);var n=t(0),c=t.n(n),l=t(7),r=t(51),o=t(8),m=t(1186),i=t(502),s=t(540),d=t(1169),u=t(99),p=t(242),h=t(1170),b=t(1055),f=t.n(b),E=t(18),v=t(1030),x=Object(v.a)(c.a.createElement("path",{d:"M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5z"}),"CallMade"),g=Object(v.a)(c.a.createElement("path",{d:"M20 5.41L18.59 4 7 15.59V9H5v10h10v-2H8.41z"}),"CallReceived"),N=Object(v.a)(c.a.createElement("path",{d:"M6.5 5.5L12 11l7-7-1-1-6 6-4.5-4.5H11V3H5v6h1.5V5.5zm17.21 11.17C20.66 13.78 16.54 12 12 12 7.46 12 3.34 13.78.29 16.67c-.18.18-.29.43-.29.71s.11.53.29.71l2.48 2.48c.18.18.43.29.71.29.27 0 .52-.11.7-.28.79-.74 1.69-1.36 2.66-1.85.33-.16.56-.5.56-.9v-3.1c1.45-.48 3-.73 4.6-.73 1.6 0 3.15.25 4.6.72v3.1c0 .39.23.74.56.9.98.49 1.87 1.12 2.67 1.85.18.18.43.28.7.28.28 0 .53-.11.71-.29l2.48-2.48c.18-.18.29-.43.29-.71s-.12-.52-.3-.7z"}),"PhoneMissed"),k=t(103),w=t.n(k),C=t(73),I=Object(o.a)({root:{border:"1px solid rgba(0, 0, 0, .25)",boxShadow:"none","&:not(:last-child)":{borderBottom:0},"&:before":{display:"none"},"&$expanded":{margin:"auto"}},expanded:{}})(m.a),j=Object(i.a)((function(e){return{contact:{"&::before":{background:"transparent !important"},background:e.palette.secondary.dark,"&:hover":{background:e.palette.secondary.main,transition:"background ease-in 0.15s",cursor:"pointer"}},paper:{background:e.palette.secondary.dark},expandoContainer:{textAlign:"center",fontSize:30},expandoItem:{"&:hover":{color:e.palette.primary.main,transition:"color ease-in 0.15s"}},avatar:{color:"#fff",height:45,width:45},avatarFav:{color:"#fff",height:45,width:45,border:"2px solid gold"},contactName:{fontSize:18,color:e.palette.text.light},contactNumber:{fontSize:16,color:e.palette.text.main},expanded:{margin:0},missedIcon:{height:16,width:16,color:e.palette.error.main},incomingIcon:{height:16,width:16,color:"#5ec750"},outgoingIcon:{height:16,width:16,color:"#50a2c7"},callDate:{textAlign:"right",fontSize:12}}}));a.default=Object(l.b)(null,{createCall:C.createCall})((function(e){var a,t=j(),n=Object(r.e)(),o=Object(l.d)((function(e){return e.data.data.contacts})),m=Object(l.d)((function(e){return e.call.call})),i=o.filter((function(a){return a.number===e.call.number}))[0];return c.a.createElement(s.a,{className:t.paper},c.a.createElement(I,{className:t.contact,expanded:e.expanded==e.index,onChange:e.onClick},c.a.createElement(d.a,{expandIcon:c.a.createElement(f.a,null)},c.a.createElement(u.a,{container:!0},c.a.createElement(u.a,{item:!0,xs:2},null!=i&&null!=i.avatar&&""!==i.avatar?c.a.createElement(p.a,{className:i.favorite?t.avatarFav:t.avatar,src:i.avatar,alt:i.name.charAt(0)}):c.a.createElement(p.a,{className:null!=i&&i.favorite?t.avatarFav:t.avatar,style:{background:null!=i&&i.color?i.color:"#333"}},null!=i?i.name.charAt(0):"#")),c.a.createElement(u.a,{item:!0,xs:10},c.a.createElement("div",{className:t.contactName},null!=i?i.name:"Unkown Caller"),c.a.createElement(u.a,{container:!0,className:t.contactNumber},c.a.createElement(u.a,{item:!0,xs:6},(a=e.call).duration>-1?a.method?c.a.createElement(x,{className:t.outgoingIcon}):c.a.createElement(g,{className:t.incomingIcon}):a.method?c.a.createElement(x,{className:t.missedIcon}):c.a.createElement(N,{className:t.missedIcon})," ",e.call.number),c.a.createElement(u.a,{item:!0,xs:6,className:t.callDate},c.a.createElement(w.a,{fromNow:!0},+e.call.time)))))),c.a.createElement(h.a,null,c.a.createElement(u.a,{container:!0,className:t.expandoContainer},c.a.createElement(u.a,{item:!0,xs:4,className:t.expandoItem,onClick:function(){null==m&&(e.createCall(e.call.number),n.push("/apps/phone/call/".concat(e.call.number)))}},c.a.createElement(E.a,{icon:"phone"})),c.a.createElement(u.a,{item:!0,xs:4,className:t.expandoItem,onClick:function(){n.push("/apps/messages/convo/".concat(e.call.number))}},c.a.createElement(E.a,{icon:"sms"})),null!=i?c.a.createElement(u.a,{item:!0,xs:4,className:t.expandoItem,onClick:function(){n.push("/apps/contacts/edit/".concat(i._id))}},c.a.createElement(E.a,{icon:"user-edit"})):c.a.createElement(u.a,{item:!0,xs:4,className:t.expandoItem,onClick:function(){n.push("/apps/contacts/add/".concat(e.call.number))}},c.a.createElement(E.a,{icon:"user-plus"}))))))}))}}]);