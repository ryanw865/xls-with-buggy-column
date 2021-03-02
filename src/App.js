import './App.css';
import React from 'react';
import ReactExport from 'react-export-excel';
import Header from './components/Header/Header';
import DataSource from './components/Data/TableData';
import Table from './components/Table/Table';
import Headers from './components/Data/Headers';
import { Button } from 'antd';
import { Context } from './components/Context/TableContext';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
const App = () => {
  const contextState = React.useContext(Context);
  const [selected, setSelected] = React.useState([]);

  const insertColumn = (headerIndex) => {
    if (!selected.includes(headerIndex)) {
      let newArr = selected;
      newArr.push(headerIndex);
      setSelected(newArr);
    }
  };

  const removeColumn = (headerIndex) => {
    let newarr = selected;
    const newarr2 = newarr.filter((value) => value !== headerIndex);
    console.log("here",newarr.filter((value) => value !== headerIndex))
    setSelected(newarr2);
  };

  let columnsToExport = [];
  Headers.map((header, index) => {
    if (selected.includes(index)) {
      columnsToExport.push(
        <ExcelColumn label={header.name} value={header.dataIndex} />
      );
    }
  });

  const selectColumn = (headerIndex) => {
    console.log(selected);
    if (!selected.includes(headerIndex)) {
      insertColumn(headerIndex);
      console.log('added');
    } else {
      removeColumn(headerIndex);
      console.log('removed');
    }
  };

  return (
    <div className='App'>
      <Header />
      <Table
        insertColumn={insertColumn}
        removeColumn={removeColumn}
        selectColumn={selectColumn}
        selected={selected}
      />
      <ExcelFile
        element={
          <Button className='primary-button' size='large' type='primary'>
            Export to Excel
          </Button>
        }
      >
        <ExcelSheet
          data={DataSource.filter((value) =>
            contextState.selectedRows.includes(value)
          )}
          name='Employees'
        >
          {columnsToExport}
        </ExcelSheet>
      </ExcelFile>
    </div>
  );
};

export default App;
