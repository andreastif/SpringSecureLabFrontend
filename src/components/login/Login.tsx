import './Login.css'
import {useLoginAuthProps} from "../../hooks/useLoginAuthProps.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {post} from "../../hooks/useAxios.ts";
import {Button, Container, Form, InputGroup} from "react-bootstrap";
import {BsEye, BsEyeSlash, BsLock, BsPersonAdd} from "react-icons/bs";
import {LoginForm} from "../../types/LoginForm.ts";

export default function Login() {

    const props = useLoginAuthProps();

    const [form, setForm] = useState<LoginForm>({
        username: "",
        password: "",
    })

    const [errorMessage, setErrorMessage] = useState<boolean | string>("");
    const [usernameValid, setUsernameValid] = useState<boolean>(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [passwordRegex, setPasswordRegex] = useState<boolean>(false);
    const [passwordValidated, setPasswordValidated] = useState<boolean>(false);

    const navigate = useNavigate();
    const location = useLocation();

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const userData = {
            username: form.username,
            password: form.password,
        }


        try {
            const res = await post("/members/login", userData)

            if (res.status === 200) {

                const roles = res.data.roles.split(",");

                props.setLoginSuccess(true);
                props.setIsLoggedIn(true);
                props.updateSessionExpiryTime(res.data.expiryTimeMillis);

                roles.includes("ROLE_ADMIN") ? props.setIsAdmin(true) : props.setIsAdmin(false)

                navigate("/login/success");

            } else {
                props.setLoginFailed(true);
                props.setIsLoggedIn(false);
                props.setIsAdmin(false);
                props.updateSessionExpiryTime(null);
                navigate("/login/fail");
            }
        } catch (e) {
            props.setLoginFailed(true);
            props.setIsLoggedIn(false);
            props.setIsAdmin(false);
            props.updateSessionExpiryTime(null);
            navigate("/login/fail");
        }

        setForm({
            username: "",
            password: ""
        });

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

    useEffect(() => {
        const passwordRegex = new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{12,}$"
        );

        const nameRegex = new RegExp("^[A-Za-z]{2,}$");

        const validPasswordRegex = passwordRegex.test(form.password);
        const validUsername = nameRegex.test(form.username);

        if (validPasswordRegex) {
            setPasswordValidated(true);
        } else {
            setPasswordValidated(false);
        }

        setPasswordRegex(validPasswordRegex);
        setUsernameValid(validUsername);

        setErrorMessage(
            (form.username && !usernameValid) ||
            (form.password && !passwordValidated) ||
            (form.password && !passwordRegex)
        );
    }, [form.password, passwordValidated, form.username, usernameValid]);

    useEffect(() => {
        if (props.isLoggedIn && location.pathname === "/login") {
            navigate("/home", {replace: true});
        }
    }, [navigate, props.isLoggedIn, location]);


    return (
        <>
            <Container
                className="LoginContainer pb-5 mb-5 mt-5"
                id="formLoginContainer"
            >
                <Form
                    onSubmit={handleSubmit}
                    id="formLogin"
                    className="border border-light-subtle shadow-sm  border-2 rounded bg-light-subtle pb-4"
                >
                    <Form.Group
                        id="formGroupLoginWelcome"
                        className="pb-3"
                    >
                        <Form.Text className="text-muted">Login</Form.Text>
                    </Form.Group>

                    {/*Info message*/}
                    <Form.Group
                        id="loginGroupCredentials"
                        className="mb-3"
                    >
                        <Form.Text className="text-muted">Enter your credentials</Form.Text>
                    </Form.Group>

                    {/*Username */}
                    <InputGroup className="mb-3">
                        <InputGroup.Text>
                            <BsPersonAdd/>
                        </InputGroup.Text>
                        <Form.Control
                            className="custom-placeholder border-end rounded-end"
                            name="username"
                            value={form.username}
                            onChange={handleFormChange}
                            placeholder="Username"
                            aria-label="Username"
                        />

                        {/* Error msg display */}
                        {errorMessage && (
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

                    {/*Password field*/}
                    <InputGroup className="mb-3">
                        <InputGroup.Text>
                            <BsLock/>
                        </InputGroup.Text>
                        <Form.Control
                            className={`custom-placeholder`}
                            type={isPasswordVisible ? "text" : "password"}
                            name="password"
                            value={form.password}
                            onChange={handleFormChange}
                            placeholder="Password"
                            aria-label="Password"
                        />
                        <InputGroup.Text
                            className="border-end rounded-end"
                            onClick={togglePasswordVisibility}
                        >
                            {isPasswordVisible ? <BsEyeSlash/> : <BsEye/>}
                        </InputGroup.Text>

                        {/* Error msg display */}
                        {errorMessage && (
                            <Form.Control.Feedback
                                type="invalid"
                                className="d-block"
                            >
                                <Container className="password-error-container">
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
                        disabled={!passwordValidated || !usernameValid}
                    >
                        Login
                    </Button>
                </Form>
            </Container>
        </>
    );
}