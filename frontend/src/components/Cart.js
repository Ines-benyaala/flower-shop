import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from "../redux/slices/cartSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRemove = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleConfirmOrder = async () => {
    try {
      setIsLoading(true);
      const orderData = {
        fullname,
        email,
        phone,
        products: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price.amount,
        })),
      };

      const response = await axios.post(
        "http://localhost:5000/api/orders/place-order",
        orderData
      );
      if (response.status === 200) {
        alert("Order confirmed! You will receive an email soon.");
        setShowModal(false);
        dispatch(clearCart());
        navigate("/products");
      } else {
        alert("There was an issue with your order. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul className="cart-list">
          {cartItems.map((item) => (
            <li key={item.id} className="cart-item">
              <div className="cart-item-image">
                <img src={item.productUrl} alt={item.name} />
              </div>
              <div className="cart-item-details">
                <h4>{item.name}</h4>
                <p className="cart-item-price">
                  {item.price.amount} {item.price.currency}
                </p>
              </div>
              <div className="cart-item-quantity">
                <button
                  className="quantity-btn"
                  onClick={() =>
                    handleUpdateQuantity(item.id, item.quantity - 1)
                  }
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() =>
                    handleUpdateQuantity(item.id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
              <div className="cart-item-actions">
                <button
                  className="remove-btn"
                  onClick={() => handleRemove(item)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {cartItems.length > 0 && (
        <div className="cart-confirmation">
          <button
            className="confirm-order-btn"
            onClick={() => setShowModal(true)}
          >
            Confirm Order
          </button>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Enter Your Details</h3>
            <div className="form-group">
              <label htmlFor="fullname">Full Name</label>
              <input
                type="text"
                id="fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="form-actions">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button
                button
                type="submit"
                onClick={handleConfirmOrder}
                disabled={isLoading}
                className="confirm-btn"
              >
                {isLoading ? "Processing..." : "Confirm Order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
