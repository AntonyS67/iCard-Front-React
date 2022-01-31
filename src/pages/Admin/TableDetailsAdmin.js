import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "semantic-ui-react";
import { forEach, size } from "lodash";
import { AddOrderForm, HeaderPage, ListOrder, PaymentDetails } from "../../components/Admin";
import { ModalBasic } from "../../components/Common/ModalBasic/ModalBasic";
import { useOrder } from "../../hooks/useOrder";
import { useTable } from "../../hooks/useTable";
import { usePayment } from "../../hooks/usePayment";

export function TableDetailsAdmin() {
  const [refresh, setRefresh] = useState(true);
  const [paymentData, setPaymentData] = useState(null);
  const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder();
  const { table, getTable } = useTable();
  const { createPayment, getPaymentByTable } = usePayment();
  const { id } = useParams();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getOrdersByTable(id, "", "ordering=-status,created_at");
  }, [refresh, id]);

  useEffect(() => getTable(id), [id]);

  useEffect(() => {
    (async () => {
      const response = await getPaymentByTable(id);
      if (size(response) > 0) setPaymentData(response[0]);
    })();
  }, [refresh]);

  const onReload = () => setRefresh((prev) => !prev);

  const openCloseModal = () => setShowModal((prev) => !prev);

  const onCreatePayment = async () => {
    const result = window.confirm(
      "Estas seguro de generar la cuenta de la mesa?"
    );
    if (result) {
      let totalPayment = 0;
      let paymentType = "";
      forEach(orders, (order) => {
        totalPayment += Number(order.product_data.price);
      });

      const resultPaymentType = window.confirm(
        "Pago con tarjeta pulsa Aceptar con efectivo pulsa Cancelar"
      );

      if (resultPaymentType) paymentType = "CARD";
      else paymentType = "CASH";

      const paymentData = {
        table: id,
        totalPayment: totalPayment.toFixed(2),
        paymentType,
        statusPayment: "PENDING",
      };

      const payment = await createPayment(paymentData);

      for await (const order of orders) {
        await addPaymentToOrder(order.id, payment.id);
      }

      onReload();
    }
  };

  return (
    <div>
      <HeaderPage
        title={`Mesa ${table?.number || ""}`}
        btnTitle= {!paymentData ? "Añadir Pedido": "Ver Cuenta"}
        btnClick={openCloseModal}
        btnTitleTwo= {!paymentData ? "Generar cuenta" : null}
        btnClickTwo={onCreatePayment}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <ListOrder orders={orders} onReload={onReload} />
      )}
      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title="Generar Pedido"
      >
        {paymentData ? (
          <PaymentDetails
            payments={paymentData}
            onReload={onReload}
            orders={orders}
            openCloseModal={openCloseModal}
          />
        ): (
          <AddOrderForm
            idTable={id}
            openCloseModal={openCloseModal}
            onReload={onReload}
          />
        )}
      </ModalBasic>
    </div>
  );
}
