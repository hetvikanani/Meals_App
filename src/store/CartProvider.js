import CartContext from "./cart-context";

const CartProvider = (props) => {

    const addItemToCartHandler = (iteam) => { }
    const removeItemFromCartHandler = (id) => { }

    const cartContext = {
        iteams: [],
        totalAmount: 0,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
    };

    return <CartContext.Provider>{props.children}</CartContext.Provider>;
};

export default CartProvider;
