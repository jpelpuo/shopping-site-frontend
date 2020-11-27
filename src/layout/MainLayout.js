import React, { useContext } from 'react';
import NavBar from '../components/NavBar';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import ProductContext from '../context/product-context';

const MainContainer = styled(Container)`
    padding: 0;
`;

const MainContent = styled.div`
    display: flex;
    width: 100%;
    margin-top: 5rem;
`;

const MainLayout = ({ children }) => {
    return (
        <MainContainer fluid>
            <NavBar />
            <MainContent className="">
                {children}
            </MainContent>
        </MainContainer>
    );
}

export default MainLayout;