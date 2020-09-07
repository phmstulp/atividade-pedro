import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';

export default function MaterialTableDemo() {
  useEffect(() => {
    componentDidMount();
  });

  const [state, setState] = React.useState({
    columns: [
      { title: 'ID ', field: 'id' },
      { title: 'Nome', field: 'name' },
      { title: 'Usuário', field: 'username' },
      { title: 'E-mail', field: 'email' },
      { title: 'Telefone', field: 'phone' },
      { title: 'Website', field: 'website' },
    ],
    data: [],
  });

  function componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then((res) => {
        const users = res.data;
        state.data = users;
        return;
      }).catch(err => {
        console.log("Error Reading data " + err);
      });
  };

  return (
    <MaterialTable
      title="Usuários"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}
