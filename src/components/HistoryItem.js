import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Card } from 'react-bootstrap';
import formatDate from '../helpers/formatDate';

const HistoryItemWrapper = styled(Card)`
    width: 100%;
`;

const PurchaseDate = styled.div``;
const CardDetails = styled.div``;
const ItemsPurchasedWrapper = styled.div``;
const ItemsPurchasedList = styled.ul``;
const ListItem = styled.li``;
const TotalAmount = styled.div``;

const HistoryItem = ({ purchaseHistory }) => {
    return (
        <HistoryItemWrapper className="my-2">
            <Card.Body>
                <PurchaseDate>
                    <span className="font-weight-bolder">Purchase Date: </span>
                    {
                        formatDate(purchaseHistory.date)
                    }
                </PurchaseDate>
                <CardDetails>
                    <span className="font-weight-bolder">Card Used: </span>{purchaseHistory.cardDetails}
                </CardDetails>
                <ItemsPurchasedWrapper>
                    <span className="font-weight-bolder">Items Purchased</span>
                    <ItemsPurchasedList>
                        {
                            purchaseHistory.items.map((item, index) => {
                                return <ListItem key={index}>
                                    {
                                        item.name
                                    }
                                </ListItem>
                            })
                        }
                    </ItemsPurchasedList>
                </ItemsPurchasedWrapper>
                <TotalAmount>
                    <span className="font-weight-bolder">Total Amount: GHC </span>
                    {
                        purchaseHistory.totalAmount
                    }
                </TotalAmount>
            </Card.Body>
        </HistoryItemWrapper>
    );
}

export default HistoryItem;