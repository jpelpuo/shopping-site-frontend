import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import ProductContext from '../../context/product-context';
import WishlistItem from '../../components/WishlistItem';
import { Button, Alert } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa'


const WishlistWrapper = styled.div`
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    justify-content: center;
`;

const WishlistAndActionsWrapper = styled.div`
    display: flex;
    flex-direction: row;

    @media screen and (max-width: 768px){
        flex-flow: column wrap;
    }
`;

const WishlistItemsView = styled.div`
    width: 70%;
    justify-content: center;

    @media screen and (max-width: 768px){
        width: 80%
    }
`;

const ActionsView = styled.div`
    width: 20%;

    @media screen and (max-width: 768px){
        width: 90%;
    }
`;
const ClearButton = styled(Button)``;


const WishlistPage = () => {
    const [items, setItems] = useState([]);
    const [wishlistCleared, setWishlistCleared] = useState(false);
    const { wishlist, products, clearWishlist } = useContext(ProductContext);

    useEffect(() => {
        const itemsToDisplay = wishlist
            .map(item => {
                return products.filter(product => {
                    return item === product.id;
                })
            })
            .map(item => {
                return item[0];
            })

        setItems([...itemsToDisplay]);


    }, [wishlist]);

    const handleClearWishlist = () => {
        clearWishlist();
        setWishlistCleared(true);

        setTimeout(() => {
            setWishlistCleared(false);
        }, 5000)
    }

    return (
        <WishlistWrapper className="">
            <h2 className="ml-5 font-weight-bolder">Your Wishlist</h2>

            <WishlistAndActionsWrapper>
                <WishlistItemsView className="ml-5">
                    {
                        items.length !== 0
                            ?
                            items.map((item, index) => {
                                return <WishlistItem key={index} product={item} />
                            })
                            : <div>
                                <h5 className="text-muted">Nothing to see here</h5>
                            </div>
                    }
                </WishlistItemsView>
                <ActionsView className="ml-2 p-2">
                    <div className="d-flex flex-column">
                        <ClearButton
                            variant="danger"
                            disabled={items.length !== 0 ? false : true}
                            onClick={() => handleClearWishlist()}>
                            <FaTrash /> Clear Wishlist
                        </ClearButton>
                    </div>

                    {
                        wishlistCleared &&
                        <Alert variant="success" className="mt-3">Wishlist Cleared</Alert>
                    }
                </ActionsView>

            </WishlistAndActionsWrapper>
        </WishlistWrapper>
    );
}

export default WishlistPage;