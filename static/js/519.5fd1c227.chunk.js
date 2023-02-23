"use strict";(self.webpackChunkcedri_ugv_dashboard=self.webpackChunkcedri_ugv_dashboard||[]).push([[519],{2122:function(t,e,n){n.d(e,{Z:function(){return Z}});var a=n(1413),i=n(15671),r=n(43144),o=n(60136),s=n(27277),c=n(47313),l=n(90722),u=n(8515),d=n(80169),h=n(44090),m=n(62463),f=n(42669),g=n(46417),p=JSON.stringify({dataSource:"CeDRI",database:"CeDRI_UGV_datalake",collection:"Battery",pipeline:[{$project:{dateTime:{$dateTrunc:{date:"$dateTime",unit:"minute"}},current:1}},{$densify:{field:"dateTime",range:{step:1,unit:"minute",bounds:"full"}}},{$group:{_id:"$dateTime",current:{$avg:"$current"}}},{$sort:{_id:-1}},{$limit:100}]}),Z=function(t){(0,o.Z)(n,t);var e=(0,s.Z)(n);function n(t){var a;return(0,i.Z)(this,n),(a=e.call(this,t)).componentDidMount=function(){a.timer()},a.componentWillUnmount=function(){clearInterval(a.timer)},a.timer=function(){setInterval((function(){a.canUpdate()}),1e3)},a.config={xField:"_id",yField:"current",xAxis:{tickCount:5,type:"time",mask:"DD/MMM/YY HH:mm",title:{text:"Time"}},yAxis:{tickCount:10,title:{text:"Battery current [A]"}},tooltip:{formatter:function(t){return null!=t.current?{name:"Current",value:t.current.toFixed(1)+" A"}:{}}}},a.state={data:[],ticks:-1},a}return(0,r.Z)(n,[{key:"canUpdate",value:function(){JSON.parse(window.localStorage.getItem("fromLocal"))||this.state.ticks<=0?(this.setState({ticks:10}),this.refreshList()):JSON.parse(window.localStorage.getItem("fromLocal"))||this.setState({ticks:this.state.ticks-1})}},{key:"refreshList",value:function(){var t=this;fetch((0,u.H)(),(0,u.w)(p)).then((function(t){return t.json()})).then((function(e){t.setState({data:e})})).catch((function(t){console.log(t)}))}},{key:"render",value:function(){return(0,g.jsx)(d.Z,(0,a.Z)((0,a.Z)({},h.Z.maincard),{},{children:(0,g.jsxs)(m.Z,(0,a.Z)((0,a.Z)({},h.Z.stack),{},{children:[(0,g.jsx)(f.Z,(0,a.Z)((0,a.Z)({},h.Z.typography.title),{},{children:"Battery current by time"})),(0,g.jsx)(l.Z,(0,a.Z)((0,a.Z)((0,a.Z)({},this.config),h.Z.plot),{},{data:this.state.data}))]}))}))}}]),n}(c.Component)},47103:function(t,e,n){n.d(e,{Z:function(){return j}});var a=n(1413),i=n(44090),r=n(15671),o=n(43144),s=n(60136),c=n(27277),l=n(47313),u=n(20061),d=n(8515),h=n(62463),m=n(42669),f=n(46417),g=JSON.stringify({dataSource:"CeDRI",database:"CeDRI_UGV_datalake",collection:"Battery",pipeline:[{$project:{dateTime:1,percentage:1}},{$sort:{dateTime:-1}},{$limit:1}]}),p=function(t){(0,s.Z)(n,t);var e=(0,c.Z)(n);function n(t){var a;return(0,r.Z)(this,n),(a=e.call(this,t)).componentDidMount=function(){a.refreshList(),a.timer()},a.componentWillUnmount=function(){clearInterval(a.timer)},a.timer=function(){setInterval((function(){a.canUpdate()}),1e3)},a.config={color:{range:["#82FF74","#BAFF7D","#F5F16E","#FFBC6D","#FF7772"],measure:"#5B8FF9",target:"#39a3f4"}},a.data=function(){return[{title:" ",ranges:[20,40,60,80,100],measures:[0],value:Math.round(100*a.state.data.percentage)}]},a.state={data:[],ticks:-1},a}return(0,o.Z)(n,[{key:"canUpdate",value:function(){JSON.parse(window.localStorage.getItem("fromLocal"))||this.state.ticks<=0?(this.setState({ticks:10}),this.refreshList()):JSON.parse(window.localStorage.getItem("fromLocal"))||this.setState({ticks:this.state.ticks-1})}},{key:"refreshList",value:function(){var t=this;fetch((0,d.H)(),(0,d.w)(g)).then((function(t){return t.json()})).then((function(e){t.setState({data:e[0]})})).catch((function(t){console.log(t)}))}},{key:"render",value:function(){return(0,f.jsxs)(h.Z,{children:[(0,f.jsx)(u.Z,(0,a.Z)((0,a.Z)((0,a.Z)({},this.config),i.Z.bullet.dual),{},{data:this.data()})),(0,f.jsx)(m.Z,(0,a.Z)((0,a.Z)({},i.Z.typography.subtitle),{},{children:"Percentage"}))]})}}]),n}(l.Component),Z=JSON.stringify({dataSource:"CeDRI",database:"CeDRI_UGV_datalake",collection:"Battery",pipeline:[{$project:{dateTime:1,current:1}},{$sort:{dateTime:-1}},{$limit:1}]}),y=function(t){(0,s.Z)(n,t);var e=(0,c.Z)(n);function n(t){var a;return(0,r.Z)(this,n),(a=e.call(this,t)).componentDidMount=function(){a.refreshList(),a.timer()},a.componentWillUnmount=function(){clearInterval(a.timer)},a.timer=function(){setInterval((function(){a.canUpdate()}),1e3)},a.config={color:{range:["#FF7772","#F5F16E","#82FF74"],measure:"#5B8FF9",target:"#39a3f4"}},a.data=function(){return[{title:" ",ranges:[2,3,3.5],measures:[0],value:Math.round(100*a.state.data.current)/100}]},a.state={data:[],ticks:-1},a}return(0,o.Z)(n,[{key:"canUpdate",value:function(){JSON.parse(window.localStorage.getItem("fromLocal"))||this.state.ticks<=0?(this.setState({ticks:10}),this.refreshList()):JSON.parse(window.localStorage.getItem("fromLocal"))||this.setState({ticks:this.state.ticks-1})}},{key:"refreshList",value:function(){var t=this;fetch((0,d.H)(),(0,d.w)(Z)).then((function(t){return t.json()})).then((function(e){t.setState({data:e[0]})})).catch((function(t){console.log(t)}))}},{key:"render",value:function(){return(0,f.jsxs)(h.Z,{children:[(0,f.jsx)(u.Z,(0,a.Z)((0,a.Z)((0,a.Z)({},this.config),i.Z.bullet.dual),{},{data:this.data()})),(0,f.jsx)(m.Z,(0,a.Z)((0,a.Z)({},i.Z.typography.subtitle),{},{children:"Current"}))]})}}]),n}(l.Component),v=JSON.stringify({dataSource:"CeDRI",database:"CeDRI_UGV_datalake",collection:"Battery",pipeline:[{$project:{dateTime:1,voltage:1}},{$sort:{dateTime:-1}},{$limit:1}]}),k=function(t){(0,s.Z)(n,t);var e=(0,c.Z)(n);function n(t){var a;return(0,r.Z)(this,n),(a=e.call(this,t)).componentDidMount=function(){a.refreshList(),a.timer()},a.componentWillUnmount=function(){clearInterval(a.timer)},a.timer=function(){setInterval((function(){a.canUpdate()}),1e3)},a.config={color:{range:["#FF7772","#FFBC6D","#F5F16E","#BAFF7D","#82FF74","#FF7772"],measure:"#5B8FF9",target:"#39a3f4"}},a.data=function(){return[{title:" ",ranges:[20,23,24,25,27,28],measures:[0],value:Math.round(100*a.state.data.voltage)/100}]},a.state={data:[],ticks:-1},a}return(0,o.Z)(n,[{key:"canUpdate",value:function(){JSON.parse(window.localStorage.getItem("fromLocal"))||this.state.ticks<=0?(this.setState({ticks:10}),this.refreshList()):JSON.parse(window.localStorage.getItem("fromLocal"))||this.setState({ticks:this.state.ticks-1})}},{key:"refreshList",value:function(){var t=this;fetch((0,d.H)(),(0,d.w)(v)).then((function(t){return t.json()})).then((function(e){t.setState({data:e[0]})})).catch((function(t){console.log(t)}))}},{key:"render",value:function(){return(0,f.jsxs)(h.Z,{children:[(0,f.jsx)(u.Z,(0,a.Z)((0,a.Z)({},this.config),{},{data:this.data()},i.Z.bullet.dual)),(0,f.jsx)(m.Z,(0,a.Z)((0,a.Z)({},i.Z.typography.subtitle),{},{children:"Voltage"}))]})}}]),n}(l.Component),x=JSON.stringify({dataSource:"CeDRI",database:"CeDRI_UGV_datalake",collection:"Battery",pipeline:[{$project:{dateTime:1,current:1}},{$sort:{dateTime:-1}},{$limit:1}]}),F=function(t){(0,s.Z)(n,t);var e=(0,c.Z)(n);function n(t){var a;return(0,r.Z)(this,n),(a=e.call(this,t)).componentDidMount=function(){a.refreshList(),a.timer()},a.componentWillUnmount=function(){clearInterval(a.timer)},a.timer=function(){setInterval((function(){a.canUpdate()}),1e3)},a.config={color:{range:["#FF7772","#FFBC6D","#F5F16E","#BAFF7D","#82FF74","#FF7772"],measure:"#5B8FF9",target:"#39a3f4"}},a.data=function(){return[{title:" ",ranges:[10,18,22,30,40,50],measures:[0],value:Math.round(100*a.state.data.current)/100}]},a.state={data:[],ticks:-1},a}return(0,o.Z)(n,[{key:"canUpdate",value:function(){JSON.parse(window.localStorage.getItem("fromLocal"))||this.state.ticks<=0?(this.setState({ticks:10}),this.refreshList()):JSON.parse(window.localStorage.getItem("fromLocal"))||this.setState({ticks:this.state.ticks-1})}},{key:"refreshList",value:function(){var t=this;fetch((0,d.H)(),(0,d.w)(x)).then((function(t){return t.json()})).then((function(e){t.setState({data:e[0]})})).catch((function(t){console.log(t)}))}},{key:"render",value:function(){return(0,f.jsxs)(h.Z,{children:[(0,f.jsx)(u.Z,(0,a.Z)((0,a.Z)({},this.config),{},{data:this.data()},i.Z.bullet.dual)),(0,f.jsx)(m.Z,(0,a.Z)((0,a.Z)({},i.Z.typography.subtitle),{},{children:"Temp."}))]})}}]),n}(l.Component),S=n(80169),j=function(){return(0,f.jsx)(S.Z,(0,a.Z)((0,a.Z)({},i.Z.maincard),{},{children:(0,f.jsxs)(h.Z,(0,a.Z)((0,a.Z)({},i.Z.stack),{},{children:[(0,f.jsx)(m.Z,(0,a.Z)((0,a.Z)({},i.Z.typography.title),{},{children:"Battery actual states"})),(0,f.jsxs)(h.Z,(0,a.Z)((0,a.Z)({},i.Z.bullet.stack),{},{children:[(0,f.jsx)(p,{}),(0,f.jsx)(y,{}),(0,f.jsx)(k,{}),(0,f.jsx)(F,{})]}))]}))}))}},83007:function(t,e,n){n.d(e,{Z:function(){return Z}});var a=n(1413),i=n(15671),r=n(43144),o=n(60136),s=n(27277),c=n(47313),l=n(90722),u=n(8515),d=n(80169),h=n(44090),m=n(62463),f=n(42669),g=n(46417),p=JSON.stringify({dataSource:"CeDRI",database:"CeDRI_UGV_datalake",collection:"Battery",pipeline:[{$project:{dateTime:{$dateTrunc:{date:"$dateTime",unit:"minute"}},percentage:1}},{$densify:{field:"dateTime",range:{step:1,unit:"minute",bounds:"full"}}},{$group:{_id:"$dateTime",percentage:{$avg:"$percentage"}}},{$sort:{_id:-1}},{$limit:100},{$project:{percentage:{$multiply:["$percentage",100]}}}]}),Z=function(t){(0,o.Z)(n,t);var e=(0,s.Z)(n);function n(t){var a;return(0,i.Z)(this,n),(a=e.call(this,t)).componentDidMount=function(){a.refreshList(),a.timer()},a.componentWillUnmount=function(){clearInterval(a.timer)},a.timer=function(){setInterval((function(){a.canUpdate()}),1e3)},a.config={xField:"_id",yField:"percentage",xAxis:{tickCount:5,type:"time",mask:"DD/MMM/YY HH:mm",title:{text:"Time"}},yAxis:{tickCount:10,title:{text:"Battery percentage [%]"}},tooltip:{formatter:function(t){return null!=t.percentage?{name:"Percentage",value:t.percentage.toFixed(1)+"%"}:{}}}},a.state={data:[],ticks:-1},a}return(0,r.Z)(n,[{key:"canUpdate",value:function(){JSON.parse(window.localStorage.getItem("fromLocal"))||this.state.ticks<=0?(this.setState({ticks:10}),this.refreshList()):JSON.parse(window.localStorage.getItem("fromLocal"))||this.setState({ticks:this.state.ticks-1})}},{key:"refreshList",value:function(){var t=this;fetch((0,u.H)(),(0,u.w)(p)).then((function(t){return t.json()})).then((function(e){t.setState({data:e})})).catch((function(t){console.log(t)}))}},{key:"render",value:function(){return(0,g.jsx)(d.Z,(0,a.Z)((0,a.Z)({},h.Z.maincard),{},{children:(0,g.jsxs)(m.Z,(0,a.Z)((0,a.Z)({},h.Z.stack),{},{children:[(0,g.jsx)(f.Z,(0,a.Z)((0,a.Z)({},h.Z.typography.title),{},{children:"Battery percentage by time"})),(0,g.jsx)(l.Z,(0,a.Z)((0,a.Z)((0,a.Z)({},this.config),h.Z.plot),{},{data:this.state.data}))]}))}))}}]),n}(c.Component)},44090:function(t,e,n){var a=n(63509),i={bullet:{simple:{measureField:"measures",rangeField:"ranges",targetField:"value",xField:"title",size:{range:30,measure:0,target:30},height:50,width:300,xAxis:{line:null},yAxis:!1,label:{measure:!1,target:!0},animation:!1},dual:{measureField:"measures",rangeField:"ranges",targetField:"value",xField:"title",size:{range:30,measure:0,target:30},height:178,width:90,xAxis:{line:null},yAxis:!1,label:{measure:!1,target:!0},layout:"vertical",animation:!1},stack:{direction:"row",divider:(0,n(46417).jsx)(a.Z,{orientation:"vertical",flexItem:!0}),justifyContent:"space-evenly",alignItems:"center",spacing:0}},plot:{smooth:!0,animation:!1,style:{width:"100%",height:200}},typography:{title:{align:"center",variant:"h5",color:"textSecondary"},subtitle:{align:"center",variant:"h5",color:"textSecondary"}},stack:{direction:"column",alignItems:"center",justifyContent:"space-evenly",spacing:1,sx:{mt:1,mr:1,ml:1,mb:1}},maincard:{xs:1,sm:1,md:1,lg:1,xl:1,sx:{mt:1,mr:1,ml:1,mb:1},height:"100%",content:!1},box:{xs:1,sm:1,md:1,lg:1,xl:1,sx:{mt:1,mr:1,ml:1,mb:1,display:"grid",gridAutoRows:"100%",gap:1},height:"100%"},map:{style:{width:"100%",height:450}},statusIcon:{popup:{icon:{sx:{width:35,height:35}},typography:{primary:{align:"left",variant:"h5",color:"textPrimary"},secondary:{align:"left",variant:"body1",color:"textSecondary"}},popover:{title:"Log",trigger:"click"}},badge:{overlap:"circular",anchorOrigin:{vertical:"bottom",horizontal:"right"},size:"lg"},avatar:{sx:{bgcolor:"transparent"}},icon:{main:{color:"gray",sx:{height:107,width:67}},badge:{sx:{width:37,height:37}}},grid:{direction:"row",justifyContent:"center",alignItems:"center",sx:{height:202}}}};e.Z=i}}]);