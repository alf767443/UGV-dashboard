"use strict";(self.webpackChunkcedri_ugv_dashboard=self.webpackChunkcedri_ugv_dashboard||[]).push([[542],{63819:function(t,e,n){n.r(e),n.d(e,{default:function(){return y}});var i=n(1413),a=n(11556),r=n(15671),s=n(43144),o=n(60136),c=n(29388),d=n(47313),l=n(16157),m=n(62463),u=n(42669),h=n(80169),g=n(97077),x=n(8515),f=n(46417),Z=JSON.stringify({dataSource:"CeDRI",database:"CeDRI_UGV_datalake",collection:"Connection",pipeline:[{$project:{_id:0}},{$sort:{dateTime:-1}},{$limit:1e3}]}),p=[{title:"Time",dataIndex:"dateTime",key:"dateTime",sorter:{compare:function(t,e){return t.dateTime-e.dateTime},multiple:1},defaultSortOrder:"descend"},{title:"Connect",dataIndex:["Connect"],key:"connect"},{title:"RTT",dataIndex:["RTT"],key:"RTT"}],j=function(t){(0,o.Z)(n,t);var e=(0,c.Z)(n);function n(t){var i;return(0,r.Z)(this,n),(i=e.call(this,t)).componentDidMount=function(){i.refreshList()},i.state={data:[],ticks:-1},i}return(0,s.Z)(n,[{key:"refreshList",value:function(){var t=this;fetch((0,x.H)(),(0,x.w)(Z)).then((function(t){return t.json()})).then((function(e){t.setState({data:e})})).catch((function(t){console.log(t)}))}},{key:"render",value:function(){return(0,f.jsx)(g.Z,{columns:p,dataSource:this.state.data,pagination:this.state.pagination,loading:this.state.loading,onChange:this.handleTableChange,sx:this.props.sx})}}]),n}(d.Component),C=n(40040),k=function(t){(0,o.Z)(n,t);var e=(0,c.Z)(n);function n(){return(0,r.Z)(this,n),e.apply(this,arguments)}return(0,s.Z)(n,[{key:"render",value:function(){return(0,f.jsx)(h.Z,{sx:C.Z,content:!1,children:(0,f.jsx)(l.Z,{sx:{p:3,pb:0},children:(0,f.jsxs)(m.Z,{spacing:2,children:[(0,f.jsx)(u.Z,{variant:"h3",color:"textSecondary",children:"Connection data"}),(0,f.jsx)(j,{})]})})})}}]),n}(d.Component),T=n(88461),y=function(){return(0,f.jsxs)(a.Z,(0,i.Z)((0,i.Z)({container:!0},T.Z.grid.main),{},{children:[(0,f.jsx)(a.Z,(0,i.Z)({item:!0},T.Z.grid.item)),(0,f.jsx)(a.Z,(0,i.Z)((0,i.Z)({item:!0},T.Z.grid.item),{},{children:(0,f.jsx)(k,{})}))]}))}},88461:function(t,e){e.Z={stack:{spacing:0,direction:"column",alignItems:"center",xs:1,sm:1,md:1,lg:1,xl:1,sx:{mt:1,mr:1,ml:1,mb:1}},box:{xs:1,sm:1,md:1,lg:1,xl:1,sx:{mt:1,mr:1,ml:1,mb:1,display:"grid",gridAutoRows:"100%",gap:1},height:"100%"},grid:{main:{direction:"row",justifyContent:"center",alignItems:"stretch",spacing:2},item:{justifyContent:"center",alignItems:"stretch",xs:12,sm:12,md:12,lg:12,xl:12,spacing:0,sx:{mt:0,mr:1,ml:1,mb:0}}}}},40040:function(t,e){e.Z={width:1,height:1,minHeight:1,maxHeight:1,minWidth:1,maxWidth:1,mt:1,gap:2}}}]);