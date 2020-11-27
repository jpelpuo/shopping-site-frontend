import React from 'react';

export default React.createContext({
    accessToken: null,
    refreshToken: null,
    login: (accessToken, refreshToken, userId, cart, history, wishlist) => { },
    logout: () => { }
})