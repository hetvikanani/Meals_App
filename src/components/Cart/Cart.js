import React from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal/Modal";

const Cart = (props) => {
    return (
        <Modal>
            <ul className={classes["cart-items"]}>
                {[
                    {
                        id: "m1",
                        name: "Sushi",
                        description: "Finest fish and veggies",
                        price: 22.99,
                    },
                ].map((ele) => {
                    return <li>{ele.name}</li>;
                })}
            </ul>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>35.82</span>
            </div>
            <div className={classes.actions}>
                <button className={classes[`button--alt`]} onClick={props.onClose}>
                    Close
                </button>
                <button className={classes.button}>Order</button>
            </div>
        </Modal>
    );
};

export default Cart;
