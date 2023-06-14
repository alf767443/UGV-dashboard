import React from "react";
// import ReactDOM from 'react-dom';
import GraphEditor from "components/GraphEditor/index";

// import { EditOutlined } from '@mui/icons-material';

// import "./styles.css";



export default class EditPage extends React.Component {
	constructor(props) {
		super(props);

        this.state = {
            selectedGraphID: null,
            list: null,
            robotID: window.localStorage.getItem('robotID'),
        }
    }

    render(){
        return (           
            <GraphEditor graphID={this.state.selectedGraphID} />
        );
    }
}