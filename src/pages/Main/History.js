import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductContext from '../../context/product-context';
import HistoryItem from '../../components/HistoryItem';
import { Button, Alert } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa'

const HistoryWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-flow: column nowrap;
`;

const MainView = styled.div`
    display: flex;
    flex-flow: row nowrap;

    @media screen and (max-width: 768px){
        flex-flow: column nowrap;
    }
`;

const HistoryView = styled.div`
    display: flex;
    flex-flow: column nowrap;
    width: 70%;
`;


const ActionsView = styled.div`
    width: 20%;

    @media screen and (max-width: 768px){
        width: 90%;
    }
`;

const ClearButton = styled(Button)``;



const PurchaseHistory = () => {
    const [historyCleared, setHistoryCleared] = useState(false);
    const { history, clearHistory } = useContext(ProductContext);
    const [purchaseHistory, setPurchaseHistory] = useState([]);

    useEffect(() => {
        setPurchaseHistory([...history]);
    }, [history]);

    const handleClearHistory = () => {
        clearHistory();
        setHistoryCleared(true);

        setTimeout(() => {
            setHistoryCleared(false);
        }, 5000)
    }

    return (
        <HistoryWrapper>
            <h2 className="ml-5 font-weight-bolder">Your Purchase History</h2>
            <MainView>
                <HistoryView className="ml-5">
                    {
                        purchaseHistory.length !== 0
                            ?
                            purchaseHistory.map(historyItem => {
                                return <HistoryItem purchaseHistory={historyItem} />
                            })
                            : <div>
                                <h5 className="text-muted">Nothing to see here</h5>
                            </div>
                    }
                </HistoryView>
                <ActionsView className="ml-2 p-2">
                    <div className="d-flex flex-column">
                        <ClearButton
                            variant="danger"
                            onClick={handleClearHistory}
                            disabled={history.length !== 0 ? false : true}>
                            <FaTrash /> Clear History
                        </ClearButton>
                    </div>
                    {
                        historyCleared &&
                        <Alert variant="success" className="mt-3">History Cleared</Alert>
                    }
                </ActionsView>

            </MainView>
        </HistoryWrapper>
    );
}

export default PurchaseHistory;