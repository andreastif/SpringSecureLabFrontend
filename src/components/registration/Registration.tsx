import {Button, Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import './Registration.css'
import {
    BsEnvelope,
    BsEye,
    BsEyeSlash,
    BsLock,
    BsPerson,
    BsPersonAdd,
} from "react-icons/bs";

import {ChangeEvent, FormEvent, useEffect, useState} from "react";

import isEmail from "validator/lib/isEmail";

import {useNavigate} from "react-router-dom";
import {FormType} from "../../types/FormType.ts";
import {post} from "../../hooks/useAxios.ts";
import {useRegistrationAuthProps} from "../../hooks/useRegistrationAuthProps.ts";


export default function Registration() {
    const props = useRegistrationAuthProps();

    const [form, setForm] = useState<FormType>({
        confirmPassword: "",
        email: "",
        firstname: "",
        lastname: "",
        password: "",
        username: ""
    })

    const [invalid, setInvalid] = useState<boolean | string>(false)
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false)
    const [usernameValid, setUsernameValid] = useState<boolean>(false)
    const [firstNameValid, setFirstNameValid] = useState<boolean>(false)
    const [lastNameValid, setLastNameValid] = useState<boolean>(false)
    const [emailValid, setEmailValid] = useState<boolean>(false)
    const [passwordSame, setPasswordSame] = useState<boolean>(false)
    const [passwordValidated, setPasswordValidated] = useState<boolean>(false)
    const [passwordRegex, setPasswordRegex] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log(form);

        const userData = {
            username: form.username,
            email: form.email,
            password: form.password,
            firstname: form.firstname,
            lastname: form.lastname,
            registeredToClientId: import.meta.env.VITE_REGISTERED_TO_CLIENT_ID,
        }

        try {
            const res = await post("members/login", userData);
            if (res.status === 201) {
                props.setRegistrationComplete(true);
                props.setRegistrationFailed(false);
                navigate("/register/success")
            } else {
                props.setRegistrationComplete(false);
                props.setRegistrationFailed(true);
                navigate("/register/failure")
            }
        } catch (err: any) {
            props.setErrorMessage(err.toString())
            navigate("/*")
        }

        //reset form
        setForm({
            confirmPassword: "",
            email: "",
            firstname: "",
            lastname: "",
            password: "",
            username: ""
        })
    }

    const handleFormChange = (e: ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        setForm((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        })
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    };

    useEffect(() => {
        //inside here, we define what the hook does when change is observed in deps

        const passwordRegex = new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{12,}$"
        );

        const nameRegex = new RegExp("^[A-Za-z]{2,}$");

        //using variables because if we use the state immediately we get out of sync.
        const validPasswordRegex =
            passwordRegex.test(form.password) && passwordRegex.test(form.confirmPassword);
        const validPasswordSame =
            form.password === form.confirmPassword && form.password.length > 0;
        const validEmail = isEmail(form.email);
        const validFirstName = nameRegex.test(form.firstname);
        const validLastName = nameRegex.test(form.lastname);
        const validUsername = nameRegex.test(form.username);

        // Set the validated state based on the other conditions.
        if (validPasswordRegex && validPasswordSame) {
            setPasswordValidated(true);
        } else {
            setPasswordValidated(false);
        }

        // Updating the states
        setPasswordRegex(validPasswordRegex);
        setPasswordSame(validPasswordSame);
        setEmailValid(validEmail);
        setFirstNameValid(validFirstName);
        setLastNameValid(validLastName);
        setUsernameValid(validUsername);

        // Set the errorMessage depending on the checked variables
        // setErrorMessage(!validPasswordSame || !validPasswordRegex || !validEmail || !validUsername || !validFirstName || !validLastName)

        setInvalid(
            (form.username && !usernameValid) ||
            (form.firstname && !firstNameValid) ||
            (form.lastname && !lastNameValid) ||
            (form.email && !emailValid) ||
            (form.password && !passwordValidated) ||
            (form.password && form.confirmPassword && !passwordSame) ||
            (form.password && !passwordRegex)
        );

    }, [
        form,
        usernameValid,
        firstNameValid,
        lastNameValid,
        emailValid,
        passwordValidated,
        passwordSame,
    ]); //what it observes

    return (
        <>
            <Container
                className="RegisterComponentContainer pb-5 mt-5"
                id="formRegisterContainer"
            >
                <Form
                    onSubmit={handleSubmit}
                    id="formRegister"
                    className="border border-light-subtle shadow-sm  border-2 rounded bg-light-subtle pb-4"
                >

                    <Form.Group
                        id="formGroupRegisterWelcome"
                        className="pb-3"
                    >
                        <Form.Text className="text-muted">Registration form</Form.Text>
                    </Form.Group>

                    {/*Info message*/}
                    <Form.Group
                        id="formGroupCredentials"
                        className="mb-3"
                    >
                        <Form.Text className="text-muted">
                            Enter your credentials
                        </Form.Text>
                    </Form.Group>

                    {/*Username field*/}
                    <InputGroup className="mb-3">
                        <InputGroup.Text>
                            <BsPersonAdd/>
                        </InputGroup.Text>
                        <Form.Control
                            className="custom-placeholder border-end rounded-end"
                            name="username"
                            onChange={handleFormChange}
                            placeholder="Username"
                            aria-label="Username"
                        />
                        {invalid && (
                            <Form.Control.Feedback
                                type="invalid"
                                className="d-block"
                            >
                                <Container className="error-container">
                                    {form.username && !usernameValid && (
                                        <p className="error-message">
                                            Your username must be at least 2 letters and cannot
                                            contain any special characters.
                                        </p>
                                    )}
                                </Container>
                            </Form.Control.Feedback>
                        )}
                    </InputGroup>

                    {/*Firstname & Lastname fields*/}
                    <Row>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>
                                <BsPerson />
                            </InputGroup.Text>
                            <Form.Control
                                className={`custom-placeholder me-3 border-end rounded-end`}
                                name="firstname"
                                onChange={handleFormChange}
                                placeholder="First name"
                                aria-label="First name"
                            />
                            <InputGroup.Text className="border-start rounded-start">
                                <BsPerson />
                            </InputGroup.Text>
                            <Form.Control
                                className={`custom-placeholder border-end rounded-end`}
                                name="lastname"
                                onChange={handleFormChange}
                                placeholder="Last name"
                                aria-label="Last name"
                            />
                            {invalid && (
                                <Form.Control.Feedback
                                    type="invalid"
                                    className="d-block"
                                >
                                    <Container className="error-container">
                                        <Col md={6}>
                                            {form.firstname && !firstNameValid && (
                                                <p className="error-message">
                                                    Your first name must be at least 2 letters and
                                                    cannot contain any special characters.
                                                </p>
                                            )}
                                        </Col>
                                        <Col md={6}>
                                            {form.lastname && !lastNameValid && (
                                                <p className="error-message">
                                                    Your last name must be at least 2 letters and cannot
                                                    contain any special characters.
                                                </p>
                                            )}
                                        </Col>
                                    </Container>
                                </Form.Control.Feedback>
                            )}
                        </InputGroup>
                    </Row>

                    {/*Email field*/}
                    <InputGroup className="mb-3">
                        <InputGroup.Text>
                            <BsEnvelope />
                        </InputGroup.Text>
                        <Form.Control
                            className="custom-placeholder border-end rounded-end"
                            name="email"
                            onChange={handleFormChange}
                            placeholder="Email@gmail.com"
                            aria-label="Email address"
                        />
                        {invalid && (
                            <Form.Control.Feedback
                                type="invalid"
                                className="d-block"
                            >
                                <Container className="error-container">
                                    {form.email && !emailValid && (
                                        <p className="error-message">
                                            Your email must be in a valid format.
                                        </p>
                                    )}
                                </Container>
                            </Form.Control.Feedback>
                        )}
                    </InputGroup>

                    <InputGroup className="mb-3">
                        {/*Password fields*/}
                        <InputGroup.Text>
                            <BsLock />
                        </InputGroup.Text>
                        <Form.Control
                            className={`custom-placeholder`}
                            type={isPasswordVisible ? "text" : "password"}
                            name="password"
                            onChange={handleFormChange}
                            placeholder="Password"
                            aria-label="Password"
                        />
                        <InputGroup.Text
                            className="me-3 border-end rounded-end"
                            onClick={togglePasswordVisibility}
                        >
                            {isPasswordVisible ? <BsEyeSlash /> : <BsEye />}
                        </InputGroup.Text>

                        {/*Confirm Password fields*/}
                        <InputGroup.Text className="border-start rounded-start">
                            <BsLock />
                        </InputGroup.Text>
                        <Form.Control
                            className={`custom-placeholder`}
                            type={isConfirmPasswordVisible ? "text" : "password"}
                            onChange={handleFormChange}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            aria-label="Password"
                        />
                        <InputGroup.Text
                            className="border-end rounded-end"
                            onClick={toggleConfirmPasswordVisibility}
                        >
                            {isConfirmPasswordVisible ? <BsEyeSlash /> : <BsEye />}
                        </InputGroup.Text>

                        {/*Error message text display*/}
                        {invalid && (
                            <Form.Control.Feedback
                                type="invalid"
                                className="d-block"
                            >
                                <Container className="password-error-container">
                                    {form.password && !passwordSame && (
                                        <p className="error-message">
                                            Your password and confirmation password must match.
                                        </p>
                                    )}
                                    {form.password && !passwordRegex && (
                                        <>
                                            <p className="error-message">
                                                Your password must meet the following criteria:
                                            </p>
                                            <ul>
                                                <li>At least 12 characters in length</li>
                                                <li>Contain at least one uppercase letter</li>
                                                <li>Contain at least one number</li>
                                                <li>Contain at least one special character</li>
                                            </ul>
                                        </>
                                    )}
                                </Container>
                            </Form.Control.Feedback>
                        )}
                    </InputGroup>

                    {/*Submit button */}
                    <Button
                        variant="primary"
                        className="rounded w-100 winter-green-btn"
                        type="submit"
                        disabled={
                            !passwordValidated ||
                            !usernameValid ||
                            !firstNameValid ||
                            !lastNameValid ||
                            !emailValid
                        }
                    >
                        Register
                    </Button>
                </Form>
            </Container>
        </>

    )
}