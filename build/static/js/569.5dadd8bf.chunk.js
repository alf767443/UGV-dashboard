"use strict";(self.webpackChunkcedri_ugv_dashboard=self.webpackChunkcedri_ugv_dashboard||[]).push([[569],{8515:function(t,n,e){e.d(n,{H:function(){return i}});var i={API:"http://127.0.0.1:8000/"}},52569:function(t,n,e){e.r(n),e.d(n,{default:function(){return y}});var i=e(82937),a=e(15671),r=e(43144),o=e(60136),s=e(27277),c=e(47313),d=e(16157),u=e(62463),h=e(42669),l=e(8200),f=e(49113),p=e(8515),m=e(46417),x=[{title:"Time",dataIndex:"dateTime",key:"dateTime",sorter:{compare:function(t,n){return t.dateTime-n.dateTime},multiple:1},defaultSortOrder:"descend"},{title:"Decision",dataIndex:"Decision",key:"decision"},{title:"Priority",dataIndex:"Priority",key:"priority"}],g=function(t){(0,o.Z)(e,t);var n=(0,s.Z)(e);function e(t){var i;return(0,a.Z)(this,e),(i=n.call(this,t)).state={data:[]},i}return(0,r.Z)(e,[{key:"refreshList",value:function(){var t=this;fetch(p.H.API+"decisions/table=administrator").then((function(t){return t.json()})).then((function(n){t.setState({data:n})}))}},{key:"componentDidMount",value:function(){this.refreshList()}},{key:"render",value:function(){return console.log(this.state.data),(0,m.jsx)(f.Z,{columns:x,dataSource:this.state.data,pagination:this.state.pagination,loading:this.state.loading,onChange:this.handleTableChange,sx:this.props.sx})}}]),e}(c.Component),Z=e(40040),v=function(t){(0,o.Z)(e,t);var n=(0,s.Z)(e);function e(){return(0,a.Z)(this,e),n.apply(this,arguments)}return(0,r.Z)(e,[{key:"render",value:function(){return(0,m.jsx)(l.Z,{sx:Z.Z,content:!1,children:(0,m.jsxs)(d.Z,{sx:{p:3,pb:0},children:[(0,m.jsx)(u.Z,{spacing:2,children:(0,m.jsx)(h.Z,{variant:"h3",color:"textSecondary",children:"Administrator decisions"})}),(0,m.jsx)(g,{})]})})}}]),e}(c.Component),y=function(){return(0,m.jsx)(i.ZP,{container:!0,rowSpacing:2.75,columnSpacing:1,children:(0,m.jsx)(v,{})})}},40040:function(t,n){n.Z={width:1,height:1,minHeight:1,maxHeight:1,minWidth:1,maxWidth:1,mt:2,gap:2}}}]);