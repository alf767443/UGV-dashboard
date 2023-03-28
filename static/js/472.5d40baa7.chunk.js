"use strict";(self.webpackChunkcedri_ugv_dashboard=self.webpackChunkcedri_ugv_dashboard||[]).push([[472],{58472:function(t,e,n){n.r(e),n.d(e,{default:function(){return j}});var r=n(1413),a=n(11556),i=n(15671),o=n(43144),s=n(60136),c=n(29388),u=n(47313),l=n(16157),d=n(62463),m=n(42669),g=n(45848),h=n(45639),p=n(40040),f=n(46417),Z=JSON.stringify({dataSource:"CeDRI",database:"CeDRI_UGV_datalake",collection:"Processes",pipeline:[{$project:{_id:0,header:0,process:0,"computer.net_conn":0}},{$sort:{dateTime:-1}},{$limit:10}]}),x=function(t){(0,s.Z)(n,t);var e=(0,c.Z)(n);function n(){return(0,i.Z)(this,n),e.apply(this,arguments)}return(0,o.Z)(n,[{key:"render",value:function(){return(0,f.jsx)(g.Z,{sx:p.Z,content:!1,children:(0,f.jsxs)(l.Z,{sx:{p:3,pb:0},children:[(0,f.jsx)(d.Z,{spacing:2,children:(0,f.jsx)(m.Z,{variant:"h3",color:"textSecondary",children:"Computer uses data table"})}),(0,f.jsx)(h.Z,{raw:Z})]})})}}]),n}(u.Component),C=n(88461),j=function(){return(0,f.jsxs)(a.Z,(0,r.Z)((0,r.Z)({container:!0},C.Z.grid.main),{},{children:[(0,f.jsx)(a.Z,(0,r.Z)({item:!0},C.Z.grid.item)),(0,f.jsx)(a.Z,(0,r.Z)((0,r.Z)({item:!0},C.Z.grid.item),{},{children:(0,f.jsx)(x,{})}))]}))}},88461:function(t,e){e.Z={stack:{spacing:0,direction:"column",alignItems:"center",xs:1,sm:1,md:1,lg:1,xl:1,sx:{mt:1,mr:1,ml:1,mb:1}},box:{xs:1,sm:1,md:1,lg:1,xl:1,sx:{mt:1,mr:1,ml:1,mb:1,display:"grid",gridAutoRows:"100%",gap:1},height:"100%"},grid:{main:{direction:"row",justifyContent:"center",alignItems:"stretch",spacing:2},item:{justifyContent:"center",alignItems:"stretch",xs:12,sm:12,md:12,lg:12,xl:12,spacing:0,sx:{mt:0,mr:1,ml:1,mb:0}}}}},45639:function(t,e,n){n.d(e,{Z:function(){return m}});var r=n(1413),a=n(15671),i=n(43144),o=n(60136),s=n(29388),c=n(47313),u=n(12951),l=n(8515),d=n(46417),m=function(t){(0,o.Z)(n,t);var e=(0,s.Z)(n);function n(t){var i;return(0,a.Z)(this,n),(i=e.call(this,t)).fetchData=function(){i.setState({loading:!0}),fetch((0,l.H)(),(0,l.w)(i.props.raw)).then((function(t){return t.json()})).then((function(t){var e=i.generateColumns(t);i.setState({loading:!1,data:t,columns:e})})).catch((function(t){console.log(t),i.setState({loading:!1})}))},i.generateColumns=function(t){return null===t[0]?null:Object.keys(t[0]).map((function(t){return{title:t,dataIndex:t,key:t,sorter:!0,render:function(t){if("object"===typeof t){var e=i.generateColumns([t]),n=[t];return(0,d.jsx)(u.Z,{columns:e,dataSource:n,pagination:!1,size:"small"})}return t}}})).sort((function(t,e){return i.sortColumn(t.title,e.title)}))},i.sortColumn=function(t,e){return"dateTime"==t?-1:"dateTime"==e?1:t.toUpperCase()<e.toUpperCase()?-1:t.toUpperCase()>e.toUpperCase()?1:0},i.handleTableChange=function(t,e,n){var a=(0,r.Z)({},i.state.pagination);a.current=t.current,i.setState({pagination:a}),i.fetchData((0,r.Z)({results:t.pageSize,page:t.current,sortField:n.field,sortOrder:n.order},e))},i.state={data:[],pagination:{},loading:!1,columns:[]},i}return(0,i.Z)(n,[{key:"componentDidMount",value:function(){this.fetchData()}},{key:"render",value:function(){var t=this.state,e=t.loading,n=t.data,r=t.columns;return(0,d.jsx)(u.Z,{columns:r,rowKey:function(t){return t._id},dataSource:n,pagination:!0,loading:e,onChange:this.handleTableChange,scroll:{scrollToFirstRowOnChange:!0,x:!0},size:"small",tableLayout:"auto",width:"auto"})}}]),n}(c.Component)},40040:function(t,e){e.Z={width:1,height:1,minHeight:1,maxHeight:1,minWidth:1,maxWidth:1,mt:1,gap:2}}}]);