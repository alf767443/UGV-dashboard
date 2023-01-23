"use strict";(self.webpackChunkcedri_ugv_dashboard=self.webpackChunkcedri_ugv_dashboard||[]).push([[417],{44090:function(t,e){e.Z={graph:{big:{},medium:{},small:{}},stack:{direction:"column",alignItems:"center",spacing:1},typography:{variant:"h5",color:"textSecondary"},box:{sx:{p:2,pb:1}},maincard:{sx:{mt:2},content:!1}}},18417:function(t,e,n){n.r(e),n.d(e,{default:function(){return J}});var a=n(62463),i=n(15671),r=n(43144),o=n(60136),c=n(27277),s=n(47313),l=n(16157),u=n(42669),d=n(8200),m=n(26899),p=n(8515),h=n(46417),f=JSON.stringify({dataSource:"CeDRI",database:"CeDRI_UGV_buffer",collection:"Battery_Data",pipeline:[{$project:{_id:0}},{$sort:{dateTime:-1}},{$limit:1e3}]}),g=[{title:"Time",dataIndex:"dateTime",key:"dateTime",sorter:{compare:function(t,e){return t.dateTime-e.dateTime},multiple:1},defaultSortOrder:"descend"},{title:"Percentage",dataIndex:["percentage"],key:"percentage"},{title:"Voltage",dataIndex:["voltage"],key:"voltage"},{title:"Current",dataIndex:["voltage"],key:"current"},{title:"Power",dataIndex:["power"],key:"power"}],x=function(t){(0,o.Z)(n,t);var e=(0,c.Z)(n);function n(t){var a;return(0,i.Z)(this,n),(a=e.call(this,t)).componentDidMount=function(){a.refreshList()},a.state={data:[],ticks:-1},a}return(0,r.Z)(n,[{key:"refreshList",value:function(){var t=this;fetch((0,p.H)(),(0,p.w)(f)).then((function(t){return t.json()})).then((function(e){t.setState({data:e})})).catch((function(t){console.log(t)}))}},{key:"render",value:function(){return(0,h.jsx)(m.Z,{columns:g,dataSource:this.state.data,pagination:this.state.pagination,loading:this.state.loading,onChange:this.handleTableChange,sx:this.props.sx})}}]),n}(s.Component),Z=n(40040),y=function(t){(0,o.Z)(n,t);var e=(0,c.Z)(n);function n(){return(0,i.Z)(this,n),e.apply(this,arguments)}return(0,r.Z)(n,[{key:"render",value:function(){return(0,h.jsx)(d.Z,{sx:Z.Z,content:!1,children:(0,h.jsx)(l.Z,{sx:{p:3,pb:0},children:(0,h.jsxs)(a.Z,{spacing:2,children:[(0,h.jsx)(u.Z,{variant:"h3",color:"textSecondary",children:"Battery data"}),(0,h.jsx)(x,{})]})})})}}]),n}(s.Component),v=n(56448),$=n(1413),k=n(78315),j=n(95436),S=n(96543),I=n(89755),b=n(91372),w=function(t,e){var n={};for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&e.indexOf(a)<0&&(n[a]=t[a]);if(null!=t&&"function"===typeof Object.getOwnPropertySymbols){var i=0;for(a=Object.getOwnPropertySymbols(t);i<a.length;i++)e.indexOf(a[i])<0&&Object.prototype.propertyIsEnumerable.call(t,a[i])&&(n[a[i]]=t[a[i]])}return n},T=(0,s.forwardRef)((function(t,e){var n=t.chartRef,a=t.style,i=void 0===a?{height:"inherit"}:a,r=t.className,o=t.loading,c=t.loadingTemplate,l=t.errorTemplate,u=w(t,["chartRef","style","className","loading","loadingTemplate","errorTemplate"]),d=(0,j.Z)(k.Area,u),m=d.chart,p=d.container;return(0,s.useEffect)((function(){(0,S.J)(n,m.current)}),[m.current]),(0,s.useImperativeHandle)(e,(function(){return{getChart:function(){return m.current}}})),s.createElement(I.Z,{errorTemplate:l},o&&s.createElement(b.Z,{loadingTemplate:c,theme:t.theme}),s.createElement("div",{className:r,style:i,ref:p}))})),C=n(44090),_=JSON.stringify({dataSource:"CeDRI",database:"CeDRI_UGV_buffer",collection:"Battery_Data",pipeline:[{$project:{dateTime:{$dateTrunc:{date:"$dateTime",unit:"minute"}},current:{$cond:[{$eq:["NaN","$current"]},null,"$current"]}}},{$densify:{field:"dateTime",range:{step:1,unit:"minute",bounds:"full"}}},{$group:{_id:"$dateTime",current:{$avg:"$current"}}},{$sort:{_id:-1}},{$limit:100}]}),D=function(t){(0,o.Z)(n,t);var e=(0,c.Z)(n);function n(t){var a;return(0,i.Z)(this,n),(a=e.call(this,t)).componentDidMount=function(){a.refreshList(),a.timer()},a.componentWillUnmount=function(){clearInterval(a.timer)},a.timer=function(){setInterval((function(){a.canUpdate()}),1e3)},a.config={padding:"auto",xField:"_id",yField:"current",xAxis:{tickCount:5,type:"time",mask:"DD/MMM/YY HH:mm",title:{text:"Time"}},yAxis:{tickCount:10,title:{text:"Battery current [A]"}},tooltip:{formatter:function(t){return null!=t.current?{name:"Current",value:t.current.toFixed(1)+" A"}:{}}},smooth:!0},a.state={data:[],ticks:-1},a}return(0,r.Z)(n,[{key:"canUpdate",value:function(){JSON.parse(window.localStorage.getItem("fromLocal"))||this.state.ticks<=0?(this.setState({ticks:10}),this.refreshList()):JSON.parse(window.localStorage.getItem("fromLocal"))||this.setState({ticks:this.state.ticks-1})}},{key:"refreshList",value:function(){var t=this;fetch((0,p.H)(),(0,p.w)(_)).then((function(t){return t.json()})).then((function(e){t.setState({data:e})})).catch((function(t){console.log(t)}))}},{key:"render",value:function(){return(0,h.jsx)(d.Z,{sx:C.Z.maincard.sx,content:C.Z.maincard.content,children:(0,h.jsx)(l.Z,{sx:C.Z.box.sx,children:(0,h.jsxs)(a.Z,{spacing:C.Z.stack.spacing,direction:C.Z.stack.direction,alignItems:C.Z.stack.alignItems,children:[(0,h.jsx)(u.Z,{variant:C.Z.typography.variant,color:C.Z.typography.color,children:"Battery current by time"}),(0,h.jsx)(T,(0,$.Z)((0,$.Z)({},this.config),{},{data:this.state.data},C.Z.graph.medium))]})})})}}]),n}(s.Component),N=JSON.stringify({dataSource:"CeDRI",database:"CeDRI_UGV_buffer",collection:"Battery_Data",pipeline:[{$project:{dateTime:{$dateTrunc:{date:"$dateTime",unit:"minute"}},percentage:{$cond:[{$eq:["NaN","$percentage"]},null,"$percentage"]}}},{$densify:{field:"dateTime",range:{step:1,unit:"minute",bounds:"full"}}},{$group:{_id:"$dateTime",percentage:{$avg:"$percentage"}}},{$sort:{_id:-1}},{$limit:100},{$project:{percentage:{$multiply:["$percentage",100]}}}]}),O=function(t){(0,o.Z)(n,t);var e=(0,c.Z)(n);function n(t){var a;return(0,i.Z)(this,n),(a=e.call(this,t)).componentDidMount=function(){a.refreshList(),a.timer()},a.componentWillUnmount=function(){clearInterval(a.timer)},a.timer=function(){setInterval((function(){a.canUpdate()}),1e3)},a.config={padding:"auto",xField:"_id",yField:"percentage",xAxis:{tickCount:5,type:"time",mask:"DD/MMM/YY HH:mm",title:{text:"Time"}},yAxis:{tickCount:10,title:{text:"Battery percentage [%]"}},tooltip:{formatter:function(t){return null!=t.percentage?{name:"Percentage",value:t.percentage.toFixed(1)+"%"}:{}}},smooth:!0},a.state={data:[],ticks:-1},a}return(0,r.Z)(n,[{key:"canUpdate",value:function(){JSON.parse(window.localStorage.getItem("fromLocal"))||this.state.ticks<=0?(this.setState({ticks:10}),this.refreshList()):JSON.parse(window.localStorage.getItem("fromLocal"))||this.setState({ticks:this.state.ticks-1})}},{key:"refreshList",value:function(){var t=this;fetch((0,p.H)(),(0,p.w)(N)).then((function(t){return t.json()})).then((function(e){t.setState({data:e})})).catch((function(t){console.log(t)}))}},{key:"render",value:function(){return(0,h.jsx)(d.Z,{sx:C.Z.maincard.sx,content:C.Z.maincard.content,children:(0,h.jsx)(l.Z,{sx:C.Z.box.sx,children:(0,h.jsxs)(a.Z,{spacing:C.Z.stack.spacing,direction:C.Z.stack.direction,alignItems:C.Z.stack.alignItems,children:[(0,h.jsx)(u.Z,{variant:C.Z.typography.variant,color:C.Z.typography.color,children:"Battery percentage by time"}),(0,h.jsx)(T,(0,$.Z)((0,$.Z)({},this.config),{},{data:this.state.data},C.Z.graph.medium))]})})})}}]),n}(s.Component),L=JSON.stringify({dataSource:"CeDRI",database:"CeDRI_UGV_buffer",collection:"Battery_Data",pipeline:[{$project:{dateTime:{$dateTrunc:{date:"$dateTime",unit:"minute"}},voltage:{$cond:[{$eq:["NaN","$voltage"]},"None","$voltage"]},current:{$cond:[{$eq:["NaN","$current"]},"None","$current"]}}},{$densify:{field:"dateTime",range:{step:1,unit:"minute",bounds:"full"}}},{$group:{_id:"$dateTime",current:{$avg:"$current"},voltage:{$avg:"$voltage"}}},{$set:{power:{$multiply:["$current","$voltage"]}}},{$project:{_id:1,power:1}},{$sort:{_id:-1}},{$limit:100}]}),M=function(t){(0,o.Z)(n,t);var e=(0,c.Z)(n);function n(t){var a;return(0,i.Z)(this,n),(a=e.call(this,t)).componentDidMount=function(){a.refreshList(),a.timer()},a.componentWillUnmount=function(){clearInterval(a.timer)},a.timer=function(){setInterval((function(){a.canUpdate()}),1e3)},a.config={padding:"auto",xField:"_id",yField:"power",xAxis:{tickCount:5,type:"time",mask:"DD/MMM/YY HH:mm",title:{text:"Time"}},yAxis:{tickCount:10,title:{text:"Battery power [W]"}},tooltip:{formatter:function(t){return null!=t.power?{name:"Power",value:t.power.toFixed(1)+" W"}:{}}},smooth:!0},a.state={data:[],ticks:-1},a}return(0,r.Z)(n,[{key:"canUpdate",value:function(){JSON.parse(window.localStorage.getItem("fromLocal"))||this.state.ticks<=0?(this.setState({ticks:10}),this.refreshList()):JSON.parse(window.localStorage.getItem("fromLocal"))||this.setState({ticks:this.state.ticks-1})}},{key:"refreshList",value:function(){var t=this;fetch((0,p.H)(),(0,p.w)(L)).then((function(t){return t.json()})).then((function(e){t.setState({data:e})})).catch((function(t){console.log(t)}))}},{key:"render",value:function(){return(0,h.jsx)(d.Z,{sx:C.Z.maincard.sx,content:C.Z.maincard.content,children:(0,h.jsx)(l.Z,{sx:C.Z.box.sx,children:(0,h.jsxs)(a.Z,{spacing:C.Z.stack.spacing,direction:C.Z.stack.direction,alignItems:C.Z.stack.alignItems,children:[(0,h.jsx)(u.Z,{variant:C.Z.typography.variant,color:C.Z.typography.color,children:"Battery power by time"}),(0,h.jsx)(T,(0,$.Z)((0,$.Z)({},this.config),{},{data:this.state.data},C.Z.graph.medium))]})})})}}]),n}(s.Component),U=JSON.stringify({dataSource:"CeDRI",database:"CeDRI_UGV_buffer",collection:"Battery_Data",pipeline:[{$project:{dateTime:{$dateTrunc:{date:"$dateTime",unit:"minute"}},voltage:{$cond:[{$eq:["NaN","$voltage"]},null,"$voltage"]}}},{$densify:{field:"dateTime",range:{step:1,unit:"minute",bounds:"full"}}},{$group:{_id:"$dateTime",voltage:{$avg:"$voltage"}}},{$sort:{_id:-1}},{$limit:100}]}),H=function(t){(0,o.Z)(n,t);var e=(0,c.Z)(n);function n(t){var a;return(0,i.Z)(this,n),(a=e.call(this,t)).componentDidMount=function(){a.refreshList(),a.timer()},a.componentWillUnmount=function(){clearInterval(a.timer)},a.timer=function(){setInterval((function(){a.canUpdate()}),1e3)},a.config={padding:"auto",xField:"_id",yField:"voltage",xAxis:{tickCount:5,type:"time",mask:"DD/MMM/YY HH:mm",title:{text:"Time"}},yAxis:{tickCount:10,title:{text:"Battery voltage [V]"}},tooltip:{formatter:function(t){return null!=t.voltage?{name:"Voltage",value:t.voltage.toFixed(1)+" V"}:{}}},smooth:!0},a.state={data:[],ticks:-1},a}return(0,r.Z)(n,[{key:"canUpdate",value:function(){JSON.parse(window.localStorage.getItem("fromLocal"))||this.state.ticks<=0?(this.setState({ticks:10}),this.refreshList()):JSON.parse(window.localStorage.getItem("fromLocal"))||this.setState({ticks:this.state.ticks-1})}},{key:"refreshList",value:function(){var t=this;fetch((0,p.H)(),(0,p.w)(U)).then((function(t){return t.json()})).then((function(e){t.setState({data:e})})).catch((function(t){console.log(t)}))}},{key:"render",value:function(){return(0,h.jsx)(d.Z,{sx:C.Z.maincard.sx,content:C.Z.maincard.content,children:(0,h.jsx)(l.Z,{sx:C.Z.box.sx,children:(0,h.jsxs)(a.Z,{spacing:C.Z.stack.spacing,direction:C.Z.stack.direction,alignItems:C.Z.stack.alignItems,children:[(0,h.jsx)(u.Z,{variant:C.Z.typography.variant,color:C.Z.typography.color,children:"Battery voltage by time"}),(0,h.jsx)(T,(0,$.Z)((0,$.Z)({},this.config),{},{data:this.state.data},C.Z.graph.medium))]})})})}}]),n}(s.Component),B=function(t){(0,o.Z)(n,t);var e=(0,c.Z)(n);function n(t){var r;return(0,i.Z)(this,n),(r=e.call(this,t)).hadleChange=function(t,e){r.setState({page:e}),r.componentDidMount()},r.componentDidMount=function(){r.graphs()},r.graphs=function(){if(1===r.state.page)return(0,h.jsxs)(a.Z,{direction:"row",spacing:2,children:[(0,h.jsx)(D,{}),(0,h.jsx)(O,{}),(0,h.jsx)(M,{}),(0,h.jsx)(H,{})]})},r.state={page:1},r}return(0,r.Z)(n,[{key:"render",value:function(){return(0,h.jsx)(d.Z,{sx:Z.Z,content:!1,children:(0,h.jsx)(l.Z,{sx:{p:3,pb:0},children:(0,h.jsxs)(a.Z,{spacing:2,children:[(0,h.jsx)(u.Z,{variant:"h3",color:"textSecondary",children:"Battery plots"}),this.graphs(),(0,h.jsx)(v.Z,{count:1,defaultPage:1,siblingCount:0,page:this.state.page,onChange:this.hadleChange})]})})})}}]),n}(s.Component),J=function(){return(0,h.jsxs)(a.Z,{spacing:2,children:[(0,h.jsx)(B,{}),(0,h.jsx)(y,{})]})}},40040:function(t,e){e.Z={width:1,height:1,minHeight:1,maxHeight:1,minWidth:1,maxWidth:1,mt:1,gap:2}}}]);