import React,{useState,useEffect} from 'react';
import { useProduct } from '../../hooks/useProduct';
import {getProductsCart} from "../../api/cart"
import { size } from 'lodash';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { ListProductsCart } from '../../components/Client/ListProductsCart/ListProductsCart';
export function Cart() {
    const [products,setProducts] = useState(null)
    const [reload,setReload] = useState(true)
    const {getProductById} = useProduct()
    const {tableNumber} = useParams()

    useEffect(()=>{
        (
            async () => {
                const idProductsCart = getProductsCart()
                const productsArray = []
                for await (const idProduct of idProductsCart){
                    const response = await getProductById(idProduct)
                    productsArray.push(response)
                }
                setProducts(productsArray)
            }
        )()
    },[reload])

    const onReloadCart = () => setReload(prev => !prev)
  return (
    <div>
        <h1>Carrito</h1>
        {!products ? (
            <p>Cargando...</p>
        ): size(products) === 0 ? (
            <div style={{textAlign:"center"}}>
                <p>Tu carrito esta vacio</p>
                <Link to={`/client/${tableNumber}/orders`}>
                    <Button primary>Ver pedidos</Button>
                </Link>
            </div>
        ): (
            <ListProductsCart products={products} onReloadCart={onReloadCart}/>
        )}
    </div>
    )
}
