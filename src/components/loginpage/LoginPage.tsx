import './LoginPage.css'
import {useLocation, useNavigate} from "react-router-dom";
import LoginFail from "../loginfail/LoginFail.tsx";
import {Modal} from "react-bootstrap";
import LoginSuccess from "../loginsuccess/LoginSuccess.tsx";
import Login from "../login/Login.tsx";
export default function LoginPage() {

    const navigate = useNavigate();
    const location = useLocation();

    const isLoginSuccess = location.pathname === "/login/success";
    const isLoginFail = location.pathname === "/login/fail";

    const closeModalSuccess = () => {
        navigate("/", { replace: true }); // Navigate back to the landing page when modal closes, replaces stack with /
    };

    const closeModalFail = () => {
        navigate("/login", { replace: true }); // Navigate back to the register page when modal closes, replaces stack with /login
    };

    return (
        <>
            <Login />
            <Modal
                show={isLoginSuccess}
                onHide={closeModalSuccess}
            >
                <Modal.Body>
                    <LoginSuccess />
                </Modal.Body>
            </Modal>

            <Modal
                show={isLoginFail}
                onHide={closeModalFail}
            >
                <Modal.Body>
                    <LoginFail />
                </Modal.Body>
            </Modal>
        </>
    )
}