import React, { useState } from 'react';
import { Input } from 'antd';
import { makeStyles } from '@material-ui/core/styles';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// const { Text } = Typography;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '400px',
    padding: theme.spacing(2),
    backgroundColor: '#f5f5f5',
  },
  input: {
    marginBottom: theme.spacing(2),
  },
}));

const JsonEditor = () => {
  const classes = useStyles();
  const [jsonValue, setJsonValue] = useState();

  const handleJsonValueChange = (e) => {
    setJsonValue(e.target.value);
  };

  
  return (
    <div className={classes.root}>
      <Input.TextArea
        value={jsonValue}
        onChange={handleJsonValueChange}
        className={classes.input}
        autoSize={{ minRows: 6, maxRows: 20 }}
        placeholder="Enter JSON here"
      />

      <SyntaxHighlighter language="json" style={docco}>
        {jsonValue}
      </SyntaxHighlighter>
    </div>
  );
};

export default JsonEditor;