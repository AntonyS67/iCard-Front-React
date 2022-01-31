import { PRODUCTS_CART } from "../utils/constants"


export function getProductsCart(){
    const response = localStorage.getItem(PRODUCTS_CART)
    return JSON.parse(response) || []
}

export function addProductToCart(id){
    const products = getProductsCart()
    if(products.find(product => product === id)){
        return false
    }else{
        products.push(id)
        localStorage.setItem(PRODUCTS_CART,JSON.stringify(products))
        return true
    }
}

export function removeProductCart(index){
    const idProducts = getProductsCart()
    idProducts.splice(index,1)
    localStorage.setItem(PRODUCTS_CART,JSON.stringify(idProducts))
}

export function clearProductsCart(){
    localStorage.removeItem(PRODUCTS_CART)
}