(window.webpackJsonp=window.webpackJsonp||[]).push([[37,66],{1286:function(e,t,r){var a,n,o,c,l,i={50:["#FFEBEE","#FCE4EC","#F3E5F5","#EDE7F6","#E8EAF6","#E3F2FD","#E1F5FE","#E0F7FA","#E0F2F1","#E8F5E9","#F1F8E9","#F9FBE7","#FFFDE7","#FFF8E1","#FFF3E0","#FBE9E7","#EFEBE9","#FAFAFA","#ECEFF1"],100:["#FFCDD2","#F8BBD0","#E1BEE7","#D1C4E9","#C5CAE9","#BBDEFB","#B3E5FC","#B2EBF2","#B2DFDB","#C8E6C9","#DCEDC8","#F0F4C3","#FFF9C4","#FFECB3","#FFE0B2","#FFCCBC","#D7CCC8","#F5F5F5","#CFD8DC"],200:["#EF9A9A","#F48FB1","#CE93D8","#B39DDB","#9FA8DA","#90CAF9","#81D4FA","#80DEEA","#80CBC4","#A5D6A7","#C5E1A5","#E6EE9C","#FFF59D","#FFE082","#FFCC80","#FFAB91","#BCAAA4","#EEEEEE","#B0BEC5"],300:["#E57373","#F06292","#BA68C8","#9575CD","#7986CB","#64B5F6","#4FC3F7","#4DD0E1","#4DB6AC","#81C784","#AED581","#DCE775","#FFF176","#FFD54F","#FFB74D","#FF8A65","#A1887F","#E0E0E0","#90A4AE"],400:["#EF5350","#EC407A","#AB47BC","#7E57C2","#5C6BC0","#42A5F5","#29B6F6","#26C6DA","#26A69A","#66BB6A","#9CCC65","#D4E157","#FFEE58","#FFCA28","#FFA726","#FF7043","#8D6E63","#BDBDBD","#78909C"],500:["#F44336","#E91E63","#9C27B0","#673AB7","#3F51B5","#2196F3","#03A9F4","#00BCD4","#009688","#4CAF50","#8BC34A","#CDDC39","#FFEB3B","#FFC107","#FF9800","#FF5722","#795548","#9E9E9E","#607D8B"],600:["#E53935","#D81B60","#8E24AA","#5E35B1","#3949AB","#1E88E5","#039BE5","#00ACC1","#00897B","#43A047","#7CB342","#C0CA33","#FDD835","#FFB300","#FB8C00","#F4511E","#6D4C41","#757575","#546E7A"],700:["#D32F2F","#C2185B","#7B1FA2","#512DA8","#303F9F","#1976D2","#0288D1","#0097A7","#00796B","#388E3C","#689F38","#AFB42B","#FBC02D","#FFA000","#F57C00","#E64A19","#5D4037","#616161","#455A64"],800:["#C62828","#AD1457","#6A1B9A","#4527A0","#283593","#1565C0","#0277BD","#00838F","#00695C","#2E7D32","#558B2F","#9E9D24","#F9A825","#FF8F00","#EF6C00","#D84315","#4E342E","#424242","#37474F"],900:["#B71C1C","#880E4F","#4A148C","#311B92","#1A237E","#0D47A1","#01579B","#006064","#004D40","#1B5E20","#33691E","#827717","#F57F17","#FF6F00","#E65100","#BF360C","#3E2723","#212121","#263238"],A100:["#FF8A80","#FF80AB","#EA80FC","#B388FF","#8C9EFF","#82B1FF","#80D8FF","#84FFFF","#A7FFEB","#B9F6CA","#CCFF90","#F4FF81","#FFFF8D","#FFE57F","#FFD180","#FF9E80"],A200:["#FF5252","#FF4081","#E040FB","#7C4DFF","#536DFE","#448AFF","#40C4FF","#18FFFF","#64FFDA","#69F0AE","#B2FF59","#EEFF41","#FFFF00","#FFD740","#FFAB40","#FF6E40"],A400:["#FF1744","#F50057","#D500F9","#651FFF","#3D5AFE","#2979FF","#00B0FF","#00E5FF","#1DE9B6","#00E676","#76FF03","#C6FF00","#FFEA00","#FFC400","#FF9100","#FF3D00"],A700:["#D50000","#C51162","#AA00FF","#6200EA","#304FFE","#2962FF","#0091EA","#00B8D4","#00BFA5","#00C853","#64DD17","#AEEA00","#FFD600","#FFAB00","#FF6D00","#DD2C00"]},F=r(1287);e.exports=(a=[],n={shades:["500"],palette:i,text:null,ignoreColors:[]},o=function(e){var t,r="";for(var a in t=e.text?e.shades[l(e.text,e.shades.length)]:e.shades[c(e.shades.length)],e.palette)e.palette.hasOwnProperty(a)&&a===t&&(r=e.text?e.palette[a][l(e.text,e.palette[a].length)]:e.palette[a][c(e.palette[a].length)]);return r},c=function(e){return Math.floor(Math.random()*e)},l=function(e,t){var r=F.murmur3(e)/1e10;return r<.1&&(r*=10),Math.floor(r*t)},{getColor:function(e){e||(e=n),e.palette||(e.palette=i),e.shades||(e.shades=["500"]);for(var t,r=a.length,c=0;c<r;c++)if(e.text&&a[c].text===e.text)return a[c].color;return t=o(e),e.text&&a.push({text:e.text,color:t}),t}})},1287:function(e,t,r){var a=r(1288),n=r(1289);e.exports=a,e.exports.murmur3=a,e.exports.murmur2=n},1288:function(e,t,r){e.exports=function(e,t){var r,a,n,o,c,l,i,F;for(r=3&e.length,a=e.length-r,n=t,c=3432918353,l=461845907,F=0;F<a;)i=255&e.charCodeAt(F)|(255&e.charCodeAt(++F))<<8|(255&e.charCodeAt(++F))<<16|(255&e.charCodeAt(++F))<<24,++F,n=27492+(65535&(o=5*(65535&(n=(n^=i=(65535&(i=(i=(65535&i)*c+(((i>>>16)*c&65535)<<16)&4294967295)<<15|i>>>17))*l+(((i>>>16)*l&65535)<<16)&4294967295)<<13|n>>>19))+((5*(n>>>16)&65535)<<16)&4294967295))+((58964+(o>>>16)&65535)<<16);switch(i=0,r){case 3:i^=(255&e.charCodeAt(F+2))<<16;case 2:i^=(255&e.charCodeAt(F+1))<<8;case 1:n^=i=(65535&(i=(i=(65535&(i^=255&e.charCodeAt(F)))*c+(((i>>>16)*c&65535)<<16)&4294967295)<<15|i>>>17))*l+(((i>>>16)*l&65535)<<16)&4294967295}return n^=e.length,n=2246822507*(65535&(n^=n>>>16))+((2246822507*(n>>>16)&65535)<<16)&4294967295,n=3266489909*(65535&(n^=n>>>13))+((3266489909*(n>>>16)&65535)<<16)&4294967295,(n^=n>>>16)>>>0}},1289:function(e,t){void 0!==typeof e&&(e.exports=function(e,t){for(var r,a=e.length,n=t^a,o=0;a>=4;)r=1540483477*(65535&(r=255&e.charCodeAt(o)|(255&e.charCodeAt(++o))<<8|(255&e.charCodeAt(++o))<<16|(255&e.charCodeAt(++o))<<24))+((1540483477*(r>>>16)&65535)<<16),n=1540483477*(65535&n)+((1540483477*(n>>>16)&65535)<<16)^(r=1540483477*(65535&(r^=r>>>24))+((1540483477*(r>>>16)&65535)<<16)),a-=4,++o;switch(a){case 3:n^=(255&e.charCodeAt(o+2))<<16;case 2:n^=(255&e.charCodeAt(o+1))<<8;case 1:n=1540483477*(65535&(n^=255&e.charCodeAt(o)))+((1540483477*(n>>>16)&65535)<<16)}return n=1540483477*(65535&(n^=n>>>13))+((1540483477*(n>>>16)&65535)<<16),(n^=n>>>15)>>>0})},511:function(e,t,r){"use strict";r.r(t),r.d(t,"createContact",(function(){return l})),r.d(t,"updateContact",(function(){return i})),r.d(t,"deleteContact",(function(){return F}));var a=r(23);function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){c(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var l=function(e){return function(t){a.a.send("CreateContact",e).then((function(r){null!=r&&t({type:"ADD_DATA",payload:{type:"contacts",data:o(o({},e),{},{_id:r})}})}))}},i=function(e,t){return function(r){a.a.send("UpdateContact",o(o({},t),{},{id:e})).then((function(a){a&&r({type:"UPDATE_DATA",payload:{type:"contacts",id:e,data:t}})}))}},F=function(e){return function(t){a.a.send("DeleteContact",e).then((function(r){r&&t({type:"REMOVE_DATA",payload:{type:"contacts",id:e}})}))}}},556:function(e,t,r){"use strict";r.r(t);var a=r(0),n=r.n(a),o=r(7),c=r(51),l=r(1286),i=r.n(l),F=r(502),u=r(1003),s=r(540),E=r(242),d=r(1002),f=r(1166),C=r(1167),p=r(1185),m=r(1004),A=r(551),b=r(1147),h=r.n(b),D=r(511),g=r(102),v=r(52);function B(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function y(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?B(Object(r),!0).forEach((function(t){w(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):B(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function w(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function O(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],a=!0,n=!1,o=void 0;try{for(var c,l=e[Symbol.iterator]();!(a=(c=l.next()).done)&&(r.push(c.value),!t||r.length!==t);a=!0);}catch(e){n=!0,o=e}finally{try{a||null==l.return||l.return()}finally{if(n)throw o}}return r}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return k(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return k(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function k(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,a=new Array(t);r<t;r++)a[r]=e[r];return a}var x=Object(F.a)((function(e){return{wrapper:{height:"100%",background:e.palette.secondary.main,overflowY:"auto",overflowX:"hidden",padding:10,"&::-webkit-scrollbar":{width:6},"&::-webkit-scrollbar-thumb":{background:"#ffffff52"},"&::-webkit-scrollbar-thumb:hover":{background:e.palette.primary.main},"&::-webkit-scrollbar-track":{background:"transparent"}},avatar:{height:100,width:100,fontSize:35,color:e.palette.text.light,position:"absolute",left:0,right:0,top:"10%",display:"block",textAlign:"center",lineHeight:"100px",margin:"auto","&:hover":{filter:"brightness(0.6)",transition:"filter ease-in 0.15s",cursor:"pointer"}},avatarFav:{height:100,width:100,fontSize:35,color:e.palette.text.light,position:"absolute",left:0,right:0,top:"10%",display:"block",textAlign:"center",lineHeight:"100px",margin:"auto",border:"2px solid gold","&:hover":{filter:"brightness(0.6)",transition:"filter ease-in 0.15s",cursor:"pointer"}},contactHeader:{padding:20,background:e.palette.secondary.dark,borderRadius:10,marginBottom:25},editBody:{padding:20,background:e.palette.secondary.dark,borderRadius:10,width:"100%",margin:"55px auto 0 auto"},editField:{width:"100%",marginBottom:20,fontSize:20},buttons:{width:"100%",display:"flex",margin:"auto"},buttonNegative:{width:"-webkit-fill-available",padding:20,color:e.palette.error.main,"&:hover":{backgroundColor:"".concat(e.palette.error.main,"14")}},buttonPositive:{width:"-webkit-fill-available",padding:20,color:e.palette.error.dark,"&:hover":{backgroundColor:"".concat(e.palette.error.dark,"14")}},editAvatar:{position:"absolute",background:e.palette.secondary.main,padding:25,width:"70%",left:0,right:0,margin:"auto",zIndex:15},colorPreview:{marginBottom:10},colorLabel:{color:e.palette.text.main,fontWeight:"bold",marginBottom:5},colorDisplay:{width:"100%",height:45,border:"1px solid ".concat(e.palette.text.main)}}}));t.default=Object(o.b)(null,{createContact:D.createContact,showAlert:g.a})((function(e){var t=x(),r=Object(c.e)(),l=Object(o.d)((function(e){return e.data.data})).contacts,F=e.match.params.number,b=O(Object(a.useState)({name:"",number:null==F?"":F,favorite:!1,color:i.a.getColor(),avatar:""}),2),D=b[0],g=b[1],B=O(Object(a.useState)(!1),2),k=B[0],j=B[1],P=O(Object(a.useState)(!1),2),N=P[0],S=P[1],I=function(e){if(null!=e.hex)g(y(y({},D),{},{color:e.hex}));else switch(e.target.name){case"favorite":g(y(y({},D),{},w({},e.target.name,e.target.checked)));break;default:g(y(y({},D),{},w({},e.target.name,e.target.value)))}};return n.a.createElement("div",{className:t.wrapper},n.a.createElement(u.a,{in:!0},n.a.createElement("div",null,n.a.createElement(s.a,{className:t.editBody},null!=D.avatar&&""!==D.avatar?n.a.createElement(E.a,{className:D.favorite?t.avatarFav:t.avatar,src:D.avatar,alt:D.name.charAt(0),onClick:function(){return S(!0)}},"+"):n.a.createElement(E.a,{className:D.favorite?t.avatarFav:t.avatar,style:{background:D.color},onClick:function(){return S(!0)}},"+"),n.a.createElement("div",{style:{textAlign:"center"}},n.a.createElement("h1",null,"Contact Details")),n.a.createElement("form",{autoComplete:"off",onSubmit:function(t){S(!1),t.preventDefault(),l.filter((function(e){return e.number===D.number})).length>0?e.showAlert("Contact Already Exists For This Number"):(e.createContact(D),e.showAlert("".concat(D.name," Created")),r.goBack())},id:"contact-form"},n.a.createElement(d.a,{className:t.editField,label:"Name",name:"name",type:"text",required:!0,value:D.name,onChange:I,InputLabelProps:{style:{fontSize:20}}}),n.a.createElement(h.a,{mask:"999-999-9999",value:D.number,onChange:I},(function(){return n.a.createElement(d.a,{className:t.editField,label:"Number",name:"number",type:"text",required:!0,InputLabelProps:{style:{fontSize:20}}})})),n.a.createElement("div",{className:t.colorPreview},n.a.createElement("div",{className:t.colorLabel},"Contact Color *"),n.a.createElement("div",{className:t.colorDisplay,style:{background:D.color},onClick:function(){return j(!0)}})),n.a.createElement(f.a,{row:!0},n.a.createElement(C.a,{style:{width:"100%"},control:n.a.createElement(p.a,{checked:D.favorite,onChange:I,value:"favorite",name:"favorite",color:"primary"}),label:"Favorite"})))),n.a.createElement(m.a,{variant:"text",color:"primary",className:t.buttons,style:{margin:"auto"}},n.a.createElement(A.a,{className:t.buttonNegative,onClick:function(){return r.goBack()}},"Cancel"),n.a.createElement(A.a,{className:t.buttonPositive,type:"submit",form:"contact-form"},"Save")),n.a.createElement(v.k,{open:N,handleClose:function(){return S(!1)},title:"Avatar"},n.a.createElement(d.a,{className:t.editField,label:"Link",name:"avatar",type:"text",onChange:I,value:D.avatar,InputLabelProps:{style:{fontSize:20}}}),n.a.createElement(m.a,{variant:"text",color:"primary",className:t.buttons},null!=D.avatar&&""!==D.avatar?n.a.createElement(A.a,{className:t.buttonNegative,onClick:function(){e.showAlert("Avatar Image Removed"),S(!1),g(y(y({},D),{},{avatar:""}))}},"Delete"):null,n.a.createElement(A.a,{className:t.buttonPositive,onClick:function(){return S(!1)}},"Done"))),n.a.createElement(v.k,{open:k,handleClose:function(){return j(!1)},title:"Contact Color"},n.a.createElement(v.b,{color:D.color,onChange:I,onSave:function(){return j(!1)}})))))}))}}]);