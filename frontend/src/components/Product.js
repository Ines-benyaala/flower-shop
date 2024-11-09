import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity } from "../redux/slices/cartSlice";

function Product({ product }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const productInCart = cart.find((item) => item.id === product.id);
  const [quantity, setQuantity] = useState(
    productInCart ? productInCart.quantity : 1
  ); // Initialize quantity based on cart state

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    dispatch(updateQuantity({ id: product.id, quantity: newQuantity }));
  };

  return (
    <div className="product-card">
      <span>-20%</span>
      <img
        className="product-img"
        src={product.productUrl}
        alt={product.name}
      />
      <div className="product-price">
        <div className="amount">{product.price.amount}</div>
        <div className="currency">{product.price.currency}</div>
      </div>

      {productInCart ? (
        <div className="quantity-container">
          <button
            className="increase-decrease-quantity"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1} 
          >
            -
          </button>
          {quantity}
          <button
            className="increase-decrease-quantity"
            onClick={() => handleQuantityChange(quantity + 1)}
          >
            +
          </button>
        </div>
      ) : (
        <button className="add-product" onClick={handleAddToCart}>
          <i className="fa-solid fa-cart-plus"></i>
          Add To Cart
        </button>
      )}

      <h4 className="product-name">{product.name}</h4>
    </div>
  );
}

export default Product;
