(window.webpackJsonp=window.webpackJsonp||[]).push([[62],{1037:function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));a(516).renderToStaticMarkup;var n=a(1145),r=a(1146),i=function(e){return r(n.sanitize(e))}},517:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(7),o=a(99),c=a(242),l=a(474),s=a(503),u=a(18),m=a(1142),p=a.n(m),d=a(1143),f=a(1144),g=a.n(f),h=a(103),b=a.n(h),y=a(23),v=a(1037),w=a(52);function E(e,t,a,n,r,i,o){try{var c=e[i](o),l=c.value}catch(e){return void a(e)}c.done?t(l):Promise.resolve(l).then(n,r)}function x(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var a=[],n=!0,r=!1,i=void 0;try{for(var o,c=e[Symbol.iterator]();!(n=(o=c.next()).done)&&(a.push(o.value),!t||a.length!==t);n=!0);}catch(e){r=!0,i=e}finally{try{n||null==c.return||c.return()}finally{if(r)throw i}}return a}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return k(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return k(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function k(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var N=Object(s.a)((function(e){return{wrapper:{paddingTop:10,height:"fit-content",background:e.palette.secondary.main,borderBottom:"1px solid ".concat(e.palette.border.divider),"&:first-of-type":{borderTop:"1px solid ".concat(e.palette.border.divider)}},author:{color:e.palette.primary.main,fontSize:16},verification:{marginLeft:5,color:"#00aced","&.business":{color:"#eac93e"},"&.government":{color:"#829aab"}},date:{color:e.palette.text.alt,fontSize:12,marginRight:15,float:"right"},avatar:{width:60,height:60,margin:"auto"},actionBtn:{fontSize:16},content:{fontSize:14},messageImg:{display:"block",maxWidth:200},copyableText:{color:"#1de9b6",textDecoration:"underline",transition:"filter ease-in 0.15s","&:hover":{filter:"brightness(0.7)",cursor:"pointer"}},hashtag:{color:e.palette.primary.light},image:{width:"100%",border:"1px solid ".concat(e.palette.border.divider),borderRadius:4},rtLink:{color:e.palette.primary.light},btnCount:{marginRight:5}}}));t.default=function(e){var t=e.tweet,a=e.rtcount,s=e.onReply,m=e.onRetweet,f=N(),h=(Object(i.c)(),Object(i.d)((function(e){return e.data.data.player}))),k=x(Object(n.useState)(!1),2),C=k[0],S=k[1],A=function(){var e,a=(e=regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return S(!0),e.next=3,y.a.send("FavoriteTweet",{id:t._id,state:t.likes.includes(h.ID)});case 3:return e.next=5,e.sent.json();case 5:e.sent,S(!1);case 7:case"end":return e.stop()}}),e)})),function(){var t=this,a=arguments;return new Promise((function(n,r){var i=e.apply(t,a);function o(e){E(i,n,r,o,c,"next",e)}function c(e){E(i,n,r,o,c,"throw",e)}o(void 0)}))});return function(){return a.apply(this,arguments)}}(),j=[{regex:/((https?:\/\/(www\.)?(i\.)?imgur\.com\/[a-zA-Z\d]+)(\.png|\.jpg|\.jpeg|\.gif)?)/gim,fn:function(e,t){return r.a.createElement(w.LightboxImage,{key:e,className:f.messageImg,src:t[0]})}},{regex:/(http|https):\/\/(\S+)\.([a-z]{2,}?)(.*?)( |\,|$|\.)(mp4)/gim,fn:function(e,t){return r.a.createElement("div",null,r.a.createElement(g.a,{key:e,volume:.25,width:"100%",controls:!0,url:"".concat(t[0])}))}},{regex:/(http|https):\/\/(\S+)\.([a-z]{2,}?)(.*?)( |\,|$|\.)/gim,fn:function(e,t){return r.a.createElement(d.CopyToClipboard,{text:t[0],key:e,onCopy:function(){return showAlert("Link Copied To Clipboard")}},r.a.createElement("a",{className:f.copyableText},t.input))}},{regex:/(\S+)\.([a-z]{2,}?)(.*?)( |\,|$|\.)/gim,fn:function(e,t){return r.a.createElement(d.CopyToClipboard,{text:t[0],key:e,onCopy:function(){return showAlert("Link Copied To Clipboard")}},r.a.createElement("a",{className:f.copyableText},t.input))}},{regex:/#(\w)+/g,fn:function(e,t){return r.a.createElement("span",{key:e,className:f.hashtag},t[0])}},{regex:/@(\w)+/g,fn:function(e,t){return r.a.createElement("span",{key:e,className:f.hashtag},t[0])}}];return r.a.createElement(o.a,{id:t._id,container:!0,className:f.wrapper},r.a.createElement(o.a,{item:!0,xs:2},r.a.createElement(c.a,{className:f.avatar,src:t.author.avatar})),r.a.createElement(o.a,{item:!0,xs:10},r.a.createElement("div",null,r.a.createElement("span",{className:f.author},t.author.name),t.verified&&r.a.createElement("span",{className:"".concat(f.verification," ").concat(t.verified)},r.a.createElement(u.a,{icon:["fas","badge-check"]})),r.a.createElement("span",{className:f.date},r.a.createElement(b.a,{date:t.time,interval:6e4,fromNow:!0}))),r.a.createElement("div",{className:f.content},p()(j)(Object(v.a)(t.content))),Boolean(t.image.using)&&r.a.createElement(w.LightboxImage,{src:t.image.link,className:f.image}),r.a.createElement(o.a,{container:!0,spacing:2,style:{textAlign:"center"}},r.a.createElement(o.a,{item:!0,xs:4},r.a.createElement(l.a,{className:f.actionBtn,onClick:function(){return s(t.author.name)},disabled:null==h.Alias.twitter},r.a.createElement(u.a,{icon:["fas","reply"]}))),r.a.createElement(o.a,{item:!0,xs:4},r.a.createElement(l.a,{className:f.actionBtn,onClick:function(){return m(t)},disabled:null==h.Alias.twitter||t.retweet||t.cid==h.ID},r.a.createElement("span",{className:f.btnCount},a),r.a.createElement(u.a,{icon:["fas","retweet"]}))),r.a.createElement(o.a,{item:!0,xs:4},r.a.createElement(l.a,{color:t.likes.includes(h.ID)?"primary":"inherit",className:f.actionBtn,onClick:A,disabled:null==h.Alias.twitter||C},r.a.createElement("span",{className:f.btnCount},t.likes.length),r.a.createElement(u.a,{icon:["fas","heart"]}))))))}}}]);