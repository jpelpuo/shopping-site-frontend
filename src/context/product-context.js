import React from 'react';

export default React.createContext({
    products: [],
    cartItems: [],
    wishlist: [],
    addToCart: (productId) => { },
    removeFromCart: (productId) => { },
    addToWishlist: (productId) => { },
    removeFromWishlist: (productid) => { },
    searchedProducts: [],
    searchInitiated: false,
    search: (productName) => { },
    clearCart: () => { },
    clearWishlist: () => { },
    checkout: (dataToSave) => { },
    history: [],
    clearHistory: () => { }
})