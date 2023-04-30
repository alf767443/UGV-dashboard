import React from 'react';
import { url, requestOptions } from 'API/url';
import { graphs } from './graphs';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Input } from 'antd';

class GraphEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: { config: null },
      _config: null,
      editing: false // novo estado para controlar o modo de edição
    };
  }

  getGraph() {
    fetch(url(), requestOptions(graphs('battery-percent-time-area')))
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json[0] });
        this.setState({
          _config: JSON.stringify(json[0]['config'], null, '  ')
        });

        console.log(this.state);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getGraph();
  }

  handleJsonValueChange = (e) => {
    this.setState({ _config: e.target.value });
  };

  handleSyntaxHighlighterClick = () => {
    this.setState({ editing: true }); // atualiza o estado de "editing" para verdadeiro quando o SyntaxHighlighter for clicado
  };

  handleInputTextAreaBlur = () => {
    this.setState({ editing: false }); // atualiza o estado de "editing" para falso quando o Input.TextArea perder o foco
  };

  render() {
    console.log();
    const { editing, _config } = this.state; // desestruturação para facilitar o acesso às propriedades de estado

    const InputTextArea = 
      <Input.TextArea
        value={_config}
        onChange={this.handleJsonValueChange}
        onBlur={this.handleInputTextAreaBlur} // adiciona o evento onBlur para permitir sair do modo de edição
        autoSize={{ minRows: 6, maxRows: 20 }}
        placeholder="Enter JSON here" />;

    const SyntaxtTextArea = 
      <SyntaxHighlighter
        language="json"
        style={docco}
        onClick={this.handleSyntaxHighlighterClick} // adiciona o evento onClick para permitir entrar no modo de edição
      >
        {_config}
      </SyntaxHighlighter>;

    return(
      <div>
        {editing ? InputTextArea : SyntaxtTextArea}
      </div>
    )
  }
}

export default GraphEditor;
