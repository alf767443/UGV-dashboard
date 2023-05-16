import React from "react";
import DashboardLayout from "components/gridLayout/index";

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default class DashboardDefault  extends React.Component {
	constructor(props) {
		super(props);
    }

    render(){
        return (
            <>
                <DashboardLayout />
            </>
        );
    }
}