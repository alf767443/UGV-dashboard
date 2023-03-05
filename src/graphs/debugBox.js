import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function createTableDataRecursive(data) {
  if (Array.isArray(data)) {
    // se for um array, percorre todos os itens e chama a função recursivamente
    return data.map(createTableDataRecursive);
  } else if (typeof data === 'object' && data !== null) {
    // se for um objeto, cria um novo objeto com as chaves e valores transformados em células da tabela
    return {
      ...Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
          key,
          createTableDataRecursive(value),
        ])
      ),
    };
  } else {
    // se não for um array nem objeto, retorna o valor como string
    return String(data);
  }
}

function Tabela({ data }) {
  // const classes = useStyles();
  const tableData = createTableDataRecursive(data);

  const flattenRow = (row) =>
    Object.values(row).flatMap((cell) =>
      Array.isArray(cell) ? flattenRow(cell) : cell
    );

  return (
    <TableContainer component={Paper}>
      <Table aria-label="tabela">
        <TableHead>
          <TableRow>
            {flattenRow(tableData[0]).map((cell, index) => (
              <TableCell key={index}>{cell}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, index) => (
            <TableRow key={index}>
              {flattenRow(row).map((cell, index) => (
                <TableCell key={index}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const data = [
  {
    id: 1,
    name: 'John',
    age: 30,
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
    },
  },
  {
    id: 2,
    name: 'Jane',
    age: 25,
    address: {
      street: '456 Oak Ave',
      city: 'Sometown',
      state: 'CA',
      zip: '67890',
    },
  },
];

function App() {
  return (
    <div className="App">
      <Tabela data={data} />
    </div>
  );
}

export default App