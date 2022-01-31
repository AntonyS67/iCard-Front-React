import React,{useState} from 'react';
import { map } from 'lodash';
import {Table,Button,Icon} from "semantic-ui-react"
import {ModalBasic } from "../../../Common"
import QRCode from "qrcode.react"
import "./TableAdmin.scss"

export function TableAdmin(props) {
    const {tables,updateTable,onDeleteTable} = props
    const [showModal,setShowModal] = useState(false)
    const [contentModal,setContentModal] = useState(null)

    const openCloseModal = () => setShowModal(prev =>  !prev)

    const showQr = (table) => {
        setContentModal(
            <div style={{
                textAlign:"center"
            }}>
                <QRCode value={`${window.location.origin}/client/${table.number}`}/>
            </div>
        )
        openCloseModal()
    }
  return (
      <>
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Número de Mesa</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {map(tables,(table,index)=>(
                    <Table.Row key={index}>
                        <Table.Cell>{table.number}</Table.Cell>
                        <Actions updateTable={updateTable} table={table} onDeleteTable={onDeleteTable} showQr={showQr}/>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
        <ModalBasic
            show={showModal}
            onClose={openCloseModal}
            title="Codigo QR"
            children={contentModal}
            size="mini"
        />
      </>
    )
}

function Actions(props){
    const {table,updateTable,onDeleteTable,showQr}= props
    return (
        <Table.Cell textAlign='right'>
            <Button icon onClick={()=>showQr(table)}>
                <Icon name='qrcode'/>
            </Button>
            <Button icon onClick={()=>updateTable(table)}>
                <Icon name='pencil'/>
            </Button>
            <Button icon negative onClick={()=>onDeleteTable(table)}>
                <Icon name='close'/>
            </Button>
        </Table.Cell>
    )
}