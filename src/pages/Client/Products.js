import React,{useEffect} from 'react';
import {useParams,Link} from "react-router-dom"
import { ListProducts } from '../../components/Client';
import { useProduct } from '../../hooks';
export  function Products() {
    const {tableNumber,idCategory} = useParams()
    const {loading,products,getProductsByCategory} = useProduct()

    useEffect(()=>{
        getProductsByCategory(idCategory)
    },[idCategory])

  return (
      <div>
          <Link to={`/client/${tableNumber}`}> Volver  a Categorias </Link>
          {
            loading ? <p>Cargando...</p> : (
                <ListProducts products={products}/>
            )
          }
      </div>
  )
}

