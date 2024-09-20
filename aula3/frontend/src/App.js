import React from "react";
import ClienteList from "./components/ClienteList";
import ClienteForm from "./components/ClienteForm";
import useClientes from "./hooks/useClient";
import "./App.css";

function App() {
  const {
    clientes,
    addCliente,
    updateEmail,
    updateNome,
    deleteCliente,
    editingCliente,
    setEditingCliente,
  } = useClientes();

  return (
    <div className="App">
      <h1>Gerenciamento de Clientes</h1>
      <ClienteForm
        addCliente={addCliente}
        updateEmail={updateEmail}
        updateNome={updateNome}
        editingCliente={editingCliente}
        setEditingCliente={setEditingCliente}
      />
      <ClienteList
        clientes={clientes}
        deleteCliente={deleteCliente}
        setEditingCliente={setEditingCliente}
      />
    </div>
  );
}

export default App;
