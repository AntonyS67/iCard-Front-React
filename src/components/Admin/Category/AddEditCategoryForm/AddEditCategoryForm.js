import React,{useCallback,useState} from 'react';
import {Form,Image,Button} from "semantic-ui-react"
import {useDropzone} from "react-dropzone"
import {useFormik} from "formik"
import * as Yup from "yup"
import "./AddEditCategoryForm.scss"
import { useCategory } from '../../../../hooks/useCategory';

export function AddEditCategoryForm(props) {
    const {openCloseModal,onRefresh,category} = props
    const [previewImage,setPreviewImage] = useState(category?.image || null)
    const {addCategory,updateCategory} = useCategory()

    const formik = useFormik({
        initialValues:initialValues(category),
        validationSchema:Yup.object(category ? updateValidationSchema() : newValidationSchema()),
        validateOnChange:false,
        onSubmit:async (formvalue)=>{
            try {
                if(category) await updateCategory(category.id,formvalue);
                else await addCategory(formvalue)
                openCloseModal()
                onRefresh()
            } catch (error) {
                console.log(error);
            }
        }
    })



    const onDrop = useCallback(async (acceptedFile)=>{
        const file = acceptedFile[0]
        await formik.setFieldValue('image',file)
        setPreviewImage(URL.createObjectURL(file))
    },[])

    const {getRootProps,getInputProps} = useDropzone({
        accept:'image/jpeg,image/png,image/jpg',
        noKeyboard:true,
        multiple:false,
        onDrop
    })
  return (
      <Form className='add-edit-category-form' onSubmit={formik.handleSubmit}>
          <Form.Input
            name="title"
            placeholder="Nombre de la categoría"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.errors.title}
          />
          <Button type="button" fluid {...getRootProps()} color={formik.errors.image && "red"}>
              {previewImage ? "Cambiar Imagen" : "Subir Imagen"}
          </Button>
          <input {...getInputProps()}/>
          <Image src={previewImage} fluid/>
          <Button type="submit" content={category ? "Actualizar" : "Crear"} primary fluid/>
      </Form>
  )
}

function initialValues(data){
    return {
        title:data?.title || "",
        image:""
    }
}

function newValidationSchema(){
    return {
        title:Yup.string().required(true),
        image:Yup.string().required(true)
    }
}

function updateValidationSchema(){
    return {
        title:Yup.string().required(true),
        image:Yup.string()
    }
}