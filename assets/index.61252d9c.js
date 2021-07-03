var e=Object.defineProperty,t=Object.defineProperties,a=Object.getOwnPropertyDescriptors,n=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable,s=(t,a,n)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[a]=n,o=(e,t)=>{for(var a in t||(t={}))r.call(t,a)&&s(e,a,t[a]);if(n)for(var a of n(t))l.call(t,a)&&s(e,a,t[a]);return e},i=(e,n)=>t(e,a(n));import{L as c,c as d,r as u,a as m,R as p,i as h,d as E,b as f,e as x,f as b,g as v,h as N,j as g,k as y,l as I,m as T,n as w,o as C,p as O,u as P,q as R,D as _,H as k,s as A}from"./vendor.4bc98b14.js";var D,L,S,V,M,H,U,z;function j(e){return"INPUT"===e.type}function $(e){return"CONTAINER"===e.type}function F(e){return"TEXT"===e.type}function q(e){return"FORM"===e.type}class B{constructor(e,t={}){this[D]=!0,this.control=e,this.id=t.id||"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)})),this.data=d(e.defaultValues,t)}serialize(){return o({id:this.id,type:"element",control:this.control.id},this.data)}}D=c;class W extends B{constructor(e,t=e.defaultValues){super(e,t),this[L]=!0,this.direction=t.direction||e.defaultValues.direction,this.children=t.children||e.defaultValues.children||[],this.data=d(this.data,i(o({},t),{className:"",attributes:[]}))}get isRow(){return"row"===this.direction}serialize(){return i(o(o({},super.serialize()),this.data),{children:this.children.map((e=>e.serialize())),direction:this.direction,type:"CONTAINER"})}}L=c;class X extends W{constructor(e,t){const{col:a}=e;if(!a)throw new Error("Column control doesn't exist?");super(a,i(o({},t),{direction:"row"})),this[c]=!0,this.data.className="formial-form"}serialize(){return i(o({},super.serialize()),{type:"FORM"})}}class J extends B{constructor(e,t={}){super(e,t),this[S]=!0,this.data=d(e.defaultValues,t)}serialize(){return i(o(o({},super.serialize()),this.data),{type:"TEXT"})}}S=c;class Y extends B{constructor(e,t={}){super(e,t),this[V]=!0,this.data=d(e.defaultValues,t),this.control.hasOptions&&(this.data.options=this.data.options||[])}nested(e,t){return this.data[e].find((e=>e.id===t))}get placeholder(){return this.control.placeholder&&this.control.placeholder(this)||null}get optionPairs(){const{options:e}=this.data;return e?e.map((e=>[e.id,e.value])):[]}serialize(){return i(o(o({},super.serialize()),this.data),{type:"INPUT"})}}V=c;class G{constructor(e){this[M]=!0,this.name=e.name,this.id=e.id,this.icon=e.icon,this.placeholder=e.placeholder,this.hasOptions=e.hasOptions,this._defaultValues=d(this.defaultValues||{},e.defaultValues||{})}get defaultValues(){return o({},this._defaultValues)}createElement(){return new Y(this)}}function K(e){return e instanceof W}function Q(e){return e instanceof Y}function Z(e){return e instanceof J}M=c;class ee extends G{constructor(e){super(e),this[H]=!0,this._defaultValues=d(this._defaultValues||{},{children:[]})}createElement(){return new W(this)}}H=c;class te extends G{constructor(e){super(e),this[U]=!0,this._defaultValues=d(this._defaultValues||{},{label:`${e.name} label`,className:"mb-2",classNames:{wrapper:this.wrapperClassName,label:"",input:"form-control"},attributes:[]})}get wrapperClassName(){switch(this.id){case"input":case"textarea":case"select":return"form-floating"}return"form-control"}get defaultValues(){return d(this._defaultValues,{name:`${this.id}-${Math.round(9999*Math.random())+1e3}`})}}U=c;class ae extends G{constructor(e){super(e),this[z]=!0,this._defaultValues=d(this._defaultValues||{},{tag:"para"===this.id?"p":"h3",text:"Some text…",className:""})}createElement(){return new J(this)}}z=c;const ne={registered:Object.create(null),register(e){e.forEach((e=>{this.registered[e.id]=e}))}},re=(e,t)=>{const a=e[t.control];if(!a)return null;if(F(t))return new J(a,t);if(j(t))return new Y(a,t);const n=[],r=t.children;return r&&r.forEach((t=>{const a=re(e,t);a&&n.push(a)})),$(t)?new W(a,i(o({},t),{children:n})):new X(e,i(o({},t),{children:n}))},le=u.exports.createContext(null),se=()=>u.exports.useContext(le),oe=()=>se().store;le.displayName="StoreContext";const ie=(e,t)=>{if(e.id===t)return[e];if(K(e))for(let a=0;a<e.children.length;a++){const n=e.children[a],r=ie(n,t);if(r.length)return r.concat(e)}return[]};const ce=m(((e,t)=>{switch(t.type){case"ADD_ELEMENT":return function(e,{id:t,containerId:a,destIndex:n,fromIndex:r,fromContainerId:l}){let s,o;const i=ie(e.form,a)[0];if(K(i)){if(null!=r&&l){const t=ie(e.form,l)[0];if(!K(t))return;o=t.children[r],t.children.splice(r,1),t===i&&r<n&&(n-=1)}else if(s=e.controls[t],!s)return void console.warn(`attempted to drop id ${t} but no control exists`);!o&&s&&(o=s.createElement()),o&&i.children.splice(n,0,o)}}(e,t);case"APPEND_ELEMENT":return void e.form.children.push(t.control.createElement());case"CLEAR":return void(e.form=new X(e.controls));case"REPLACE_FORM":{let a=null;return q(t.form)?a=re(t.controls,t.form):t.form instanceof X&&(a=t.form),void(a&&a instanceof X&&(e.form=a))}case"DELETE_ELEMENT":{const a=ie(e.form,t.elementId),n=a[1];return void n.children.splice(n.children.indexOf(a[0]),1)}case"UPSERT_OPTION":{const a=ie(e.form,t.inputId)[0];if(!Q(a))return;const n=a.data[t.nested].find((e=>e.id===t.optionId));return void(n?n.value=t.value||"":a.data[t.nested].push({id:t.optionId,value:t.value||""}))}case"UPDATE_ELEMENT":{const a=ie(e.form,t.elementId)[0];return void Object.assign(a.data,t.patch)}case"EDIT_ELEMENT":{const a=ie(e.form,t.elementId);return void(e.editingId=a[0].id)}case"HIDE_EDIT":return void(e.editingId=void 0);case"REORDER_OPTION":{const a=ie(e.form,t.inputId)[0];if(!Q(a))return;const n=a.data[t.nested],r=n.findIndex((e=>e.id===t.optionId)),l=n[r];return a.data[t.nested].splice(r,1),t.index>r&&(t.index-=1),void a.data[t.nested].splice(t.index,0,l)}case"DELETE_OPTION":{const a=ie(e.form,t.inputId)[0];if(!Q(a))return;const n=a.nested(t.nested,t.id);if(n){const e=a.data[t.nested].indexOf(n);-1!==e&&a.data[t.nested].splice(e,1)}}}})),de=e=>{const t=Object.create(null);return t.controls=o({},ne.registered),t.form=e?re(t.controls,e):new X(t.controls,e),t},ue=e=>{const[t,a]=(e=>u.exports.useReducer(ce,e,de))(e);return u.exports.useMemo((()=>({store:t,dispatch:a})),[t])},me=e=>p.createElement(h.Icon,i(o({},e),{icon:E})),pe=e=>p.createElement(h.Icon,i(o({},e),{icon:f})),he=e=>p.createElement(h.Icon,i(o({},e),{icon:x})),Ee=e=>p.createElement(h.Icon,i(o({},e),{icon:b})),fe=e=>p.createElement(h.Icon,i(o({},e),{icon:v})),xe=e=>p.createElement(h.Icon,i(o({},e),{icon:N})),be=e=>p.createElement(h.Icon,i(o({},e),{icon:g})),ve=e=>p.createElement(h.Icon,i(o({},e),{icon:y})),Ne=e=>p.createElement(h.Icon,i(o({},e),{icon:I})),ge=e=>p.createElement(h.Icon,i(o({},e),{icon:T})),ye=e=>p.createElement(h.Icon,i(o({},e),{icon:w})),Ie=e=>p.createElement(h.Icon,i(o({},e),{icon:C})),Te=(e,t)=>{const a=e.optionPairs;if(0===a.length)return t("","");const n=a.map((([e,a])=>u.exports.createElement("label",{key:e},t(e,a),u.exports.createElement("span",null,a))));return u.exports.createElement("div",{className:O("choices",e.data.choicesLayout)},n)};ne.register([new ae({id:"heading",name:"Heading",icon:u.exports.createElement(fe,null),placeholder:e=>u.exports.createElement(e.data.tag,e.data.text)}),new ae({id:"para",name:"Paragraph",icon:u.exports.createElement(xe,null),placeholder:e=>u.exports.createElement("p",null,e.data.text)}),new te({id:"input",name:"Text Input",icon:u.exports.createElement(pe,null),placeholder:()=>u.exports.createElement("input",{type:"text",className:"form-control",readOnly:!0})}),new te({id:"textarea",name:"Text Area",icon:u.exports.createElement(Ee,null),placeholder:()=>u.exports.createElement("textarea",{className:"form-control",readOnly:!0})}),new te({id:"checkbox",name:"Checkboxes",icon:u.exports.createElement(Ne,null),hasOptions:!0,defaultValues:{options:[],choicesLayout:"vertical"},placeholder:e=>Te(e,(e=>u.exports.createElement("input",{type:"checkbox",name:`pv-${e}`,readOnly:!0})))}),new te({id:"radio",name:"Radio Input",hasOptions:!0,icon:u.exports.createElement(ve,null),defaultValues:{options:[],choicesLayout:"vertical"},placeholder:e=>Te(e,(t=>u.exports.createElement("input",{key:t,type:"radio",name:`pv-${e.data.name}`,readOnly:!0})))}),new te({id:"select",name:"Select",hasOptions:!0,icon:u.exports.createElement(me,null),defaultValues:{options:[]},placeholder(e){const t=e.optionPairs;return u.exports.createElement("select",{name:`pv-${e.data.name}`},t.map((([e,t])=>u.exports.createElement("option",{key:e,value:e},t))))}}),new ee({id:"row",name:"Row",icon:u.exports.createElement(he,null),defaultValues:{direction:"row"}}),new ee({id:"col",name:"Column",icon:u.exports.createElement(be,null),defaultValues:{direction:"column"}})]);const we=({children:e})=>u.exports.createElement("h4",{className:"title"},e),Ce=({children:e})=>u.exports.createElement("div",{className:"scrolling"},e),Oe=({children:e,className:t})=>u.exports.createElement("div",{className:O("values",t)},e),Pe=({control:e})=>{const{id:t,name:a,icon:n}=e,{dispatch:r}=se(),[{opacity:l},s]=P({item:{id:t,type:"control"},collect:e=>({opacity:e.isDragging()?.4:1})});return u.exports.createElement("div",{ref:s,style:{opacity:l},className:O("control-label"),onClick:()=>{r({type:"APPEND_ELEMENT",control:e})}},n,u.exports.createElement("span",null,a))},Re=()=>{const{editingId:e,controls:t}=oe();return e?null:u.exports.createElement("div",{className:"controls"},u.exports.createElement(we,null,"Elements"),u.exports.createElement(Ce,{className:"listing"},u.exports.createElement("ul",null,Object.values(t).map((e=>u.exports.createElement(Pe,{key:e.id,control:e}))))))};const _e={};function ke(e,t,a){const n=u.exports.useMemo((()=>Array.isArray(e)?e:[e]),[e]),r=Object.assign({},_e,a),l=u.exports.useRef(t),{target:s}=r;u.exports.useEffect((()=>{l.current=t}));const o=u.exports.useCallback((e=>{n.some((t=>e.key===t))&&l.current(e)}),[n]);u.exports.useEffect((()=>{if("undefined"!=typeof window){const e=s?s.current:window;return e&&e.addEventListener("keydown",o),()=>{e&&e.removeEventListener("keydown",o)}}}),[n,s,t])}const Ae=Symbol("new"),De=Symbol("delete"),Le=({input:e,nested:t,onComplete:a})=>{const n=se(),r=u.exports.useRef(null),l=()=>{var l;const s=null==(l=r.current)?void 0:l.value;s&&(n.dispatch({type:"UPSERT_OPTION",nested:t,inputId:e.id,optionId:s}),a(s))},s=()=>{n.dispatch({type:"DELETE_OPTION",inputId:e.id,nested:t,id:""}),a(De)};return ke(["Enter","Escape","Tab"],(e=>{switch(e.key){case"Tab":e.preventDefault(),l();break;case"Enter":l();break;case"Escape":s(),a(De)}}),{target:r}),u.exports.useEffect((()=>{var e;null==(e=r.current)||e.focus()}),[]),p.createElement("label",null,p.createElement("input",{ref:r,defaultValue:""}),p.createElement("span",{className:"value"}),p.createElement("button",{className:"delete-btn",onClick:s},p.createElement(ye,null)))},Se=({input:e,nested:t,focused:a,index:n,onComplete:r,option:l})=>{const s=se(),o=u.exports.useRef(null),[{opacity:i},c]=P({item:{id:l.id,index:n,type:"option"},collect:e=>({opacity:e.isDragging()?.4:1})}),d=()=>{var a;s.dispatch({type:"UPSERT_OPTION",inputId:e.id,nested:t,optionId:l.id,value:null==(a=o.current)?void 0:a.value})};return ke(["Enter","Tab"],(e=>{e.preventDefault(),d(),r(l.id)}),{target:o}),u.exports.useEffect((()=>{var e;a&&(null==(e=o.current)||e.focus())}),[a]),p.createElement("label",{className:"input-option-label draggable",style:{opacity:i},ref:c},p.createElement("div",{className:"label"},l.id,":"),p.createElement("input",{ref:o,className:"value",value:l.value||"",onChange:d}),p.createElement("button",{className:"delete-btn",onClick:()=>{s.dispatch({type:"DELETE_OPTION",id:l.id,inputId:e.id,nested:t}),r(De)}},p.createElement(ye,null)))},Ve=({input:e,nested:t,index:a})=>{const n=se(),[{isHovered:r},l]=R({accept:"option",collect:e=>({isHovered:e.isOver()}),drop:r=>{const{id:l}=r;n.dispatch({type:"REORDER_OPTION",nested:t,inputId:e.id,optionId:l,index:a})}});return p.createElement("div",{ref:l,className:O("drop","drop-target",{"is-hovered":r})})},Me=({label:e,input:t,nested:a,ignore:n=[]})=>{const[r,l]=u.exports.useState("");let s=t.data[a];return s?(s=s.filter((e=>!n.includes(e.id))),p.createElement("fieldset",{className:"options"},p.createElement("legend",null,e,":"),p.createElement("div",{className:"controls"},p.createElement("button",{onClick:()=>l(Ae),className:"add-attr"},"➕")),s.length?p.createElement("div",{className:"heading"},p.createElement("span",null,"ID"),p.createElement("span",null,"Value")):null,s.map(((e,n)=>p.createElement(p.Fragment,{key:e.id},p.createElement(Ve,{input:t,nested:a,index:n}),p.createElement(Se,{focused:r===e.id,nested:a,option:e,input:t,index:n,onComplete:e=>{e===De?l(""):n===s.length-1&&l(Ae)}})))),p.createElement(Ve,{input:t,nested:a,index:s.length}),r===Ae&&p.createElement(Le,{nested:a,input:t,onComplete:e=>{l(e===De?"":e)}}))):null},He=["input","textarea","radio"],Ue=({input:e})=>{var t;const a=se();return He.includes(e.control.id)?p.createElement("label",null,p.createElement("span",null,"Required?"),p.createElement("input",{type:"checkbox",className:"value",checked:"true"===(null==(t=e.nested("attributes","required"))?void 0:t.value)||!1,onChange:({target:{checked:t}})=>{a.dispatch({type:"UPSERT_OPTION",inputId:e.id,nested:"attributes",optionId:"required",value:String(t)})}})):null},ze=({input:e})=>{var t;const a=se();return"input"!==e.control.id?null:p.createElement("label",null,p.createElement("span",null,"Type:"),p.createElement("select",{name:"type",className:"value",value:(null==(t=e.nested("attributes","type"))?void 0:t.value)||"text",onChange:({target:{value:t}})=>a.dispatch({type:"UPSERT_OPTION",inputId:e.id,optionId:"type",nested:"attributes",value:t})},["text","number","email","tel","date"].map((e=>{return p.createElement("option",{key:e,value:e},(t=e).charAt(0).toUpperCase()+t.slice(1));var t}))))},je=({input:e})=>{const t=se();return e.data.choicesLayout?p.createElement("label",null,p.createElement("span",null,"Choices Layout:"),p.createElement("select",{value:e.data.choicesLayout,className:"value",onChange:({target:{value:a}})=>t.dispatch({type:"UPDATE_ELEMENT",elementId:e.id,patch:{choicesLayout:a}})},p.createElement("option",{value:"vertical"},"Vertical"),p.createElement("option",{value:"horizontal"},"Horizontal"),p.createElement("option",{value:"two_column"},"Two Column"),p.createElement("option",{value:"three_column"},"Three Column"))):null},$e=({input:e})=>{const t=se(),{data:a}=e,n=a=>t.dispatch({type:"UPDATE_ELEMENT",elementId:e.id,patch:a});return p.createElement(Oe,{className:"input"},p.createElement(we,null,"Edit ",e.control.name),p.createElement(Ce,null,p.createElement("label",null,p.createElement("span",null,"Label:"),p.createElement("input",{className:"value",value:a.label||"",onChange:({target:{value:e}})=>n({label:e})})),p.createElement("label",null,p.createElement("span",null,"Name:"),p.createElement("input",{className:"value",value:a.name||"",onChange:({target:{value:e}})=>n({name:e})})),p.createElement(ze,{input:e}),p.createElement(Ue,{input:e}),p.createElement("label",null,p.createElement("span",null,"Class:"),p.createElement("input",{className:"value",value:a.className||"",onChange:({target:{value:e}})=>n({className:e})})),p.createElement(je,{input:e}),p.createElement(Me,{input:e,label:"Options",nested:"options"}),p.createElement("fieldset",null,p.createElement("legend",null,"Other Class Names:"),p.createElement("label",null,p.createElement("span",null,"Wrapper:"),p.createElement("input",{className:"value",value:a.classNames.wrapper||"",onChange:({target:{value:e}})=>{n({classNames:{wrapper:e}})}})),p.createElement("label",null,p.createElement("span",null,"Label:"),p.createElement("input",{className:"value",value:a.classNames.label||"",onChange:({target:{value:e}})=>{n({classNames:{label:e}})}})),p.createElement("label",null,p.createElement("span",null,"Input:"),p.createElement("input",{className:"value",value:a.classNames.input||"",onChange:({target:{value:e}})=>{n({classNames:{input:e}})}}))),p.createElement(Me,{input:e,label:"Attributes",nested:"attributes",ignore:["required","type"]})))},Fe=({container:e})=>{const t=se(),{data:a}=e;return p.createElement(Oe,{className:"container"},p.createElement(we,null,"Edit ",e.control.name," container"),p.createElement("label",null,p.createElement("span",null,"Class:"),p.createElement("input",{className:"value",value:a.className||"",onChange:({target:{value:a}})=>{return n={className:a},t.dispatch({type:"UPDATE_ELEMENT",elementId:e.id,patch:n});var n}})))},qe=({txt:e,onChange:t})=>"heading"!==e.control.id?null:p.createElement("label",null,p.createElement("span",null,"Size:"),p.createElement("select",{value:e.data.tag,onChange:e=>t(e.target.value)},p.createElement("option",{value:"h1"},"Heading 1"),p.createElement("option",{value:"h2"},"Heading 2"),p.createElement("option",{value:"h3"},"Heading 3"),p.createElement("option",{value:"h4"},"Heading 4"),p.createElement("option",{value:"h5"},"Heading 5"),p.createElement("option",{value:"h6"},"Heading 6"))),Be=({control:e})=>{const t=se(),{data:a}=e,n=a=>t.dispatch({type:"UPDATE_ELEMENT",elementId:e.id,patch:a});return p.createElement(Oe,{className:"text"},p.createElement(we,null,"Edit text"),p.createElement("label",null,p.createElement("span",null,"Text:"),p.createElement("textarea",{id:e.id,value:a.text||"",onChange:({target:{value:e}})=>n({text:e})})),p.createElement(qe,{txt:e,onChange:e=>n({tag:e})}),p.createElement("label",null,p.createElement("span",null,"Class:"),p.createElement("input",{className:"value",value:a.className||"",onChange:({target:{value:e}})=>n({className:e})})))},We=({target:e})=>K(e)?p.createElement(Fe,{container:e}):Q(e)?p.createElement($e,{input:e}):Z(e)?p.createElement(Be,{control:e}):null,Xe=()=>{const e=(()=>{const e=oe();if(e.editingId)return ie(e.form,e.editingId)[0]})(),t=se(),a=u.exports.useRef(null);var n,r;return n=a,r=()=>{t.dispatch({type:"HIDE_EDIT"})},u.exports.useEffect((()=>{const e=e=>{n.current&&!n.current.contains(e.target)&&r(e)};return document.addEventListener("mousedown",e),()=>{document.removeEventListener("mousedown",e)}}),[n,r]),e?p.createElement("div",{ref:a,className:"edit-panel"},p.createElement(We,{target:e})):null},Je=()=>u.exports.createElement("div",{className:"sidebar"},u.exports.createElement(Re,null),u.exports.createElement(Xe,null)),Ye=({index:e,container:t})=>{const a=se(),[{isHovered:n},r]=R({accept:"control",collect:e=>({isHovered:e.isOver()}),drop:n=>{const{id:r,fromIndex:l,fromContainer:s}=n;a.dispatch({type:"ADD_ELEMENT",id:r,destIndex:e,containerId:t.id,fromIndex:l,fromContainerId:null==s?void 0:s.id})}});return{isHovered:n,dropRef:r}},Ge=e=>{const{isHovered:t,dropRef:a}=Ye(e);return u.exports.createElement("div",{ref:a,className:O("drop","horizontal",{"is-hovered":t})})},Ke=e=>{const{isHovered:t,dropRef:a}=Ye(e);return u.exports.createElement("div",{ref:a,className:O("drop","vertical","container-drop",{"is-hovered":t})})},Qe=({target:e,container:t,drag:a,displayEdit:n})=>{const r=se();return u.exports.createElement("div",{className:O("controls",{container:K(e)})},u.exports.createElement("span",null,e.control.name),u.exports.createElement("button",{className:"trash",onClick:a=>{a.stopPropagation(),r.dispatch({type:"DELETE_ELEMENT",elementId:e.id,containerId:t.id})}},u.exports.createElement(ye,null)),n&&u.exports.createElement("button",{onClick:()=>r.dispatch({type:"EDIT_ELEMENT",elementId:e.id})},u.exports.createElement(Ie,null)),a&&u.exports.createElement("button",{className:"move",ref:a},u.exports.createElement(ge,null)))},Ze=({index:e,input:t,container:a})=>{const[{opacity:n},r]=P({item:{id:t.id,fromIndex:e,fromContainer:a,type:"control"},collect:e=>({opacity:e.isDragging()?.4:1})}),l=se();return u.exports.createElement("div",{ref:r,style:{opacity:n},className:O("element-preview",t.control.id,{"is-editing":l.store.editingId===t.id}),onClick:()=>l.dispatch({type:"EDIT_ELEMENT",elementId:t.id})},u.exports.createElement(Qe,{displayEdit:!1,target:t,container:a}),u.exports.createElement("div",{className:"control-preview"},u.exports.createElement("span",{className:"label"},t.data.label),t.placeholder))},et=({index:e,control:t,container:a})=>{const n=se(),[{opacity:r},l]=P({item:{id:t.id,fromIndex:e,fromContainer:a,type:"control"},collect:e=>({opacity:e.isDragging()?.4:1})}),s=u.exports.createElement(t.data.tag,{},t.data.text);return u.exports.createElement("div",{style:{opacity:r},ref:l,onClick:()=>n.dispatch({type:"EDIT_ELEMENT",elementId:t.id}),className:O("element-preview",t.control.id,{"is-editing":n.store.editingId===t.id})},u.exports.createElement(Qe,{displayEdit:!0,target:t,container:a}),u.exports.createElement("div",{className:"control-preview"},s))},tt=({parent:e,container:t,index:a})=>{const[{opacity:n},r,l]=P({item:{id:t.id,fromIndex:a,fromContainer:e,type:"control"},collect:e=>({opacity:e.isDragging()?.4:1})}),s=t.isRow?Ge:Ke;return u.exports.createElement("div",{ref:l,style:{opacity:n},className:O("element-preview","container",`container-${t.direction}`,{empty:0===t.children.length})},u.exports.createElement(s,{container:t,index:0}),u.exports.createElement(Qe,{displayEdit:!0,target:t,container:e,drag:r}),t.children.map(((e,a)=>u.exports.createElement(u.exports.Fragment,{key:a},u.exports.createElement(at,{index:a,container:t,el:e}),u.exports.createElement(s,{container:t,index:a+1})))))},at=({el:e,index:t,container:a})=>K(e)?u.exports.createElement(tt,{parent:a,container:e,index:t}):Z(e)?u.exports.createElement(et,{control:e,container:a,index:t}):Q(e)?u.exports.createElement(Ze,{input:e,container:a,index:t}):null,nt=()=>{const{form:e}=oe(),[{isHovered:t},a]=R({accept:"control",collect:e=>({isHovered:e.isOver()}),canDrop:()=>!1});return u.exports.createElement("div",{ref:a,className:O("form-elements",{isHovered:t})},u.exports.createElement(Ge,{container:e,index:0}),e.children.map(((t,a)=>u.exports.createElement(u.exports.Fragment,{key:a},u.exports.createElement(at,{index:a,container:e,el:t}),u.exports.createElement(Ge,{container:e,index:a+1})))))},rt=()=>u.exports.createElement("div",{className:"form-panel"},u.exports.createElement(nt,null)),lt=({className:e,formRef:t,defaultValue:a})=>{const n=ue(a);return u.exports.useEffect((()=>(t&&(t.current={get form(){return n.store.form},clear(){n.dispatch({type:"CLEAR"})},update(e){n.dispatch({type:"REPLACE_FORM",form:e,controls:n.store.controls})}}),()=>{t&&(t.current=null)})),[t,n.store.form]),u.exports.createElement(_,{backend:k},u.exports.createElement(le.Provider,{value:n},u.exports.createElement("div",{className:O("formial-editor",e)},u.exports.createElement(rt,null),u.exports.createElement(Je,null))))};class st{constructor(e,t){this.data=e,this.options=t}createElement(){return document.createElement("div")}get columnSmWidth(){return this.options.parent instanceof ct&&this.options.parent.isBSRow?Math.round(12/this.options.parent.children.length):0}render(e,t=!1){return this.el||(this.el=this.createElement()),this.setAttributes({"data-control":this.data.type,"data-id":this.data.id,class:O(this.data.className,{[`col-sm-${this.columnSmWidth}`]:0!==this.columnSmWidth})}),t||this.setDataAttributes(),this.el.parentElement!==e&&e.appendChild(this.el),this}setDataAttributes(e=this.el){e&&this.data.attributes&&this.data.attributes.forEach((t=>{t.id&&e.setAttribute(t.id,String(t.value))}))}setAttributes(e,t=this.el){t&&e&&Object.keys(e).forEach((a=>{a&&t.setAttribute(a,String(e[a]))}))}}class ot extends st{constructor(e,t){super(e,t),this.data=e}createElement(){return document.createElement(this.data.tag)}render(e){return super.render(e),this.el.innerText=this.data.text,this}}class it extends st{constructor(e,t){super(e,t),this.data=e}render(e){if(super.render(e,!0),this.setAttributes({"data-type":this.data.control,class:O(this.data.className,{[`col-sm-${this.columnSmWidth}`]:0!==this.columnSmWidth})}),!this.input){const e=this[`_${this.data.control}`];if(e){const t=e.apply(this);this.input=t,this.el.appendChild(this.input)}}return this}get optionPairs(){const{options:e}=this.data;return e?e.map((e=>[e.id,e.value])):[]}createInput(e){const t=document.createElement("div");t.className=this.data.classNames.wrapper;const a={};"INPUT"==this.data.type&&(a.type="text");const n=this.data.attributes||[];for(let s=0;s<n.length;s++)a[n[s].id]=n[s].value;const r=document.createElement(e);this.setDataAttributes(),this.setAttributes(o({name:this.data.name,id:this.data.id,class:"form-control",placeholder:this.data.label},a),r),t.appendChild(r);const l=document.createElement("label");if(l.innerText=this.data.label,this.setAttributes({for:this.data.id},l),"true"===String(a.required)){const e=document.createElement("span");e.innerText="✱",this.setAttributes({class:"required-indicator"},e),l.appendChild(e)}return t.appendChild(l),t}_textarea(){return this.createInput("textarea")}_input(){return this.createInput("input")}renderOptions(e){const t=document.createElement("div");this.setDataAttributes(t),t.className=this.data.classNames.wrapper;const a=document.createElement("div");a.innerText=this.data.label,t.appendChild(a);const n=this.data.choicesLayout,r=Boolean(!n||"vertical"==n),l=document.createElement("div");return l.className=O("d-flex","flex-wrap",{"flex-column":r,"ml-2":!r}),this.optionPairs.forEach((([t,a])=>{const{id:s,inputType:o,name:i,value:c,label:d}=e(t,a),u=`${s}-${this.data.id}`,m=document.createElement("label");this.setAttributes({class:O("form-check",{"ml-2":r,"pr-2":!r,"col-4":"three_column"===n,"col-6":"two_column"===n})},m);const p=document.createElement("input");this.setAttributes({class:"form-check-input","data-id":s,type:o,name:i,value:c,id:u},p),m.appendChild(p);const h=document.createElement("span");this.setAttributes({className:"form-check-label"},h),h.innerText=d,m.appendChild(h),l.appendChild(m)})),t.appendChild(l),t}_radio(){return this.renderOptions(((e,t)=>({inputType:"radio",name:this.data.name,id:e,value:t,label:t})))}_checkbox(){return this.renderOptions(((e,t)=>({inputType:"checkbox",name:e,value:t,id:e,label:t})))}_select(){const e=document.createElement("div");e.className="form-floating";const t=document.createElement("select");this.setAttributes({name:this.data.name,class:"form-select",id:this.data.id},t),this.optionPairs.forEach((([e,a])=>{const n=document.createElement("option");this.setAttributes({value:e},n),n.innerText=a,t.appendChild(n)})),e.appendChild(t);const a=document.createElement("label");return this.setAttributes({for:this.data.id},a),a.innerText=this.data.label,e.appendChild(a),e}}class ct extends st{constructor(e,t){super(e,t),this.data=e,this.children=e.children.map((e=>dt(e,{parent:this}))).filter(Boolean)}get isBSRow(){return"column"===this.data.direction}render(e){var t;return super.render(e),this.el.className=O(null==(t=this.el)?void 0:t.className,{row:this.isBSRow,"d-flex flex-column":!this.isBSRow,"formial-form":"FORM"==this.data.type}),this.children.forEach((e=>e.render(this.el))),this}}const dt=(e,t={})=>F(e)?new ot(e,t):$(e)||q(e)?new ct(e,t):j(e)?new it(e,t):new st(e,t);const ut={id:"48be90c9-3a9a-4fc6-9626-242a30febc05",type:"FORM",control:"col",direction:"row",children:[{id:"d69b7300-312a-4b8b-9da9-b616e987b8b4",type:"TEXT",control:"heading",tag:"h3",text:"Hello World",className:""},{id:"9e2e85b9-b24e-4d51-b126-a7f5c579039a",type:"TEXT",control:"para",name:"para-9368",tag:"p",text:"Please, tell us a bit about yourself",className:""},{id:"91a1e96a-e603-4dd7-92fd-14b4090c4754",type:"CONTAINER",control:"col",name:"col-7258",direction:"column",children:[{id:"09f04ad7-b72b-481d-90c4-535bb5b1b632",type:"CONTAINER",control:"row",name:"row-1462",direction:"row",children:[{id:"e6b074bf-4c4d-447e-890a-bb52bc24aece",type:"INPUT",control:"input",name:"name",label:"Your name",className:"mb-2",classNames:{wrapper:"form-floating",label:"",input:"form-control"},attributes:[{id:"type",value:"text"},{id:"required",value:"true"}]},{id:"051dc23f-d3b6-4783-a45d-54f6f4801ba2",type:"INPUT",control:"input",name:"email",label:"Email",className:"mb-2",classNames:{wrapper:"form-floating",label:"",input:"form-control"},attributes:[{id:"required",value:"true"},{id:"type",value:"email"}]},{id:"11fa0234-0c92-4a2c-864e-668cd8580fd8",type:"INPUT",control:"textarea",name:"address",label:"Address",className:"mb-2",classNames:{wrapper:"form-floating",label:"",input:"form-control"},attributes:[]}],className:"",attributes:[]},{id:"05df9d75-a59f-4f44-99bb-c37bd17db17d",type:"CONTAINER",control:"row",name:"row-10995",direction:"row",children:[{id:"1d1b3a3d-88b0-4ca2-979b-4fb231c33f9a",type:"INPUT",control:"checkbox",name:"foods",options:[{id:"steak",value:"Steak"},{id:"tomatoe",value:"Tomato"},{id:"pinapple",value:"Pineapple"},{id:"spinach",value:"Spinach"},{id:"candy",value:"Candy"},{id:"broccoli ",value:"Broccoli"}],choicesLayout:"vertical",label:"Which foods do you like?",className:"mb-2",classNames:{wrapper:"form-control",label:"",input:"form-control"},attributes:[]},{id:"7a16f198-cac0-440e-93a8-3c0bc153184e",type:"INPUT",control:"radio",name:"cats",options:[{id:"1",value:"One"},{id:"2",value:"Two"},{id:"3",value:"Three"}],choicesLayout:"vertical",label:"How many Cats?",className:"mb-2",classNames:{wrapper:"form-control",label:"",input:"form-control"},attributes:[]},{id:"b8a55c2a-6044-4672-a384-74be779b8f95",type:"INPUT",control:"select",name:"number",options:[{id:"2",value:"2"},{id:"1",value:"one"},{id:"5",value:"5"},{id:"42",value:"forty two"}],label:"Pick a number",className:"mb-2",classNames:{wrapper:"form-floating",label:"",input:"form-control"},attributes:[]}],className:"",attributes:[]}],className:"",attributes:[]}],className:"formial-form",attributes:[]},mt=()=>{const e=u.exports.useRef(null),t=u.exports.useRef(null);return u.exports.createElement("div",{id:"example-builder"},u.exports.createElement("h3",null,"Formial Demo"),u.exports.createElement("p",null,"This is an example of Formial editing and rendering forms.  The source code for this demo can be viewed in ",u.exports.createElement("a",{href:"https://github.com/nathanstitt/formial/blob/main/demo/demo.tsx"},"demo/demo.tsx"),"."),u.exports.createElement(lt,{formRef:e,defaultValue:ut}),u.exports.createElement("hr",null),u.exports.createElement("div",null,u.exports.createElement("button",{onClick:()=>{if(!e.current)return;const a=e.current.form.serialize();console.log(JSON.stringify(a)),((e,t)=>{e.innerHTML="";const a=dt(t);a&&a.render(e)})(t.current,a),e.current.clear()}},"Render")),u.exports.createElement("hr",null),u.exports.createElement("div",{className:"mb-4",ref:t}))};A.exports.render(u.exports.createElement(mt,null),document.getElementById("app-root"));