(window.webpackJsonp=window.webpackJsonp||[]).push([[21,70],{1031:function(e,t,a){"use strict";var r=a(181);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(a(0)),o=(0,r(a(253)).default)(n.default.createElement("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}),"Add");t.default=o},1035:function(e,t,a){"use strict";var r=a(5),n=a(1),o=a(0),i=(a(2),a(6)),l=a(8),c=a(243),s=a(11),d=o.forwardRef((function(e,t){var a=e.children,l=e.classes,d=e.className,u=e.color,b=void 0===u?"default":u,m=e.component,h=void 0===m?"button":m,p=e.disabled,f=void 0!==p&&p,g=e.disableFocusRipple,v=void 0!==g&&g,y=e.focusVisibleClassName,w=e.size,k=void 0===w?"large":w,x=e.variant,j=void 0===x?"round":x,O=Object(r.a)(e,["children","classes","className","color","component","disabled","disableFocusRipple","focusVisibleClassName","size","variant"]);return o.createElement(c.a,Object(n.a)({className:Object(i.a)(l.root,d,"round"!==j&&l.extended,"large"!==k&&l["size".concat(Object(s.a)(k))],f&&l.disabled,{primary:l.primary,secondary:l.secondary,inherit:l.colorInherit}[b]),component:h,disabled:f,focusRipple:!v,focusVisibleClassName:Object(i.a)(l.focusVisible,y),ref:t},O),o.createElement("span",{className:l.label},a))}));t.a=Object(l.a)((function(e){return{root:Object(n.a)({},e.typography.button,{boxSizing:"border-box",minHeight:36,transition:e.transitions.create(["background-color","box-shadow","border"],{duration:e.transitions.duration.short}),borderRadius:"50%",padding:0,minWidth:0,width:56,height:56,boxShadow:e.shadows[6],"&:active":{boxShadow:e.shadows[12]},color:e.palette.getContrastText(e.palette.grey[300]),backgroundColor:e.palette.grey[300],"&:hover":{backgroundColor:e.palette.grey.A100,"@media (hover: none)":{backgroundColor:e.palette.grey[300]},"&$disabled":{backgroundColor:e.palette.action.disabledBackground},textDecoration:"none"},"&$focusVisible":{boxShadow:e.shadows[6]},"&$disabled":{color:e.palette.action.disabled,boxShadow:e.shadows[0],backgroundColor:e.palette.action.disabledBackground}}),label:{width:"100%",display:"inherit",alignItems:"inherit",justifyContent:"inherit"},primary:{color:e.palette.primary.contrastText,backgroundColor:e.palette.primary.main,"&:hover":{backgroundColor:e.palette.primary.dark,"@media (hover: none)":{backgroundColor:e.palette.primary.main}}},secondary:{color:e.palette.secondary.contrastText,backgroundColor:e.palette.secondary.main,"&:hover":{backgroundColor:e.palette.secondary.dark,"@media (hover: none)":{backgroundColor:e.palette.secondary.main}}},extended:{borderRadius:24,padding:"0 16px",width:"auto",minHeight:"auto",minWidth:48,height:48,"&$sizeSmall":{width:"auto",padding:"0 8px",borderRadius:17,minWidth:34,height:34},"&$sizeMedium":{width:"auto",padding:"0 16px",borderRadius:20,minWidth:40,height:40}},focusVisible:{},disabled:{},colorInherit:{color:"inherit"},sizeSmall:{width:40,height:40},sizeMedium:{width:48,height:48}}}),{name:"MuiFab"})(d)},189:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),o=a(7),i=a(51),l=a(502),c=a(1035),s=a(1031),d=a.n(s),u=(a(52),a(523));function b(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var a=[],r=!0,n=!1,o=void 0;try{for(var i,l=e[Symbol.iterator]();!(r=(i=l.next()).done)&&(a.push(i.value),!t||a.length!==t);r=!0);}catch(e){n=!0,o=e}finally{try{r||null==l.return||l.return()}finally{if(n)throw o}}return a}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return m(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return m(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}var h=Object(l.a)((function(e){return{wrapper:{height:"100%",background:e.palette.secondary.main,overflowY:"auto",overflowX:"hidden","&::-webkit-scrollbar":{width:6},"&::-webkit-scrollbar-thumb":{background:"#ffffff52"},"&::-webkit-scrollbar-thumb:hover":{background:e.palette.primary.main},"&::-webkit-scrollbar-track":{background:"transparent"}},add:{position:"absolute",bottom:"12%",right:"10%","&:hover":{filter:"brightness(0.75)",transition:"filter ease-in 0.15s"}},or:{fontSize:40,color:e.palette.primary.main,textAlign:"center",fontWeight:"bold"},contactList:{zIndex:"10001 !important",maxHeight:400,"& div::-webkit-scrollbar":{width:6},"& div::-webkit-scrollbar-thumb":{background:"#ffffff52"},"& div::-webkit-scrollbar-thumb:hover":{background:e.palette.primary.main},"& div::-webkit-scrollbar-track":{background:"transparent"}},contactListTrigger:{width:"100%",height:60,background:"red",textAlign:"center"}}}));t.default=Object(o.b)()((function(e){var t=h(),a=Object(i.e)(),l=Object(o.d)((function(e){return e.data.data})),s=Object(o.d)((function(e){return e.data.data.messages})),m=(l.myData,b(Object(r.useState)([]),2)),p=m[0],f=m[1];return Object(r.useEffect)((function(){var e=[];s.length>0&&(s.sort((function(e,t){return t.time-e.time})).map((function(t,a){null!=e[t.number]?t.time>e[t.number].time&&(e[t.number]=t):e[t.number]=t})),e.sort((function(e,t){return t.time-e.time}))),f(e)}),[s]),n.a.createElement("div",{className:t.wrapper},Object.entries(p).map((function(e){var t=b(e,2),a=t[0],r=t[1];return n.a.createElement(u.default,{key:a,message:r,unread:s.filter((function(e){return e.number===r.number&&e.unread})).length})})),n.a.createElement(c.a,{className:t.add,color:"primary",onClick:function(){return a.push("/apps/messages/new")}},n.a.createElement(d.a,null)))}))},523:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),o=a(7),i=a(51),l=a(502),c=a(540),s=a(99),d=a(242),u=a(103),b=a.n(u),m=Object(l.a)((function(e){return{convo:{"&::before":{background:"transparent !important"},background:e.palette.secondary.dark,padding:"20px 12px",border:"1px solid rgba(0, 0, 0, .25)","&:not(:last-child)":{borderBottom:"none"},"&:hover":{background:e.palette.secondary.main,transition:"background ease-in 0.15s",cursor:"pointer"}},avatar:{color:"#fff",height:55,width:55,position:"relative",top:0},avatarFav:{color:"#fff",height:55,width:55,position:"relative",top:0,border:"2px solid gold"},number:{fontSize:16,fontWeight:"bold",color:e.palette.text.light},message:{fontSize:16,color:e.palette.text.light,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},time:{fontSize:12,color:e.palette.text.main},unread:{width:20,height:20,lineHeight:"23px",position:"absolute",bottom:"5%",right:"15%",textAlign:"center",background:e.palette.error.main,color:e.palette.text.light,borderRadius:100}}}));t.default=Object(o.b)()((function(e){var t=m(),a=Object(i.e)(),r=Object(o.d)((function(e){return e.data.data.contacts})).filter((function(t){return t.number===e.message.number}))[0];return n.a.createElement(c.a,{className:t.convo,onClick:function(){a.push("/apps/messages/convo/".concat(e.message.number))}},n.a.createElement(s.a,{container:!0},n.a.createElement(s.a,{item:!0,xs:2,style:{position:"relative"}},null!=r?null!=r.avatar&&""!==r.avatar?n.a.createElement(d.a,{className:r.favorite?t.avatarFav:t.avatar,src:r.avatar,alt:r.name.charAt(0)}):n.a.createElement(d.a,{className:r.favorite?t.avatarFav:t.avatar,style:{background:r.color}},r.name.charAt(0)):n.a.createElement(d.a,{className:t.avatar},"#"),e.unread>0?n.a.createElement("div",{className:t.unread},e.unread):null),n.a.createElement(s.a,{item:!0,xs:10},null!=r?n.a.createElement("div",{className:t.number},r.name):n.a.createElement("div",{className:t.number},e.message.number),n.a.createElement("div",{className:t.message},e.message.message),n.a.createElement("div",{className:t.time},n.a.createElement(b.a,{fromNow:!0},+e.message.time)))))}))}}]);