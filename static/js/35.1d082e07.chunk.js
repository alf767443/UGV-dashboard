"use strict";(self.webpackChunkcedri_ugv_dashboard=self.webpackChunkcedri_ugv_dashboard||[]).push([[35],{16035:function(t,e,n){n.r(e),n.d(e,{default:function(){return v}});var i=n(82937),a=n(15671),r=n(43144),s=n(60136),o=n(27277),u=n(47313),c=n(16157),d=n(62463),h=n(42669),l=n(8200),f=n(26899),p=n(8515),m=n(46417),x=[{title:"Time",dataIndex:"dateTime",key:"dateTime",sorter:{compare:function(t,e){return t.dateTime-e.dateTime},multiple:1},defaultSortOrder:"descend"},{title:"Mark",dataIndex:["Fiducial","Mark"],key:"mark"}],g=function(t){(0,s.Z)(n,t);var e=(0,o.Z)(n);function n(t){var i;return(0,a.Z)(this,n),(i=e.call(this,t)).state={data:[]},i}return(0,r.Z)(n,[{key:"refreshList",value:function(){var t=this;fetch(p.H.API+"position/table=Fiducial").then((function(t){return t.json()})).then((function(e){t.setState({data:e})}))}},{key:"componentDidMount",value:function(){this.refreshList()}},{key:"render",value:function(){return console.log(this.state.data),(0,m.jsx)(f.Z,{columns:x,dataSource:this.state.data,pagination:this.state.pagination,loading:this.state.loading,onChange:this.handleTableChange,sx:this.props.sx})}}]),n}(u.Component),Z=n(40040),k=function(t){(0,s.Z)(n,t);var e=(0,o.Z)(n);function n(){return(0,a.Z)(this,n),e.apply(this,arguments)}return(0,r.Z)(n,[{key:"render",value:function(){return(0,m.jsx)(l.Z,{sx:Z.Z,content:!1,children:(0,m.jsxs)(c.Z,{sx:{p:3,pb:0},children:[(0,m.jsx)(d.Z,{spacing:2,children:(0,m.jsx)(h.Z,{variant:"h3",color:"textSecondary",children:"Fiducial mark"})}),(0,m.jsx)(g,{})]})})}}]),n}(u.Component),v=function(){return(0,m.jsx)(i.ZP,{container:!0,rowSpacing:2.75,columnSpacing:1,children:(0,m.jsx)(k,{})})}},40040:function(t,e){e.Z={width:1,height:1,minHeight:1,maxHeight:1,minWidth:1,maxWidth:1,mt:2,gap:2}}}]);