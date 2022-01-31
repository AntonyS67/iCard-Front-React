import React from 'react';
import {Form,Button} from "semantic-ui-react"
import {useFormik} from "formik"
import * as Yup from "yup"
import "./AddEditFormTable.scss"
import { useTable } from '../../../../hooks/useTable';

export function AddEditFormTable(props) {
    const {openCloseModal,onRefresh,table} = props
    const {addTable,updateTable} = useTable()

    const formik = useFormik({
        initialValues:initialValues(table),
        validationSchema:Yup.object(validationSchema()),
        validateOnChange:false,
        onSubmit: async (formValue)=>{
            try {
                if(table) await updateTable(table.id,formValue)
                else await addTable(formValue)
                openCloseModal()
                onRefresh()
            } catch (error) {
                console.log(error);
            }
        }
    })

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Input
                name="number"
                placeholder="Numero de Mesa"
                value={formik.values.number}
                error={formik.errors.number}
                onChange={formik.handleChange}
            />
            <Button type="submit" content="Crear" primary fluid/>
        </Form>

    )
}

function initialValues(data){
    return {
        number:data?.number || ""
    }
}

function validationSchema(){
    return {
        number:Yup.number().required(true)
    }
}