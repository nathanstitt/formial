(this["webpackJsonpformial-example"]=this["webpackJsonpformial-example"]||[]).push([[0],{55:function(e,t,n){e.exports=n(66)},56:function(e,t,n){},65:function(e,t,n){},66:function(e,t,n){"use strict";n.r(t);n(56);var a=n(0),r=n.n(a),c=n(35),i=n.n(c),l=n(5),o=n(14),s=n(33),u=n(16),d=n(11),b=n(13),p=n(12),m=n(6),f=n(7),h=n(3),O=n(9),j=n(53),E=n(70),v=n(71),g=n(69),x=n(22),y=n.n(x),N=n(49),w=n(45),k=n(36),T=n(46),C=n(43),A=n(44),I=n(42),R=n(48),D=n(47),z=n(10),H=n.n(z),P=n(52),S=n(51),U=n(28);function B(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)}))}function L(e){return"INPUT"===e.type}function _(e){return"CONTAINER"===e.type}function M(e){return"TEXT"===e.type}var W=function e(t,n){var a=t.get(n.control);return a?M(n)?new F(a,n):_(n)?new X(a,Object(h.a)(Object(h.a)({},n),{},{children:n.children.map((function(n){return e(t,n)})).filter(Boolean)})):L(n)?new Y(a,n):new V(a,n):null},V=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};Object(m.a)(this,e),this.control=t,this.id=n.id||B(),this.data=y()({className:"",sizes:{mobile:12,tablet:12,desktop:12}},n)}return Object(f.a)(e,[{key:"serialized",get:function(){return Object(h.a)({id:this.id,type:"element",control:this.control.id},this.data)}}]),e}(),X=function(e){Object(b.a)(n,e);var t=Object(p.a)(n);function n(e,a){var r;return Object(m.a)(this,n),(r=t.call(this,e,a)).direction=a.direction||"row",r.children=a.children||[],r}return Object(f.a)(n,[{key:"serialized",get:function(){return Object(h.a)(Object(h.a)(Object(h.a)({},Object(u.a)(Object(d.a)(n.prototype),"serialized",this)),this.data),{},{children:this.children.map((function(e){return e.serialized})),direction:this.direction,type:"CONTAINER"})}}]),n}(V),F=function(e){Object(b.a)(n,e);var t=Object(p.a)(n);function n(e){var a,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object(m.a)(this,n),(a=t.call(this,e,r)).data=y.a.all([{tag:"para"==e.id?"p":"h3",text:"Some text\u2026",className:"",sizes:{mobile:12,tablet:12,desktop:12}},r]),a}return Object(f.a)(n,[{key:"serialized",get:function(){return Object(h.a)(Object(h.a)(Object(h.a)({},Object(u.a)(Object(d.a)(n.prototype),"serialized",this)),this.data),{},{type:"TEXT"})}}]),n}(V),Y=function(e){Object(b.a)(n,e);var t=Object(p.a)(n);function n(e){var a,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object(m.a)(this,n),(a=t.call(this,e,r)).data=y()({label:"".concat(a.control.name," label"),className:"",sizes:{mobile:12,tablet:12,desktop:12},name:"".concat(a.control.id,"-").concat(Math.round(9999*Math.random())+1e3),classNames:{wrapper:"form-group",label:"col-sm-2",input:"form-control col-sm-10"},attributes:{}},r),e.hasOptions&&!a.data.options&&(a.data.options={}),a}return Object(f.a)(n,[{key:"placeholder",get:function(){return this.control.placeholder&&this.control.placeholder(this)||null}},{key:"optionPairs",get:function(){var e=this.data.options;return e?Object.keys(e).map((function(t){return[t,e[t]]})):[]}},{key:"serialized",get:function(){return Object(h.a)(Object(h.a)(Object(h.a)({},Object(u.a)(Object(d.a)(n.prototype),"serialized",this)),this.data),{},{type:"INPUT"})}}]),n}(V),q=function(){function e(t){Object(m.a)(this,e),this.name=t.name,this.id=t.id,this.icon=t.icon,this.placeholder=t.placeholder,this.hasOptions=t.hasOptions}return Object(f.a)(e,[{key:"createElement",value:function(){return new Y(this)}}]),e}();function J(e){return e instanceof X}function G(e){return e instanceof Y}function K(e){return e instanceof F}var Q=function(e){Object(b.a)(n,e);var t=Object(p.a)(n);function n(){return Object(m.a)(this,n),t.apply(this,arguments)}return Object(f.a)(n,[{key:"createElement",value:function(){return new X(this,{direction:"row"})}}]),n}(q),Z=function(e){Object(b.a)(n,e);var t=Object(p.a)(n);function n(){return Object(m.a)(this,n),t.apply(this,arguments)}return Object(f.a)(n,[{key:"createElement",value:function(){return new F(this)}}]),n}(q),$=function(e){Object(b.a)(n,e);var t=Object(p.a)(n);function n(){return Object(m.a)(this,n),t.apply(this,arguments)}return Object(f.a)(n,[{key:"createElement",value:function(){return new X(this,{direction:"column"})}}]),n}(q),ee={registered:new Map,register:function(e){var t=this;e.forEach((function(e){return t.registered.set(e.id,e)}))}};var te=Object(a.createContext)(null),ne=function(){return Object(a.useContext)(te)},ae=function(){return ne().store},re=function(e,t){switch(t.type){case"ADD_ELEMENT":return function(e,t){var n,a,r=t.id,c=t.container,i=t.destIndex,l=t.fromIndex,o=t.fromContainer;if(null!=l&&o)a=o.children[l],o.children.splice(l,1),o===c&&l<i&&(i-=1);else if(!(n=e.controls.get(r)))return console.warn("attempted to drop id ".concat(r," but no control exists")),e;return!a&&n&&(a=n.createElement()),a&&c.children.splice(i,0,a),Object(h.a)({},e)}(e,t);case"REPLACE":if(t.container){var n=W(e.controls,t.container);if(n&&J(n))return Object(h.a)(Object(h.a)({},e),{},{container:n})}return e;case"DELETE":return t.container.children=Object(s.a)(t.container.children.filter((function(e){return e.id!==t.target.id}))),Object(h.a)({},e);case"UPDATE":return t.target.data=y()(t.target.data,t.patch),Object(h.a)({},e);case"EDIT":return Object(h.a)(Object(h.a)({},e),{},{editing:t.target});case"HIDE_EDIT":return Object(h.a)(Object(h.a)({},e),{},{editing:void 0});case"ADD_ATTRIBUTE":return t.input.data[t.nested][""]="",Object(h.a)({},e);case"REPLACE_NEW_ATTRIBUTE":return delete t.input.data[t.nested][""],t.input.data[t.nested][t.name]="",Object(h.a)({},e);case"DELETE_ATTRIBUTE":return delete t.input.data[t.nested][t.name],Object(h.a)({},e)}return e},ce=function(e){var t=Object.create(null);return t.controls=new Map(ee.registered),t.container=e?W(t.controls,e):new X(t.controls.get("row"),{direction:"row"}),t},ie=function(e){var t=function(e){return Object(a.useReducer)(re,e,ce)}(e),n=Object(l.a)(t,2),r=n[0],c=n[1];return Object(a.useMemo)((function(){return{store:r,dispatch:c}}),[r])},le=function(e,t){var n=e.optionPairs;return 0===n.length?t("",""):n.map((function(e){var n=Object(l.a)(e,2),r=n[0],c=n[1];return Object(a.createElement)("label",{key:r},t(r,c),Object(a.createElement)("span",null,c))}))};ee.register([new Q({id:"row",name:"Row",icon:Object(a.createElement)(k.a,null)}),new $({id:"col",name:"Column",icon:Object(a.createElement)(I.a,null)}),new Z({id:"heading",name:"Heading",icon:Object(a.createElement)(C.a,null),placeholder:function(e){return Object(a.createElement)(e.data.tag,e.data.text)}}),new Z({id:"para",name:"Paragraph",icon:Object(a.createElement)(A.a,null),placeholder:function(e){return Object(a.createElement)("p",null,e.data.text)}}),new q({id:"input",name:"Text Input",icon:Object(a.createElement)(w.a,null),placeholder:function(){return Object(a.createElement)("input",{type:"text",className:"form-control",readOnly:!0})}}),new q({id:"textarea",name:"Text Area",icon:Object(a.createElement)(T.a,null),placeholder:function(){return Object(a.createElement)("textarea",{className:"form-control",readOnly:!0})}}),new q({id:"checkbox",name:"Checkboxes",icon:Object(a.createElement)(D.a,null),hasOptions:!0,placeholder:function(e){return le(e,(function(t){return Object(a.createElement)("input",{type:"checkbox",name:t,className:e.data.classNames.input,readOnly:!0})}))}}),new q({id:"radio",name:"Radio Input",hasOptions:!0,icon:Object(a.createElement)(R.a,null),placeholder:function(e){return le(e,(function(t){return Object(a.createElement)("input",{key:t,type:"radio",name:t,className:e.data.classNames.input,readOnly:!0})}))}}),new q({id:"select",name:"Select",hasOptions:!0,icon:Object(a.createElement)(N.a,null),placeholder:function(e){var t=e.optionPairs;return Object(a.createElement)("select",{name:e.data.name},t.map((function(e){var t=Object(l.a)(e,2),n=t[0],r=t[1];return Object(a.createElement)("option",{key:n,value:n},r)})))}})]);var oe=O.a.li({cursor:"pointer",backgroundColor:"white",listStyle:"none",margin:"5px",padding:"10px",userSelect:"none",border:"1px dashed #ddd",svg:{height:"20px",marginRight:"0.5rem"}}),se=function(e){var t=e.id,n=e.name,r=e.icon,c=Object(E.a)({item:{id:t,type:"control"}}),i=Object(l.a)(c,2)[1];return Object(a.createElement)(oe,{ref:i},r,Object(a.createElement)("span",null,n))},ue=O.a.div({overflow:"auto",paddingRight:"10px",ul:{padding:0,margin:0}}),de=function(){var e=ae().controls;return Object(a.createElement)(ue,{className:"controls-listing"},Object(a.createElement)("ul",null,Object(s.a)(e.values()).map((function(e){return Object(a.createElement)(se,Object.assign({key:e.id},e))}))))},be={};function pe(e,t,n){var r=Object(a.useMemo)((function(){return Array.isArray(e)?e:[e]}),[e]),c=Object.assign({},be,n),i=Object(a.useRef)(t),l=c.target;Object(a.useEffect)((function(){i.current=t}));var o=Object(a.useCallback)((function(e){r.some((function(t){return e.key===t}))&&i.current(e)}),[r]);Object(a.useEffect)((function(){if("undefined"!==typeof window){var e=l?l.current:window;return e&&e.addEventListener("keydown",o),function(){e&&e.removeEventListener("keydown",o)}}}),[r,l,t])}var me=function(e){var t=e.onTextSaved,n=e.textValue,c=e.children,i=Object(a.useState)(!1),o=Object(l.a)(i,2),s=o[0],u=o[1],d=Object(a.useState)(n),b=Object(l.a)(d,2),p=b[0],m=b[1],f=Object(a.useRef)(null),h=Object(a.useRef)(null),O=Object(a.useRef)(null),j=function(){O.current&&O.current.value!==n&&t(O.current.value),u(!1)};pe(["Enter","Escape"],(function(e){switch(e.key){case"Enter":j();break;case"Escape":m(n),u(!1)}}),{target:O}),Object(a.useEffect)((function(){if(!1!==s){var e=s,t=O.current;t.focus(),t.setSelectionRange(e.position,e.position)}}),[s]);var E=Object(a.useCallback)((function(){j()}),[]),v=Object(a.useCallback)((function(e){return m(e.target.value)}),[m]),g=Object(a.useCallback)((function(){var e=window.getSelection();if(e){var t=e.getRangeAt(0);u({position:t.startOffset})}}),[u]);return r.a.createElement("span",{className:H()("inline-text",e.className),ref:f},r.a.createElement("span",{ref:h,onClick:g,style:{display:s?"none":"inline"},className:"inline-text display"},c),r.a.createElement("input",{ref:O,style:{display:s?"inline":"none"},value:p,onChange:v,onBlur:E,className:"inline-text editing"}))},fe=O.a.div({minHeight:"15px",border:"1px solid white","&:last-child":{flex:1}}),he=function(e){var t=e.index,n=e.container,a=ne(),r=Object(v.a)({accept:"control",collect:function(e){return{isHovered:e.isOver()}},drop:function(e){var r=e.id,c=e.fromIndex,i=e.fromContainer;a.dispatch({type:"ADD_ELEMENT",id:r,destIndex:t,container:n,fromIndex:c,fromContainer:i})}}),c=Object(l.a)(r,2);return{isHovered:c[0].isHovered,dropRef:c[1]}},Oe=function(e){var t=he(e),n=t.isHovered,r=t.dropRef;return Object(a.createElement)(fe,{ref:r,className:H()("drop",{isHovered:n})})},je=O.a.div({display:"flex",flexDirection:"row",position:"relative",padding:"10px",color:"#0c0c0c",justifyContent:"space-between",alignItems:"stretch",minHeight:"40px","&.row":{"> .column":{margin:"-1px",flex:1},"> .container.controls":{top:"calc(50% - 22px)",left:"-15px",right:void 0,display:"flex",flexDirection:"column","> *":{marginLeft:0}}},"&.column":{flexDirection:"column",".container-drop":{width:"100%"},"&.empty":{flex:1}},".control-type":{fontSize:"0.8rem",position:"absolute",top:0,right:0,border:"1px solid",padding:"2px",borderRadius:"8px"},"&:hover":{backgroundColor:"white","> .controls":{opacity:1}},".controls":{opacity:0,transition:"opacity 0.3s ease-in-out",display:"flex",justifyContent:"flex-end",alignItems:"flex-start","> *":{marginLeft:"15px"},button:{border:0,padding:0,cursor:"pointer",backgroundColor:"transparent","&:hover":{svg:{color:"#212121"}}},svg:{height:"20px",color:"gray",transition:"opacity 0.3s ease-in-out"},".move svg":{cursor:"move"}},".inline-text":{padding:0,border:0,fontSize:"inherit","&:focus":{outline:"none"}},".label":{fontSize:"20px",marginBottom:"5px"},".control-preview":{display:"flex",flexWrap:"wrap",alignItems:"flex-start",flexDirection:"column",justifyContent:"center","&.row":{flexDirection:"column"}}}),Ee=function(e){var t=e.target,n=e.container,r=e.drag,c=ne();return Object(a.createElement)("div",{className:H()("controls",{container:J(t)})},Object(a.createElement)("button",{className:"trash",onClick:function(){return c.dispatch({type:"DELETE",target:t,container:n})}},Object(a.createElement)(U.a,null)),Object(a.createElement)("button",{onClick:function(){return c.dispatch({type:"EDIT",target:t})}},Object(a.createElement)(S.a,null)),Object(a.createElement)("button",{className:"move",ref:r},Object(a.createElement)(P.a,null)))},ve=function(e){var t=e.index,n=e.input,r=e.container,c=Object(E.a)({item:{id:n.id,fromIndex:t,fromContainer:r,type:"control"},collect:function(e){return{opacity:e.isDragging()?.4:1}}}),i=Object(l.a)(c,3),o=i[0].opacity,s=i[1],u=i[2];return Object(a.createElement)(je,{ref:u,style:{opacity:o},className:H()("element-preview",n.control.id)},Object(a.createElement)("div",{className:"control-preview"},Object(a.createElement)("span",null,n.data.label),n.placeholder),Object(a.createElement)(Ee,{target:n,container:r,drag:s}))},ge=function(e){var t=e.index,n=e.control,r=e.container,c=ne(),i=Object(E.a)({item:{id:n.id,fromIndex:t,fromContainer:r,type:"control"},collect:function(e){return{opacity:e.isDragging()?.4:1}}}),o=Object(l.a)(i,3),s=o[0].opacity,u=o[1],d=o[2],b=Object(a.createElement)(n.data.tag,{},n.data.text);return Object(a.createElement)(je,{ref:d,style:{opacity:s},className:H()("element-preview",n.control.id)},Object(a.createElement)("div",{className:"control-preview"},Object(a.createElement)(me,{onTextSaved:function(e){c.dispatch({type:"UPDATE",target:n,patch:{text:e}})},textValue:n.data.text},b)),Object(a.createElement)(Ee,{target:n,container:r,drag:u}))},xe=Object(O.a)(je)({border:"1px dashed gray",minHeight:"40px",borderRadius:"5px",padding:"0","&.empty":{alignItems:"stretch","> .drop":{flex:1}},".container.controls":{position:"absolute",top:"-27px",left:"calc(50% - 15px)",background:"white",padding:"2px 5px",borderTopRightRadius:"5px",borderTopLeftRadius:"5px",border:"1px dashed gray",borderBottomWidth:0},".element-preview":{flex:1},"&:hover":{".container-drop":{backgroundColor:"#e8e8e8"}}}),ye=Object(O.a)(fe)({minWidth:"20px"}),Ne=function(e){var t=he(e),n=t.isHovered,r=t.dropRef;return Object(a.createElement)(ye,{ref:r,className:H()("drop","container-drop",{isHovered:n})})},we=function(e){var t=e.parent,n=e.container,r=e.index,c=Object(E.a)({item:{id:n.id,fromIndex:r,fromContainer:t,type:"control"},collect:function(e){return{opacity:e.isDragging()?.4:1}}}),i=Object(l.a)(c,3),o=i[0].opacity,s=i[1],u=i[2];return Object(a.createElement)(xe,{ref:u,style:{opacity:o},className:H()("container-preview",n.direction,{empty:0===n.children.length})},Object(a.createElement)(Ne,{container:n,index:0}),n.children.map((function(e,t){return Object(a.createElement)(a.Fragment,{key:t},Object(a.createElement)(ke,{index:t,container:n,el:e}),Object(a.createElement)(Ne,{container:n,index:t+1}))})),Object(a.createElement)(Ee,{target:n,container:t,drag:s}))},ke=function(e){var t=e.el,n=e.index,r=e.container;return J(t)?Object(a.createElement)(we,{parent:r,container:t,index:n}):K(t)?Object(a.createElement)(ge,{control:t,container:r,index:n}):G(t)?Object(a.createElement)(ve,{input:t,container:r,index:n}):null},Te=O.a.div((function(e){return{flex:1,display:"flex",flexDirection:"column",justifyItems:"flex-start",background:"#fafafa",padding:"10px",boxSizing:"border-box",boxShadow:"0 0 2px 1px rgba(0, 0, 0, 0.1)",opacity:e.editing?"0.3":"1",transition:"all 0.3s ease-in-out",width:"fit-content",minWidth:"100%",".drop":{transition:"all 0.3s ease-in-out"},"> .container-preview":{margin:"0 2px"},"&.isHovered":{".drop":{backgroundColor:"#e8e8e8"}},"&:hover":{".drop":{backgroundColor:"#e8e8e8"}},".drop.isHovered":{borderColor:"black",backgroundColor:"#c1c1c1"},".drop:hover":{backgroundColor:"#c1c1c1"},"p, h1, h2, h3, h4, h5, h6":{padding:0,margin:0}}})),Ce=function(){var e=ae(),t=e.container,n=e.editing,r=Object(v.a)({accept:"control",collect:function(e){return{isHovered:e.isOver()}},canDrop:function(){return!1}}),c=Object(l.a)(r,2),i=c[0].isHovered,o=c[1];return Object(a.createElement)(Te,{ref:o,editing:!!n,className:H()("form-elements",{isHovered:i})},Object(a.createElement)(Oe,{container:t,index:0}),t.children.map((function(e,n){return Object(a.createElement)(a.Fragment,{key:n},Object(a.createElement)(ke,{index:n,container:t,el:e}),Object(a.createElement)(Oe,{container:t,index:n+1}))})))},Ae=function(e){var t=e.el,n=e.size,r=ne(),c=Object(a.useRef)(null);return Object(a.createElement)("label",null,Object(a.createElement)("span",null,n,":"),Object(a.createElement)("input",{ref:c,type:"number",min:"1",max:"12",value:t.data.sizes[n]||12,onChange:function(e){var a=e.target.value;return r.dispatch({type:"UPDATE",target:t,patch:{sizes:Object(o.a)({},n,Math.max(1,Math.min(12,Number(a))))}})}}))},Ie=function(e){var t=e.el;return J(t)&&"row"===t.direction?null:Object(a.createElement)("fieldset",{className:"widths"},Object(a.createElement)("legend",null,"Widths (1-12):"),Object(a.createElement)("div",{className:"row"},Object(a.createElement)(Ae,{size:"mobile",el:t}),Object(a.createElement)(Ae,{size:"tablet",el:t}),Object(a.createElement)(Ae,{size:"desktop",el:t})))},Re=function(e){var t=e.input,n=e.nested,r=ne(),c=Object(a.useRef)(null),i=function(){return r.dispatch({type:"REPLACE_NEW_ATTRIBUTE",nested:n,input:t,name:c.current.value})},l=function(){return r.dispatch({type:"DELETE_ATTRIBUTE",input:t,nested:n,name:""})};return pe(["Enter","Escape"],(function(e){switch(e.key){case"Enter":i();break;case"Escape":l()}}),{target:c}),Object(a.useEffect)((function(){c.current.focus()}),[]),Object(a.createElement)("label",null,Object(a.createElement)("input",{ref:c,defaultValue:"",onBlur:i}),Object(a.createElement)("span",{className:"value"}),Object(a.createElement)("button",{onClick:l,className:"del-attr"},Object(a.createElement)(U.a,null)))},De=function(e){var t=e.input,n=e.nested,r=e.attributeName,c=ne(),i=Object(a.useRef)(null);return pe(["Enter","Tab"],(function(e){e.preventDefault(),c.dispatch({type:"ADD_ATTRIBUTE",nested:n,input:t})}),{target:i}),Object(a.useEffect)((function(){var e=Object.keys(t.data[n]);r===e[e.length-1]&&i.current.focus()}),[]),Object(a.createElement)("label",null,Object(a.createElement)("span",null,r,":"),Object(a.createElement)("input",{ref:i,className:"value",value:t.data[n][r]||"",onChange:function(e){var a=e.target.value;return c.dispatch({type:"UPDATE",target:t,patch:Object(o.a)({},n,Object(o.a)({},r,a))})}}),Object(a.createElement)("button",{onClick:function(){c.dispatch({type:"DELETE_ATTRIBUTE",input:t,nested:n,name:r})},className:"del-attr"},Object(a.createElement)(U.a,null)))},ze=function(e){var t=e.input,n=e.nested,r=e.attributeName;return""===r?Object(a.createElement)(Re,{nested:n,input:t}):Object(a.createElement)(De,{nested:n,attributeName:r,input:t})},He=function(e){var t=e.label,n=e.input,r=e.nested,c=ne(),i=n.data[r];if(!i)return null;var l=Object.keys(i);return Object(a.createElement)("fieldset",{className:"options"},Object(a.createElement)("legend",null,t,":"),Object(a.createElement)("div",{className:"controls"},Object(a.createElement)("button",{onClick:function(){return c.dispatch({type:"ADD_ATTRIBUTE",nested:r,input:n})},className:"add-attr"},"+")),l.length>0&&Object(a.createElement)("div",{className:"heading"},Object(a.createElement)("span",null,"ID"),Object(a.createElement)("span",null,"Value")),l.map((function(e){return Object(a.createElement)(ze,{key:e,nested:r,input:n,attributeName:e})})))},Pe=function(e){var t=e.input,n=ne(),r=t.data,c=function(e){return n.dispatch({type:"UPDATE",target:t,patch:e})};return Object(a.createElement)("div",null,Object(a.createElement)("h4",{className:"title"},"Edit ",t.control.name),Object(a.createElement)("label",null,Object(a.createElement)("span",null,"Label:"),Object(a.createElement)("input",{className:"value",value:r.label||"",onChange:function(e){var t=e.target.value;return c({label:t})}})),Object(a.createElement)("label",null,Object(a.createElement)("span",null,"Name:"),Object(a.createElement)("input",{className:"value",value:r.name||"",onChange:function(e){var t=e.target.value;return c({name:t})}})),Object(a.createElement)(He,{input:t,label:"Options",nested:"options"}),Object(a.createElement)("fieldset",null,Object(a.createElement)("legend",null,"Class Names:"),Object(a.createElement)("label",null,Object(a.createElement)("span",null,"Wrapper:"),Object(a.createElement)("input",{className:"value",value:r.classNames.wrapper||"",onChange:function(e){var t=e.target.value;return c({classNames:{wrapper:t}})}})),Object(a.createElement)("label",null,Object(a.createElement)("span",null,"Label:"),Object(a.createElement)("input",{className:"value",value:r.classNames.label||"",onChange:function(e){var t=e.target.value;return c({classNames:{label:t}})}})),Object(a.createElement)("label",null,Object(a.createElement)("span",null,"Input:"),Object(a.createElement)("input",{className:"value",value:r.classNames.input||"",onChange:function(e){var t=e.target.value;return c({classNames:{input:t}})}}))),Object(a.createElement)(Ie,{el:t}),Object(a.createElement)(He,{input:t,label:"Attributes",nested:"attributes"}))},Se=function(e){var t=e.container,n=ne(),r=t.data;return Object(a.createElement)("div",null,Object(a.createElement)("label",null,Object(a.createElement)("span",null,"Class:"),Object(a.createElement)("input",{className:"value",value:r.className||"",onChange:function(e){var a,r=e.target.value;return a={className:r},n.dispatch({type:"UPDATE",target:t,patch:a})}})),Object(a.createElement)(Ie,{el:t}))},Ue=function(e){var t=e.txt,n=e.onChange;return"heading"!==t.control.id?null:Object(a.createElement)("label",null,Object(a.createElement)("span",null,"Size:"),Object(a.createElement)("select",{value:t.data.tag,onChange:function(e){return n(e.target.value)}},Object(a.createElement)("option",{value:"h1"},"Heading 1"),Object(a.createElement)("option",{value:"h2"},"Heading 2"),Object(a.createElement)("option",{value:"h3"},"Heading 3"),Object(a.createElement)("option",{value:"h4"},"Heading 4"),Object(a.createElement)("option",{value:"h5"},"Heading 5"),Object(a.createElement)("option",{value:"h6"},"Heading 6")))},Be=function(e){var t=e.control,n=ne(),r=t.data,c=function(e){return n.dispatch({type:"UPDATE",target:t,patch:e})};return Object(a.createElement)("div",null,Object(a.createElement)("label",null,Object(a.createElement)("span",null,"Text:"),Object(a.createElement)("textarea",{id:t.id,value:r.text||"",onChange:function(e){var t=e.target.value;return c({text:t})}})),Object(a.createElement)(Ue,{txt:t,onChange:function(e){return c({tag:e})}}),Object(a.createElement)("label",null,Object(a.createElement)("span",null,"Class:"),Object(a.createElement)("input",{className:"value",value:r.className||"",onChange:function(e){var t=e.target.value;return c({className:t})}})),Object(a.createElement)(Ie,{el:t}))},Le=function(e){var t=e.target;return J(t)?Object(a.createElement)(Se,{container:t}):G(t)?Object(a.createElement)(Pe,{input:t}):K(t)?Object(a.createElement)(Be,{control:t}):null},_e=O.a.div((function(e){return{position:"absolute",height:"100%",width:"400px",background:"white",right:e.editing?"0":"-420px",transition:"right 0.3s ease-in-out",display:"flex",boxShadow:"-5px 0px 5px 0px rgba(50, 50, 50, 0.75)",".title":{margin:"15px 0",borderBottom:"1px solid lightgray",paddingBottom:"10px"},".edit-pane":{flex:1,overflowY:"auto",padding:"10px"},".footer":{padding:"10px",display:"flex",justifyContent:"flex-end",borderTop:"1px solid lightGrey"},legend:{backgroundColor:"#000",color:"#fff",padding:"3px 6px"},"label, .heading":{display:"flex",marginBottom:"5px","> *:first-child":{width:"125px"}},".heading > *":{fontWeight:"bold"},".value":{minWidth:"150px",flex:1},button:{marginLeft:"1rem",svg:{height:"18px"}},fieldset:{marginTop:"1rem",".controls":{display:"flex",justifyContent:"flex-end",".add-attr":{margin:"-10px -5px 10px 0"}}},textarea:{width:"100%",minHeight:"50px",padding:"4px"},".widths":{".row":{display:"flex",justifyContent:"space-between",span:{flex:1,display:"flex",justifyContent:"flex-end",marginRight:"10px",width:"inherit"}}}}})),Me=function(){var e=ne(),t=Object(a.useRef)(null),n=e.store.editing;return Object(a.useEffect)((function(){if(n&&t.current){var e=t.current.querySelector("input,textarea");e&&setTimeout((function(){e.focus()}),250)}}),[n]),Object(a.createElement)(_e,{editing:!!n},Object(a.createElement)("div",{ref:t,className:"edit-pane"},n&&Object(a.createElement)(Le,{target:n})),Object(a.createElement)("div",{className:"footer"},Object(a.createElement)("button",{className:"btn btn-primary",onClick:function(){return e.dispatch({type:"HIDE_EDIT"})}},"Done")))},We=O.a.div({display:"flex",width:"100%",overflow:"scroll"}),Ve=function(){return Object(a.createElement)(We,null,Object(a.createElement)(Ce,null))},Xe=O.a.div({display:"grid",gridTemplateColumns:"1fr 200px",gridTemplateRows:"1fr",height:"100%",gap:"10px",position:"relative",overflow:"hidden","> *":{display:"flex",flexDirection:"column"}}),Fe=function(e){var t=e.onChange,n=e.value,r=e.defaultValue,c=ie(r);return Object(a.useEffect)((function(){c.dispatch({type:"REPLACE",container:n})}),[n]),Object(a.useEffect)((function(){t&&t(c.store.container)}),[t,c.store]),Object(a.createElement)(g.a,{backend:j.a},Object(a.createElement)(te.Provider,{value:c},Object(a.createElement)(Xe,null,Object(a.createElement)(Ve,null),Object(a.createElement)(de,null),Object(a.createElement)(Me,null))))},Ye=function(){function e(t){Object(m.a)(this,e),this.data=t}return Object(f.a)(e,[{key:"createElement",value:function(){return document.createElement("div")}},{key:"render",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return this.el||(this.el=this.createElement()),this.setAttributes({"data-type":this.data.type,"data-id":this.data.id,class:H()(this.data.className,this.sizeClassNames)}),t||this.setAttributes(),this.el.parentElement!=e&&e.appendChild(this.el),this}},{key:"setAttributes",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.data.attributes,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.el;t&&e&&Object.keys(e).forEach((function(n){t.setAttribute(n,String(e[n]))}))}},{key:"sizeClassNames",get:function(){var e;this.data||console.log("NO DATA",this);var t=this.data.sizes||{};return H()((e={},Object(o.a)(e,"col-sm-".concat(t.mobile),t.mobile),Object(o.a)(e,"col-md-".concat(t.tablet),t.tablet),Object(o.a)(e,"col-lg-".concat(t.desktop),t.desktop),e))}}]),e}(),qe=function(e){Object(b.a)(n,e);var t=Object(p.a)(n);function n(e){var a;return Object(m.a)(this,n),(a=t.call(this,e)).data=e,a}return Object(f.a)(n,[{key:"createElement",value:function(){return document.createElement(this.data.tag)}},{key:"render",value:function(e){return Object(u.a)(Object(d.a)(n.prototype),"render",this).call(this,e),this.el.innerText=this.data.text,this}}]),n}(Ye),Je=function(e){Object(b.a)(n,e);var t=Object(p.a)(n);function n(e){var a;return Object(m.a)(this,n),(a=t.call(this,e)).data=e,a}return Object(f.a)(n,[{key:"render",value:function(e){if(Object(u.a)(Object(d.a)(n.prototype),"render",this).call(this,e,!0),this.setAttributes({class:H()(this.data.classNames.wrapper,this.sizeClassNames)}),this.label||(this.label=document.createElement("label"),this.el.appendChild(this.label)),this.label.className=this.data.classNames.label,this.label.innerText=this.data.label,this.label.setAttribute("for",this.data.id),!this.input){var t=this["_".concat(this.data.control)];if(t){var a=t.apply(this);this.input=a,this.input.className=this.data.classNames.input,this.input.id=this.data.id,this.el.appendChild(this.input)}else console.warn("Can't render input type ".concat(this.data.control))}return this}},{key:"createInput",value:function(e){var t=document.createElement(e);return this.setAttributes(this.data.attributes,t),this.setAttributes({name:this.data.name,class:this.data.classNames.input},t),t}},{key:"_textarea",value:function(){return this.createInput("textarea")}},{key:"_input",value:function(){return this.createInput("input")}},{key:"renderOptions",value:function(e){var t=this,n=document.createElement("div");return this.setAttributes(this.data.attributes,n),this.optionPairs.forEach((function(a){var r=Object(l.a)(a,2),c=r[0],i=r[1],o=e(c,i),s=o.id,u=o.inputType,d=o.name,b=o.value,p=o.label,m=document.createElement("input");t.setAttributes({"data-id":s,type:u,name:d,value:b},m);var f=document.createElement("label");f.appendChild(m);var h=document.createElement("span");h.innerText=p,f.appendChild(h),n.appendChild(f)})),n}},{key:"_radio",value:function(){var e=this;return this.renderOptions((function(t,n){return{inputType:"radio",name:e.data.name,id:t,value:n,label:n}}))}},{key:"_checkbox",value:function(){return this.renderOptions((function(e,t){return{inputType:"checkbox",name:e,value:t,id:e,label:t}}))}},{key:"_select",value:function(){var e=this,t=document.createElement("select");return t.setAttribute("name",this.data.name),this.optionPairs.forEach((function(n){var a=Object(l.a)(n,2),r=a[0],c=a[1],i=document.createElement("option");e.setAttributes({value:r},i),i.innerText=c,t.appendChild(i)})),t}},{key:"optionPairs",get:function(){var e=this.data.options;return e?Object.keys(e).map((function(t){return[t,e[t]]})):[]}}]),n}(Ye),Ge=function(e){Object(b.a)(n,e);var t=Object(p.a)(n);function n(e){var a;return Object(m.a)(this,n),(a=t.call(this,e)).data=e,a.children=e.children.map((function(e){return Ke(e)})).filter(Boolean),a}return Object(f.a)(n,[{key:"render",value:function(e){var t,a=this;return Object(u.a)(Object(d.a)(n.prototype),"render",this).call(this,e),this.el.className=H()(null===(t=this.el)||void 0===t?void 0:t.className,this.data.direction),this.children.forEach((function(e){return e.render(a.el)})),this}}]),n}(Ye),Ke=function(e){return M(e)?new qe(e):_(e)?new Ge(e):L(e)?new Je(e):new Ye(e)},Qe=(n(65),{id:"6ae4215f-3525-4579-9570-2aae04b8cb01",type:"CONTAINER",control:"row",className:"",sizes:{mobile:12,tablet:12,desktop:12},attributes:{},direction:"row",children:[{id:"bd2d9c73-ad51-41a5-9e4a-a6cd7c55360c",type:"TEXT",control:"heading",tag:"h2",text:"How are you?",className:"",sizes:{mobile:12,tablet:12,desktop:12}},{id:"76aba5db-a017-4035-859d-5a7bd236a715",type:"TEXT",control:"para",tag:"p",text:"A few questions...",className:"",sizes:{mobile:12,tablet:12,desktop:12}},{id:"d6e17987-cb4b-41fc-806b-822d70ce8137",type:"CONTAINER",control:"row",className:"",sizes:{mobile:12,tablet:12,desktop:12},attributes:{},direction:"row",children:[{id:"5962abf3-4c66-4e27-a54f-8811a73b1c98",type:"CONTAINER",control:"col",className:"",sizes:{mobile:12,tablet:12,desktop:12},attributes:{},direction:"column",children:[{id:"29550f94-a533-43c1-857c-a5228a7bf728",type:"INPUT",control:"input",label:"Your Name?",className:"",sizes:{mobile:12,tablet:12,desktop:12},name:"name",classNames:{wrapper:"form-group",label:"col-sm-2",input:"form-control col-sm-10"},attributes:{}},{id:"4427f619-93ab-4fa8-b6de-02d374136451",type:"INPUT",control:"textarea",label:"Your Message",className:"",sizes:{mobile:12,tablet:12,desktop:12},name:"message",classNames:{wrapper:"form-group",label:"col-sm-2",input:"form-control col-sm-10"},attributes:{}}]},{id:"1ff69d7a-8e4e-44ca-b38f-cc030a7fffa2",type:"CONTAINER",control:"col",className:"",sizes:{mobile:12,tablet:12,desktop:12},attributes:{},direction:"column",children:[{id:"50920478-751b-4cf0-b18d-3e60c58c9cb8",type:"INPUT",control:"checkbox",label:"Favorite Letter?",className:"",sizes:{mobile:12,tablet:12,desktop:12},name:"fav-letter",classNames:{wrapper:"form-group",label:"col-sm-2",input:"form-control col-sm-10"},attributes:{},options:{a:"A",B:"B",C:"C"}},{id:"b75dd548-134b-4db3-98ce-7fdf1badcc71",type:"INPUT",control:"radio",label:"How Many Cats?",className:"",sizes:{mobile:12,tablet:12,desktop:12},name:"how-many-cats",classNames:{wrapper:"form-group",label:"col-sm-2",input:"form-control col-sm-10"},attributes:{},options:{one:"1",two:"2",three:"3"}},{id:"5ff73217-de33-4dc4-b5d4-9d2972f3ca82",type:"INPUT",control:"select",label:"Select label",className:"",sizes:{mobile:12,tablet:12,desktop:12},name:"",classNames:{wrapper:"form-group",label:"col-sm-2",input:"form-control col-sm-10"},attributes:{},options:{one:"one",two:"two",three:"three"}}]}]}]}),Ze=function(){var e=r.a.useState(),t=Object(l.a)(e,2),n=t[0],a=t[1],c=r.a.useRef(null);return r.a.createElement("div",{id:"example-builder"},r.a.createElement(Fe,{onChange:function(e){a(e)},defaultValue:Qe}),r.a.createElement("hr",null),r.a.createElement("div",null,r.a.createElement("button",{onClick:function(){var e,t;console.log(null===n||void 0===n?void 0:n.serialized),e=c.current,t=n.serialized,Ke(t).render(e)}},"Render")),r.a.createElement("hr",null),r.a.createElement("div",{ref:c}))};i.a.render(r.a.createElement(Ze,null),document.getElementById("root"))}},[[55,1,2]]]);
//# sourceMappingURL=main.2cb6ab70.chunk.js.map