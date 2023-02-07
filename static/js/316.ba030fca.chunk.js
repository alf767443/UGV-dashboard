"use strict";(self.webpackChunkcedri_ugv_dashboard=self.webpackChunkcedri_ugv_dashboard||[]).push([[316],{5391:function(A,t){t.Z={typography:{align:"left",variant:"h3",color:"textSecondary",xs:12,sm:12,md:12,lg:12,xl:12},stack:{spacing:2,xs:1,sm:1,md:1,lg:1,xl:1,sx:{mt:1,mr:1,ml:1,mb:0}},box:{xs:1,sm:1,md:1,lg:1,xl:1,sx:{mt:1,mr:0,ml:0,mb:0,gap:1},height:"100%"},grid:{main:{direction:"row",justifyContent:"center",alignItems:"stretch",spacing:0},item:{justifyContent:"center",alignItems:"stretch",xs:12,sm:12,md:12,lg:6,xl:6,spacing:0}}}},55159:function(A,t,g){g.d(t,{Z:function(){return u}});var e=g(1413),i=g(93433),I=g(15671),n=g(43144),B=g(60136),a=g(27277),s=g(47313),E=g(36209),r=g(9659),C=g(8515),o=g(44090),l=g(16157),w=g(62463),c=g(42669),Q=g(8200),m=g(46417),h=JSON.stringify({dataSource:"CeDRI",database:"CeDRI_UGV_datalake",collection:"Position_Odometry",pipeline:[{$project:{dateTime:1,x:"$pose.pose.position.x",y:"$pose.pose.position.y"}},{$sort:{dateTime:-1}},{$limit:1}]}),d=JSON.stringify({dataSource:"CeDRI",database:"CeDRI_UGV_datalake",collection:"Position_Odometry",pipeline:[{$project:{dateTime:1,x:"$pose.pose.position.x",y:"$pose.pose.position.y"}},{$sort:{dateTime:-1}},{$limit:1},{$set:{count:0}}]}),u=function(A){(0,B.Z)(g,A);var t=(0,a.Z)(g);function g(A){var e;return(0,I.Z)(this,g),(e=t.call(this,A)).componentDidMount=function(){e.refreshMap(),e.refreshPos(),e.timer()},e.componentWillUnmount=function(){clearInterval(e.timer)},e.timer=function(){setInterval((function(){e.canUpdate()}),1e3)},e.config={type:"density",xField:"x",yField:"y",xAxis:{min:-3520,minLimit:-3520,max:3520,maxLimit:3520,label:null},yAxis:{min:-2960,minLimit:-2960,max:2960,maxLimit:2960,label:null},colorField:"count",limitInPlot:!0,animation:!1,color:"#F51D27-#FA541C-#FF8C12-#FFC838-#FAFFA8-#80FF73-#12CCCC-#1890FF-#6E32C2",annotations:[{type:"image",start:[-3520,2960],end:[3520,-2960],src:r}],tooltip:{showTitle:!1,formatter:function(A){return{name:"X:".concat(Math.round(A.x),"  Y:").concat(Math.round(A.y))}}}},e.state={data:[{x:0,y:0,count:0}],last:{x:0,y:0,yaw:2},ticks:-1,quality:0},e}return(0,n.Z)(g,[{key:"canUpdate",value:function(){JSON.parse(window.localStorage.getItem("fromLocal"))||this.state.ticks<=0?(this.setState({ticks:10}),this.refreshPos()):JSON.parse(window.localStorage.getItem("fromLocal"))||this.setState({ticks:this.state.ticks-1})}},{key:"refreshPos",value:function(){var A=this;fetch((0,C.H)(),(0,C.w)(h)).then((function(A){return A.json()})).then((function(t){A.setState({last:t[0]})})).catch((function(A){console.log(A)}))}},{key:"refreshMap",value:function(){var A=this;fetch((0,C.H)(),(0,C.w)(d)).then((function(A){return A.json()})).then((function(t){A.setState({data:t})})).catch((function(A){console.log(A)}))}},{key:"render",value:function(){var A=[].concat((0,i.Z)(this.config.annotations),[{type:"dataMarker",position:[this.state.last.x,this.state.last.y],rotate:this.state.last.yaw},{type:"text",content:"(".concat(Math.round(this.state.last.x),",").concat(Math.round(this.state.last.y),")"),style:{fontSize:22,fill:"#fff",textAlign:"left"},position:["1%","3%"]}]);return(0,m.jsx)(Q.Z,(0,e.Z)((0,e.Z)({},o.Z.maincard),{},{children:(0,m.jsx)(l.Z,(0,e.Z)((0,e.Z)({},o.Z.box),{},{children:(0,m.jsxs)(w.Z,(0,e.Z)((0,e.Z)({},o.Z.stack),{},{children:[(0,m.jsx)(c.Z,(0,e.Z)((0,e.Z)({},o.Z.typography.title),{},{children:"UGV position"})),(0,m.jsx)(E.Z,(0,e.Z)((0,e.Z)((0,e.Z)({},this.config),o.Z.map),{},{data:this.state.data,annotations:A}))]}))}))}))}}]),g}(s.Component)},44090:function(A,t,g){var e=g(63509),i={bullet:{simple:{measureField:"measures",rangeField:"ranges",targetField:"value",xField:"title",size:{range:30,measure:0,target:30},height:50,width:300,xAxis:{line:null},yAxis:!1,label:{measure:!1,target:!0},animation:!1},dual:{measureField:"measures",rangeField:"ranges",targetField:"value",xField:"title",size:{range:30,measure:0,target:30},height:178,width:90,xAxis:{line:null},yAxis:!1,label:{measure:!1,target:!0},layout:"vertical",animation:!1},stack:{direction:"row",divider:(0,g(46417).jsx)(e.Z,{orientation:"vertical",flexItem:!0}),justifyContent:"space-evenly",alignItems:"center",spacing:0}},plot:{smooth:!0,animation:!1,style:{width:"100%",height:200}},typography:{title:{align:"center",variant:"h5",color:"textSecondary"},subtitle:{align:"center",variant:"h6",color:"textSecondary"}},stack:{direction:"column",alignItems:"center",justifyContent:"space-evenly",spacing:1,sx:{mt:1,mr:1,ml:1,mb:1}},maincard:{xs:1,sm:1,md:1,lg:1,xl:1,sx:{mt:1,mr:1,ml:1,mb:1},height:"100%",content:!1},box:{xs:1,sm:1,md:1,lg:1,xl:1,sx:{mt:1,mr:1,ml:1,mb:1,display:"grid",gridAutoRows:"100%",gap:1},height:"100%"},map:{style:{width:"100%",height:450}}};t.Z=i},57316:function(A,t,g){g.r(t),g.d(t,{default:function(){return G}});var e=g(1413),i=g(82937),I=g(15671),n=g(43144),B=g(60136),a=g(27277),s=g(47313),E=g(16157),r=g(62463),C=g(42669),o=g(8200),l=g(26899),w=g(8515),c=g(46417),Q=JSON.stringify({dataSource:"CeDRI",database:"CeDRI_UGV_datalake",collection:"Position_Odometry",pipeline:[{$project:{_id:0}},{$sort:{dateTime:-1}},{$limit:1e3}]}),m=[{title:"Time",dataIndex:"dateTime",key:"dateTime",sorter:{compare:function(A,t){return A.dateTime-t.dateTime},multiple:1},defaultSortOrder:"descend"},{title:"Pose",align:"center",children:[{title:"X",align:"center",dataIndex:["pose","pose","position","x"],key:"x"},{title:"Y",align:"center",dataIndex:["pose","pose","position","y"],key:"y"},{title:"Orientation",align:"center",dataIndex:["pose","pose","orientation","yaw"],key:"current_right"}]},{title:"Twist",align:"center",children:[{title:"Linear",align:"center",dataIndex:["twist","twist","linear","x"],key:"linear"},{title:"Angular",align:"center",dataIndex:["twist","twist","linear","z"],key:"ang"}]}],h=function(A){(0,B.Z)(g,A);var t=(0,a.Z)(g);function g(A){var e;return(0,I.Z)(this,g),(e=t.call(this,A)).componentDidMount=function(){e.refreshList()},e.state={data:[],ticks:-1},e}return(0,n.Z)(g,[{key:"refreshList",value:function(){var A=this;fetch((0,w.H)(),(0,w.w)(Q)).then((function(A){return A.json()})).then((function(t){A.setState({data:t})})).catch((function(A){console.log(A)}))}},{key:"render",value:function(){return(0,c.jsx)(l.Z,{columns:m,dataSource:this.state.data,pagination:this.state.pagination,loading:this.state.loading,onChange:this.handleTableChange,sx:this.props.sx})}}]),g}(s.Component),d=g(40040),u=function(A){(0,B.Z)(g,A);var t=(0,a.Z)(g);function g(){return(0,I.Z)(this,g),t.apply(this,arguments)}return(0,n.Z)(g,[{key:"render",value:function(){return(0,c.jsx)(o.Z,{sx:d.Z,content:!1,children:(0,c.jsxs)(E.Z,{sx:{p:3,pb:0},children:[(0,c.jsx)(r.Z,{spacing:2,children:(0,c.jsx)(C.Z,{variant:"h3",color:"textSecondary",children:"Global position"})}),(0,c.jsx)(h,{})]})})}}]),g}(s.Component),D=g(56448),R=g(55159),M=g(5391),S=function(A){(0,B.Z)(g,A);var t=(0,a.Z)(g);function g(A){var n;return(0,I.Z)(this,g),(n=t.call(this,A)).hadleChange=function(A,t){n.setState({page:t}),n.componentDidMount()},n.componentDidMount=function(){n.graphs()},n.graphs=function(){if(1===n.state.page)return(0,c.jsx)(i.ZP,(0,e.Z)((0,e.Z)({container:!0},M.Z.grid.main),{},{children:(0,c.jsx)(i.ZP,(0,e.Z)((0,e.Z)({item:!0},M.Z.grid.item),{},{children:(0,c.jsx)(R.Z,{})}))}))},n.state={page:1},n}return(0,n.Z)(g,[{key:"render",value:function(){return(0,c.jsx)(o.Z,(0,e.Z)((0,e.Z)({},M.Z.box),{},{children:(0,c.jsxs)(r.Z,(0,e.Z)((0,e.Z)({},M.Z.stack),{},{children:[(0,c.jsx)(C.Z,(0,e.Z)((0,e.Z)({},M.Z.typography),{},{children:"Position plots"})),this.graphs(),(0,c.jsx)(D.Z,{count:1,defaultPage:1,siblingCount:0,page:this.state.page,onChange:this.hadleChange})]}))}))}}]),g}(s.Component),Y=g(88461),G=function(){return(0,c.jsxs)(i.ZP,(0,e.Z)((0,e.Z)({container:!0},Y.Z.grid.main),{},{children:[(0,c.jsx)(i.ZP,(0,e.Z)((0,e.Z)({item:!0},Y.Z.grid.item),{},{children:(0,c.jsx)(S,{})})),(0,c.jsx)(i.ZP,(0,e.Z)((0,e.Z)({item:!0},Y.Z.grid.item),{},{children:(0,c.jsx)(u,{})}))]}))}},88461:function(A,t){t.Z={stack:{spacing:0,direction:"column",alignItems:"center",xs:1,sm:1,md:1,lg:1,xl:1,sx:{mt:1,mr:1,ml:1,mb:1}},box:{xs:1,sm:1,md:1,lg:1,xl:1,sx:{mt:1,mr:1,ml:1,mb:1,display:"grid",gridAutoRows:"100%",gap:1},height:"100%"},grid:{main:{direction:"row",justifyContent:"center",alignItems:"stretch",spacing:2},item:{justifyContent:"center",alignItems:"stretch",xs:12,sm:12,md:12,lg:12,xl:12,spacing:0,sx:{mt:0,mr:1,ml:1,mb:0}}}}},40040:function(A,t){t.Z={width:1,height:1,minHeight:1,maxHeight:1,minWidth:1,maxWidth:1,mt:1,gap:2}},36209:function(A,t,g){var e=g(47313),i=g(78315),I=g(95436),n=g(96543),B=g(89755),a=g(91372),s=function(A,t){var g={};for(var e in A)Object.prototype.hasOwnProperty.call(A,e)&&t.indexOf(e)<0&&(g[e]=A[e]);if(null!=A&&"function"===typeof Object.getOwnPropertySymbols){var i=0;for(e=Object.getOwnPropertySymbols(A);i<e.length;i++)t.indexOf(e[i])<0&&Object.prototype.propertyIsEnumerable.call(A,e[i])&&(g[e[i]]=A[e[i]])}return g},E=(0,e.forwardRef)((function(A,t){var g=A.chartRef,E=A.style,r=void 0===E?{height:"inherit"}:E,C=A.className,o=A.loading,l=A.loadingTemplate,w=A.errorTemplate,c=s(A,["chartRef","style","className","loading","loadingTemplate","errorTemplate"]),Q=(0,I.Z)(i.Heatmap,c),m=Q.chart,h=Q.container;return(0,e.useEffect)((function(){(0,n.J)(g,m.current)}),[m.current]),(0,e.useImperativeHandle)(t,(function(){return{getChart:function(){return m.current}}})),e.createElement(B.Z,{errorTemplate:w},o&&e.createElement(a.Z,{loadingTemplate:l,theme:A.theme}),e.createElement("div",{className:C,style:r,ref:h}))}));t.Z=E},9659:function(A){A.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABYAAAASgCAAAAABk4bNwAAAABGdBTUEAALGPC/xhBQAAAAJiS0dEAP+Hj8y/AAAAB3RJTUUH5wEYCSswMCAhEAAAAAFvck5UAc+id5oAAAA1dEVYdGNvbW1lbnQAIENyZWF0ZWQgYnkgR0lNUCB2ZXJzaW9uIDIuMTAuMTggUE5NIHBsdWctaW4K6LhXEQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMy0wMS0yNFQwOTo0Mzo0NyswMDowMH+dZbcAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjMtMDEtMjRUMDk6NDM6NDYrMDA6MDCot9a/AAAAWmVYSWZNTQAqAAAACAAFARIAAwAAAAEAAQAAARoABQAAAAEAAABKARsABQAAAAEAAABSASgAAwAAAAEAAgAAAhMAAwAAAAEAAQAAAAAAAAAAAEgAAAABAAAASAAAAAEfUvc0AAAZ80lEQVR42u3dC5bT1hZFUfe/b3SpxntFfTB/C1NZ2mbOjBBCSCF8rlduZFm+fAIgcakPAOBfJcAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBJh9T09P9SHAnxBgVl2+7a4Ms0aAGXW5XJ7+H+H//+Xy/P03H/Mr/UD9++cRWEaMuvxnXRRgPoplxKjnMxDf+4gwXi7/za/Dv8cyYpQAs88yYpQAs88yYpQAs88yYtSPA/wRl6IJMB/FMmLUh+6Av8r4kwDzQSwjRv0kwD/YAX/3Q7/fLL9+sdfvCTAfxDJi1M8C/PzH57dnvP31XgLMh7GMGPWzUxAfQYD5GJYRo37yItzPXpv7ywSYv8EyYtR/VFoB5gNZRowSYPZZRowSYPZZRowSYPZZRowSYPZZRowSYPZZRowSYPZZRoxqA6zA/A1WEZsuAsw+q4hNAswDsIrYJMA8AKuITQLMA7CK2PRf3XVHgPlAVhGb7IB5AFYRm+yAeQBWEZvsgHkAVhGbBJgHYBWxySkIHoBVxKZ+ByzBn57H8PInf8ZDx6YTBLh+CP6zR/rXBPgOHjpG5QF+Poinz58C+vy5yZe3v3k603Pqy3E+/wfr8n68Lwf6tz4y+nOE33LMER4vNvU74KfPf3yO7+WlwZfXH7n63lvtLq+f1/z6k5+evvrBl4y9RPL957/85fL2T19/pddvYl8ehe9KXi+MLR4uzugtVu8leuvYp8vTl4C1AV7xwY/C09t/EV5/qF46WwSYu11+9qS72g59PlN4+fT7M4rnCMsdMX7/+5d/VB/bR//On9627m/q1bhF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wAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwACR/wFivDbokXRo8AAAAABJRU5ErkJggg=="}}]);