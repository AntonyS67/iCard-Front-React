import React, { useEffect, useState } from "react";
import {Image} from "semantic-ui-react"
import { map } from "lodash";
import { useOrder } from "../../../../hooks";
import "./PaymentsProductsList.scss";

export function PaymentsProductsList(props) {
  const { payment } = props;
  const [orders, setOrders] = useState([]);
  const { getOrdersByPayment } = useOrder();

  useEffect(() => {
    (async () => {
      const response = await getOrdersByPayment(payment.id);
      setOrders(response);
    })();
  }, []);

  return (
    <div className="payment-product-list">
        {map(orders,(order)=>(
            <div className="payment-product-list__product" key={order.id}>
                <div>
                    <Image src={order.product_data.image} avatar size="tiny"/>
                    <span>{order.product_data.title}</span>
                </div>
                <span>${order.product_data.price}</span>
            </div>
        ))}
    </div>
    )
}
