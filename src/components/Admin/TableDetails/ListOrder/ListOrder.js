import { map } from 'lodash';
import React from 'react';
import { OrderItem } from '../';
import "./ListOrder.scss"
export  function ListOrder(props) {
    const {orders,onReload} = props;
    return (
        <div className='list-orders-admin'>
            {map(orders,(order)=>(
                <OrderItem key={order.id} order={order} onReload={onReload}/>
            ))}
        </div>
    )
}
