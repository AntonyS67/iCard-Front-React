import React, { useState,useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
import {HeaderPage,TableCategoryAdmin,AddEditCategoryForm} from "../../components/Admin"
import { useCategory } from '../../hooks/useCategory';
import {ModalBasic} from "../../components/Common"
export function CategoriesAdmin() {
    const [showModal,setShowModal] = useState(false)
    const [titleModal,setTitleModal] = useState(null)
    const [contentModal,setContentModal] = useState(null)
    const [refresh,setRefresh] = useState(false)
    const {loading,categories,getCategories,deleteCategory} = useCategory()

    useEffect(()=>{
        getCategories()
    },[refresh])

    const openCloseModal = () => setShowModal(prev=>!prev)

    const onRefresh = () => setRefresh(prev => !prev)

    const addCategory = () => {
        setTitleModal('Nueva Categoria')
        setContentModal(
            <AddEditCategoryForm openCloseModal={openCloseModal} onRefresh={onRefresh}/>
        )
        openCloseModal()
    }

    const updateCategory = (data) => {
        setTitleModal('Actualizar Categoria')
        setContentModal(
            <AddEditCategoryForm openCloseModal={openCloseModal} onRefresh={onRefresh} category={data}/>
        )
        openCloseModal()
    }

    const onDelete = async (data) => {
        const confirmed = window.confirm(`Estas seguro de eliminar la categoria ${data.title}`)
        if(confirmed){
            await deleteCategory(data.id)
            onRefresh()
        }
    }
    return (
        <div>
            <HeaderPage title="Categorias" btnTitle="Nueva Categoría" btnClick={addCategory}/>
            {loading ? (
                <Loader active inline="centered">Cargando...</Loader>
            ):(
                <TableCategoryAdmin
                    categories={categories}
                    updateCategory={updateCategory}
                    onDelete={onDelete}
                />
            )}
            <ModalBasic
                show={showModal}
                onClose={openCloseModal}
                title={titleModal}
                children={contentModal}
            />
        </div>
    )
}
