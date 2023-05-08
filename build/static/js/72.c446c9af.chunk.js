"use strict";(self.webpackChunkcedri_ugv_dashboard=self.webpackChunkcedri_ugv_dashboard||[]).push([[72],{8384:function(t,e,n){n.d(e,{Z:function(){return y}});var i=n(1413),r=n(15671),a=n(43144),o=n(60136),l=n(29388),s=n(47313),c=n(9019),u=n(42832),d=n(61113),f=n(77970),m=n(10347),h={typography:{align:"left",variant:"h3",color:"textSecondary",xs:12,sm:12,md:12,lg:12,xl:12},stack:{spacing:2,xs:1,sm:1,md:1,lg:1,xl:1,sx:{mt:1,mr:1,ml:1,mb:0}},box:{xs:1,sm:1,md:1,lg:1,xl:1,sx:{mt:1,mr:0,ml:0,mb:0,gap:1},height:"100%"},grid:{main:{direction:"row",justifyContent:"center",alignItems:"stretch",spacing:0},item:{justifyContent:"center",alignItems:"stretch",xs:12,sm:12,md:12,lg:6,xl:6,spacing:0}}},g=n(79298),p=n(68756),Z=n(97849),x=n(16031),v=n(46417),y=function(t){(0,o.Z)(n,t);var e=(0,l.Z)(n);function n(t){var a;return(0,r.Z)(this,n),(a=e.call(this,t)).hadleChange=function(t,e){a.setState({page:e}),a.componentDidMount()},a.componentDidMount=function(){a.graphs()},a.numberPages=function(){return(0,x.round)(a.props.Plot.SimplePlot.length/2)+a.props.Plot.LargePlot.length+a.props.Plot.BigPlot.length},a.graphs=function(){var t=0,e=0;switch(!0){case a.state.page<=(0,x.round)(a.props.Plot.SimplePlot.length/2):return console.log("a"),t=2*(a.state.page-1),e=2*a.state.page>a.props.Plot.SimplePlot.length?t+1:t+2,(0,v.jsx)(c.ZP,(0,i.Z)((0,i.Z)({container:!0},h.grid.main),{},{children:a.props.Plot.SimplePlot.slice(t,e).map((function(t){return(0,s.createElement)(c.ZP,(0,i.Z)((0,i.Z)({item:!0},h.grid.item),{},{key:t.key}),(0,v.jsx)(g.Z,{graph:t.plot,title:t.title,position:null,static:!0}))}))}));case a.state.page>(0,x.round)(a.props.Plot.SimplePlot.length/2)&&a.state.page<=(0,x.round)(a.props.Plot.SimplePlot.length/2)+a.props.Plot.LargePlot.length:return console.log("b"),e=(t=a.state.page-(0,x.round)(a.props.Plot.SimplePlot.length/2)-1)+1,(0,v.jsx)(c.ZP,(0,i.Z)((0,i.Z)({container:!0},h.grid.main),{},{children:a.props.Plot.LargePlot.slice(t,e).map((function(t){return(0,s.createElement)(c.ZP,(0,i.Z)((0,i.Z)({item:!0},h.grid.item),{},{key:t.key}),(0,v.jsx)(p.Z,{graph:t.plot,title:t.title,position:null,static:!0}))}))}));case a.state.page>(0,x.round)(a.props.Plot.SimplePlot.length/2)+a.props.Plot.LargePlot.length&&a.state.page<=(0,x.round)(a.props.Plot.SimplePlot.length/2)+a.props.Plot.LargePlot.length+a.props.Plot.BigPlot.length:return console.log("c"),e=(t=a.state.page-(0,x.round)(a.props.Plot.SimplePlot.length/2)+a.props.Plot.LargePlot.length-1)+1,console.log(a.props.Plot.BigPlot.slice(t,e)),(0,v.jsx)(c.ZP,(0,i.Z)((0,i.Z)({container:!0},h.grid.main),{},{children:a.props.Plot.BigPlot.slice(t,e).map((function(t){return(0,s.createElement)(c.ZP,(0,i.Z)((0,i.Z)({item:!0},h.grid.item),{},{key:t.key}),(0,v.jsx)(Z.Z,{graph:t.plot,title:t.title,position:null,static:!0}))}))}));default:v.Fragment}},a.state={page:1},a}return(0,a.Z)(n,[{key:"render",value:function(){return(0,v.jsx)(m.Z,(0,i.Z)((0,i.Z)({},h.box),{},{children:(0,v.jsxs)(u.Z,(0,i.Z)((0,i.Z)({},h.stack),{},{children:[(0,v.jsx)(d.Z,(0,i.Z)((0,i.Z)({},h.typography),{},{children:this.props.title})),this.graphs(),(0,v.jsx)(f.Z,{count:this.numberPages(),defaultPage:1,siblingCount:0,page:this.state.page,onChange:this.hadleChange})]}))}))}}]),n}(s.Component)},59615:function(t,e,n){n.d(e,{Z:function(){return I}});var i=n(1413),r=n(93433),a=n(15671),o=n(43144),l=n(60136),s=n(29388),c=n(47313),u=n(82597),d=n(8515),f=n(44090),m=n(46417),h=function(t){return JSON.stringify({dataSource:"CeDRI",database:"CeDRI_UGV_datalake",collection:"Motor",pipeline:[{$project:{dateTime:{$dateTrunc:{date:"$dateTime",unit:"minute"}},leftCurrent:1,rightCurrent:1}},{$densify:{field:"dateTime",range:{step:1,unit:"minute",bounds:"full"}}},{$group:{_id:"$dateTime",current:{$avg:"$"+t+"Current"}}},{$sort:{_id:-1}},{$limit:100},{$addFields:{side:t}}]})},g=function(t){(0,l.Z)(n,t);var e=(0,s.Z)(n);function n(t){var i;return(0,a.Z)(this,n),(i=e.call(this,t)).componentDidMount=function(){i.refreshList(),i.timer()},i.componentWillUnmount=function(){clearInterval(i.timer)},i.timer=function(){setInterval((function(){i.refreshList()}),5e3)},i.config={xField:"_id",yField:"current",seriesField:"side",xAxis:{tickCount:5,type:"time",mask:"DD/MMM/YY HH:mm",title:{text:"Time"}},yAxis:{tickCount:10,title:{text:"Motor current [A]"}},tooltip:{formatter:function(t){return null!=t.current?{name:"Current",value:t.current.toFixed(1)+" A"}:{}}}},i.state={data:[],right:[],left:[],ticks:-1},i}return(0,o.Z)(n,[{key:"refreshList",value:function(){var t=this;fetch((0,d.HQ)(),(0,d.wY)(h("left"))).then((function(t){return t.json()})).then((function(e){t.setState({left:e})})).then((function(){fetch((0,d.HQ)(),(0,d.wY)(h("right"))).then((function(t){return t.json()})).then((function(e){t.setState({right:e})})).then((function(){t.setState({data:[].concat((0,r.Z)(t.state.left),(0,r.Z)(t.state.right))}),clearInterval(t.timer)})).catch((function(t){console.log(t)}))})).catch((function(t){console.log(t)}))}},{key:"render",value:function(){return(0,m.jsx)(u.Z,(0,i.Z)((0,i.Z)((0,i.Z)({},this.config),f.Z.plot),{},{data:this.state.data}))}}]),n}(c.Component),p=n(20061),Z=n(42832),x=n(61113),v=JSON.stringify({dataSource:"CeDRI",database:"CeDRI_UGV_datalake",collection:"Motor",pipeline:[{$project:{dateTime:1,left:"$leftCurrent",right:"$rightCurrent"}},{$sort:{dateTime:-1}},{$limit:1}]}),y=function(t){(0,l.Z)(n,t);var e=(0,s.Z)(n);function n(t){var i;return(0,a.Z)(this,n),(i=e.call(this,t)).componentDidMount=function(){i.refreshList(),i.timer()},i.componentWillUnmount=function(){clearInterval(i.timer)},i.timer=function(){setInterval((function(){i.refreshList()}),5e3)},i.config={color:{range:["#FF7772","#F5F16E","#82FF74"],measure:"#5B8FF9",target:"#39a3f4"}},i.data=function(){return[{title:"Right",ranges:[2,3,3.5],measures:[0],value:Math.round(100*i.state.data.right)/100},{title:"Left",ranges:[2,3,3.5],measures:[0],value:Math.round(100*i.state.data.left)/100}]},i.state={data:[],ticks:-1},i}return(0,o.Z)(n,[{key:"refreshList",value:function(){var t=this;fetch((0,d.HQ)(),(0,d.wY)(v)).then((function(t){return t.json()})).then((function(e){t.setState({data:e[0]})})).then((function(){clearInterval(t.timer)})).catch((function(t){console.log(t)}))}},{key:"render",value:function(){return(0,m.jsxs)(Z.Z,{children:[(0,m.jsx)(p.Z,(0,i.Z)((0,i.Z)({},this.config),{},{data:this.data()},f.Z.bullet.dual)),(0,m.jsx)(x.Z,(0,i.Z)((0,i.Z)({},f.Z.typography.subtitle),{},{children:"Current"}))]})}}]),n}(c.Component),P=JSON.stringify({dataSource:"CeDRI",database:"CeDRI_UGV_datalake",collection:"Motor",pipeline:[{$project:{dateTime:1,left:"$leftPwmDrive",right:"$rightPwmDrive"}},{$sort:{_id:-1}},{$limit:1}]}),j=function(t){(0,l.Z)(n,t);var e=(0,s.Z)(n);function n(t){var i;return(0,a.Z)(this,n),(i=e.call(this,t)).componentDidMount=function(){i.refreshList(),i.timer()},i.componentWillUnmount=function(){clearInterval(i.timer)},i.timer=function(){setInterval((function(){i.refreshList()}),5e3)},i.config={color:{range:["#FF7772","#F5F16E","#82FF74"],measure:"#5B8FF9",target:"#39a3f4"}},i.data=function(){return[{title:"Right",ranges:[250,300,350],measures:[0],value:Math.round(100*i.state.data.right)/100},{title:"Left",ranges:[250,300,350],measures:[0],value:Math.round(100*i.state.data.left)/100}]},i.state={data:[],ticks:-1},i}return(0,o.Z)(n,[{key:"refreshList",value:function(){var t=this;fetch((0,d.HQ)(),(0,d.wY)(P)).then((function(t){return t.json()})).then((function(e){t.setState({data:e[0]})})).then((function(){clearInterval(t.timer)})).catch((function(t){console.log(t)}))}},{key:"render",value:function(){return(0,m.jsxs)(Z.Z,{children:[(0,m.jsx)(p.Z,(0,i.Z)((0,i.Z)({},this.config),{},{data:this.data()},f.Z.bullet.dual)),(0,m.jsx)(x.Z,(0,i.Z)((0,i.Z)({},f.Z.typography.subtitle),{},{children:"PWM"}))]})}}]),n}(c.Component),C=JSON.stringify({dataSource:"CeDRI",database:"CeDRI_UGV_datalake",collection:"Motor",pipeline:[{$project:{dateTime:1,left:"$leftRotateRate",right:"$rightRotateRate"}},{$sort:{_id:-1}},{$limit:1}]}),k=function(t){(0,l.Z)(n,t);var e=(0,s.Z)(n);function n(t){var i;return(0,a.Z)(this,n),(i=e.call(this,t)).componentDidMount=function(){i.refreshList(),i.timer()},i.componentWillUnmount=function(){clearInterval(i.timer)},i.timer=function(){setInterval((function(){i.refreshList()}),5e3)},i.config={color:{range:["#FF7772","#F5F16E","#82FF74"],measure:"#5B8FF9",target:"#39a3f4"}},i.data=function(){return[{title:"Right",ranges:[65,85,100],measures:[0],value:Math.round(100*i.state.data.right)/100},{title:"Left",ranges:[65,85,100],measures:[0],value:Math.round(100*i.state.data.left)/100}]},i.state={data:[],ticks:-1},i}return(0,o.Z)(n,[{key:"refreshList",value:function(){var t=this;fetch((0,d.HQ)(),(0,d.wY)(C)).then((function(t){return t.json()})).then((function(e){t.setState({data:e[0]})})).then((function(){clearInterval(t.timer)})).catch((function(t){console.log(t)}))}},{key:"render",value:function(){return(0,m.jsxs)(Z.Z,{children:[(0,m.jsx)(p.Z,(0,i.Z)((0,i.Z)({},this.config),{},{data:this.data()},f.Z.bullet.dual)),(0,m.jsx)(x.Z,(0,i.Z)((0,i.Z)({},f.Z.typography.subtitle),{},{children:"Rot. rate"}))]})}}]),n}(c.Component),$=function(){return(0,m.jsxs)(Z.Z,(0,i.Z)((0,i.Z)({},f.Z.bullet.stack),{},{children:[(0,m.jsx)(y,{}),(0,m.jsx)(j,{}),(0,m.jsx)(k,{})]}))},b=function(t){return JSON.stringify({dataSource:"CeDRI",database:"CeDRI_UGV_datalake",collection:"Motor",pipeline:[{$project:{dateTime:{$dateTrunc:{date:"$dateTime",unit:"minute"}},leftPwmDrive:1,rightPwmDrive:1}},{$densify:{field:"dateTime",range:{step:1,unit:"minute",bounds:"full"}}},{$group:{_id:"$dateTime",PWM:{$avg:"$"+t+"PwmDrive"}}},{$sort:{_id:-1}},{$limit:100},{$addFields:{side:t}}]})},M=function(t){(0,l.Z)(n,t);var e=(0,s.Z)(n);function n(t){var i;return(0,a.Z)(this,n),(i=e.call(this,t)).componentDidMount=function(){i.refreshList(),i.timer()},i.componentWillUnmount=function(){clearInterval(i.timer)},i.timer=function(){setInterval((function(){i.refreshList()}),5e3)},i.config={xField:"_id",yField:"PWM",seriesField:"side",xAxis:{tickCount:5,type:"time",mask:"DD/MMM/YY HH:mm",title:{text:"Time"}},yAxis:{tickCount:10,title:{text:"Motor PWM [%]"}},tooltip:{formatter:function(t){return null!=t.PWM?{name:"PWM",value:t.PWM.toFixed(1)+" %"}:{}}}},i.state={data:[],right:[],left:[],ticks:-1},i}return(0,o.Z)(n,[{key:"refreshList",value:function(){var t=this;fetch((0,d.HQ)(),(0,d.wY)(b("left"))).then((function(t){return t.json()})).then((function(e){t.setState({left:e})})).then((function(){fetch((0,d.HQ)(),(0,d.wY)(b("right"))).then((function(t){return t.json()})).then((function(e){t.setState({right:e})})).then((function(){t.setState({data:[].concat((0,r.Z)(t.state.left),(0,r.Z)(t.state.right))}),clearInterval(t.timer)})).catch((function(t){console.log(t)}))})).catch((function(t){console.log(t)}))}},{key:"render",value:function(){return(0,m.jsx)(u.Z,(0,i.Z)((0,i.Z)((0,i.Z)({},this.config),f.Z.plot),{},{data:this.state.data}))}}]),n}(c.Component),S=function(t){return JSON.stringify({dataSource:"CeDRI",database:"CeDRI_UGV_datalake",collection:"Motor",pipeline:[{$project:{dateTime:{$dateTrunc:{date:"$dateTime",unit:"minute"}},leftRotateRate:1,rightRotateRate:1}},{$densify:{field:"dateTime",range:{step:1,unit:"minute",bounds:"full"}}},{$group:{_id:"$dateTime",rrate:{$avg:"$"+t+"RotateRate"}}},{$sort:{_id:-1}},{$limit:100},{$addFields:{side:t}}]})},F=function(t){(0,l.Z)(n,t);var e=(0,s.Z)(n);function n(t){var i;return(0,a.Z)(this,n),(i=e.call(this,t)).componentDidMount=function(){i.refreshList(),i.timer()},i.componentWillUnmount=function(){clearInterval(i.timer)},i.timer=function(){setInterval((function(){i.refreshList()}),5e3)},i.config={xField:"_id",yField:"rrate",seriesField:"side",xAxis:{tickCount:5,type:"time",mask:"DD/MMM/YY HH:mm",title:{text:"Time"}},yAxis:{tickCount:10,title:{text:"Motor rotation rate [rad/s]"}},tooltip:{formatter:function(t){return null!=t.rrate?{name:"Rotation rate",value:t.rrate.toFixed(1)+" rad/s"}:{}}}},i.state={data:[],right:[],left:[],ticks:-1},i}return(0,o.Z)(n,[{key:"refreshList",value:function(){var t=this;fetch((0,d.HQ)(),(0,d.wY)(S("left"))).then((function(t){return t.json()})).then((function(e){t.setState({left:e})})).then((function(){fetch((0,d.HQ)(),(0,d.wY)(S("right"))).then((function(t){return t.json()})).then((function(e){t.setState({right:e})})).then((function(){t.setState({data:[].concat((0,r.Z)(t.state.left),(0,r.Z)(t.state.right))}),clearInterval(t.timer)})).catch((function(t){console.log(t)}))})).catch((function(t){console.log(t)}))}},{key:"render",value:function(){return(0,m.jsx)(u.Z,(0,i.Z)((0,i.Z)((0,i.Z)({},this.config),f.Z.plot),{},{data:this.state.data}))}}]),n}(c.Component),I={SimplePlot:[{plot:(0,m.jsx)(g,{}),title:"Motors currents by time",label:"Current by time",key:"motors-current-time-are"},{plot:(0,m.jsx)($,{}),title:"Motors actual states",label:"Bullets",key:"motors-motors--bullet"},{plot:(0,m.jsx)(M,{}),title:"Motors PWM by time",label:"PWM by time",key:"motors-PWM-time-are"},{plot:(0,m.jsx)(F,{}),title:"Motors rotation rate by time",label:"Rotation rate by time",key:"motors-rrate-time-are"}],LargePlot:[],BigPlot:[]}},87072:function(t,e,n){n.r(e),n.d(e,{default:function(){return j}});var i=n(1413),r=n(32063),a=n(15671),o=n(43144),l=n(60136),s=n(29388),c=n(47313),u=n(57829),d=n(42832),f=n(61113),m=n(10347),h=n(45639),g=n(40040),p=n(46417),Z=JSON.stringify({dataSource:"CeDRI",database:"CeDRI_UGV_datalake",collection:"Motor",pipeline:[{$project:{_id:0,header:0}},{$sort:{dateTime:-1}},{$limit:1e3}]}),x=function(t){(0,l.Z)(n,t);var e=(0,s.Z)(n);function n(){return(0,a.Z)(this,n),e.apply(this,arguments)}return(0,o.Z)(n,[{key:"render",value:function(){return(0,p.jsx)(m.Z,{sx:g.Z,content:!1,children:(0,p.jsx)(u.Z,{sx:{p:3,pb:0},children:(0,p.jsxs)(d.Z,{spacing:2,children:[(0,p.jsx)(f.Z,{variant:"h3",color:"textSecondary",children:"Motors data"}),(0,p.jsx)(h.Z,{raw:Z})]})})})}}]),n}(c.Component),v=n(59615),y=n(8384),P=n(88461),j=function(){return(0,p.jsxs)(r.Z,(0,i.Z)((0,i.Z)({container:!0},P.Z.grid.main),{},{children:[(0,p.jsx)(r.Z,(0,i.Z)((0,i.Z)({item:!0},P.Z.grid.item),{},{children:(0,p.jsx)(y.Z,{Plot:v.Z})})),(0,p.jsx)(r.Z,(0,i.Z)((0,i.Z)({item:!0},P.Z.grid.item),{},{children:(0,p.jsx)(x,{})}))]}))}},88461:function(t,e){e.Z={stack:{spacing:0,direction:"column",alignItems:"center",xs:1,sm:1,md:1,lg:1,xl:1,sx:{mt:1,mr:1,ml:1,mb:1}},box:{xs:1,sm:1,md:1,lg:1,xl:1,sx:{mt:1,mr:1,ml:1,mb:1,display:"grid",gridAutoRows:"100%",gap:1},height:"100%"},grid:{main:{direction:"row",justifyContent:"center",alignItems:"stretch",spacing:2},item:{justifyContent:"center",alignItems:"stretch",xs:12,sm:12,md:12,lg:12,xl:12,spacing:0,sx:{mt:0,mr:1,ml:1,mb:0}}}}},45639:function(t,e,n){n.d(e,{Z:function(){return f}});var i=n(1413),r=n(15671),a=n(43144),o=n(60136),l=n(29388),s=n(47313),c=n(28559),u=n(8515),d=n(46417),f=function(t){(0,o.Z)(n,t);var e=(0,l.Z)(n);function n(t){var a;return(0,r.Z)(this,n),(a=e.call(this,t)).fetchData=function(){a.setState({loading:!0}),fetch((0,u.HQ)(),(0,u.wY)(a.props.raw)).then((function(t){return t.json()})).then((function(t){var e=a.generateColumns(t);a.setState({loading:!1,data:t,columns:e})})).catch((function(t){console.log(t),a.setState({loading:!1})}))},a.generateColumns=function(t){return null===t[0]?null:Object.keys(t[0]).map((function(t){return{title:t,dataIndex:t,key:t,sorter:!0,render:function(t){if("object"===typeof t){var e=a.generateColumns([t]),n=[t];return(0,d.jsx)(c.Z,{columns:e,dataSource:n,pagination:!1,size:"small"})}return t}}})).sort((function(t,e){return a.sortColumn(t.title,e.title)}))},a.sortColumn=function(t,e){return"dateTime"==t?-1:"dateTime"==e?1:t.toUpperCase()<e.toUpperCase()?-1:t.toUpperCase()>e.toUpperCase()?1:0},a.handleTableChange=function(t,e,n){var r=(0,i.Z)({},a.state.pagination);r.current=t.current,a.setState({pagination:r}),a.fetchData((0,i.Z)({results:t.pageSize,page:t.current,sortField:n.field,sortOrder:n.order},e))},a.state={data:[],pagination:{},loading:!1,columns:[]},a}return(0,a.Z)(n,[{key:"componentDidMount",value:function(){this.fetchData()}},{key:"render",value:function(){var t=this.state,e=t.loading,n=t.data,i=t.columns;return(0,d.jsx)(c.Z,{columns:i,rowKey:function(t){return t._id},dataSource:n,pagination:!0,loading:e,onChange:this.handleTableChange,scroll:{scrollToFirstRowOnChange:!0,x:!0},size:"small",tableLayout:"auto",width:"auto"})}}]),n}(s.Component)},40040:function(t,e){e.Z={width:1,height:1,minHeight:1,maxHeight:1,minWidth:1,maxWidth:1,mt:1,gap:2}}}]);