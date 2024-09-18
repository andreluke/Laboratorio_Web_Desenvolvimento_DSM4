import React from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

function ClienteList({ clientes, deleteCliente, setEditingCliente }) {
  return (
    <ul>
      {clientes.map((cliente) => (
        <li key={cliente._id}>
          <span>
            <strong>Nome:</strong> {cliente.nome} <br />
            <strong>Email:</strong> {cliente.email} 
          </span>
          <div>
            <button
              className="icon-button"
              onClick={() => setEditingCliente(cliente)}
            >
              <FaEdit />
            </button>
            <button
              className="icon-button delete-button"
              onClick={() => deleteCliente(cliente._id)}
            >
              <FaTrashAlt />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ClienteList;
