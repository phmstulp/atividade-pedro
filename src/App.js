import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';

export default function MaterialTableDemo() {
  useEffect(() => {
    componentDidMount();
  });

  const state = {
    users: []
  };

  function componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then((res) => {
        const users = res.data;
        state.users = users;
        console.log(state.users);
      }).catch(err => {
        console.log("Error Reading data " + err);
      });
  };

  const [state2, setState] = React.useState({
    columns: [
      { title: 'ID ', field: 'id' },
      { title: 'Nome', field: 'name' },
      { title: 'Usuário', field: 'username' },
      { title: 'E-mail', field: 'email' },
      { title: 'Telefone', field: 'phone' },
      { title: 'Website', field: 'website' },
    ],
    data: state.users,
  });

  return (
    <MaterialTable
      title="Usuários"
      columns={state2.columns}
      data={state2.data}
      class="table-striped"
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
