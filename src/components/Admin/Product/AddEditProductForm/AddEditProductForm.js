import React,{useState,useCallback,useEffect} from 'react';
import {Form,Button,Checkbox,Image} from "semantic-ui-react"
import {useDropzone} from 'react-dropzone'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import "./AddEditProductForm.scss"
import { useCategory } from '../../../../hooks/useCategory';
import { map } from 'lodash';
import { useProduct } from '../../../../hooks/useProduct';

export function AddEditProductForm(props) {
    const {openCloseModal,onRefresh,product} = props

    const [previewImage,setPreviewImage] = useState(product?.image || null)
    const {categories,getCategories} = useCategory()
    const {addProduct,updateProduct} = useProduct()

    useEffect(()=>{
        getCategories()
    },[])

    const onDrop = useCallback(async (acceptedFile)=>{
        const file = acceptedFile[0]
        await formik.setFieldValue('image',file)
        setPreviewImage(URL.createObjectURL(file))
    })
    const {getRootProps,getInputProps} = useDropzone({
        accept:"image/jpeg,image/png,image/jpg",
        noKeyboard:true,
        multiple:false,
        onDrop
    })

    const formik = useFormik({
        initialValues:initialValues(product),
        validationSchema: Yup.object(product ? updateValidationSchema() : newValidationSchema()),
        validateOnChange:false,
        onSubmit:async (formValue) => {
            try {
                if(product) await updateProduct(product.id,formValue)
                else await addProduct(formValue)
                openCloseModal()
                onRefresh()
            } catch (error) {
                console.log(error);
            }
        }
    })
  return (
    <Form className='add-edit-product-form' onSubmit={formik.handleSubmit}>
        <div className='add-edit-product-form__active'>
            <Checkbox
                toggle
                checked={formik.values.active}
                onChange={(_,data)=>
                    formik.setFieldValue("active",data.checked)
                }
            />{" "} Producto activo
        </div>
        <Form.Input
            name="title"
            placeholder="Titulo del producto"
            value={formik.values.title}
            error={formik.errors.title}
            onChange={formik.handleChange}
        />
        <Form.Input
            name="price"
            placeholder="Precio"
            value={formik.values.price}
            error={formik.errors.price}
            onChange={formik.handleChange}
        />
        <Form.Field 
            name="category"
            control='select'
            onChange={formik.handleChange}
            error={formik.errors.category}
            value={formik.values.category}
        >
            <option value="">-- Seleccionar Categoria --</option>
            {map(categories,(category,index)=>(
                <option value={category.id} key={index}>{category.title}</option>
            ))}
        </Form.Field>
        <Button type="button" fluid {...getRootProps()} color={formik.errors.image && "red"}>
            {previewImage ? "Cambiar Imagen" : "Subir Imagen"}
        </Button>
        <input {...getInputProps()}/>
        <Image src={previewImage} fluid/>
        <Button type="submit" content={product ? "Actualizar" : "Crear"} primary fluid/>
    </Form>
  )
}

function initialValues(product){
    return {
        title:product?.title || "",
        price:product?.price || "",
        image:"",
        active:product?.active,
        category:product?.category
    }
}

function newValidationSchema(){
    return {
        title:Yup.string().required(true),
        price:Yup.number().required(true),
        image:Yup.string().required(true),
        active:Yup.boolean(),
        category:Yup.number().required(true)
    }
}

function updateValidationSchema(){
    return {
        title:Yup.string().required(true),
        price:Yup.number().required(true),
        image:Yup.string(),
        active:Yup.boolean(),
        category:Yup.number().required(true)
    }
}