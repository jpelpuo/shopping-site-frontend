import React, { useContext, useRef } from 'react';
import { Form, Navbar, Button, Nav, FormControl } from 'react-bootstrap';
import AuthContext from '../context/auth-context';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { MdShoppingCart } from 'react-icons/md';
import ProductContext from '../context/product-context';

const NavLink = styled(Link)`
    text-decoration: none !important;
    color: lightgray;
`;

const StyledSearchForm = styled(Form)`
    margin: 0 auto;
    width: 60%;

    @media screen and (max-width: 768px){
        margin: 0.8rem 0;
        width: 100%;
        display: flex;
        flex-direction: row;
    }
`;

const StyledFormControl = styled(FormControl)`
    width: 90% !important;
    margin-right: 0.8rem;

    @media screen and (max-width: 768px){
        width: 85% !important;
    }
`;

const CartIcon = styled.div`
    display: flex;
    flex-flow: row nowrap;
    margin: 0 auto;

    @media screen and (max-width: 768px){
        margin: 1rem 0;
    }
`;

const CartNumber = styled.span`
    display: inline-block;
    width: 1.5rem;
    height: 1.55rem;
    text-align: center;
`;

const NavBar = () => {
    const { accessToken, logout } = useContext(AuthContext);
    const { cartItems, search } = useContext(ProductContext);
    const searchEl = useRef();

    const handleLogout = () => {
        logout();
    }

    const handleSearch = event => {
        event.preventDefault();
        const searchString = searchEl.current.value;
        search(searchString);
    }

    const handleChange = () => {
        const searchString = searchEl.current.value;
        if(searchString === ""){
            search(searchString);
        }
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
            <Navbar.Brand href="#home">Buy Stuff From Here !</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink to="/home">Home</NavLink>
                </Nav>
                {
                    accessToken &&
                    <>
                        <Nav className="mr-auto">
                            <NavLink to="/wishlist">Wishlist</NavLink>
                        </Nav>
                        <Nav>
                            <NavLink to="/history">Purchase history</NavLink>
                        </Nav>
                    </>
                }

                <StyledSearchForm inline className="" onSubmit={(event) => handleSearch(event)}>
                    <StyledFormControl
                        type="text"
                        placeholder="Search products"
                        className=""
                        onChange={handleChange}
                        ref={searchEl}/>
                    <Button variant="outline-info" type="submit">
                        <FaSearch />
                    </Button>
                </StyledSearchForm>
                <CartIcon>
                    <Nav className="mr-auto">
                        <NavLink to="/cart">
                            <MdShoppingCart size="1.5rem" />
                            <CartNumber className="rounded-circle bg-danger">{cartItems.length}</CartNumber>
                        </NavLink>
                    </Nav>
                </CartIcon>

                <Nav>
                    {
                        accessToken && <Button className="ml-2" onClick={handleLogout}>Logout</Button>
                    }
                    {
                        !accessToken && <NavLink className="btn btn-primary" to="/auth">Login</NavLink>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;