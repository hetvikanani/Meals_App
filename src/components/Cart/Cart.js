import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import CheckOut from "./CheckOut";
import axios from "axios";

const Cart = (props) => {
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);
  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const removeItemAddHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const orderHandler = () => {
    setIsCheckOut(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    try {
      await axios.post(
        `https://meal-f06cc-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json`,
        { user: userData, orderedItems: cartCtx.items }
      );
    } catch (error) {
      console.log(error);
    }
    setIsSubmitting(false);
    setDidSubmit(true);

    cartCtx.clearCart();
  };

  return (
    <Modal>
      {!isSubmitting && !didSubmit && (
        <>
          <ul className={classes["cart-items"]}>
            {cartCtx.items.map((ele) => {
              // return <li>{ele.name}</li>;
              return (
                <CartItem
                  key={ele.id}
                  name={ele.name}
                  price={ele.price}
                  amount={ele.amount}
                  onAdd={cartItemAddHandler.bind(null, ele)}
                  onRemove={removeItemAddHandler.bind(null, ele.id)}
                />
              );
            })}
          </ul>
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{`$ ${cartCtx.totalAmount.toFixed(2)}`}</span>
          </div>
          {isCheckOut && (
            <CheckOut onCancel={props.onClose} onConfirm={submitOrderHandler} />
          )}
          {!isCheckOut && (
            <div className={classes.actions}>
              <button
                className={classes[`button--alt`]}
                onClick={props.onClose}
              >
                Close
              </button>
              {hasItems ? (
                <button className={classes.button} onClick={orderHandler}>
                  Order
                </button>
              ) : null}
            </div>
          )}
        </>
      )}
      {isSubmitting && <p>Sending Order Data...</p>}
      {didSubmit && !isSubmitting && (
        <>
          <p>Successfully sent the order!</p>
          <div className={classes.actions}>
            <button className={classes.button} onClick={props.onClose}>
              Close
            </button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default Cart;
