import React from 'react';
import {Button,Image} from "semantic-ui-react"
import classNames from 'classnames';
import moment from "moment"
import {ORDER_STATUS} from "../../../../utils/constants"
import "moment/locale/es"
import "./OrderItem.scss";
import { useOrder } from '../../../../hooks';

export function OrderItem(props) {
    const {order,onReload} = props
    const {title,image} = order.product_data
    const {checkDeliveredOrder} = useOrder()

    const onCheckDeliveredOrder = async () => {
        await checkDeliveredOrder(order.id)
        onReload()
    }

    return (
        <div className={classNames('order-item-admin',{
            [order.status.toLowerCase()]:true,
        })}>
            <div className='order-item-admin__time'>
                <span>{moment(order.created_at).format("HH:mm")}</span> {" - "}
                <span>{moment(order.created_at).startOf('seconds').fromNow()}</span>
            </div>
            <div className='order-item-admin__product'>
                <Image src={image}/>
                <p>{title}</p>
            </div>
            {order.status === ORDER_STATUS.PENDING && (
                <Button primary onClick={onCheckDeliveredOrder}>
                    Marcar Entregado
                </Button>
            )}
        </div>
    )
}
