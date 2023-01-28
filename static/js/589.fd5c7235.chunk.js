"use strict";(self.webpackChunkcedri_ugv_dashboard=self.webpackChunkcedri_ugv_dashboard||[]).push([[589],{2122:function(t,A,e){e.d(A,{Z:function(){return d}});var n=e(1413),i=e(15671),a=e(43144),r=e(60136),s=e(27277),g=e(47313),o=e(90722),c=e(8515),I=e(8200),l=e(44090),B=e(16157),E=e(62463),u=e(42669),C=e(46417),f=JSON.stringify({dataSource:"CeDRI",database:"CeDRI_UGV_buffer",collection:"Battery_Data",pipeline:[{$project:{dateTime:{$dateTrunc:{date:"$dateTime",unit:"minute"}},current:{$cond:[{$eq:["NaN","$current"]},null,"$current"]}}},{$densify:{field:"dateTime",range:{step:1,unit:"minute",bounds:"full"}}},{$group:{_id:"$dateTime",current:{$avg:"$current"}}},{$sort:{_id:-1}},{$limit:100}]}),d=function(t){(0,r.Z)(e,t);var A=(0,s.Z)(e);function e(t){var n;return(0,i.Z)(this,e),(n=A.call(this,t)).componentDidMount=function(){n.refreshList(),n.timer()},n.componentWillUnmount=function(){clearInterval(n.timer)},n.timer=function(){setInterval((function(){n.canUpdate()}),1e3)},n.config={padding:"auto",xField:"_id",yField:"current",xAxis:{tickCount:5,type:"time",mask:"DD/MMM/YY HH:mm",title:{text:"Time"}},yAxis:{tickCount:10,title:{text:"Battery current [A]"}},tooltip:{formatter:function(t){return null!=t.current?{name:"Current",value:t.current.toFixed(1)+" A"}:{}}},smooth:!0},n.state={data:[],ticks:-1},n}return(0,a.Z)(e,[{key:"canUpdate",value:function(){JSON.parse(window.localStorage.getItem("fromLocal"))||this.state.ticks<=0?(this.setState({ticks:10}),this.refreshList()):JSON.parse(window.localStorage.getItem("fromLocal"))||this.setState({ticks:this.state.ticks-1})}},{key:"refreshList",value:function(){var t=this;fetch((0,c.H)(),(0,c.w)(f)).then((function(t){return t.json()})).then((function(A){t.setState({data:A})})).catch((function(t){console.log(t)}))}},{key:"render",value:function(){return(0,C.jsx)(I.Z,{sx:l.Z.maincard.sx,content:l.Z.maincard.content,children:(0,C.jsx)(B.Z,{sx:l.Z.box.sx,children:(0,C.jsxs)(E.Z,{spacing:l.Z.stack.spacing,direction:l.Z.stack.direction,alignItems:l.Z.stack.alignItems,children:[(0,C.jsx)(u.Z,{variant:l.Z.typography.title.variant,color:l.Z.typography.title.color,children:"Battery current by time"}),(0,C.jsx)(o.Z,(0,n.Z)((0,n.Z)({},this.config),{},{data:this.state.data},l.Z.graph.medium))]})})})}}]),e}(g.Component)},88674:function(t,A,e){e.d(A,{Z:function(){return S}});var n=e(44090),i=e(1413),a=e(15671),r=e(43144),s=e(60136),g=e(27277),o=e(47313),c=e(20061),I=e(8515),l=e(46417),B=JSON.stringify({dataSource:"CeDRI",database:"CeDRI_UGV_buffer",collection:"Battery_Data",pipeline:[{$project:{dateTime:1,percentage:1}},{$sort:{dateTime:-1}},{$limit:1}]}),E=function(t){(0,s.Z)(e,t);var A=(0,g.Z)(e);function e(t){var n;return(0,a.Z)(this,e),(n=A.call(this,t)).componentDidMount=function(){n.refreshList(),n.timer()},n.componentWillUnmount=function(){clearInterval(n.timer)},n.timer=function(){setInterval((function(){n.canUpdate()}),1e3)},n.config={measureField:"measures",rangeField:"ranges",targetField:"value",xField:"title",color:{range:["#FF7772","#FFBC6D","#F5F16E","#BAFF7D","#82FF74"],measure:"#5B8FF9",target:"#39a3f4"}},n.data=function(){return[{title:"Percentage",ranges:[20,40,60,80,100],measures:[0],value:Math.round(100*n.state.data.percentage)}]},n.state={data:[],ticks:-1},n}return(0,r.Z)(e,[{key:"canUpdate",value:function(){JSON.parse(window.localStorage.getItem("fromLocal"))||this.state.ticks<=0?(this.setState({ticks:10}),this.refreshList()):JSON.parse(window.localStorage.getItem("fromLocal"))||this.setState({ticks:this.state.ticks-1})}},{key:"refreshList",value:function(){var t=this;fetch((0,I.H)(),(0,I.w)(B)).then((function(t){return t.json()})).then((function(A){t.setState({data:A[0]})})).catch((function(t){console.log(t)}))}},{key:"render",value:function(){return(0,l.jsx)(c.Z,(0,i.Z)((0,i.Z)({},this.config),{},{data:this.data()},n.Z.bullet.simple))}}]),e}(o.Component),u=JSON.stringify({dataSource:"CeDRI",database:"CeDRI_UGV_buffer",collection:"Battery_Data",pipeline:[{$project:{dateTime:1,current:1}},{$sort:{dateTime:-1}},{$limit:1}]}),C=function(t){(0,s.Z)(e,t);var A=(0,g.Z)(e);function e(t){var n;return(0,a.Z)(this,e),(n=A.call(this,t)).componentDidMount=function(){n.refreshList(),n.timer()},n.componentWillUnmount=function(){clearInterval(n.timer)},n.timer=function(){setInterval((function(){n.canUpdate()}),1e3)},n.config={measureField:"measures",rangeField:"ranges",targetField:"value",xField:"title",color:{range:["#82FF74","#F5F16E","#FF7772"],measure:"#5B8FF9",target:"#39a3f4"}},n.data=function(){return[{title:"Current",ranges:[2,3,3.5],measures:[0],value:Math.round(100*n.state.data.current)/100}]},n.state={data:[],ticks:-1},n}return(0,r.Z)(e,[{key:"canUpdate",value:function(){JSON.parse(window.localStorage.getItem("fromLocal"))||this.state.ticks<=0?(this.setState({ticks:10}),this.refreshList()):JSON.parse(window.localStorage.getItem("fromLocal"))||this.setState({ticks:this.state.ticks-1})}},{key:"refreshList",value:function(){var t=this;fetch((0,I.H)(),(0,I.w)(u)).then((function(t){return t.json()})).then((function(A){t.setState({data:A[0]})})).catch((function(t){console.log(t)}))}},{key:"render",value:function(){return(0,l.jsx)(c.Z,(0,i.Z)((0,i.Z)({},this.config),{},{data:this.data()},n.Z.bullet.simple))}}]),e}(o.Component),f=JSON.stringify({dataSource:"CeDRI",database:"CeDRI_UGV_buffer",collection:"Battery_Data",pipeline:[{$project:{dateTime:1,voltage:1}},{$sort:{dateTime:-1}},{$limit:1}]}),d=function(t){(0,s.Z)(e,t);var A=(0,g.Z)(e);function e(t){var n;return(0,a.Z)(this,e),(n=A.call(this,t)).componentDidMount=function(){n.refreshList(),n.timer()},n.componentWillUnmount=function(){clearInterval(n.timer)},n.timer=function(){setInterval((function(){n.canUpdate()}),1e3)},n.config={measureField:"measures",rangeField:"ranges",targetField:"value",xField:"title",color:{range:["#FF7772","#FFBC6D","#F5F16E","#BAFF7D","#82FF74","#FF7772"],measure:"#5B8FF9",target:"#39a3f4"}},n.data=function(){return[{title:"Voltage",ranges:[20,23,24,25,27,28],measures:[0],value:Math.round(100*n.state.data.voltage)/100}]},n.state={data:[],ticks:-1},n}return(0,r.Z)(e,[{key:"canUpdate",value:function(){JSON.parse(window.localStorage.getItem("fromLocal"))||this.state.ticks<=0?(this.setState({ticks:10}),this.refreshList()):JSON.parse(window.localStorage.getItem("fromLocal"))||this.setState({ticks:this.state.ticks-1})}},{key:"refreshList",value:function(){var t=this;fetch((0,I.H)(),(0,I.w)(f)).then((function(t){return t.json()})).then((function(A){t.setState({data:A[0]})})).catch((function(t){console.log(t)}))}},{key:"render",value:function(){return(0,l.jsx)(c.Z,(0,i.Z)((0,i.Z)({},this.config),{},{data:this.data()},n.Z.bullet.simple))}}]),e}(o.Component),m=e(16157),w=e(62463),h=e(42669),Q=e(8200),S=function(){return(0,l.jsx)(Q.Z,{sx:n.Z.maincard.sx,content:n.Z.maincard.content,children:(0,l.jsx)(m.Z,{sx:n.Z.box.sx,children:(0,l.jsxs)(w.Z,{spacing:n.Z.stack.spacing,direction:n.Z.stack.direction,alignItems:n.Z.stack.alignItems,children:[(0,l.jsx)(h.Z,{variant:n.Z.typography.title.variant,color:n.Z.typography.title.color,children:"Battery actual states"}),(0,l.jsxs)(w.Z,{direction:"column",alignItems:"center",spacing:0,children:[(0,l.jsx)(E,{}),(0,l.jsx)(C,{}),(0,l.jsx)(d,{})]})]})})})}},83007:function(t,A,e){e.d(A,{Z:function(){return d}});var n=e(1413),i=e(15671),a=e(43144),r=e(60136),s=e(27277),g=e(47313),o=e(90722),c=e(8515),I=e(8200),l=e(44090),B=e(16157),E=e(62463),u=e(42669),C=e(46417),f=JSON.stringify({dataSource:"CeDRI",database:"CeDRI_UGV_buffer",collection:"Battery_Data",pipeline:[{$project:{dateTime:{$dateTrunc:{date:"$dateTime",unit:"minute"}},percentage:{$cond:[{$eq:["NaN","$percentage"]},null,"$percentage"]}}},{$densify:{field:"dateTime",range:{step:1,unit:"minute",bounds:"full"}}},{$group:{_id:"$dateTime",percentage:{$avg:"$percentage"}}},{$sort:{_id:-1}},{$limit:100},{$project:{percentage:{$multiply:["$percentage",100]}}}]}),d=function(t){(0,r.Z)(e,t);var A=(0,s.Z)(e);function e(t){var n;return(0,i.Z)(this,e),(n=A.call(this,t)).componentDidMount=function(){n.refreshList(),n.timer()},n.componentWillUnmount=function(){clearInterval(n.timer)},n.timer=function(){setInterval((function(){n.canUpdate()}),1e3)},n.config={padding:"auto",xField:"_id",yField:"percentage",xAxis:{tickCount:5,type:"time",mask:"DD/MMM/YY HH:mm",title:{text:"Time"}},yAxis:{tickCount:10,title:{text:"Battery percentage [%]"}},tooltip:{formatter:function(t){return null!=t.percentage?{name:"Percentage",value:t.percentage.toFixed(1)+"%"}:{}}},smooth:!0},n.state={data:[],ticks:-1},n}return(0,a.Z)(e,[{key:"canUpdate",value:function(){JSON.parse(window.localStorage.getItem("fromLocal"))||this.state.ticks<=0?(this.setState({ticks:10}),this.refreshList()):JSON.parse(window.localStorage.getItem("fromLocal"))||this.setState({ticks:this.state.ticks-1})}},{key:"refreshList",value:function(){var t=this;fetch((0,c.H)(),(0,c.w)(f)).then((function(t){return t.json()})).then((function(A){t.setState({data:A})})).catch((function(t){console.log(t)}))}},{key:"render",value:function(){return(0,C.jsx)(I.Z,{sx:l.Z.maincard.sx,content:l.Z.maincard.content,children:(0,C.jsx)(B.Z,{sx:l.Z.box.sx,children:(0,C.jsxs)(E.Z,{spacing:l.Z.stack.spacing,direction:l.Z.stack.direction,alignItems:l.Z.stack.alignItems,children:[(0,C.jsx)(u.Z,{variant:l.Z.typography.title.variant,color:l.Z.typography.title.color,children:"Battery percentage by time"}),(0,C.jsx)(o.Z,(0,n.Z)((0,n.Z)({},this.config),{},{data:this.state.data},l.Z.graph.medium))]})})})}}]),e}(g.Component)},55159:function(t,A,e){e.d(A,{Z:function(){return h}});var n=e(1413),i=e(93433),a=e(15671),r=e(43144),s=e(60136),g=e(27277),o=e(47313),c=e(36209),I=e(9659),l=e(8515),B=e(44090),E=e(16157),u=e(62463),C=e(42669),f=e(8200),d=e(46417),m=JSON.stringify({dataSource:"CeDRI",database:"CeDRI_UGV_buffer",collection:"PositionAMCL_Data",pipeline:[{$project:{dateTime:1,x:1,y:1,yaw:"$orient.yaw"}},{$sort:{dateTime:-1}},{$limit:1}]}),w=JSON.stringify({dataSource:"CeDRI",database:"CeDRI_UGV_buffer",collection:"PositionAMCL_Data",pipeline:[{$project:{dateTime:1,x:1,y:1,yaw:"$orient.yaw"}},{$sort:{dateTime:-1}},{$limit:1},{$set:{count:0}}]}),h=function(t){(0,s.Z)(e,t);var A=(0,g.Z)(e);function e(t){var n;return(0,a.Z)(this,e),(n=A.call(this,t)).componentDidMount=function(){n.refreshMap(),n.refreshPos(),n.timer()},n.componentWillUnmount=function(){clearInterval(n.timer)},n.timer=function(){setInterval((function(){n.canUpdate()}),1e3)},n.config={type:"density",xField:"x",yField:"y",xAxis:{min:-3520,minLimit:-3520,max:3520,maxLimit:3520,label:null},yAxis:{min:-2960,minLimit:-2960,max:2960,maxLimit:2960,label:null},colorField:"count",limitInPlot:!0,color:"#F51D27-#FA541C-#FF8C12-#FFC838-#FAFFA8-#80FF73-#12CCCC-#1890FF-#6E32C2",annotations:[{type:"image",start:[-3520,2960],end:[3520,-2960],src:I}],tooltip:{showTitle:!1,formatter:function(t){return{name:"X:".concat(Math.round(t.x),"  Y:").concat(Math.round(t.y))}}}},n.state={data:[{x:0,y:0,count:0}],last:{x:0,y:0,yaw:2},ticks:-1,quality:0},n}return(0,r.Z)(e,[{key:"canUpdate",value:function(){JSON.parse(window.localStorage.getItem("fromLocal"))||this.state.ticks<=0?(this.setState({ticks:10}),this.refreshPos()):JSON.parse(window.localStorage.getItem("fromLocal"))||this.setState({ticks:this.state.ticks-1})}},{key:"refreshPos",value:function(){var t=this;fetch((0,l.H)(),(0,l.w)(m)).then((function(t){return t.json()})).then((function(A){t.setState({last:A[0]})})).catch((function(t){console.log(t)}))}},{key:"refreshMap",value:function(){var t=this;fetch((0,l.H)(),(0,l.w)(w)).then((function(t){return t.json()})).then((function(A){t.setState({data:A})})).catch((function(t){console.log(t)}))}},{key:"render",value:function(){var t=[].concat((0,i.Z)(this.config.annotations),[{type:"dataMarker",position:[this.state.last.x,this.state.last.y],rotate:this.state.last.yaw},{type:"text",content:"(".concat(Math.round(this.state.last.x),",").concat(Math.round(this.state.last.y),")"),style:{fontSize:22,fill:"#fff",textAlign:"left"},position:["1%","3%"]}]);return(0,d.jsx)(f.Z,{sx:B.Z.maincard.sx,content:B.Z.maincard.content,children:(0,d.jsx)(E.Z,{sx:B.Z.box.sx,children:(0,d.jsxs)(u.Z,{spacing:B.Z.stack.spacing,direction:B.Z.stack.direction,alignItems:B.Z.stack.alignItems,children:[(0,d.jsx)(C.Z,{variant:B.Z.typography.title.variant,color:B.Z.typography.title.color,children:"UGV position"}),(0,d.jsx)(c.Z,(0,n.Z)((0,n.Z)({},this.config),{},{data:this.state.data,sx:{width:300,height:300},annotations:t}))]})})})}}]),e}(o.Component)},27589:function(t,A,e){e.r(A),e.d(A,{default:function(){return x}});var n=e(82937),i=e(62463),a=e(55159),r=e(1413),s=e(93433),g=e(15671),o=e(43144),c=e(60136),I=e(27277),l=e(47313),B=e(36209),E=e(9659),u=e(8515),C=e(44090),f=e(16157),d=e(42669),m=e(8200),w=e(46417),h=JSON.stringify({dataSource:"CeDRI",database:"CeDRI_UGV_buffer",collection:"PositionAMCL_Data",pipeline:[{$project:{dateTime:1,x:1,y:1,yaw:"$orient.yaw"}},{$sort:{dateTime:-1}},{$limit:1}]}),Q=JSON.stringify({dataSource:"CeDRI",database:"CeDRI_UGV_buffer",collection:"PositionOdom_Data",pipeline:[{$project:{dateTime:{$dateTrunc:{date:"$dateTime",unit:"second"}},x:1,y:1,orient:1}},{$addFields:{xy:{$concat:[{$toString:["$x"]},":",{$toString:["$y"]}]}}},{$group:{_id:"$xy",x:{$avg:"$x"},y:{$avg:"$y"},yaw:{$avg:"$orient.yaw"},dateTime:{$max:"$dateTime"}}},{$sort:{dateTime:-1}},{$limit:10},{$set:{start:{x:"$x",y:"$y"}}}]}),S=function(t){(0,c.Z)(e,t);var A=(0,I.Z)(e);function e(t){var n;return(0,g.Z)(this,e),(n=A.call(this,t)).componentDidMount=function(){n.refreshMap(),n.refreshPos(),n.timer()},n.componentWillUnmount=function(){clearInterval(n.timer)},n.timer=function(){setInterval((function(){n.canUpdate()}),1e3)},n.config={xField:"x",yField:"y",animation:!1,xAxis:{min:-3520,minLimit:-3520,max:3520,maxLimit:3520,label:null},yAxis:{min:-2960,minLimit:-2960,max:2960,maxLimit:2960,label:null},colorField:"yaw",limitInPlot:!0,color:"#F51D27-#FA541C-#FF8C12-#FFC838-#FAFFA8-#80FF73-#12CCCC-#1890FF-#6E32C2",annotations:[{type:"image",start:[-3520,2960],end:[3520,-2960],src:E}],tooltip:{showTitle:!1,formatter:function(t){return{name:"X:".concat(Math.round(t.x),"  Y:").concat(Math.round(t.y))}}}},n.state={data:[{x:0,y:0,yaw:0}],last:{x:0,y:0,yaw:2},ticks:-1,quality:0},n}return(0,o.Z)(e,[{key:"canUpdate",value:function(){JSON.parse(window.localStorage.getItem("fromLocal"))||this.state.ticks<=0?(this.setState({ticks:10}),this.refreshPos(),this.refreshMap()):JSON.parse(window.localStorage.getItem("fromLocal"))||this.setState({ticks:this.state.ticks-1})}},{key:"refreshPos",value:function(){var t=this;fetch((0,u.H)(),(0,u.w)(h)).then((function(t){return t.json()})).then((function(A){t.setState({last:A[0]})})).catch((function(t){console.log(t)}))}},{key:"refreshMap",value:function(){var t=this;fetch((0,u.H)(),(0,u.w)(Q)).then((function(t){return t.json()})).then((function(A){t.setState({data:A})})).catch((function(t){console.log(t)}))}},{key:"render",value:function(){var t=[];this.state.data.forEach((function(A){0==t.length?t.push({type:"line",style:{stroke:"#f8df72",lineWidth:2},start:[A.x,A.y],end:[A.x,A.y]}):t.unshift({type:"line",style:{stroke:"#f8df72",lineWidth:2},start:[A.x,A.y],end:t[0].start})}));var A=[].concat((0,s.Z)(this.config.annotations),t,[{type:"dataMarker",position:[this.state.last.x,this.state.last.y],rotate:this.state.last.yaw},{type:"text",content:"(".concat(Math.round(this.state.last.x),",").concat(Math.round(this.state.last.y),")"),style:{fontSize:22,fill:"#fff",textAlign:"left"},position:["1%","3%"]}]);return(0,w.jsx)(m.Z,{sx:C.Z.maincard.sx,content:C.Z.maincard.content,children:(0,w.jsx)(f.Z,{sx:C.Z.box.sx,children:(0,w.jsxs)(i.Z,{spacing:C.Z.stack.spacing,direction:C.Z.stack.direction,alignItems:C.Z.stack.alignItems,children:[(0,w.jsx)(d.Z,{variant:C.Z.typography.title.variant,color:C.Z.typography.title.color,children:"Breadcrumb trail"}),(0,w.jsx)(B.Z,(0,r.Z)((0,r.Z)({},this.config),{},{data:this.state.data,sx:{width:300,height:300},annotations:A}))]})})})}}]),e}(l.Component),p=e(88674),D=e(83007),y=e(2122),M=e(6781),R=e(74256),Z=e(55412),x=function(){return(0,w.jsxs)(n.ZP,{container:!0,rowSpacing:1.75,columnSpacing:1.75,children:[(0,w.jsx)(i.Z,{spacing:0,direction:"column",alignItems:"center",children:(0,w.jsxs)(n.ZP,{children:[(0,w.jsx)(D.Z,{}),(0,w.jsx)(y.Z,{}),(0,w.jsx)(p.Z,{})]})}),(0,w.jsx)(i.Z,{spacing:0,direction:"column",alignItems:"center",children:(0,w.jsxs)(n.ZP,{children:[(0,w.jsx)(Z.Z,{}),(0,w.jsx)(R.Z,{}),(0,w.jsx)(M.Z,{})]})}),(0,w.jsxs)(n.ZP,{children:[(0,w.jsx)(a.Z,{}),(0,w.jsx)(S,{})]})]})}},90722:function(t,A,e){var n=e(47313),i=e(78315),a=e(95436),r=e(96543),s=e(89755),g=e(91372),o=function(t,A){var e={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&A.indexOf(n)<0&&(e[n]=t[n]);if(null!=t&&"function"===typeof Object.getOwnPropertySymbols){var i=0;for(n=Object.getOwnPropertySymbols(t);i<n.length;i++)A.indexOf(n[i])<0&&Object.prototype.propertyIsEnumerable.call(t,n[i])&&(e[n[i]]=t[n[i]])}return e},c=(0,n.forwardRef)((function(t,A){var e=t.chartRef,c=t.style,I=void 0===c?{height:"inherit"}:c,l=t.className,B=t.loading,E=t.loadingTemplate,u=t.errorTemplate,C=o(t,["chartRef","style","className","loading","loadingTemplate","errorTemplate"]),f=(0,a.Z)(i.Area,C),d=f.chart,m=f.container;return(0,n.useEffect)((function(){(0,r.J)(e,d.current)}),[d.current]),(0,n.useImperativeHandle)(A,(function(){return{getChart:function(){return d.current}}})),n.createElement(s.Z,{errorTemplate:u},B&&n.createElement(g.Z,{loadingTemplate:E,theme:t.theme}),n.createElement("div",{className:l,style:I,ref:m}))}));A.Z=c},36209:function(t,A,e){var n=e(47313),i=e(78315),a=e(95436),r=e(96543),s=e(89755),g=e(91372),o=function(t,A){var e={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&A.indexOf(n)<0&&(e[n]=t[n]);if(null!=t&&"function"===typeof Object.getOwnPropertySymbols){var i=0;for(n=Object.getOwnPropertySymbols(t);i<n.length;i++)A.indexOf(n[i])<0&&Object.prototype.propertyIsEnumerable.call(t,n[i])&&(e[n[i]]=t[n[i]])}return e},c=(0,n.forwardRef)((function(t,A){var e=t.chartRef,c=t.style,I=void 0===c?{height:"inherit"}:c,l=t.className,B=t.loading,E=t.loadingTemplate,u=t.errorTemplate,C=o(t,["chartRef","style","className","loading","loadingTemplate","errorTemplate"]),f=(0,a.Z)(i.Heatmap,C),d=f.chart,m=f.container;return(0,n.useEffect)((function(){(0,r.J)(e,d.current)}),[d.current]),(0,n.useImperativeHandle)(A,(function(){return{getChart:function(){return d.current}}})),n.createElement(s.Z,{errorTemplate:u},B&&n.createElement(g.Z,{loadingTemplate:E,theme:t.theme}),n.createElement("div",{className:l,style:I,ref:m}))}));A.Z=c},9659:function(t){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABYAAAASgCAAAAABk4bNwAAAABGdBTUEAALGPC/xhBQAAAAJiS0dEAP+Hj8y/AAAAB3RJTUUH5wEYCSswMCAhEAAAAAFvck5UAc+id5oAAAA1dEVYdGNvbW1lbnQAIENyZWF0ZWQgYnkgR0lNUCB2ZXJzaW9uIDIuMTAuMTggUE5NIHBsdWctaW4K6LhXEQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMy0wMS0yNFQwOTo0Mzo0NyswMDowMH+dZbcAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjMtMDEtMjRUMDk6NDM6NDYrMDA6MDCot9a/AAAAWmVYSWZNTQAqAAAACAAFARIAAwAAAAEAAQAAARoABQAAAAEAAABKARsABQAAAAEAAABSASgAAwAAAAEAAgAAAhMAAwAAAAEAAQAAAAAAAAAAAEgAAAABAAAASAAAAAEfUvc0AAAZ80lEQVR42u3dC5bT1hZFUfe/b3SpxntFfTB/C1NZ2mbOjBBCSCF8rlduZFm+fAIgcakPAOBfJcAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBBggIsAAEQEGiAgwQESAASICDBARYICIAANEBJh9T09P9SHAnxBgVl2+7a4Ms0aAGXW5XJ7+H+H//+Xy/P03H/Mr/UD9++cRWEaMuvxnXRRgPoplxKjnMxDf+4gwXi7/za/Dv8cyYpQAs88yYpQAs88yYpQAs88yYtSPA/wRl6IJMB/FMmLUh+6Av8r4kwDzQSwjRv0kwD/YAX/3Q7/fLL9+sdfvCTAfxDJi1M8C/PzH57dnvP31XgLMh7GMGPWzUxAfQYD5GJYRo37yItzPXpv7ywSYv8EyYtR/VFoB5gNZRowSYPZZRowSYPZZRowSYPZZRowSYPZZRowSYPZZRowSYPZZRoxqA6zA/A1WEZsuAsw+q4hNAswDsIrYJMA8AKuITQLMA7CK2PRf3XVHgPlAVhGb7IB5AFYRm+yAeQBWEZvsgHkAVhGbBJgHYBWxySkIHoBVxKZ+ByzBn57H8PInf8ZDx6YTBLh+CP6zR/rXBPgOHjpG5QF+Poinz58C+vy5yZe3v3k603Pqy3E+/wfr8n68Lwf6tz4y+nOE33LMER4vNvU74KfPf3yO7+WlwZfXH7n63lvtLq+f1/z6k5+evvrBl4y9RPL957/85fL2T19/pddvYl8ehe9KXi+MLR4uzugtVu8leuvYp8vTl4C1AV7xwY/C09t/EV5/qF46WwSYu11+9qS72g59PlN4+fT7M4rnCMsdMX7/+5d/VB/bR//On9627m/q1bhF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wAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwAARAQaICDBARIABIgIMEBFggIgAA0QEGCAiwACR/wFivDbokXRo8AAAAABJRU5ErkJggg=="}}]);