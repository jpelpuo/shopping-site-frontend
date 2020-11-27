import React, { useContext } from 'react';
import styled from 'styled-components';
import { Card, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { MdAddShoppingCart, MdRemoveShoppingCart, MdAddCircle } from 'react-icons/md';
import ProductContext from '../context/product-context';
import AuthContext from '../context/auth-context';

const { Img } = Card;

const ProductWrapper = styled(Card)`
    display: flex;
    flex-flow: column nowrap;
    width: 17%;
    margin: 1rem 1rem;
    box-sizing: border-box;
    transition: all 0.2s;


    @media screen and (max-width: 768px){
        width: 80%;
        height: 10% !important;
        margin: 0.5rem auto;
    }

    &:hover{
        transform: scale(1.05, 1.05)
    }
`;

const ProductImage = styled(Img)`
    height: 270px;  

    @media screen and (max-width: 768px){
        height: 300px;
    }
`;
const DetailsWrapper = styled.div`
    display: flex;
    flex-flow: column nowrap;
`;
const ProductName = styled.span`
    font-weight: bold;
`;
const ProductPrice = styled.span`
    font-weight: lighter;
`;

const CardActions = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
`;

const ProductStatus = styled.span`
    font-weight: light;
`;


const ProductItem = ({ product }) => {
    const { addToCart, cartItems, removeFromCart, addToWishlist } = useContext(ProductContext);
    const { accessToken } = useContext(AuthContext);
    const history = useHistory();

    const handleAddtoCart = productId => {
        if (!accessToken) {
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
        <ProductWrapper className="">
            <Link
                to={`/product/${product._id}`}
                style={{ color: "black", textDecoration: "none" }}>
                <ProductImage src={product["image "]} variant="top" />
            </Link>
            <Card.Body>
                <DetailsWrapper>
                    <ProductName>{product.name}</ProductName>
                    <ProductPrice><span className="mr-1">{product.currency}</span>{product.price}</ProductPrice>
                    <ProductStatus className={product.inStock ? "text-success" : "text-danger"}>
                        {product.inStock ? "In stock" : "Out of stock"}
                    </ProductStatus>
                </DetailsWrapper>
                <CardActions>
                    <Button
                        variant="primary"
                        size="sm"
                        title="Add to cart"
                        onClick={() => handleAddtoCart(product._id)}
                        className="mr-1">
                        <MdAddShoppingCart />
                    </Button>
                    <Button
                        variant="danger"
                        size="sm"
                        title="Remove from cart"
                        className="mr-1"
                        onClick={() => handleRemoveFromCart(product._id)}
                        disabled={cartItems.includes(product._id) ? false : true}>
                        <MdRemoveShoppingCart />
                    </Button>
                    {
                        accessToken &&
                        <Button variant="secondary" size="sm" onClick={() => handleAddToWishlist(product._id)}>
                            <MdAddCircle />
                            <span className="ml-1">Add to wishlist</span>
                        </Button>
                    }
                </CardActions>
            </Card.Body>
        </ProductWrapper>
    );
}

export default ProductItem;