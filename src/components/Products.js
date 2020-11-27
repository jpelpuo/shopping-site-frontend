import React, { useContext } from 'react';
import styled from 'styled-components';
import ProductItem from './ProductItem';
import ProductContext from '../context/product-context';


const ProductsView = styled.div`
    display: flex;
    flex-flow:row wrap;
    width: 100%;
`;

const MainProducts = styled.div`
    display: flex;
    flex-flow:row wrap;
    justify-content: center;
    width: 100%;

    @media screen and (max-width: 768px){
        flex-flow:column nowrap;
        justify-content: center;
    }
`;

const Products = (props) => {

    const { products, searchedProducts} = useContext(ProductContext);
    return (
        <ProductsView>
            <h2 className="ml-5 font-weight-bolder">Browse All Products</h2>
            <MainProducts className="">
                {
                    searchedProducts.length !== 0
                        ? searchedProducts.map((product, index) => {
                            return <ProductItem key={index} product={product} {...props} />
                        })
                        : products.map((product, index) => {
                            return <ProductItem key={index} product={product} {...props} />
                        })
                // {
                //     searchedProducts.length === 0 &&
                    
                }
            </MainProducts>
        </ProductsView>
    );
}

export default Products;