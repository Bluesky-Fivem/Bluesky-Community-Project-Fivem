(window.webpackJsonp=window.webpackJsonp||[]).push([[103],{104:function(t,e,n){"use strict";n.r(e),n.d(e,"checkInstall",(function(){return s})),n.d(e,"install",(function(){return o})),n.d(e,"uninstall",(function(){return l}));var a=n(23);function r(t,e){t({type:"ALERT_SHOW",payload:{alert:"App Install Failed"}}),t({type:"FAILED_INSTALL",payload:{app:e}}),setTimeout((function(){t({type:"END_INSTALL",payload:{app:e}})}),2e3)}function i(t,e){t({type:"ALERT_SHOW",payload:{alert:"App Uninstall Failed"}}),t({type:"FAILED_UNINSTALL",payload:{app:e}}),setTimeout((function(){t({type:"END_UNINSTALL",payload:{app:e}})}),2e3)}var s=function(){return function(t){return!1}},o=function(t){return function(e){e({type:"PENDING_INSTALL",payload:{app:t}}),a.a.send("Install",{app:t,check:!0}).then((function(n){if(n){e({type:"START_INSTALL",payload:{app:t}});var i=Math.floor(10001*Math.random());setTimeout((function(){a.a.send("Install",{app:t}).then((function(n){n?(e({type:"ADD_DATA",payload:{type:"installed",data:t}}),e({type:"END_INSTALL",payload:{app:t}})):r(e,t)})).catch((function(n){r(e,t)}))}),i)}else r(e,t)})).catch((function(n){r(e,t)}))}},l=function(t){return function(e){e({type:"PENDING_UNINSTALL",payload:{app:t}}),a.a.send("Uninstall",{app:t,check:!0}).then((function(n){if(n){e({type:"START_UNINSTALL",payload:{app:t}});var s=Math.floor(5001*Math.random());setTimeout((function(){a.a.send("Uninstall",{app:t}).then((function(n){n?(e({type:"REMOVE_DATA",payload:{type:"installed",id:t}}),e({type:"END_UNINSTALL",payload:{app:t}}),e({type:"ALERT_SHOW",payload:{alert:"App Uninstalled Successfully"}})):r(e,t)})).catch((function(n){i(e,t)}))}),s)}else i(e,t)})).catch((function(n){i(e,t)}))}}},126:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n.n(a),i=n(7);e.default=Object(i.b)()((function(t){var e=Object(i.d)((function(t){return t.call.duration}));return Object(a.useEffect)((function(){var n=setInterval((function(){t.dispatch({type:"UPDATE_CALL_TIMER",payload:{timer:e++}})}),1e3);return function(){clearInterval(n)}}),[]),r.a.createElement("span",null)}))},163:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n.n(a),i=n(7),s=n(51),o=n(502),l=n(99),c=n(242),u=n(474),p=n(80),d=n(100),f=n(182),m=n.n(f),g=n(52),y=n(73),b=Object(o.a)((function(t){return{incomingModal:{boxShadow:"0 0 25px ".concat(p.a[400])},avatar:{height:100,width:100,fontSize:35,color:t.palette.text.dark,display:"block",textAlign:"center",lineHeight:"105px",margin:"auto",transition:"border 0.15s ease-in"},avatarFav:{height:100,width:100,fontSize:35,color:t.palette.text.dark,display:"block",textAlign:"center",lineHeight:"105px",margin:"auto",border:"2px solid gold",transition:"border 0.15s ease-in"},contactNumber:{fontSize:14,color:t.palette.primary.main},incomingNumber:{width:"100%",textAlign:"center",padding:20,"& span":{fontSize:30,fontWeight:"bold"}},keypadBtn:{textAlign:"center",height:75,fontSize:"25px",width:"100%"},keypadAction:{padding:15,color:t.palette.getContrastText(p.a[500]),backgroundColor:p.a[500],"&:hover":{backgroundColor:p.a[700]}},keypadAction2:{padding:15,color:t.palette.getContrastText(d.a[500]),backgroundColor:d.a[500],"&:hover":{backgroundColor:d.a[700]}}}}));e.default=Object(i.b)(null,{acceptCall:y.acceptCall,endCall:y.endCall,dismissIncoming:y.dismissIncoming})((function(t){var e=b(),n=Object(s.e)(),a=Object(i.d)((function(t){return t.data.data.contacts})),o=null==t.call?null:a.filter((function(e){return e.number===t.call.number}))[0],p=Object(i.d)((function(t){return t.call.incomingDismissed}));return null==t.call||1!==t.call.state?null:r.a.createElement(g.k,{className:e.incomingModal,open:1===t.call.state&&!p,handleClose:function(e){t.dismissIncoming()},title:"Incoming Call"},r.a.createElement(l.a,{container:!0},r.a.createElement(l.a,{item:!0,xs:12},null!=o?null!=o.avatar&&""!==o.avatar?r.a.createElement(c.a,{className:o.favorite?e.avatarFav:e.avatar,src:o.avatar,alt:o.name.charAt(0)}):r.a.createElement(c.a,{className:o.favorite?e.avatarFav:e.avatar,style:{background:o.color}},o.name.charAt(0)):r.a.createElement(c.a,{className:e.avatar,style:{background:"#333"}},"#")),r.a.createElement(l.a,{item:!0,xs:12},r.a.createElement("div",{className:e.incomingNumber},r.a.createElement("span",null,null!=o?o.name:t.call.number),null!=o?r.a.createElement("div",{className:e.contactNumber},o.number):null)),r.a.createElement(l.a,{item:!0,xs:12},r.a.createElement(l.a,{container:!0,style:{marginTop:"10%",marginBottom:"10%"}},r.a.createElement(l.a,{item:!0,xs:6,className:e.keypadBtn},r.a.createElement(u.a,{className:e.keypadAction,onClick:function(e){t.acceptCall(t.call.number),n.push("/apps/phone/call/".concat(t.call.number))}},r.a.createElement(m.a,{style:{fontSize:40}}))),r.a.createElement(l.a,{item:!0,xs:6,className:e.keypadBtn},r.a.createElement(u.a,{className:e.keypadAction2,onClick:function(e){t.endCall()}},r.a.createElement(m.a,{style:{fontSize:40}})))))))}))},164:function(t,e,n){"use strict";function a(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function r(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?a(Object(n),!0).forEach((function(e){i(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}n.r(e),n.d(e,"initialState",(function(){return s}));var s={call:null,duration:null,incomingDismissed:!1};e.default=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"DISMISS_INCOMING":return r(r({},t),{},{incomingDismissed:!0});case"SHOW_INCOMING":return r(r({},t),{},{incomingDismissed:!1});case"SET_CALL_PENDING":return r(r({},t),{},{call:{state:0,number:e.payload.number},duration:-1});case"SET_CALL_INCOMING":return r(r({},t),{},{call:{state:1,number:e.payload.number},duration:-1});case"SET_CALL_ACTIVE":return r(r({},t),{},{call:{state:2,number:e.payload.number},duration:0,incomingDismissed:!1});case"UPDATE_CALL_TIMER":return r(r({},t),{},{duration:e.payload.timer});case"END_CALL":return r(r({},t),{},{call:null,duration:null,incomingDismissed:!1});default:return t}}},165:function(t,e,n){"use strict";function a(t){return function(t){if(Array.isArray(t))return r(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return r(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return r(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){o(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function o(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}n.r(e),n.d(e,"initialState",(function(){return l}));var l={installing:[],installPending:[],installFailed:[],uninstalling:[],uninstallPending:[],uninstallFailed:[],tab:0};e.default=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"PENDING_INSTALL":return s(s({},t),{},{installPending:[].concat(a(t.installPending),[e.payload.app])});case"START_INSTALL":return s(s({},t),{},o({installing:t.installPending.filter((function(t){return t!==e.payload.app}))},"installing",[].concat(a(t.installing),[e.payload.app])));case"END_INSTALL":return s(s({},t),{},{installing:t.installing.filter((function(t){return t!==e.payload.app})),installPending:t.installPending.filter((function(t){return t!==e.payload.app})),installFailed:t.installFailed.filter((function(t){return t!==e.payload.app}))});case"FAILED_INSTALL":return s(s({},t),{},{installing:t.installing.filter((function(t){return t!==e.payload.app})),installPending:t.installPending.filter((function(t){return t!==e.payload.app})),installFailed:[].concat(a(t.installFailed),[e.payload.app])});case"PENDING_UNINSTALL":return s(s({},t),{},{uninstallPending:[].concat(a(t.uninstallPending),[e.payload.app])});case"START_UNINSTALL":return s(s({},t),{},{uninstallPending:t.uninstallPending.filter((function(t){return t!==e.payload.app})),uninstalling:[].concat(a(t.uninstalling),[e.payload.app])});case"FAILED_UNINSTALL":return s(s({},t),{},{uninstalling:t.uninstalling.filter((function(t){return t!==e.payload.app})),uninstallPending:t.uninstallPending.filter((function(t){return t!==e.payload.app})),uninstallFailed:[].concat(a(t.uninstallFailed),[e.payload.app])});case"END_UNINSTALL":return s(s({},t),{},{uninstalling:t.uninstalling.filter((function(t){return t!==e.payload.app})),uninstallPending:t.uninstallPending.filter((function(t){return t!==e.payload.app})),uninstallFailed:t.uninstallFailed.filter((function(t){return t!==e.payload.app}))});case"SET_STORE_TAB":return s(s({},t),{},{tab:e.payload.tab});default:return t}}},166:function(t,e,n){"use strict";function a(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function r(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?a(Object(n),!0).forEach((function(e){i(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}n.r(e),n.d(e,"initialState",(function(){return s}));var s={tab:0};e.default=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"SET_TWITTER_TAB":return r(r({},t),{},{tab:e.payload.tab});case"UI_RESET":return r({},s);default:return t}}},73:function(t,e,n){"use strict";n.r(e),n.d(e,"createCall",(function(){return r})),n.d(e,"addToCall",(function(){return i})),n.d(e,"acceptCall",(function(){return s})),n.d(e,"endCall",(function(){return o})),n.d(e,"readCalls",(function(){return l})),n.d(e,"dismissIncoming",(function(){return c})),n.d(e,"showIncoming",(function(){return u}));var a=n(23),r=function(t){return function(e){a.a.send("CreateCall",t)}},i=function(t){return function(e){a.a.send("CreateCall",t)}},s=function(t){return function(e){a.a.send("AcceptCall",t)}},o=function(){return function(t){a.a.send("EndCall",null)}},l=function(){return function(t){a.a.send("ReadCalls",null)}},c=function(){return function(t){t({type:"DISMISS_INCOMING"})}},u=function(){return function(t){t({type:"SHOW_INCOMING"})}}},970:function(t,e,n){var a={"./adverts":[184,9,0,3,2,8,14],"./adverts/":[184,9,0,3,2,8,14],"./adverts/ActionButtons":[510,9,33],"./adverts/ActionButtons.js":[510,9,33],"./adverts/Categories":[519,9,0,3,8,23,48],"./adverts/Categories.js":[519,9,0,3,8,23,48],"./adverts/Latest":[520,9,0,3,31],"./adverts/Latest.js":[520,9,0,3,31],"./adverts/action":[504,9,64],"./adverts/action.js":[504,9,64],"./adverts/add":[552,9,0,11,20,49],"./adverts/add.js":[552,9,0,11,20,49],"./adverts/category-view":[553,9,0,3,30],"./adverts/category-view.js":[553,9,0,3,30],"./adverts/components/Advert":[508,9,0,3,50],"./adverts/components/Advert.js":[508,9,0,3,50],"./adverts/components/Category":[518,9,0,3,23,52],"./adverts/components/Category.js":[518,9,0,3,23,52],"./adverts/data":[505,9,65],"./adverts/data.js":[505,9,65],"./adverts/edit":[554,9,0,11,20,51],"./adverts/edit.js":[554,9,0,11,20,51],"./adverts/editor.css":[976,7,106],"./adverts/index":[184,9,0,3,2,8,14],"./adverts/index.js":[184,9,0,3,2,8,14],"./adverts/view":[555,9,0,3,4,5,29],"./adverts/view.js":[555,9,0,3,4,5,29],"./bank":[185,9,26],"./bank/":[185,9,26],"./bank/index":[185,9,26],"./bank/index.js":[185,9,26],"./contacts":[186,9,1,19],"./contacts/":[186,9,1,19],"./contacts/actions":[511,9,66],"./contacts/actions.js":[511,9,66],"./contacts/add":[556,9,7,6,25,37],"./contacts/add.js":[556,9,7,6,25,37],"./contacts/contact":[512,9,1,67],"./contacts/contact.js":[512,9,1,67],"./contacts/edit":[557,9,7,6,25,57],"./contacts/edit.js":[557,9,7,6,25,57],"./contacts/index":[186,9,1,19],"./contacts/index.js":[186,9,1,19],"./email":[187,9,22],"./email/":[187,9,22],"./email/Email":[521,9,46],"./email/Email.js":[521,9,46],"./email/action":[513,9,68],"./email/action.js":[513,9,68],"./email/index":[187,9,22],"./email/index.js":[187,9,22],"./email/view":[558,9,5,32],"./email/view.js":[558,9,5,32],"./irc":[188,9,27],"./irc/":[188,9,27],"./irc/index":[188,9,27],"./irc/index.js":[188,9,27],"./messages":[189,9,21],"./messages/":[189,9,21],"./messages/actions":[522,9,69],"./messages/actions.js":[522,9,69],"./messages/convo":[559,9,4,45],"./messages/convo.js":[559,9,4,45],"./messages/index":[189,9,21],"./messages/index.js":[189,9,21],"./messages/message":[523,9,70],"./messages/message.js":[523,9,70],"./messages/new":[560,9,6,11,54],"./messages/new.js":[560,9,6,11,54],"./phone":[190,9,1,6,2,9,15],"./phone/":[190,9,1,6,2,9,15],"./phone/action":[73,9],"./phone/action.js":[73,9],"./phone/call":[561,9,42],"./phone/call.js":[561,9,42],"./phone/contacts":[524,9,1,58],"./phone/contacts.js":[524,9,1,58],"./phone/incoming":[163,9],"./phone/incoming.js":[163,9],"./phone/index":[190,9,1,6,2,9,15],"./phone/index.js":[190,9,1,6,2,9,15],"./phone/keypad":[525,9,6,53],"./phone/keypad.js":[525,9,6,53],"./phone/recent":[533,9,1,55],"./phone/recent-index":[537,9,1,9],"./phone/recent-index.js":[537,9,1,9],"./phone/recent.js":[533,9,1,55],"./phone/reducer":[164,9],"./phone/reducer.js":[164,9],"./phone/timer":[126,9],"./phone/timer.js":[126,9],"./settings":[193,9,7,18],"./settings/":[193,9,7,18],"./settings/actions":[506,9,71],"./settings/actions.js":[506,9,71],"./settings/app_notifs":[562,9,7,12,44],"./settings/app_notifs.js":[562,9,7,12,44],"./settings/colors":[563,9,36],"./settings/colors.js":[563,9,36],"./settings/components/AppNotif":[526,9,7,59],"./settings/components/AppNotif.js":[526,9,7,59],"./settings/components/CustomColor":[534,9,47],"./settings/components/CustomColor.js":[534,9,47],"./settings/components/CustomWallpaper":[527,9,12,13,60],"./settings/components/CustomWallpaper.js":[527,9,12,13,60],"./settings/components/SoundSelect":[532,9,56],"./settings/components/SoundSelect.js":[532,9,56],"./settings/components/Version":[507,9,72],"./settings/components/Version.js":[507,9,72],"./settings/components/Wallpaper":[528,9,61],"./settings/components/Wallpaper.js":[528,9,61],"./settings/index":[193,9,7,18],"./settings/index.js":[193,9,7,18],"./settings/profile":[564,9,43],"./settings/profile.js":[564,9,43],"./settings/reducer":[565,7,73],"./settings/reducer.js":[565,7,73],"./settings/software":[571,9,74],"./settings/software.js":[571,9,74],"./settings/sounds":[566,9,39],"./settings/sounds.js":[566,9,39],"./settings/wallpaper":[567,9,12,13,40],"./settings/wallpaper.js":[567,9,12,13,40],"./store":[191,9,2,17,24],"./store/":[191,9,2,17,24],"./store/App":[509,9,38],"./store/App.js":[509,9,38],"./store/MyList":[535,9,34],"./store/MyList.js":[535,9,34],"./store/StoreList":[529,9,35],"./store/StoreList.js":[529,9,35],"./store/action":[104,9],"./store/action.js":[104,9],"./store/index":[191,9,2,17,24],"./store/index.js":[191,9,2,17,24],"./store/reducer":[165,9],"./store/reducer.js":[165,9],"./twitter":[192,9,4,5,2,10,16],"./twitter/":[192,9,4,5,2,10,16],"./twitter/MyProfile":[530,9,10,28,75],"./twitter/MyProfile.jsx":[530,9,10,28,75],"./twitter/Tweet":[517,9,4,5,62],"./twitter/Tweet.jsx":[517,9,4,5,62],"./twitter/TweetList":[531,9,4,5,63,28,41],"./twitter/TweetList.jsx":[531,9,4,5,63,28,41],"./twitter/index":[192,9,4,5,2,10,16],"./twitter/index.jsx":[192,9,4,5,2,10,16],"./twitter/reducer":[166,9],"./twitter/reducer.js":[166,9]};function r(t){if(!n.o(a,t))return Promise.resolve().then((function(){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}));var e=a[t],r=e[0];return Promise.all(e.slice(2).map(n.e)).then((function(){return n.t(r,e[1])}))}r.keys=function(){return Object.keys(a)},r.id=970,t.exports=r}}]);