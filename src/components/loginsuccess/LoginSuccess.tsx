import './LoginSuccess.css'
import {useLoginSuccessAuthProps} from "../../hooks/useLoginSuccessAuthProps.ts";
import {Container} from "react-bootstrap";
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
export default function LoginSuccess() {

    const props = useLoginSuccessAuthProps();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!props.loginSuccess && location.pathname === "/login/success") {
            navigate("/login", { replace: true }); // Redirect if user has not gone through registration flow, replace stack /register/success with /register
        }
    }, [navigate, location.pathname, props.loginSuccess]);

    //set registration to false if user navigates away after registering
    useEffect(() => {
        if (location.pathname !== "/login/success") {
            //reset state when closing modal/navigating away
            props.setLoginSuccess(false);
        }
    }, [location, props.setLoginSuccess]);

    return (
        <>
            {props.loginSuccess ? (
                <Container>
                    <h1>You have been successfully logged in!</h1>
                </Container>
            ) : null}
        </>
    );
}