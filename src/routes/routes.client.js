import {BasicLayout, ClientLayout} from "../layouts"
import {Cart, Categories, OrdersHistory, Products, SelectTable} from "../pages/Client"

const routesClient = [
    {
        path:"/",
        layout:BasicLayout,
        component:SelectTable
    },
    {
        path:"/client/:tableNumber",
        layout:ClientLayout,
        component:Categories
    },
    {
        path:"/client/:tableNumber/:idCategory",
        layout:ClientLayout,
        component:Products
    },
    {
        path:"/client/:tableNumber/cart",
        layout:ClientLayout,
        component:Cart
    },
    {
        path:"/client/:tableNumber/orders",
        layout:ClientLayout,
        component:OrdersHistory
    },
]

export default routesClient