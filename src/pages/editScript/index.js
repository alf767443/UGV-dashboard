import React from "react";
// import ReactDOM from 'react-dom';
import ScriptEditor from "components/ScriptEditor/index";

// import { EditOutlined } from '@mui/icons-material';

import "./styles.css";



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
            <div className="main" id="EditorMainPage">                
                <ScriptEditor graphID={this.state.selectedGraphID} />
            </div>
        );
    }
}