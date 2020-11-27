import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthPage from './pages/Auth';
import RegisterPage from './pages/Register';
import MainLayout from './layout/MainLayout';
import HomePage from './pages/Main/Home';
import ViewProductPage from './pages/Main/ViewProduct';
import Cart from './pages/Main/Cart';
import AuthContext from './context/auth-context';
import ProductContext from './context/product-context';
import { products } from './data/products';
import WishlistPage from './pages/Main/Wishlist';
import PurchaseHistory from './pages/Main/History';

function App() {
  const existingAccessToken = localStorage.getItem('accessToken') || null;
  const existingRefreshToken = localStorage.getItem('refreshToken') || null;

  const [data, setData] = useState([]);
  const [accessToken, setAccessToken] = useState(existingAccessToken);
  const [refreshToken, setRefreshToken] = useState(existingRefreshToken);
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [history, setHistory] = useState([]);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [searchInitiated, setSearchInitiated] = useState(false);


  const login = (accessToken, refreshToken, userId, cart, history, wishlist) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setCartItems([...cart]);
    setHistory([...history]);
    setWishlist([...wishlist])
  }

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    setAccessToken(null);
  }

  const fetchData = async () => {
    try {
      const response = await fetch(`https://secret-anchorage-57474.herokuapp.com/api/product/all`);
      const { products } = await response.json();

      console.log(products[0]["image "])
      setData([...products]);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

  useEffect(() => {

    if (!accessToken) {
      const cartInfo = JSON.parse(sessionStorage.getItem("cartItems"));
      if (cartInfo) {
        setCartItems([...cartInfo.cartItems]);
      }
    }
  }, [accessToken]);

  // Service functions

  const addToCart = async productId => {
    try {
      const response = await fetch(`https://secret-anchorage-57474.herokuapp.com/api/cart/add/${productId}`);
      const responseData = Response.json();


      setCartItems([productId, ...cartItems]);
    } catch (error) {
      throw error;
    }
  }

  const removeFromCart = productId => {
    if (cartItems.length === 1) {
      setCartItems([]);
      return;
    }

    const tempArray = [...cartItems];
    tempArray.splice(tempArray.indexOf(productId), 1);
    setCartItems([...tempArray]);
  }


  const search = productSearchString => {
    setSearchInitiated(true);
    const productsFound = products.filter(product => {
      return product.name.toLowerCase().includes(productSearchString.toLowerCase());
    })

    setSearchedProducts(productsFound);
  }

  const addToWishlist = productId => {
    if (wishlist.includes(productId)) {
      return;
    }
    setWishlist([productId, ...wishlist])
  }

  const removeFromWishlist = productId => {
    if (wishlist.length === 1) {
      setWishlist([]);
      return;
    }

    const tempArray = [...wishlist];
    tempArray.splice(tempArray.indexOf(productId), 1);
    setWishlist([...tempArray]);
  }

  const clearCart = () => {
    setCartItems([]);
  }

  const clearWishlist = () => {
    setWishlist([]);
  }

  const checkout = (purchaseData) => {
    setHistory([purchaseData, ...history]);
  }

  const clearHistory = () => {
    setHistory([]);
  }

  useEffect(() => {
    if (!accessToken) {
      const dataToSave = JSON.stringify({
        cartItems: [...cartItems]
      });

      sessionStorage.setItem("cartItems", dataToSave);
      return;
    }

    // const userInfo = JSON.parse(localStorage.getItem(userEmail));
    // userInfo.cartItems = [...cartItems];
    // userInfo.wishlist = [...wishlist];
    // userInfo.history = [...history];
    // localStorage.setItem(userEmail, JSON.stringify(userInfo));
  }, [cartItems, wishlist, history]);

  return (
    <div className="App">
      <BrowserRouter>
        <AuthContext.Provider
          value={{
            accessToken: accessToken,
            refreshToken: refreshToken,
            logout: logout,
            login: login
          }}>
          <ProductContext.Provider
            value={{
              addToCart: addToCart,
              cartItems: cartItems,
              products: data,
              search: search,
              searchedProducts: searchedProducts,
              searchInitiated: searchInitiated,
              removeFromCart: removeFromCart,
              addToWishlist: addToWishlist,
              wishlist: wishlist,
              removeFromWishlist: removeFromWishlist,
              clearCart: clearCart,
              clearWishlist: clearWishlist,
              checkout: checkout,
              history: history,
              clearHistory: clearHistory
            }}>
            <Switch>
              {
                accessToken && <Redirect path="/auth" to="/home" />
              }
              <Redirect path="/" to="/home" exact />
              <Route exact path="/auth" component={AuthPage} />
              <Route exact path="/register" component={RegisterPage} />
              <Route exact path="/home" render={(props) => (
                <MainLayout>
                  <HomePage {...props} />
                </MainLayout>
              )} />
              <Route exact path="/product/:productId" render={props => (
                <MainLayout>
                  <ViewProductPage {...props} />
                </MainLayout>
              )} />
              <Route exact path="/cart" render={props => (
                <MainLayout>
                  <Cart {...props} />
                </MainLayout>
              )} />
              <Route exact path="/wishlist" render={props => (
                <MainLayout>
                  <WishlistPage {...props} />
                </MainLayout>
              )} />
              <Route exact path="/history" render={props => (
                <MainLayout>
                  <PurchaseHistory {...props} />
                </MainLayout>
              )} />
            </Switch>
          </ProductContext.Provider>
        </AuthContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
