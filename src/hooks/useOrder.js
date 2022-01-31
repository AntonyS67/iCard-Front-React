import {useState} from "react"
import {addOrderToTableApi, addPaymentToOrderApi, checkDeliveredOrderApi, closeOrderApi, getOrdersByTableApi,getOrdersByPaymentApi} from "../api/orders"

export function useOrder(){
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)
    const [orders,serOrders] = useState(null)

    const getOrdersByTable = async (idTable,status,ordering) => {
        try {
            setLoading(true)
            const response = await getOrdersByTableApi(idTable,status,ordering)
            setLoading(false)
            serOrders(response)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }

    const checkDeliveredOrder = async (id) => {
        try {
            await checkDeliveredOrderApi(id)
        } catch (error) {
            setError(error)
        }
    }

    const addOrderToTable = async (idTable,idProduct) => {
        try {
            await addOrderToTableApi(idTable,idProduct)
        } catch (error) {
            setError(error)
        }
    }

    const addPaymentToOrder = async (idOrder,idPayment) => {
        try {
            await addPaymentToOrderApi(idOrder,idPayment)
        } catch (error) {
            setError(error)
        }
    }

    const closeOrder = async (idOrder) => {
        try {
            await closeOrderApi(idOrder)
        } catch (error) {
            setError(error)
        }
    }

    const getOrdersByPayment = async (idPayment) => {
        try {
            return await getOrdersByPaymentApi(idPayment)
        } catch (error) {
            setError(error)
        }
    }

    return {
        loading,
        error,
        orders,
        getOrdersByTable,
        checkDeliveredOrder,
        addOrderToTable,
        addPaymentToOrder,
        closeOrder,
        getOrdersByPayment
    }
}