
import React from "react";

import { Liquid } from "@ant-design/plots";

// Import from project
import { url } from 'djangoAPI/url';
import { round } from "lodash";

const urls = 'battery/query=1';

export default class BatteryIcon extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
            data: []
        };
    }

    refreshList() {
        fetch(url.API + urls)
            .then((response) => response.json())
            .then((json) => {
                this.setState({ data: json[0]['Calculate']['Percent'] });
            })
			.catch((error) => {
				console.log(error)
			});
    }

    componentDidMount = () => {
		this.refreshList();
		this.timer();
    }

	componentWillUnmount = () =>{
		clearInterval(this.timer)
	}

	timer = () => {
		setInterval(() => {
			this.refreshList();
		}, 5000)
	}
	pallet = [
		"#b60000",
		"#b80600",
		"#ba0b00",
		"#bc1100",
		"#bd1600",
		"#bf1c00",
		"#c12100",
		"#c32700",
		"#c52d00",
		"#c73200",
		"#c93800",
		"#cb3d00",
		"#cc4300",
		"#ce4800",
		"#d04e00",
		"#d25300",
		"#d45900",
		"#d65f00",
		"#d86400",
		"#da6a00",
		"#db6f00",
		"#dd7500",
		"#df7a00",
		"#e18000",
		"#e38600",
		"#e58b00",
		"#e79100",
		"#e99600",
		"#ea9c00",
		"#eca100",
		"#eea700",
		"#f0ac00",
		"#f2b200",
		"#f4b800",
		"#f6bd00",
		"#f8c300",
		"#f9c800",
		"#fbce00",
		"#fdd300",
		"#ffd900",
		"#ffd900",
		"#f9d800",
		"#f3d700",
		"#ecd600",
		"#e6d500",
		"#e0d400",
		"#dad300",
		"#d4d200",
		"#cdd100",
		"#c7d000",
		"#c1cf00",
		"#bbce00",
		"#b5cd00",
		"#aecc00",
		"#a8cb00",
		"#a2ca00",
		"#9cc900",
		"#96c800",
		"#8fc700",
		"#89c600",
		"#83c500",
		"#7dc400",
		"#76c300",
		"#70c200",
		"#6ac100",
		"#64c000",
		"#5ebf00",
		"#57be00",
		"#51bd00",
		"#4bbc00",
		"#45bb00",
		"#3fba00",
		"#38b900",
		"#32b800",
		"#2cb700",
		"#26b600",
		"#20b500",
		"#19b400",
		"#13b300",
		"#0db200",
	];

	config = {
		shape: function (x, y, width, height) {
			const lr = height * 0.06;
			const r = height * 0.07;
			const lh = width * 0.03;
			const h = height * (0.5 - 0.06 - 0.03);
			const lw = width * 0.11;
			const w = width * 0.3;
			return [
				["M", x - w, y + h + lh + r],
				["L", x - w, y - h + lh + r],
				["A", r, r, 0, 0, 1, x - w + r, y - h + lh],
				["L", x - lw, y - h + lh],
				["L", x - lw, y - h],
				["A", lr, lr, 0, 0, 1, x - lw + lr, y - h - lr],
				["L", x + lw - lr, y - h - lr],
				["A", lr, lr, 0, 0, 1, x + lw, y - h],
				["L", x + lw, y - h + lh],
				["L", x + w - r, y - h + lh],
				["A", r, r, 0, 0, 1, x + w, y - h + lh + r],
				["L", x + w, y + h + lh + r],
				["Z"],
			];
		},
		outline: {
			border: 1,
			distance: 0,
		},
	};

	statistic = [null];

	color() {
		let percent = this.state.data;
		let color = parseInt(round((percent)*80,0) - 1)
		if (color < 0){
			return "#B3B3B3"; 
		}
		return this.pallet[color]
	}

	render() {
		return (
			<div>
				<Liquid
					{...this.config}
					color={this.color()}
					percent={this.state.data}
					width={this.props.width}
					height={this.props.height}
					statistic={this.statistic}
				/>
			</div>
		);
	}
}
