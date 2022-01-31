import React, { useEffect, useState } from "react";
import { Form, Image, Button, Dropdown,Icon } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { map } from "lodash";
import { useProduct } from "../../../../hooks/useProduct";
import { useOrder } from "../../../../hooks";
import "./AddOrderForm.scss";

export function AddOrderForm(props) {
  const { idTable, openCloseModal, onReload } = props;
  const [productFormat, setProductFormat] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const { products, getProducts,getProductById } = useProduct();
  const {addOrderToTable} = useOrder()

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
        for await (const idProduct of formValue.products){
            await addOrderToTable(idTable,idProduct)
        }
        openCloseModal()
        onReload()
    },
  });

  useEffect(()=>addProductList(),[formik.values.products])
  const addProductList = async () => {
    try {
        const productsId = formik.values.products
        const arrayTemp = []
        for await (const idProduct of productsId){
            const response = await getProductById(idProduct)
            arrayTemp.push(response)
        }
        setProductsData(arrayTemp)
    } catch (error) {
        console.log(error);
    }
  }

  const removeProductList = (index) => {
      const idProducts = [...formik.values.products]
      idProducts.splice(index,1)
      formik.setFieldValue('products',idProducts)
  }

  useEffect(() => getProducts(), []);
  useEffect(() => setProductFormat(formatDropdownData(products)), [products]);

  return (
    <Form className="add-order-form" onSubmit={formik.handleSubmit}>
      <Dropdown
        placeholder="Products"
        fluid
        selection
        search
        options={productFormat}
        value={null}
        onChange={(_,data)=>formik.setFieldValue("products",[...formik.values.products,data.value])}
      />
      <div className="add-order-form__list">
        {map(productsData,(product,index)=>(
            <div key={index} className="add-order-form__list-product">
                <div>
                    <Image src={product.image} avatar size="tiny"/>
                    <span>{product.title}</span>
                </div>
                <Button type="button" content="Eliminar" basic color="red" onClick={()=>removeProductList(index)}/>
            </div>
        ))}
      </div>
      <Button type="submit" content="Añadir Producto a la mesa" primary fluid />
    </Form>
  );
}

function formatDropdownData(data) {
  return map(data, (item) => ({
    key: item.id,
    text: item.title,
    value: item.id,
  }));
}

function initialValues() {
  return {
    products: [],
  };
}

function validationSchema() {
  return {
    products: Yup.array().required(true),
  };
}
