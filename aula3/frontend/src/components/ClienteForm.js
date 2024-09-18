import React, { useState, useEffect } from "react";

function ClienteForm({
  addCliente,
  updateEmail,
  updateNome,
  editingCliente,
  setEditingCliente,
}) {
  const [cliente, setCliente] = useState({ nome: "", email: "" });

  useEffect(() => {
    if (editingCliente) {
      setCliente(editingCliente);
    } else {
      setCliente({ nome: "", email: "" });
    }
  }, [editingCliente]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCliente) {
      updateNome(cliente);
      updateEmail(cliente);
      setEditingCliente(null);
    } else {
      addCliente(cliente);
    }
    setCliente({ nome: "", email: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome:</label>
        <input
          type="text"
          value={cliente.nome}
          onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={cliente.email}
          onChange={(e) => setCliente({ ...cliente, email: e.target.value })}
        />
      </div>
      <button type="submit">
        {editingCliente ? "Atualizar Cliente" : "Cadastrar"}
      </button>
    </form>
  );
}

export default ClienteForm;
