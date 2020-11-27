import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Form, Col, Button, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const { Label, Text, Row } = Form;
const RegisterForm = styled(Form)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 35%;

    @media screen and (max-width: 768px){
        width: 90%;
    }
`;

const FormLabel = styled(Label)`
    float: left;
`;

const FormRow = styled(Row)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const FormText = styled(Text)`
    line-height: 1.5;
    vertical-align: center;
`;

const LoginLink = styled(Link)``;

const RegisterPage = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [complete, setComplete] = useState(false);

    const nameEl = useRef();
    const emailEl = useRef();
    const passwordEl = useRef();
    const confirmPasswordEl = useRef();

    const handleSubmit = async event => {
        event.preventDefault();

        setLoading(true);

        const name = nameEl.current.value;
        const email = emailEl.current.value;
        const password = passwordEl.current.value;
        const confirmPassword = confirmPasswordEl.current.value;


        if (!name || !email || !password || !confirmPassword) {
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const [firstName, ...rest] = name.split(' ');
        const [lastName] = rest;

        console.log(firstName);

        const requestBody = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }

        const response = await fetch('https://secret-anchorage-57474.herokuapp.com/api/user/register', {
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

        setComplete(true);
        setLoading(false);
        setError(null);
    }

    return (
        <RegisterForm className="mx-auto border p-4 mt-5" onSubmit={handleSubmit}>
            <h3>Sign Up!</h3>
            {
                error && <Alert variant="danger">{error}</Alert>
            }
            {
                complete && <Alert variant="success">User added! You can now login</Alert>
            }
            <Form.Group controlId="formBasicEmail">
                <FormLabel>Name</FormLabel>
                <Form.Control type="text" ref={nameEl} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <FormLabel>Email</FormLabel>
                <Form.Control type="email" ref={emailEl} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <FormLabel>Password</FormLabel>
                <Form.Control type="password" ref={passwordEl} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <FormLabel className="">Confirm Password</FormLabel>
                <Form.Control type="password" ref={confirmPasswordEl} />
            </Form.Group>

            <FormRow>
                <Button variant="primary" type="submit">
                    {
                        loading
                            ?
                            <>
                                <Spinner as="span" size="sm" animation="border" />
                             Adding user
                            </>
                            : "Register"
                    }
                </Button>
                <FormText className="text-muted align-middle">
                    Already have an account?
                <LoginLink to="/auth"> Log in!</LoginLink>
                </FormText>

            </FormRow>
        </RegisterForm>
    );
}

export default RegisterPage;