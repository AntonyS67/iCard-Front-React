import {useState} from "react"
import { useAuth } from "./useAuth"
import { addProductApi, deleteProductApi, getProductByIdApi, getProductsApi, getProductsByCategoryApi, updateProductApi } from "../api/products"
export function useProduct(){
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(null)
    const [products,setProducts] = useState(null)

    const {auth} = useAuth()

    const getProducts = async () => {
        try {
            setLoading(true)
            const result = await getProductsApi()
            setLoading(false)
            setProducts(result)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }

    const addProduct = async (data) => {
        try {
            setLoading(true)
            await addProductApi(data,auth.token)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }

    const updateProduct = async (id,data) => {
        try {
            setLoading(true)
            await updateProductApi(id,data,auth.token)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }

    const deleteProduct = async (id) => {
        try {
            setLoading(true)
            await deleteProductApi(id,auth.token)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }

    const getProductById = async (id) => {
        try {
            const product = await getProductByIdApi(id)
            return product
        } catch (error) {
            setError(error)
        }
    }

    const getProductsByCategory = async (idCategory) => {
        try {
            setLoading(true)
            const response =  await getProductsByCategoryApi(idCategory)
            setLoading(false)
            setProducts(response)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }

    return {
        error,
        loading,
        products,
        getProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        getProductsByCategory
    }
}