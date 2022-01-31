import React, { useEffect , useState} from "react";
import { Loader } from "semantic-ui-react";
import { HeaderPage } from "../../components/Admin";
import {TableProductAdmin,AddEditProductForm} from "../../components/Admin/Product/";
import { ModalBasic } from "../../components/Common";
import { useProduct } from "../../hooks/useProduct";
export function ProductsAdmin() {
    const [showModal,setShowModal] = useState(false)
    const [titleModal,setTitleModal] = useState(null)
    const [contentModal,setContentModal] = useState(null)
    const [refresh,setRefresh] = useState(false)

    const { loading, products, getProducts, deleteProduct } = useProduct();

    useEffect(() => {
        getProducts();
    }, [refresh]);

    const openCloseModal = () => setShowModal(prev => !prev)

    const onRefresh = () => setRefresh(prev => !prev)

    const addProduct = () => {
        setTitleModal('Nuevo Producto')
        setContentModal(
            <AddEditProductForm openCloseModal={openCloseModal} onRefresh={onRefresh}/>
        )
        openCloseModal()
    }

    const updateProduct = (data) => {
        setTitleModal('Actualizar Producto')
        setContentModal(
            <AddEditProductForm product={data} openCloseModal={openCloseModal} onRefresh={onRefresh}/>
        )
        openCloseModal()
    }

    const onDeleteProduct = async (product) => {
        const confirmed = window.confirm(`¿Estas seguro de eliminar el producto ${product.title}?`)
        if(confirmed){
            await deleteProduct(product.id)
            onRefresh()
        }
    }

    return (
        <div>
        <HeaderPage title="Productos" btnTitle="Nuevo Producto" btnClick={addProduct}/>
        {loading ? (
            <Loader active inline="centered">
            Cargando...
            </Loader>
        ) : (
            <TableProductAdmin products={products} updateProduct={updateProduct} onDeleteProduct={onDeleteProduct}/>
        )}
        <ModalBasic
            show={showModal}
            onClose={openCloseModal}
            title={titleModal}
            children={contentModal}
        />
        </div>
    );
}
