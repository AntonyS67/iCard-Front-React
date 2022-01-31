import React,{useEffect,useState} from 'react';
import { AddEditFormTable, HeaderPage, TableAdmin } from '../../components/Admin';
import { useTable } from '../../hooks/useTable';
import { Loader } from 'semantic-ui-react';
import { ModalBasic } from '../../components/Common';

export function TablesAdmin() {
    const [title,setTitle] = useState(null)
    const [showModal,setShowModal] = useState(false)
    const [contentModal,setContentModal] = useState(null)
    const [refresh,setRefresh] = useState(false)

    const {loading,tables,getTables,deleteTable} = useTable()
    
    useEffect(()=>{
        getTables()
    },[refresh])

    const openCloseModal = () => setShowModal(prev => !prev)

    const onRefresh = () => setRefresh(prev => !prev)

    const addTable = () => {
        setTitle('Nueva Mesa')
        setContentModal(
            <AddEditFormTable openCloseModal={openCloseModal} onRefresh={onRefresh}/>
        )
        openCloseModal()
    }

    const updateTable = (data) => {
        setTitle('Actualizar Mesa')
        setContentModal(
            <AddEditFormTable table={data} openCloseModal={openCloseModal} onRefresh={onRefresh}/>
        )
        openCloseModal()
    }
  
    const onDeleteTable = async (data) => {
        const confirmed = window.confirm(`¿Estas seguro de eliminar la mesa ${data.number}?`)
        if(confirmed){
            await deleteTable(data.id)
            onRefresh()
        }
    }
    return(
        <div>
            <HeaderPage
                title="Mesas"
                btnTitle="Nueva Mesa"
                btnClick={addTable}
            />
            {loading ? (
                <Loader active inline="centered">
                    Cargando...
                </Loader>
            ):(
                <TableAdmin tables={tables} updateTable={updateTable} onDeleteTable={onDeleteTable}/>
            )}
            <ModalBasic
                title={title}
                show={showModal}
                onClose={openCloseModal}
                children={contentModal}
            />
        </div>
    )
}
