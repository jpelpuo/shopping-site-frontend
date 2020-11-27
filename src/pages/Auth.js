import React, { useRef, useContext, useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AuthContext from '../context/auth-context'

const { Text, Row, Label } = Form;

const AuthForm = styled(Form)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 40%;

    @media screen and (max-width: 768px){
        width: 90%;
    }
`;

const FormText = styled(Text)`
    line-height: 1.5;
    vertical-align: center;
`;

const FormLabel = styled(Label)`
    float: left;
`;

const FormRow = styled(Row)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const RegisterLink = styled(Link)``;


const AuthPage = () => {
    const emailEl = useRef();
    const passwordEl = useRef();
    const auth = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    // const makeId = (length) => {
    //     let result = '';
    //     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     const charactersLength = characters.length;

    //     for (var i = 0; i < charactersLength; i++) {
    //         result += characters.charAt(Math.floor(Math.random() * charactersLength));
    //     }
    //     return result;
    // }

    const handleSubmit = async event => {
        event.preventDefault();

        setLoading(true);
        const email = emailEl.current.value;
        const password = passwordEl.current.value;

        if (!email && !password) {
            return;
        }

        const requestBody = {
            email: email,
            password: password
        }

        const response = await fetch('https://secret-anchorage-57474.herokuapp.com/api/user/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        const responseData = await response.json();

        if (responseData.error) {
            setError(responseData.error.message);
            setLoading(false);
            return;
        }


        const { accessToken, refreshToken, userId, cart, wishlist, history } = responseData;
        auth.login(accessToken, refreshToken, userId, cart, history, wishlist);
    }
    return (
        <AuthForm onSubmit={handleSubmit} className="mx-auto border p-3 mt-5">
            <h3>Login</h3>
            {
                error && <Alert variant="danger">{error}</Alert>
            }
            <Form.Group controlId="formBasicEmail">
                <FormLabel>Email</FormLabel>
                <Form.Control type="email" ref={emailEl} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <FormLabel className="">Password</FormLabel>
                <Form.Control type="password" ref={passwordEl} />
            </Form.Group>

            <FormRow className="">
                <Button variant="primary" type="submit">
                    {
                        loading ?
                        <>
                            <Spinner animation="border" size="sm" as="span"/>
                             Signing in
                         </>
                         : "Login"
                    }
                </Button>
                <FormText className="text-muted align-middle">
                    Dont have an account?
                <RegisterLink to="/register"> Register here!</RegisterLink>
                </FormText>
            </FormRow>
        </AuthForm>
    );
}

export default AuthPage;