import React, { useState, useEffect } from "react";
import { Image, Button, Icon } from "semantic-ui-react";
import { map, forEach } from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import { removeProductCart,clearProductsCart } from "../../../api/cart";
import { useOrder,useTable } from "../../../hooks";
import "./ListProductsCart.scss";

export function ListProductsCart(props) {
  const { products, onReloadCart } = props;
  const [total, setTotal] = useState(0);
  const {addOrderToTable} = useOrder()
  const {getTableByNumber} = useTable()
  const {tableNumber} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    let totalTemp = 0;
    forEach(products, (product) => {
      totalTemp += Number(product.price);
    });
    setTotal(totalTemp.toFixed(2));
  }, [products]);

  const removeProduct = (index) => {
    removeProductCart(index);
    onReloadCart();
  };

  const createOrder = async () => {
    const tableData = await getTableByNumber(tableNumber)
    const idTable = tableData[0].id
    for await (const product of products){
      await addOrderToTable(idTable,product.id)
    }
    clearProductsCart()
    navigate(`/client/${tableNumber}/orders`)
  }

  return (
    <div className="list-product-cart">
      {map(products, (product, index) => (
        <div key={index} className="list-product-cart__product">
          <div>
            <Image src={product.image} avatar />
            <span>{product.title.substring(0, 15)}</span>
          </div>
          <span>${product.price}</span>
          <Icon name="close" onClick={() => removeProduct(index)} />
        </div>
      ))}
      <Button primary fluid onClick={createOrder}>
        Realizar pedido (${total})
      </Button>
    </div>
  );
}
