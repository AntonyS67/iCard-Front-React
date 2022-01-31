import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "semantic-ui-react";
import { useTable } from "../../../hooks/useTable";
import "./SelectTable.scss";
export function SelectTable() {
  const [tableNum, setTableNum] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  const { isExistTable } = useTable();

  const onSubmit = async () => {
    setError(null);
    if (!tableNum) {
      setError("No haz introducido ninguna mesa");
    } else {
      const exists = await isExistTable(tableNum);
      if (exists) navigate(`/client/${tableNum}`);
      else setError("El número de la mesa no existe");
    }
  };

  return (
    <div className="select-table">
      <div className="select-table__content">
        <h1>Bienvenido a iCard</h1>
        <h2>Introduce tu numero de mesa</h2>

        <Form onSubmit={onSubmit}>
          <Form.Input
            placeholder="Ejemplo: 2,4,6"
            type="number"
            onChange={(_, data) => setTableNum(data.value)}
          />
          <Button primary fluid content="Entrar" />
        </Form>
        <p className="select-table__content-error">{error}</p>
      </div>
    </div>
  );
}
