import { useState, useEffect } from "react";
import api from "../services/api";

const useClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [editingCliente, setEditingCliente] = useState(null);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await api.get("/usuario");
      setClientes(response.data);
    } catch (error) {
      console.error("Erro ao buscar clientes", error);
    }
  };

  const addCliente = async (cliente) => {
    try {
      const response = await api.post("/usuario", cliente);
      setClientes((prevClientes) => [...prevClientes, response.data]);
    } catch (error) {
      console.error("Erro ao adicionar cliente", error);
    }
  };

  const updateEmail = async (cliente) => {
    try {
      await api.put("/usuario/email", {
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
      await api.put("/usuario/nome", {
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
      await api.delete("/usuario", { data: { id } });
      fetchClientes();
    } catch (error) {
      console.error("Erro ao deletar cliente", error);
    }
  };

  return {
    clientes,
    addCliente,
    updateEmail,
    updateNome,
    deleteCliente,
    editingCliente,
    setEditingCliente,
  };
};

export default useClientes;
