(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{1155:function(e,t,a){"use strict";var n=a(181);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a(0)),c=(0,n(a(253)).default)(r.default.createElement("path",{d:"M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z"}),"Backspace");t.default=c},525:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(7),l=a(51),o=a(502),i=a(99),m=a(431),s=a(474),u=a(551),p=(a(18),a(1147)),d=a.n(p),f=a(80),y=a(102),k=a(73),E=a(1155),b=a.n(E),g=a(182),h=a.n(g);function x(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var a=[],n=!0,r=!1,c=void 0;try{for(var l,o=e[Symbol.iterator]();!(n=(l=o.next()).done)&&(a.push(l.value),!t||a.length!==t);n=!0);}catch(e){r=!0,c=e}finally{try{n||null==o.return||o.return()}finally{if(r)throw c}}return a}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return C(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return C(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function C(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var v=Object(o.a)((function(e){return{wrapper:{height:"100%",background:e.palette.secondary.main},number:{marginBottom:"10%"},numInput:{width:"100%"},callinfo:{textAlign:"center",fontSize:20,color:e.palette.text.secondary,margin:20},keypadBtn:{textAlign:"center",height:75,fontSize:"25px",width:"100%"},keypadAction:{padding:20,color:e.palette.getContrastText(f.a[500]),backgroundColor:f.a[500],"&:hover":{backgroundColor:f.a[700]}},keypadActionDis:{padding:20,color:e.palette.getContrastText(f.a[500]),backgroundColor:f.a[500],filter:"brightness(0.25)","&:hover":{backgroundColor:f.a[700]}},backBtn:{margin:"auto",textAlign:"center"},anonSymbol:{fontSize:35,color:e.palette.primary.main,textAlign:"right"}}}));t.default=Object(c.b)(null,{showAlert:y.a,createCall:k.createCall})((function(e){var t=v(),a=Object(l.e)(),o=Object(c.d)((function(e){return e.data.data})),p=o.myData,f=Object(c.d)((function(e){return e.call.call})),y=x(Object(n.useState)([]),2),k=y[0],E=y[1];Object(n.useEffect)((function(){E(o.contacts)}),[o]);var g=x(Object(n.useState)(!1),2),C=g[0],N=g[1],B=x(Object(n.useState)(""),2),S=B[0],w=B[1],A=x(Object(n.useState)([]),2),j=A[0],O=A[1];Object(n.useEffect)((function(){O(""!=S?k.filter((function(e){return e.number.startsWith(S.replace(/\_/g,""))})):[])}),[S]);var _=function(e){var t=S.replace(/\-/g,"").replace(/\_/g,"")+e;t.length<=10&&(t.length>3&&t.length<7?w(t.replace(/(\d{3})(\d{1,3})/,"$1-$2")):w(t.replace(/(\d{3})(\d{3})(\d{1,4})/,"$1-$2-$3")))};return r.a.createElement("div",{className:t.wrapper},r.a.createElement("div",{className:t.number},r.a.createElement(i.a,{container:!0,spacing:1},r.a.createElement(i.a,{item:!0,xs:12,className:t.callinfo},C?"Anonymous":"Standard"),r.a.createElement(i.a,{item:!0,xs:12,className:t.callinfo},j.length>0?j.length>1?"Matches Multiple Contacts":j[0].name:"Unknown"),r.a.createElement(i.a,{item:!0,xs:1,className:t.anonSymbol},C?r.a.createElement("div",null,"#"):null),r.a.createElement(i.a,{item:!0,xs:8},r.a.createElement(d.a,{mask:"999-999-9999",value:S,onChange:function(e){w(e.target.value)}},(function(){return r.a.createElement(m.a,{className:t.numInput,name:"number",type:"text",disableUnderline:!0,placeholder:"___-___-____",inputProps:{style:{fontSize:40}}})}))),r.a.createElement(i.a,{item:!0,xs:3,className:t.backBtn},r.a.createElement(s.a,{onClick:function(e){w(S.substring(0,S.length-1))},style:{padding:20}},r.a.createElement(b.a,null))))),r.a.createElement(i.a,{container:!0,spacing:1},r.a.createElement(i.a,{item:!0,xs:4},r.a.createElement(u.a,{color:"primary",className:t.keypadBtn,onClick:function(){return _(1)}},"1")),r.a.createElement(i.a,{item:!0,xs:4},r.a.createElement(u.a,{color:"primary",className:t.keypadBtn,onClick:function(){return _(2)}},"2")),r.a.createElement(i.a,{item:!0,xs:4},r.a.createElement(u.a,{color:"primary",className:t.keypadBtn,onClick:function(){return _(3)}},"3")),r.a.createElement(i.a,{item:!0,xs:4},r.a.createElement(u.a,{color:"primary",className:t.keypadBtn,onClick:function(){return _(4)}},"4")),r.a.createElement(i.a,{item:!0,xs:4},r.a.createElement(u.a,{color:"primary",className:t.keypadBtn,onClick:function(){return _(5)}},"5")),r.a.createElement(i.a,{item:!0,xs:4},r.a.createElement(u.a,{color:"primary",className:t.keypadBtn,onClick:function(){return _(6)}},"6")),r.a.createElement(i.a,{item:!0,xs:4},r.a.createElement(u.a,{color:"primary",className:t.keypadBtn,onClick:function(){return _(7)}},"7")),r.a.createElement(i.a,{item:!0,xs:4},r.a.createElement(u.a,{color:"primary",className:t.keypadBtn,onClick:function(){return _(8)}},"8")),r.a.createElement(i.a,{item:!0,xs:4},r.a.createElement(u.a,{color:"primary",className:t.keypadBtn,onClick:function(){return _(9)}},"9")),r.a.createElement(i.a,{item:!0,xs:4},r.a.createElement(u.a,{color:"primary",className:t.keypadBtn,disabled:!0},"*")),r.a.createElement(i.a,{item:!0,xs:4,className:t.keypadBtn},r.a.createElement(u.a,{color:"primary",className:t.keypadBtn,onClick:function(){return _(0)}},"0")),r.a.createElement(i.a,{item:!0,xs:4,className:t.keypadBtn},r.a.createElement(u.a,{color:"primary",className:t.keypadBtn,onClick:function(e){N(!C)}},"#")),r.a.createElement(i.a,{item:!0,xs:12,className:t.keypadBtn},r.a.createElement(s.a,{className:12==S.replace(/\_/g,"").length&&null==f?t.keypadAction:t.keypadActionDis,onClick:function(t){12==S.length&&(S!==p.number?null==f&&(e.createCall(S),a.push("/apps/phone/call/".concat(S))):e.showAlert("Cannot Call Yourself, Idiot"))}},r.a.createElement(h.a,{style:{fontSize:40}})))))}))}}]);