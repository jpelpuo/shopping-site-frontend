import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Products from '../../components/Products'


const HomePageWrapper = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

const HomePage = (props) => {

    return (
        <HomePageWrapper>
            <Products {...props} />
        </HomePageWrapper>
    );
}

export default HomePage;