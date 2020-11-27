import React, { useContext } from 'react';
import styled from 'styled-components';
import { Card, Button } from 'react-bootstrap';
import ProductContext from '../context/product-context';

const { Img } = Card

const CartItemWrapper = styled(Card)`
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
`;

const ItemImage = styled(Img)``;

const ItemDetailsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const ItemName = styled.span``;

const ItemStatus = styled.span``;

const ItemUnitPrice = styled.span``;
const Actions = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const RemoveButton = styled(Button)``;

const CartItem = ({ product }) => {

    const { removeFromCart } = useContext(ProductContext);

    const handleRemove = productId => {
        removeFromCart(productId);
    }
    return (
        <CartItemWrapper className="my-2">
            <ItemImage src={product.image} variant="left" width="180" height="180" />
            <Card.Body>
                <ItemDetailsWrapper className="">
                    <Card.Title>
                        <ItemName>{product.name}</ItemName>
                    </Card.Title>
                    <ItemStatus className={product.inStock ? "text-success" : "text-danger"}>
                        {product.inStock ? "In stock" : "Out of stock"}
                    </ItemStatus>

                    <ItemUnitPrice><span>Unit Price: GHC </span>{product.price}</ItemUnitPrice>
                    <Actions className="">
                        <RemoveButton variant="danger" onClick={() => handleRemove(product.id)}>
                            Remove
                        </RemoveButton>
                    </Actions>
                </ItemDetailsWrapper>
            </Card.Body>
        </CartItemWrapper>
    );
}

export default CartItem;