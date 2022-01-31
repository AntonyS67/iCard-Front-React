import React from "react";
import { map } from "lodash";
import {toast} from "react-toastify"
import { Image, Button, Icon } from "semantic-ui-react";
import "./ListProducts.scss";
import { addProductToCart } from "../../../api/cart";

export function ListProducts(props) {
  const { products } = props;

  const addCart = (product) => {
    const response = addProductToCart(product.id);
    if(response){
        toast.success(`${product.title} añadido al carrito`)
    }else{
        toast.warn(`${product.title} ya fue añadido al carrito`)
    }
  };

  return (
    <div className="list-products-client">
      {map(products, (product) => (
        <div className="list-products-client__product" key={product.id}>
          <div>
            <Image src={product.image} />
            <span>{product.title}</span>
          </div>
          <Button primary onClick={() => addCart(product)}>
            <Icon name="add" />
          </Button>
        </div>
      ))}
    </div>
  );
}
