"use strict";(self.webpackChunkcedri_ugv_dashboard=self.webpackChunkcedri_ugv_dashboard||[]).push([[950],{8384:function(t,e,n){n.d(e,{Z:function(){return y}});var o=n(1413),l=n(15671),r=n(43144),i=n(60136),s=n(29388),a=n(47313),p=n(9019),g=n(42832),c=n(61113),u=n(77970),h=n(10347),m={typography:{align:"left",variant:"h3",color:"textSecondary",xs:12,sm:12,md:12,lg:12,xl:12},stack:{spacing:2,xs:1,sm:1,md:1,lg:1,xl:1,sx:{mt:1,mr:1,ml:1,mb:0}},box:{xs:1,sm:1,md:1,lg:1,xl:1,sx:{mt:1,mr:0,ml:0,mb:0,gap:1},height:"100%"},grid:{main:{direction:"row",justifyContent:"center",alignItems:"stretch",spacing:0},item:{justifyContent:"center",alignItems:"stretch",xs:12,sm:12,md:12,lg:6,xl:6,spacing:0}}},P=n(79298),d=n(68756),Z=n(97849),f=n(16031),x=n(46417),y=function(t){(0,i.Z)(n,t);var e=(0,s.Z)(n);function n(t){var r;return(0,l.Z)(this,n),(r=e.call(this,t)).hadleChange=function(t,e){r.setState({page:e}),r.componentDidMount()},r.componentDidMount=function(){r.graphs()},r.numberPages=function(){return(0,f.round)(r.props.Plot.SimplePlot.length/2)+r.props.Plot.LargePlot.length+r.props.Plot.BigPlot.length},r.graphs=function(){var t=0,e=0;switch(!0){case r.state.page<=(0,f.round)(r.props.Plot.SimplePlot.length/2):return console.log("a"),t=2*(r.state.page-1),e=2*r.state.page>r.props.Plot.SimplePlot.length?t+1:t+2,(0,x.jsx)(p.ZP,(0,o.Z)((0,o.Z)({container:!0},m.grid.main),{},{children:r.props.Plot.SimplePlot.slice(t,e).map((function(t){return(0,a.createElement)(p.ZP,(0,o.Z)((0,o.Z)({item:!0},m.grid.item),{},{key:t.key}),(0,x.jsx)(P.Z,{graph:t.plot,title:t.title,position:null,static:!0}))}))}));case r.state.page>(0,f.round)(r.props.Plot.SimplePlot.length/2)&&r.state.page<=(0,f.round)(r.props.Plot.SimplePlot.length/2)+r.props.Plot.LargePlot.length:return console.log("b"),e=(t=r.state.page-(0,f.round)(r.props.Plot.SimplePlot.length/2)-1)+1,(0,x.jsx)(p.ZP,(0,o.Z)((0,o.Z)({container:!0},m.grid.main),{},{children:r.props.Plot.LargePlot.slice(t,e).map((function(t){return(0,a.createElement)(p.ZP,(0,o.Z)((0,o.Z)({item:!0},m.grid.item),{},{key:t.key}),(0,x.jsx)(d.Z,{graph:t.plot,title:t.title,position:null,static:!0}))}))}));case r.state.page>(0,f.round)(r.props.Plot.SimplePlot.length/2)+r.props.Plot.LargePlot.length&&r.state.page<=(0,f.round)(r.props.Plot.SimplePlot.length/2)+r.props.Plot.LargePlot.length+r.props.Plot.BigPlot.length:return console.log("c"),e=(t=r.state.page-(0,f.round)(r.props.Plot.SimplePlot.length/2)+r.props.Plot.LargePlot.length-1)+1,console.log(r.props.Plot.BigPlot.slice(t,e)),(0,x.jsx)(p.ZP,(0,o.Z)((0,o.Z)({container:!0},m.grid.main),{},{children:r.props.Plot.BigPlot.slice(t,e).map((function(t){return(0,a.createElement)(p.ZP,(0,o.Z)((0,o.Z)({item:!0},m.grid.item),{},{key:t.key}),(0,x.jsx)(Z.Z,{graph:t.plot,title:t.title,position:null,static:!0}))}))}));default:x.Fragment}},r.state={page:1},r}return(0,r.Z)(n,[{key:"render",value:function(){return(0,x.jsx)(h.Z,(0,o.Z)((0,o.Z)({},m.box),{},{children:(0,x.jsxs)(g.Z,(0,o.Z)((0,o.Z)({},m.stack),{},{children:[(0,x.jsx)(c.Z,(0,o.Z)((0,o.Z)({},m.typography),{},{children:this.props.title})),this.graphs(),(0,x.jsx)(u.Z,{count:this.numberPages(),defaultPage:1,siblingCount:0,page:this.state.page,onChange:this.hadleChange})]}))}))}}]),n}(a.Component)},43331:function(t,e,n){n.r(e);var o=n(42832),l=n(70301),r=n(8384),i=n(46417);e.default=function(){return(0,i.jsx)(o.Z,{spacing:2,children:(0,i.jsx)(r.Z,{Plot:l.Z})})}},8436:function(t,e,n){n.d(e,{Z:function(){return l}});var o=n(47313);function l(t,e){return o.isValidElement(t)&&-1!==e.indexOf(t.type.muiName)}}}]);