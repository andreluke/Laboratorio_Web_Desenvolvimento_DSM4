import React, { useState, useEffect } from "react";
import axios from "axios";
import ClienteList from "./components/ClienteList";
import ClienteForm from "./components/ClienteForm";
import "./App.css";

function App() {
  const [clientes, setClientes] = useState([]);
  const [editingCliente, setEditingCliente] = useState(null);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await axios.get("http://localhost:3080/usuario");
      setClientes(response.data);
    } catch (error) {
      console.error("Erro ao buscar clientes", error);
    }
  };

  const addCliente = async (cliente) => {
    try {
      const response = await axios.post("http://localhost:3080/usuario", cliente);
      setClientes([...clientes, response.data]);
    } catch (error) {
      console.error("Erro ao adicionar cliente", error);
    }
  };

  const updateEmail = async (cliente) => {
    try {
      await axios.put(`http://localhost:3080/usuario/email`, {
        id: cliente._id,
        email: cliente.email,
      });
      fetchClientes();
    } catch (error) {
      console.error("Erro ao atualizar email", error);
    }
  };

  const updateNome = async (cliente) => {
    try {
      await axios.put(`http://localhost:3080/usuario/nome`, {
        id: cliente._id,
        nome: cliente.nome,
      });
      fetchClientes();
    } catch (error) {
      console.error("Erro ao atualizar nome", error);
    }
  };

  const deleteCliente = async (id) => {
    try {
      await axios.delete(`http://localhost:3080/usuario`, { data: { id } });
      fetchClientes();
    } catch (error) {
      console.error("Erro ao deletar cliente", error);
    }
  };

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
