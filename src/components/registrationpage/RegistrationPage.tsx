import {useRegisterPageAuthProps} from "../../hooks/useRegisterPageAuthProps.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import Registration from "../registration/Registration.tsx";
import {Modal} from "react-bootstrap";
import RegistrationSuccess from "../registrationsuccess/RegistrationSuccess.tsx";
import RegistrationFail from "../registrationfail/RegistrationFail.tsx";
import './RegistrationPage.css'

export default function RegistrationPage() {

    const props = useRegisterPageAuthProps();

    const location = useLocation();
    const navigate = useNavigate();

    //if the location is equal to either of the given URLS, value is assigned to true/false.
    const isRegistrationSuccess = location.pathname === "/register/success";
    const isRegistrationFail = location.pathname === "/register/fail";

    const closeModal = () => {
        navigate("/register", { replace: true }); // Navigate back to the register page when modal closes, replaces browser stack with /register
    }

    useEffect(() => {
        if (props.isLoggedIn && location.pathname === "/register") {
            navigate("/home", { replace: true });
        }

    }, [navigate, props.isLoggedIn, location]);

    return (
        <>
            <Registration />

            <Modal
                show={isRegistrationSuccess}
                onHide={closeModal}
                onExit={closeModal}
            >
                <Modal.Body>
                    <RegistrationSuccess />
                </Modal.Body>
            </Modal>

            <Modal
                show={isRegistrationFail}
                onHide={closeModal}
                onExit={closeModal}
            >
                <Modal.Body>
                    <RegistrationFail />
                </Modal.Body>
            </Modal>
        </>
    );



}