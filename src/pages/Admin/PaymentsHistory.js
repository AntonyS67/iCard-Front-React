import React, { useEffect,useState } from "react";
import { Loader } from "semantic-ui-react";
import { HeaderPage, PaymentsProductsList, TablePayment } from "../../components/Admin";
import {ModalBasic} from "../../components/Common"
import { usePayment } from "../../hooks";

export function PaymentsHistory() {
    const [showModal,setShowModal] = useState(false)
    const [titleModal,setTitleModal] = useState(null)
    const [contentModal,setContentModal] = useState(null)
  const { loading, payments, getPayments } = usePayment();

  useEffect(() => {
    getPayments();
  }, []);

  const openCloseModal = () => setShowModal(prev => !prev)

  const showDetails = (payment) => {
      setTitleModal(`Pedidos de la mesa ${payment.table_data.number}`)
      setContentModal(
          <PaymentsProductsList payment={payment}/>
      )
      openCloseModal()
  }

  return (
    <div>
      <HeaderPage title="Historial de Pagos" />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TablePayment payments={payments} showDetails={showDetails}/>
      )}
      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
      />
    </div>
  );
}
