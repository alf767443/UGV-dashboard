"use strict";(self.webpackChunkcedri_ugv_dashboard=self.webpackChunkcedri_ugv_dashboard||[]).push([[194],{8515:function(t,e,n){n.d(e,{H:function(){return a}});var a={API:"http://127.0.0.1:8000/"}},52194:function(t,e,n){n.r(e),n.d(e,{default:function(){return k}});var a=n(82937),i=n(15671),r=n(43144),s=n(60136),u=n(27277),c=n(47313),o=n(16157),d=n(62463),h=n(42669),l=n(8200),f=n(49113),p=n(8515),x=n(46417),g=[{title:"Time",dataIndex:"dateTime",key:"id",sorter:{compare:function(t,e){return t.dateTime-e.dateTime},multiple:1},defaultSortOrder:"descend"},{title:"Percent",dataIndex:["Calculate","Percent"],key:"percent"},{title:"Status",dataIndex:["Calculate","Status"],key:"status"}],m=function(t){(0,s.Z)(n,t);var e=(0,u.Z)(n);function n(t){var a;return(0,i.Z)(this,n),(a=e.call(this,t)).state={data:[]},a}return(0,r.Z)(n,[{key:"refreshList",value:function(){var t=this;fetch(p.H.API+"battery/table=Calculate").then((function(t){return t.json()})).then((function(e){t.setState({data:e})}))}},{key:"componentDidMount",value:function(){this.refreshList()}},{key:"render",value:function(){return console.log(this.state.data),(0,x.jsx)(f.Z,{columns:g,dataSource:this.state.data,pagination:this.state.pagination,loading:this.state.loading,onChange:this.handleTableChange,sx:this.props.sx})}}]),n}(c.Component),Z=n(40040),v=function(t){(0,s.Z)(n,t);var e=(0,u.Z)(n);function n(){return(0,i.Z)(this,n),e.apply(this,arguments)}return(0,r.Z)(n,[{key:"render",value:function(){return(0,x.jsx)(l.Z,{sx:Z.Z,content:!1,children:(0,x.jsxs)(o.Z,{sx:{p:3,pb:0},children:[(0,x.jsx)(d.Z,{spacing:2,children:(0,x.jsx)(h.Z,{variant:"h3",color:"textSecondary",children:"Battery status"})}),(0,x.jsx)(m,{})]})})}}]),n}(c.Component),k=function(){return(0,x.jsx)(a.ZP,{container:!0,rowSpacing:2.75,columnSpacing:1,children:(0,x.jsx)(v,{})})}},40040:function(t,e){e.Z={width:1,height:1,minHeight:1,maxHeight:1,minWidth:1,maxWidth:1,mt:2,gap:2}}}]);