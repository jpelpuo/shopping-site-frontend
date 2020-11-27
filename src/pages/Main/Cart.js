import React, { useState, useEffect, useContext, useRef } from 'react';
import styled from 'styled-components';
import ProductContext from '../../context/product-context';
import CartItem from '../../components/CartItem';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import { MdShoppingCart, MdRemoveShoppingCart } from 'react-icons/md';



const CartWrapper = styled.div`
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    justify-content: center;
`;

const CartAndActionsWrapper = styled.div`
    display: flex;
    flex-direction: row;

    @media screen and (max-width: 768px){
        flex-flow: column wrap;
    }
`;

const CartItemsView = styled.div`
    width: 70%;
    justify-content: center;

    @media screen and (max-width: 768px){
        width: 80%
    }
`;

const ActionsView = styled.div`
    width: 20%;

    @media screen and (max-width: 768px){
        width: 100%;
    }
`;

const CheckoutButton = styled(Button)``;
const ClearButton = styled(Button)``;

const Cart = () => {
    const [items, setItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(null);
    const [checkedOut, setCheckedOut] = useState(false);
    const [show, setShow] = useState(false);

    const cardDetailsEl = useRef();


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const { cartItems, products, clearCart, checkout } = useContext(ProductContext);

    useEffect(() => {
        const itemsToDisplay = cartItems
            .map(item => {
                return products.filter(product => {
                    return item === product.id;
                })
            })
            .map(item => {
                return item[0];
            })

        setItems([...itemsToDisplay]);

        const totalAmount = itemsToDisplay.reduce((acc, current) => {
            return acc + current.price
        }, 0);

        setTotalAmount(totalAmount);

    }, [cartItems]);

    const handleClearCart = () => {
        clearCart();
    }

    const handleCheckout = () => {
        const cardDetails = cardDetailsEl.current.value;
        const currentDate = new Date();
        const dataToSave = {
            date: currentDate,
            items: [...items],
            cardDetails,
            totalAmount
        }

        checkout(dataToSave);
        setCheckedOut(true);
        setShow(false);

        setTimeout(() => {
            setCheckedOut(false);
            clearCart();
        }, 5000)
    }

    return (
        <CartWrapper className="">
            <h2 className="ml-5 font-weight-bolder">Cart Items</h2>

            <CartAndActionsWrapper>
                <CartItemsView className="ml-5">
                    {
                        items.length !== 0
                            ? items.map((item, index) => {
                                return <CartItem key={index} product={item} />
                            })
                            : <div>
                                <h5 className="text-muted">Nothing to see here</h5>
                            </div>
                    }
                </CartItemsView>
                <ActionsView className="ml-2 p-2">
                    <div>Total Amount: GHC {totalAmount}</div>
                    <div className="d-flex flex-row">
                        <CheckoutButton
                            className="mr-2"
                            onClick={handleShow}
                            disabled={items.length !== 0 ? false : true}>
                            <MdShoppingCart /> Checkout
                        </CheckoutButton >
                        <ClearButton
                            variant="danger"
                            disabled={items.length !== 0 ? false : true}
                            onClick={handleClearCart}>
                            <MdRemoveShoppingCart /> Clear Cart
                        </ClearButton>
                    </div>
                    {
                        checkedOut &&
                        <Alert variant="success" className="mt-3">Items Checked out</Alert>
                    }
                </ActionsView>

                <Form onSubmit={handleCheckout}>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Checking out</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Label>Enter Card Details</Form.Label>
                            <Form.Control type="text" ref={cardDetailsEl} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                        </Button>
                            <Button variant="primary" onClick={handleCheckout}>
                                Checkout
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </Form>
            </CartAndActionsWrapper>
        </CartWrapper>
    );
}

export default Cart;