"use strict";(self.webpackChunkcedri_ugv_dashboard=self.webpackChunkcedri_ugv_dashboard||[]).push([[819],{75819:function(n,t,e){e.r(t);var i=e(64164),a=e(28308),r=e(8200),o=e(46417),s=(0,i.ZP)("iframe")((function(){return{height:"calc(100vh - 210px)",border:"none"}}));t.default=function(){return(0,o.jsx)(a.Z,{children:(0,o.jsx)(r.Z,{title:"Ant Icons",children:(0,o.jsx)(s,{title:"Ant Icon",width:"100%",src:"https://ant.design/components/icon/"})})})}},28308:function(n,t,e){e.d(t,{Z:function(){return B}});var i=e(29439),a=e(47313),r=e(30168),o=e(63366),s=e(87462),h=e(83061),d=e(30686),c=e(21921);function l(n){return String(n).match(/[\d.\-+]*\s*(.*)/)[1]||""}function u(n){return parseFloat(n)}var m=e(17551),v=e(64164),f=e(11236),g=e(32298);function p(n){return(0,g.Z)("MuiSkeleton",n)}(0,e(77430).Z)("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);var x,w,b,Z,j,k,C,y,S=e(46417),R=["animation","className","component","height","style","variant","width"],P=(0,d.F4)(j||(j=x||(x=(0,r.Z)(["\n  0% {\n    opacity: 1;\n  }\n\n  50% {\n    opacity: 0.4;\n  }\n\n  100% {\n    opacity: 1;\n  }\n"])))),A=(0,d.F4)(k||(k=w||(w=(0,r.Z)(["\n  0% {\n    transform: translateX(-100%);\n  }\n\n  50% {\n    /* +0.5s of delay between each loop */\n    transform: translateX(100%);\n  }\n\n  100% {\n    transform: translateX(100%);\n  }\n"])))),F=(0,v.ZP)("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:function(n,t){var e=n.ownerState;return[t.root,t[e.variant],!1!==e.animation&&t[e.animation],e.hasChildren&&t.withChildren,e.hasChildren&&!e.width&&t.fitContent,e.hasChildren&&!e.height&&t.heightAuto]}})((function(n){var t=n.theme,e=n.ownerState,i=l(t.shape.borderRadius)||"px",a=u(t.shape.borderRadius);return(0,s.Z)({display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:(0,m.Fq)(t.palette.text.primary,"light"===t.palette.mode?.11:.13),height:"1.2em"},"text"===e.variant&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:"".concat(a).concat(i,"/").concat(Math.round(a/.6*10)/10).concat(i),"&:empty:before":{content:'"\\00a0"'}},"circular"===e.variant&&{borderRadius:"50%"},"rounded"===e.variant&&{borderRadius:(t.vars||t).shape.borderRadius},e.hasChildren&&{"& > *":{visibility:"hidden"}},e.hasChildren&&!e.width&&{maxWidth:"fit-content"},e.hasChildren&&!e.height&&{height:"auto"})}),(function(n){return"pulse"===n.ownerState.animation&&(0,d.iv)(C||(C=b||(b=(0,r.Z)(["\n      animation: "," 1.5s ease-in-out 0.5s infinite;\n    "]))),P)}),(function(n){var t=n.ownerState,e=n.theme;return"wave"===t.animation&&(0,d.iv)(y||(y=Z||(Z=(0,r.Z)(["\n      position: relative;\n      overflow: hidden;\n\n      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */\n      -webkit-mask-image: -webkit-radial-gradient(white, black);\n\n      &::after {\n        animation: "," 1.6s linear 0.5s infinite;\n        background: linear-gradient(\n          90deg,\n          transparent,\n          ",",\n          transparent\n        );\n        content: '';\n        position: absolute;\n        transform: translateX(-100%); /* Avoid flash during server-side hydration */\n        bottom: 0;\n        left: 0;\n        right: 0;\n        top: 0;\n      }\n    "]))),A,(e.vars||e).palette.action.hover)})),M=a.forwardRef((function(n,t){var e=(0,f.Z)({props:n,name:"MuiSkeleton"}),i=e.animation,a=void 0===i?"pulse":i,r=e.className,d=e.component,l=void 0===d?"span":d,u=e.height,m=e.style,v=e.variant,g=void 0===v?"text":v,x=e.width,w=(0,o.Z)(e,R),b=(0,s.Z)({},e,{animation:a,component:l,variant:g,hasChildren:Boolean(w.children)}),Z=function(n){var t=n.classes,e=n.variant,i=n.animation,a=n.hasChildren,r=n.width,o=n.height,s={root:["root",e,i,a&&"withChildren",a&&!r&&"fitContent",a&&!o&&"heightAuto"]};return(0,c.Z)(s,p,t)}(b);return(0,S.jsx)(F,(0,s.Z)({as:l,ref:t,className:(0,h.Z)(Z.root,r),ownerState:b},w,{style:(0,s.Z)({width:x,height:u},m)}))})),_=e(62463),X=e(82937),N=e(8200),B=function(n){var t=n.children,e=(0,a.useState)(!0),r=(0,i.Z)(e,2),o=r[0],s=r[1];(0,a.useEffect)((function(){s(!1)}),[]);var h=(0,S.jsx)(N.Z,{title:(0,S.jsx)(M,{sx:{width:{xs:120,md:180}}}),secondary:(0,S.jsx)(M,{animation:"wave",variant:"circular",width:24,height:24}),children:(0,S.jsxs)(_.Z,{spacing:1,children:[(0,S.jsx)(M,{}),(0,S.jsx)(M,{sx:{height:64},animation:"wave",variant:"rectangular"}),(0,S.jsx)(M,{}),(0,S.jsx)(M,{})]})});return(0,S.jsxs)(S.Fragment,{children:[o&&(0,S.jsxs)(X.ZP,{container:!0,spacing:3,children:[(0,S.jsx)(X.ZP,{item:!0,xs:12,md:6,children:h}),(0,S.jsx)(X.ZP,{item:!0,xs:12,md:6,children:h}),(0,S.jsx)(X.ZP,{item:!0,xs:12,md:6,children:h}),(0,S.jsx)(X.ZP,{item:!0,xs:12,md:6,children:h})]}),!o&&t]})}}}]);