(this["webpackJsonpformial-example"]=this["webpackJsonpformial-example"]||[]).push([[0],{50:function(e,t,n){e.exports=n(61)},51:function(e,t,n){},60:function(e,t,n){},61:function(e,t,n){"use strict";n.r(t);n(51);var a=n(0),r=n.n(a),c=n(34),l=n.n(c),i=n(14),o=n(7),s=n(4),u=n(32),d=n(31),m=n(8),p=n(10),b=n(11),f=n(6),E=n(48),O=n(65),j=n(66),h=n(64),x=n(26),v=n.n(x),g=n(45),y=n(42),N=n(35),w=n(41),T=n(44),k=n(43),C=n(13),D=n.n(C),I=n(30),L=n(47),R=n(19);function _(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)}))}var A=function(){function e(t){Object(p.a)(this,e),this.id=t.id||_(),this.type=t.type,this.className=t.className||"row"===this.type?"row":"col",this.children=t.children||[]}return Object(b.a)(e,[{key:"merge",value:function(t){return new e({id:this.id,type:this.type,className:this.className,children:Object(m.a)(t.children||[])})}},{key:"clone",value:function(){return new e({id:this.id,type:this.type,className:this.className,children:Object(m.a)(this.children)})}}]),e}(),M=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};Object(p.a)(this,e),this.control=t,this.id=_(),this.data=v()(n,{label:"".concat(this.control.name," label"),name:"",classNames:{wrapper:"form-wrapper",label:"col-sm-2",element:"form-control col-sm-10"},attributes:{}}),t.hasOptions&&(this.data.options={})}return Object(b.a)(e,[{key:"placeholder",get:function(){return this.control.placeholder&&this.control.placeholder(this)||null}},{key:"optionPairs",get:function(){var e=this.data.options;return e?Object.keys(e).map((function(t){return[t,e[t]]})):[]}}]),e}(),H=function(){function e(t){Object(p.a)(this,e),this.name=t.name,this.id=t.id,this.icon=t.icon,this.placeholder=t.placeholder,this.hasOptions=t.hasOptions}return Object(b.a)(e,[{key:"createElement",value:function(){return new M(this)}}]),e}(),B=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(){return Object(p.a)(this,n),t.apply(this,arguments)}return Object(b.a)(n,[{key:"createElement",value:function(){return new A({type:"row"})}}]),n}(H),U=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(){return Object(p.a)(this,n),t.apply(this,arguments)}return Object(b.a)(n,[{key:"createElement",value:function(){return new A({type:"column"})}}]),n}(H),S={registered:new Map,register:function(e){var t=this;e.forEach((function(e){return t.registered.set(e.id,e)}))}};var P=Object(a.createContext)(null),W=function(){return Object(a.useContext)(P)},z=function(){return W().store},F=function(e,t){switch(t.type){case"ADD_ELEMENT":return function(e,t){var n,a,r=t.id,c=t.container,l=t.destIndex,i=t.fromIndex,o=t.fromContainer;if(null!=i&&o)a=o.children[i],o.children.splice(i,1),o===c&&i<l&&(l-=1);else if(!(n=e.controls.get(r)))return console.warn("attempted to drop id ".concat(r," but no control exists")),e;return!a&&n&&(a=n.createElement()),a&&c.children.splice(l,0,a),Object(s.a)({},e)}(e,t);case"DEL_ELEMENT":return t.container.children=Object(m.a)(t.container.children.filter((function(e){return e.id!==t.element.id}))),Object(s.a)({},e);case"UPDATE_ELEMENT":return t.element.data=v()(t.element.data,t.patch),Object(s.a)(Object(s.a)({},e),{},{elements:Object(m.a)(e.elements)});case"EDIT_ELEMENT":return Object(s.a)(Object(s.a)({},e),{},{editing:t.element});case"HIDE_ELEMENT_EDIT":return Object(s.a)(Object(s.a)({},e),{},{editing:void 0});case"ADD_ATTRIBUTE":return t.element.data[t.nested][""]="",Object(s.a)(Object(s.a)({},e),{},{elements:Object(m.a)(e.elements)});case"REPLACE_NEW_ATTRIBUTE":return delete t.element.data[t.nested][""],t.element.data[t.nested][t.name]="",Object(s.a)(Object(s.a)({},e),{},{elements:Object(m.a)(e.elements)});case"DELETE_ATTRIBUTE":return delete t.element.data[t.nested][t.name],Object(s.a)(Object(s.a)({},e),{},{elements:Object(m.a)(e.elements)})}return e},J=function(){var e=Object.create(null);return e.controls=new Map(S.registered),e.elements=[],e.container=new A({type:"row"}),e},V=function(){var e=Object(a.useReducer)(F,{},J),t=Object(o.a)(e,2),n=t[0],r=t[1];return Object(a.useMemo)((function(){return{store:n,dispatch:r}}),[n])},G=function(e,t){var n=e.optionPairs;return 0===n.length?t("",""):n.map((function(e){var n=Object(o.a)(e,2),r=n[0],c=n[1];return Object(a.createElement)("label",{key:r},t(r,c),Object(a.createElement)("span",null,c))}))};S.register([new B({id:"row",name:"Row",icon:Object(a.createElement)(N.a,null)}),new U({id:"col",name:"Column",icon:Object(a.createElement)(w.a,null)}),new H({id:"input",name:"Text Input",icon:Object(a.createElement)(y.a,null),placeholder:function(){return Object(a.createElement)("input",{type:"text",className:"form-control",readOnly:!0})}}),new H({id:"checkbox",name:"Checkboxes",icon:Object(a.createElement)(k.a,null),hasOptions:!0,placeholder:function(e){return G(e,(function(t){return Object(a.createElement)("input",{type:"checkbox",name:t,className:e.data.classNames.element,readOnly:!0})}))}}),new H({id:"radio",name:"Radio Input",icon:Object(a.createElement)(T.a,null),placeholder:function(e){return G(e,(function(t){return Object(a.createElement)("input",{key:t,type:"radio",name:t,className:e.data.classNames.element,readOnly:!0})}))}}),new H({id:"select",name:"Select",hasOptions:!0,icon:Object(a.createElement)(g.a,null),placeholder:function(e){var t=e.optionPairs;return Object(a.createElement)("select",{name:e.data.name},t.map((function(e){var t=Object(o.a)(e,2),n=t[0],r=t[1];return Object(a.createElement)("option",{key:n,value:n},r)})))}})]);var Y=f.a.li({cursor:"pointer",backgroundColor:"white",listStyle:"none",margin:"5px",padding:"10px",userSelect:"none",border:"1px dashed #ddd",svg:{height:"20px",marginRight:"0.5rem"}}),q=function(e){var t=e.id,n=e.name,r=e.icon,c=Object(O.a)({item:{id:t,type:"control"}}),l=Object(o.a)(c,2)[1];return Object(a.createElement)(Y,{ref:l},r,Object(a.createElement)("span",null,n))},K=f.a.ul({padding:0}),Q=function(){var e=z().controls;return Object(a.createElement)(K,null,Object(m.a)(e.values()).map((function(e){return Object(a.createElement)(q,Object.assign({key:e.id},e))})))},X=f.a.div({minHeight:"15px",border:"1px solid white","&:last-child":{flex:1}}),Z=function(e){var t=e.index,n=e.container,a=W(),r=Object(j.a)({accept:"control",collect:function(e){return{isHovered:e.isOver()}},drop:function(e){var r=e.id,c=e.fromIndex,l=e.fromContainer;a.dispatch({type:"ADD_ELEMENT",id:r,destIndex:t,container:n,fromIndex:c,fromContainer:l})}}),c=Object(o.a)(r,2);return{isHovered:c[0].isHovered,dropRef:c[1]}},$=function(e){var t=Z(e),n=t.isHovered,r=t.dropRef;return Object(a.createElement)(X,{ref:r,className:D()("drop",{isHovered:n})})},ee=f.a.div({display:"flex",flexDirection:"row",position:"relative",padding:"10px",color:"#0c0c0c",justifyContent:"space-between",alignItems:"stretch","&.row":{"> .column":{margin:"-1px",flex:1},"> .container.controls":{top:"calc(50% - 22px)",left:"-15px",right:void 0,display:"flex",flexDirection:"column","> *":{marginLeft:0}}},"&.column":{flexDirection:"column",".container-drop":{width:"100%"},"&.empty":{flex:1}},".control-type":{fontSize:"0.8rem",position:"absolute",top:0,right:0,border:"1px solid",padding:"2px",borderRadius:"8px"},"&:hover":{backgroundColor:"white","> .controls":{opacity:1}},".controls":{opacity:0,transition:"opacity 0.3s ease-in-out",display:"flex",justifyContent:"flex-end",alignItems:"flex-start","> *":{marginLeft:"15px"},button:{border:0,padding:0,cursor:"pointer",backgroundColor:"transparent","&:hover":{svg:{color:"#212121"}}},svg:{height:"20px",color:"gray",transition:"opacity 0.3s ease-in-out"},".move svg":{cursor:"move"}},".inline-text":{padding:0,border:0,fontSize:"inherit","&:focus":{outline:"none"}},".label":{fontSize:"20px",marginBottom:"5px"},".control-preview":{display:"flex",flexWrap:"wrap",alignItems:"flex-start",flexDirection:"column","&.row":{flexDirection:"column"}}}),te=function(e){var t=e.index,n=e.element,r=e.container,c=W(),l=Object(O.a)({item:{id:n.id,fromIndex:t,fromContainer:r,type:"control"},collect:function(e){return{opacity:e.isDragging()?.4:1}}}),i=Object(o.a)(l,3),s=i[0].opacity,u=i[1],d=i[2];return Object(a.createElement)(ee,{ref:d,style:{opacity:s},className:D()("element-preview",n.control.id)},Object(a.createElement)("div",{className:"control-preview"},Object(a.createElement)("span",null,n.data.label),n.placeholder),Object(a.createElement)("div",{className:"controls"},Object(a.createElement)("button",{className:"trash",onClick:function(){return c.dispatch({type:"DEL_ELEMENT",element:n,container:r})}},Object(a.createElement)(R.a,null)),Object(a.createElement)("button",{onClick:function(){return c.dispatch({type:"EDIT_ELEMENT",element:n})}},Object(a.createElement)(L.a,null)),Object(a.createElement)("button",{className:"move",ref:u},Object(a.createElement)(I.a,null))))},ne=Object(f.a)(ee)({border:"1px dashed gray",minHeight:"40px",borderRadius:"5px",padding:"0","&.empty":{alignItems:"stretch","> .drop":{flex:1}},".container.controls":{position:"absolute",top:"-27px",left:"calc(50% - 15px)",background:"white",padding:"2px 5px",borderTopRightRadius:"5px",borderTopLeftRadius:"5px",border:"1px dashed gray",borderBottomWidth:0},".element-preview":{flex:1},"&:hover":{".container-drop":{backgroundColor:"#e8e8e8"}}}),ae=Object(f.a)(X)({minWidth:"20px",height:"100%"}),re=function(e){var t=Z(e),n=t.isHovered,r=t.dropRef;return Object(a.createElement)(ae,{ref:r,className:D()("drop","container-drop",{isHovered:n})})},ce=function(e){var t=e.parent,n=e.container,r=e.index,c=W(),l=Object(O.a)({item:{id:n.id,fromIndex:r,fromContainer:t,type:"control"},collect:function(e){return{opacity:e.isDragging()?.4:1}}}),i=Object(o.a)(l,3),s=i[0].opacity,u=i[1],d=i[2];return Object(a.createElement)(ne,{ref:d,style:{opacity:s},className:D()("container-preview",n.type,{empty:0===n.children.length})},Object(a.createElement)(re,{container:n,index:0}),n.children.map((function(e,t){return Object(a.createElement)(a.Fragment,{key:t},Object(a.createElement)(le,{index:t,container:n,el:e}),Object(a.createElement)(re,{container:n,index:t+1}))})),Object(a.createElement)("div",{className:"controls container"},Object(a.createElement)("button",{className:"trash",onClick:function(){return c.dispatch({type:"DEL_ELEMENT",container:t,element:n})}},Object(a.createElement)(R.a,null)),Object(a.createElement)("button",{className:"move",ref:u},Object(a.createElement)(I.a,null))))},le=function(e){var t=e.el,n=e.index,r=e.container;return t.type?Object(a.createElement)(ce,{parent:r,container:t,index:n}):Object(a.createElement)(te,{container:r,element:t,index:n})},ie=f.a.div((function(e){return{flex:1,display:"flex",flexDirection:"column",justifyItems:"flex-start",background:"#fafafa",padding:"10px",boxSizing:"border-box",boxShadow:"0 0 2px 1px rgba(0, 0, 0, 0.1)",opacity:e.editing?"0.3":"1",transition:"opacity 0.3s ease-in-out",width:"fit-content",minWidth:"100%","> .container-preview":{margin:"0 2px"},"&.isHovered":{".drop":{backgroundColor:"#e8e8e8"}},"&:hover":{".drop":{backgroundColor:"#e8e8e8"}},".drop.isHovered":{borderColor:"black",backgroundColor:"#c1c1c1"},".drop:hover":{backgroundColor:"#c1c1c1"}}})),oe=function(){var e=z(),t=e.container,n=e.editing,r=Object(j.a)({accept:"control",collect:function(e){return{isHovered:e.isOver()}},canDrop:function(){return!1}}),c=Object(o.a)(r,2),l=c[0].isHovered,i=c[1];return Object(a.createElement)(ie,{ref:i,editing:!!n,className:D()("form-elements",{isHovered:l})},Object(a.createElement)($,{container:t,index:0}),t.children.map((function(e,n){return Object(a.createElement)(a.Fragment,{key:n},Object(a.createElement)(le,{index:n,container:t,el:e}),Object(a.createElement)($,{container:t,index:n+1}))})))},se={};function ue(e,t,n){var r=Object(a.useMemo)((function(){return Array.isArray(e)?e:[e]}),[e]),c=Object.assign({},se,n),l=Object(a.useRef)(t),i=c.target;Object(a.useEffect)((function(){l.current=t}));var o=Object(a.useCallback)((function(e){r.some((function(t){return e.key===t}))&&l.current(e)}),[r]);Object(a.useEffect)((function(){if("undefined"!==typeof window){var e=i?i.current:window;return e&&e.addEventListener("keydown",o),function(){e&&e.removeEventListener("keydown",o)}}}),[r,i,t])}var de=function(e){var t=e.element,n=e.nested,r=W(),c=Object(a.useRef)(null),l=function(){return r.dispatch({type:"REPLACE_NEW_ATTRIBUTE",nested:n,element:t,name:c.current.value})},i=function(){return r.dispatch({type:"DELETE_ATTRIBUTE",element:t,nested:n,name:""})};return ue(["Enter","Escape"],(function(e){switch(e.key){case"Enter":l();break;case"Escape":i()}}),{target:c}),Object(a.useEffect)((function(){c.current.focus()}),[]),Object(a.createElement)("label",null,Object(a.createElement)("input",{ref:c,defaultValue:"",onBlur:l}),Object(a.createElement)("span",{className:"value"}),Object(a.createElement)("button",{onClick:i,className:"del-attr"},Object(a.createElement)(R.a,null)))},me=function(e){var t=e.element,n=e.nested,r=e.attributeName,c=W(),l=Object(a.useRef)(null);return ue(["Enter","Tab"],(function(e){e.preventDefault(),c.dispatch({type:"ADD_ATTRIBUTE",nested:n,element:t})}),{target:l}),Object(a.useEffect)((function(){var e=Object.keys(t.data[n]);r===e[e.length-1]&&l.current.focus()}),[]),Object(a.createElement)("label",null,Object(a.createElement)("span",null,r,":"),Object(a.createElement)("input",{ref:l,className:"value",value:t.data[n][r]||"",onChange:function(e){var a=e.target.value;return c.dispatch({type:"UPDATE_ELEMENT",element:t,patch:Object(i.a)({},n,Object(i.a)({},r,a))})}}),Object(a.createElement)("button",{onClick:function(){c.dispatch({type:"DELETE_ATTRIBUTE",element:t,nested:n,name:r})},className:"del-attr"},Object(a.createElement)(R.a,null)))},pe=function(e){var t=e.element,n=e.nested,r=e.attributeName;return""===r?Object(a.createElement)(de,{nested:n,element:t}):Object(a.createElement)(me,{nested:n,attributeName:r,element:t})},be=function(e){var t=e.label,n=e.element,r=e.nested,c=W(),l=n.data[r];if(!l)return null;var i=Object.keys(l);return Object(a.createElement)("fieldset",{className:"options"},Object(a.createElement)("legend",null,t,":"),Object(a.createElement)("div",{className:"controls"},Object(a.createElement)("button",{onClick:function(){return c.dispatch({type:"ADD_ATTRIBUTE",nested:r,element:n})},className:"add-attr"},"+")),i.length>0&&Object(a.createElement)("div",{className:"heading"},Object(a.createElement)("span",null,"ID"),Object(a.createElement)("span",null,"Value")),i.map((function(e){return Object(a.createElement)(pe,{key:e,nested:r,element:n,attributeName:e})})))},fe=function(e){var t=e.element,n=W(),r=t.data,c=function(e){return n.dispatch({type:"UPDATE_ELEMENT",element:t,patch:e})};return Object(a.createElement)("div",null,Object(a.createElement)("h4",null,"Edit ",t.control.name),Object(a.createElement)("label",null,Object(a.createElement)("span",null,"Label:"),Object(a.createElement)("input",{className:"value",value:r.label||"",onChange:function(e){var t=e.target.value;return c({label:t})}})),Object(a.createElement)("label",null,Object(a.createElement)("span",null,"Name:"),Object(a.createElement)("input",{className:"value",value:r.name||"",onChange:function(e){var t=e.target.value;return c({name:t})}})),Object(a.createElement)("fieldset",null,Object(a.createElement)("legend",null,"Class Names:"),Object(a.createElement)("label",null,Object(a.createElement)("span",null,"Wrapper:"),Object(a.createElement)("input",{className:"value",value:r.classNames.wrapper||"",onChange:function(e){var t=e.target.value;return c({classNames:{wrapper:t}})}})),Object(a.createElement)("label",null,Object(a.createElement)("span",null,"Label:"),Object(a.createElement)("input",{className:"value",value:r.classNames.label||"",onChange:function(e){var t=e.target.value;return c({classNames:{label:t}})}})),Object(a.createElement)("label",null,Object(a.createElement)("span",null,"Element:"),Object(a.createElement)("input",{className:"value",value:r.classNames.element||"",onChange:function(e){var t=e.target.value;return c({classNames:{element:t}})}}))),Object(a.createElement)(be,{element:t,label:"Options",nested:"options"}),Object(a.createElement)(be,{element:t,label:"Attributes",nested:"attributes"}))},Ee=f.a.div((function(e){return{position:"absolute",height:"100%",width:"400px",background:"white",right:e.editing?"0":"-420px",transition:"right 0.3s ease-in-out",display:"flex",boxShadow:"-5px 0px 5px 0px rgba(50, 50, 50, 0.75)",".edit-pane":{flex:1,overflowY:"auto",padding:"10px"},".footer":{padding:"20px",display:"flex",justifyContent:"flex-end",borderTop:"1px solid lightGrey"},legend:{backgroundColor:"#000",color:"#fff",padding:"3px 6px"},"label, .heading":{display:"flex",marginBottom:"5px","> *:first-child":{width:"125px"}},".heading > *":{fontWeight:"bold"},".value":{minWidth:"150px",flex:1},button:{marginLeft:"1rem",svg:{height:"18px"}},fieldset:{marginTop:"1rem",".controls":{display:"flex",justifyContent:"flex-end",".add-attr":{margin:"-10px -5px 10px 0"}}}}})),Oe=function(){var e=W(),t=e.store.editing;return Object(a.createElement)(Ee,{editing:!!t},Object(a.createElement)("div",{className:"edit-pane"},t&&Object(a.createElement)(fe,{element:t})),Object(a.createElement)("div",{className:"footer"},Object(a.createElement)("button",{className:"btn btn-primary",onClick:function(){return e.dispatch({type:"HIDE_ELEMENT_EDIT"})}},"Done")))},je=f.a.div({display:"flex",width:"100%",overflow:"scroll"}),he=function(){return Object(a.createElement)(je,null,Object(a.createElement)(oe,null))},xe=function(){return Object(a.createElement)("div",null,Object(a.createElement)(Q,null))},ve=f.a.div({display:"grid",gridTemplateColumns:"1fr 200px",gridTemplateRows:"1fr",height:"100%",gap:"10px",position:"relative",overflow:"hidden","> *":{display:"flex",flexDirection:"column"}}),ge=function(){var e=V();return Object(a.createElement)(h.a,{backend:E.a},Object(a.createElement)(P.Provider,{value:e},Object(a.createElement)(ve,null,Object(a.createElement)(he,null),Object(a.createElement)(xe,null),Object(a.createElement)(Oe,null))))},ye=(n(60),function(){return r.a.createElement("div",{id:"example-builder"},r.a.createElement(ge,null))});l.a.render(r.a.createElement(ye,null),document.getElementById("root"))}},[[50,1,2]]]);
//# sourceMappingURL=main.61f682d1.chunk.js.map