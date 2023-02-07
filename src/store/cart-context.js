import React from "react";

const CartContext = React.createContext({
    iteams: [],
    totalAmount: 0,
    addItem: (iteam) => { },
    removeItem: (id) => { }
})

export default CartContext