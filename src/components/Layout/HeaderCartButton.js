import React, { useContext, useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [btnIsHighlighted, setBtnIsHinglighted] = useState(false);

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasse = `${classes.button} ${btnIsHighlighted ? classes.bump : null
    }`;

  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setBtnIsHinglighted(true);

    const timer = setTimeout(() => {
      setBtnIsHinglighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };

  }, [cartCtx.items]);

  return (
    <>
      <button className={btnClasse} onClick={props.onShowCart}>
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
      </button>
    </>
  );
};

export default HeaderCartButton;
