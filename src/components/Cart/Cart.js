import React, { useContext } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
    const cartCtx = useContext(CartContext);
    const hasItems = cartCtx.items.length > 0;

    const cartItemAddHandler = (item) => {
        cartCtx.addItem(item)
    };

    const removeItemAddHandler = (id) => {
        cartCtx.removeItem(id)
    };

    return (
        <Modal>
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
            <div className={classes.actions}>
                <button className={classes[`button--alt`]} onClick={props.onClose}>
                    Close
                </button>
                {hasItems ? <button className={classes.button}>Order</button> : null}
            </div>
        </Modal>
    );
};

export default Cart;
