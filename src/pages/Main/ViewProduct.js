import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Card, Button } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import { products } from '../../data/products';
import { MdAddShoppingCart, MdRemoveShoppingCart, MdAddCircle } from 'react-icons/md';
import ProductContext from '../../context/product-context';
import AuthContext from '../../context/auth-context';


const { Img, Text, Subtitle, Title, Body } = Card;

const MainWrapper = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
`;

const ProductDetails = styled(Card)`
    display: flex;
    flex-flow: row nowrap;
    width: 80%;

    @media screen and (max-width: 768px){
        flex-flow: column wrap
    }
`;

const ProductImage = styled(Img)`
    @media screen and (max-width: 768px){
        width: 100%;
    }
`;
const ProductName = styled(Title)``;
const ProductPrice = styled.span``;
const ProductCategory = styled.span``;
const ProductDescriptionWrapper = styled.div``;
const ProductDescriptionList = styled.ul``;
const ProductDescritpionListItem = styled.li``;
const ProductStatus = styled.span``;
const ProductCondition = styled.span``;
const ProductActions = styled.div`
    width: 60%;
    display: flex;
    flex-flow: column wrap;
`;

const ActionButton = styled(Button)`
    margin: 0.5rem 0;
`;

const ViewProduct = () => {

    const { productId } = useParams();
    const { addToCart, cartItems, removeFromCart, addToWishlist } = useContext(ProductContext);
    const { token } = useContext(AuthContext);
    const history = useHistory();

    const [productInformation] = products.filter(product => {
        return product.id === productId;
    });

    const handleAddToCart = productId => {
        if (!token) {
            history.push('/auth');
            return;
        }
        addToCart(productId);
    }


    const handleRemoveFromCart = productId => {
        removeFromCart(productId);
    }

    const handleAddToWishlist = productId => {
        addToWishlist(productId);
    }

    return (
        <MainWrapper>
            <h2 className="ml-5 font-weight-bolder">Product Details</h2>
            <ProductDetails>
                <ProductImage src={productInformation.image} variant="left" width="600" />
                <Body className="d-flex flex-column">
                    <ProductName className="font-weight-bolder">{productInformation.name}</ProductName>
                    <ProductPrice>
                        <span>{productInformation.currency}</span>
                        {productInformation.price}
                    </ProductPrice>
                    <ProductCategory>
                        {productInformation.category}
                    </ProductCategory>
                    <ProductCondition>
                        <span>Condition: </span>
                        {productInformation.condition}
                    </ProductCondition>
                    <ProductStatus className={productInformation.inStock ? "text-success" : "text-danger"}>
                        {productInformation.inStock ? "In stock" : "Out of stock"}
                    </ProductStatus>
                    <ProductDescriptionWrapper className="mt-3">
                        <Subtitle className="font-weight-bolder">About this product</Subtitle>
                        <ProductDescriptionList>
                            {
                                productInformation.description.map((listItem, index) => {
                                    return (
                                        <ProductDescritpionListItem key={index}>
                                            {listItem}
                                        </ProductDescritpionListItem>
                                    )
                                })
                            }
                        </ProductDescriptionList>
                    </ProductDescriptionWrapper>
                    <ProductActions>
                        <ActionButton variant="primary" onClick={() => handleAddToCart(productInformation.id)}>
                            <MdAddShoppingCart /> Add to Cart
                            </ActionButton>
                        <ActionButton
                            variant="danger"
                            onClick={() => handleRemoveFromCart(productInformation.id)}
                            disabled={cartItems.includes(productInformation.id) ? false : true}>
                            <MdRemoveShoppingCart /> Remove from Cart
                            </ActionButton>
                        {
                            token &&
                            <ActionButton variant="secondary" onClick={() => handleAddToWishlist(productInformation.id)}>
                                <MdAddCircle /> Add to wishlist
                            </ActionButton>
                        }

                    </ProductActions>
                </Body>
            </ProductDetails>
        </MainWrapper>
    );
}

export default ViewProduct;