import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import { HeaderPage, TableUsers,AddEditUserForm } from "../../components/Admin";
import { ModalBasic } from "../../components/Common";
import { useUser } from "../../hooks";

export function UsersAdmin() {
  const [titleModal, setTitleModal] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);
  const [refresh,setRefresh] = useState(false)

  const { loading, users, getUsers,deleteUser } = useUser();

  useEffect(() => {
    getUsers();
  }, [refresh]);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefresh = () => setRefresh((prev)=>!prev)

  const addUser = () => {
    setTitleModal('Nuevo Usuario')
    setContentModal(
        <AddEditUserForm openCloseModal={openCloseModal} onRefresh={onRefresh}/>
    )
    openCloseModal()
  }

  const updateUser = (data) => {
    setTitleModal('Actualizar Usuario')
    setContentModal(
      <AddEditUserForm user={data} openCloseModal={openCloseModal} onRefresh={onRefresh}/>
    )
    openCloseModal()
  }

  const onDeleteUser = async (data) => {
    const result = window.confirm(`¿Eliminar usuario ${data.email}?`)
    if(result){
      await deleteUser(data.id)
      onRefresh()
    }
  }

  return (
    <div>
      <HeaderPage
        title="Usuarios"
        btnTitle="Nuevo Usuario"
        btnClick={addUser}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TableUsers users={users} updateUser={updateUser} onDeleteUser={onDeleteUser}/>
      )}
      <ModalBasic onClose={openCloseModal} title={titleModal} show={showModal} children={contentModal}/>
    </div>
  );
}
