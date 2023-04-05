"use strict";(self.webpackChunkcedri_ugv_dashboard=self.webpackChunkcedri_ugv_dashboard||[]).push([[283],{8384:function(t,e,n){n.d(e,{Z:function(){return j}});var o=n(1413),r=n(15671),i=n(43144),a=n(60136),l=n(29388),s=n(47313),c=n(82937),p=n(62463),g=n(42669),u=n(56448),m=n(45848),d={typography:{align:"left",variant:"h3",color:"textSecondary",xs:12,sm:12,md:12,lg:12,xl:12},stack:{spacing:2,xs:1,sm:1,md:1,lg:1,xl:1,sx:{mt:1,mr:1,ml:1,mb:0}},box:{xs:1,sm:1,md:1,lg:1,xl:1,sx:{mt:1,mr:0,ml:0,mb:0,gap:1},height:"100%"},grid:{main:{direction:"row",justifyContent:"center",alignItems:"stretch",spacing:0},item:{justifyContent:"center",alignItems:"stretch",xs:12,sm:12,md:12,lg:6,xl:6,spacing:0}}},h=n(79298),Z=n(68756),f=n(97849),x=n(16031),P=n(46417),j=function(t){(0,a.Z)(n,t);var e=(0,l.Z)(n);function n(t){var i;return(0,r.Z)(this,n),(i=e.call(this,t)).hadleChange=function(t,e){i.setState({page:e}),i.componentDidMount()},i.componentDidMount=function(){i.graphs()},i.numberPages=function(){return(0,x.round)(i.props.Plot.SimplePlot.length/2)+i.props.Plot.LargePlot.length+i.props.Plot.BigPlot.length},i.graphs=function(){var t=0,e=0;switch(!0){case i.state.page<=(0,x.round)(i.props.Plot.SimplePlot.length/2):return console.log("a"),t=2*(i.state.page-1),e=2*i.state.page>i.props.Plot.SimplePlot.length?t+1:t+2,(0,P.jsx)(c.ZP,(0,o.Z)((0,o.Z)({container:!0},d.grid.main),{},{children:i.props.Plot.SimplePlot.slice(t,e).map((function(t){return(0,s.createElement)(c.ZP,(0,o.Z)((0,o.Z)({item:!0},d.grid.item),{},{key:t.key}),(0,P.jsx)(h.Z,{graph:t.plot,title:t.title,position:null,static:!0}))}))}));case i.state.page>(0,x.round)(i.props.Plot.SimplePlot.length/2)&&i.state.page<=(0,x.round)(i.props.Plot.SimplePlot.length/2)+i.props.Plot.LargePlot.length:return console.log("b"),e=(t=i.state.page-(0,x.round)(i.props.Plot.SimplePlot.length/2)-1)+1,(0,P.jsx)(c.ZP,(0,o.Z)((0,o.Z)({container:!0},d.grid.main),{},{children:i.props.Plot.LargePlot.slice(t,e).map((function(t){return(0,s.createElement)(c.ZP,(0,o.Z)((0,o.Z)({item:!0},d.grid.item),{},{key:t.key}),(0,P.jsx)(Z.Z,{graph:t.plot,title:t.title,position:null,static:!0}))}))}));case i.state.page>(0,x.round)(i.props.Plot.SimplePlot.length/2)+i.props.Plot.LargePlot.length&&i.state.page<=(0,x.round)(i.props.Plot.SimplePlot.length/2)+i.props.Plot.LargePlot.length+i.props.Plot.BigPlot.length:return console.log("c"),e=(t=i.state.page-(0,x.round)(i.props.Plot.SimplePlot.length/2)+i.props.Plot.LargePlot.length-1)+1,console.log(i.props.Plot.BigPlot.slice(t,e)),(0,P.jsx)(c.ZP,(0,o.Z)((0,o.Z)({container:!0},d.grid.main),{},{children:i.props.Plot.BigPlot.slice(t,e).map((function(t){return(0,s.createElement)(c.ZP,(0,o.Z)((0,o.Z)({item:!0},d.grid.item),{},{key:t.key}),(0,P.jsx)(f.Z,{graph:t.plot,title:t.title,position:null,static:!0}))}))}));default:P.Fragment}},i.state={page:1},i}return(0,i.Z)(n,[{key:"render",value:function(){return(0,P.jsx)(m.Z,(0,o.Z)((0,o.Z)({},d.box),{},{children:(0,P.jsxs)(p.Z,(0,o.Z)((0,o.Z)({},d.stack),{},{children:[(0,P.jsx)(g.Z,(0,o.Z)((0,o.Z)({},d.typography),{},{children:this.props.title})),this.graphs(),(0,P.jsx)(u.Z,{count:this.numberPages(),defaultPage:1,siblingCount:0,page:this.state.page,onChange:this.hadleChange})]}))}))}}]),n}(s.Component)},42283:function(t,e,n){n.r(e),n.d(e,{default:function(){return C}});var o=n(1413),r=n(11556),i=n(15671),a=n(43144),l=n(60136),s=n(29388),c=n(47313),p=n(16157),g=n(62463),u=n(42669),m=n(45848),d=n(45639),h=n(40040),Z=n(46417),f=JSON.stringify({dataSource:"CeDRI",database:"CeDRI_UGV_datalake",collection:"Battery",pipeline:[{$project:{_id:0,header:0}},{$sort:{dateTime:-1}},{$limit:1e3}]}),x=function(t){(0,l.Z)(n,t);var e=(0,s.Z)(n);function n(){return(0,i.Z)(this,n),e.apply(this,arguments)}return(0,a.Z)(n,[{key:"render",value:function(){return(0,Z.jsx)(m.Z,{sx:h.Z,content:!1,children:(0,Z.jsx)(p.Z,{sx:{p:3,pb:0},children:(0,Z.jsxs)(g.Z,{spacing:2,children:[(0,Z.jsx)(u.Z,{variant:"h3",color:"textSecondary",children:"Battery data"}),(0,Z.jsx)(d.Z,{raw:f})]})})})}}]),n}(c.Component),P=n(8384),j=n(57689),y=n(88461),C=function(){return(0,Z.jsxs)(r.Z,(0,o.Z)((0,o.Z)({container:!0},y.Z.grid.main),{},{children:[(0,Z.jsx)(r.Z,(0,o.Z)((0,o.Z)({item:!0},y.Z.grid.item),{},{children:(0,Z.jsx)(P.Z,{Plot:j.Z})})),(0,Z.jsx)(r.Z,(0,o.Z)((0,o.Z)({item:!0},y.Z.grid.item),{},{children:(0,Z.jsx)(x,{})}))]}))}},88461:function(t,e){e.Z={stack:{spacing:0,direction:"column",alignItems:"center",xs:1,sm:1,md:1,lg:1,xl:1,sx:{mt:1,mr:1,ml:1,mb:1}},box:{xs:1,sm:1,md:1,lg:1,xl:1,sx:{mt:1,mr:1,ml:1,mb:1,display:"grid",gridAutoRows:"100%",gap:1},height:"100%"},grid:{main:{direction:"row",justifyContent:"center",alignItems:"stretch",spacing:2},item:{justifyContent:"center",alignItems:"stretch",xs:12,sm:12,md:12,lg:12,xl:12,spacing:0,sx:{mt:0,mr:1,ml:1,mb:0}}}}},45639:function(t,e,n){n.d(e,{Z:function(){return u}});var o=n(1413),r=n(15671),i=n(43144),a=n(60136),l=n(29388),s=n(47313),c=n(12951),p=n(8515),g=n(46417),u=function(t){(0,a.Z)(n,t);var e=(0,l.Z)(n);function n(t){var i;return(0,r.Z)(this,n),(i=e.call(this,t)).fetchData=function(){i.setState({loading:!0}),fetch((0,p.H)(),(0,p.w)(i.props.raw)).then((function(t){return t.json()})).then((function(t){var e=i.generateColumns(t);i.setState({loading:!1,data:t,columns:e})})).catch((function(t){console.log(t),i.setState({loading:!1})}))},i.generateColumns=function(t){return null===t[0]?null:Object.keys(t[0]).map((function(t){return{title:t,dataIndex:t,key:t,sorter:!0,render:function(t){if("object"===typeof t){var e=i.generateColumns([t]),n=[t];return(0,g.jsx)(c.Z,{columns:e,dataSource:n,pagination:!1,size:"small"})}return t}}})).sort((function(t,e){return i.sortColumn(t.title,e.title)}))},i.sortColumn=function(t,e){return"dateTime"==t?-1:"dateTime"==e?1:t.toUpperCase()<e.toUpperCase()?-1:t.toUpperCase()>e.toUpperCase()?1:0},i.handleTableChange=function(t,e,n){var r=(0,o.Z)({},i.state.pagination);r.current=t.current,i.setState({pagination:r}),i.fetchData((0,o.Z)({results:t.pageSize,page:t.current,sortField:n.field,sortOrder:n.order},e))},i.state={data:[],pagination:{},loading:!1,columns:[]},i}return(0,i.Z)(n,[{key:"componentDidMount",value:function(){this.fetchData()}},{key:"render",value:function(){var t=this.state,e=t.loading,n=t.data,o=t.columns;return(0,g.jsx)(c.Z,{columns:o,rowKey:function(t){return t._id},dataSource:n,pagination:!0,loading:e,onChange:this.handleTableChange,scroll:{scrollToFirstRowOnChange:!0,x:!0},size:"small",tableLayout:"auto",width:"auto"})}}]),n}(s.Component)},40040:function(t,e){e.Z={width:1,height:1,minHeight:1,maxHeight:1,minWidth:1,maxWidth:1,mt:1,gap:2}}}]);