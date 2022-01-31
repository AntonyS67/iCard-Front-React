import React from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import { useOrder, usePayment } from "../../../../hooks";
import "./PaymentDetails.scss";

export function PaymentDetails(props) {
  const { payments, orders, openCloseModal, onReload } = props;
  const { closePayment } = usePayment();
  const {closeOrder} = useOrder()

  const getIconPayment = (key) => {
    if (key === "CARD") return "credit card outline";
    return "money bill aternate outline";
  };

  const onCloseTable = async () => {
      const result = window.confirm("Cerrar mesa para nuevos clients?")
      if(result){
        await closePayment(payments.id)
        for await (const order of orders){
            await closeOrder(order.id)
        }
        openCloseModal()
        onReload()
      }
  }

  return (
    <div className="payment-detail">
      <Table striped>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Mesa: </Table.Cell>
            <Table.Cell>{payments.table_data.number}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Total:</Table.Cell>
            <Table.Cell>${payments.totalPayment}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Forma de Pago:</Table.Cell>
            <Table.Cell>
              <Icon name={getIconPayment(payments.paymentType)} />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Button primary fluid onClick={onCloseTable}>
        Marcar como pagado y cerrar mesa
      </Button>
    </div>
  );
}
