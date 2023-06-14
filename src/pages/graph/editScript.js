import React from "react";
// import ReactDOM from 'react-dom';
import ScriptEditor from "components/ScriptEditor/index";


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
            <ScriptEditor graphID={this.state.selectedGraphID} />
        );
    }
}