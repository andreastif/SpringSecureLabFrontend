import './LoginFail.css'
import {useLoginFailAuthProps} from "../../hooks/useLoginFailAuthProps.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {Container} from "react-bootstrap";
export default function LoginFail() {

    const props = useLoginFailAuthProps();

    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        if (!props.loginFailed && location.pathname === "/login/fail") {
            navigate("/login", { replace: true });
        }
    }, [props.loginFailed, location.pathname, navigate]); // Redirect if user has not gone through registration flow, replace stack /register/success with /register

    useEffect(() => {
        if (location.pathname !== "/login/fail") {
            //reset state when closing modal/navigating away
            props.setLoginFailed(false);
        }
    }, [location, props.setLoginFailed]);

    return (
        <>
            {props.loginFailed ? (
                <Container>
                    <h1>Login failed</h1>
                    <p>Did you enter the correct credentials?</p>
                    <p>I forgot my password</p>
                </Container>
            ) : null}
        </>
    );

}