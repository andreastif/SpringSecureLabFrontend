import './App.css'
import {get} from "./hooks/useAxios.ts";
import {useEffect} from "react";
import {useAppAuthProps} from "./hooks/useAppAuthProps.ts";
import {STATUS_COOKIE} from "./types/CookieTypes.ts";
import {Modal} from "react-bootstrap";
import ExpiryPopup from "./components/expirypopup/ExpiryPopup.tsx";
import Navbar from "./components/nav/Navbar.tsx";
import Footer from "./components/footer/Footer.tsx";
import {Route, Routes} from "react-router-dom";
import LandingPage from "./components/landingpage/LandingPage.tsx";
import GenericFailure from "./components/genericfailurepage/GenericFailure.tsx";
import Registration from "./components/registration/Registration.tsx";
import RegistrationPage from "./components/registrationpage/RegistrationPage.tsx";
import RegistrationFail from "./components/registrationfail/RegistrationFail.tsx";
import RegistrationSuccess from "./components/registrationsuccess/RegistrationSuccess.tsx";
import LoginPage from "./components/loginpage/LoginPage.tsx";
import LoginSuccess from "./components/loginsuccess/LoginSuccess.tsx";
import LoginFail from "./components/loginfail/LoginFail.tsx";


function App() {
    const props = useAppAuthProps();

    function extractStatusCookieValues(): STATUS_COOKIE {
        const cookies = document.cookie.split(';');
        const statusCookie = cookies.find(cookie => cookie.trim().startsWith('STATUS_COOKIE='));

        if (statusCookie) {
            const cookieValue = statusCookie.split('=')[1];
            const decodedValue = decodeURIComponent(cookieValue);
            try {
                const parsedValue = JSON.parse(decodedValue);
                return {
                    isAdmin: parsedValue.isAdmin,
                    isLoggedIn: parsedValue.isLoggedIn,
                    expiryTimeMillis: Number(parsedValue.expiryTimeMillis),
                };
            } catch (e) {
                console.error('Error parsing STATUS_COOKIE', e);
            }
        }

        // Return a default object if STATUS_COOKIE is not found or cannot be parsed
        return {isAdmin: false, isLoggedIn: false, expiryTimeMillis: Number(0)};
    }

    const handleModalPopup = () => {
        props.setModalIsClosed(true);
    }

    useEffect(() => {
        const checkSession = async () => {
            try {
                await get("members/check-session");
                const cookieValues = extractStatusCookieValues();
                console.log("check session called")
                props.setIsLoggedIn(cookieValues.isLoggedIn)
                props.setIsAdmin(cookieValues.isAdmin)
                props.updateSessionExpiryTime(cookieValues.expiryTimeMillis)

            } catch (error) {
                props.setIsLoggedIn(false);
                props.setIsAdmin(false);
                props.updateSessionExpiryTime(null);
            }
        }

        // disable eslint; promise handling implemented above
        // noinspection JSIgnoredPromiseFromCall
        checkSession();

        // disable eslint, calling checkSession on mount only
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            <div className="page-container">
                <Navbar/>
                <div className="content-wrap">
                    <Routes>
                        <Route path="*" element={<GenericFailure/>}/>
                        <Route path="/" element={<LandingPage/>}/>

                        <Route path="/register" element={<RegistrationPage/>}>
                            <Route path="success"
                                   element={<RegistrationSuccess/>}
                            />
                            <Route path="fail"
                                   element={<RegistrationFail/>}
                            />
                        </Route>

                        <Route path="/login"
                               element={<LoginPage/>}
                        >
                            <Route
                                path="success"
                                element={<LoginSuccess/>}
                            />
                            <Route
                                path="fail"
                                element={<LoginFail/>}
                            />
                        </Route>

                    </Routes>
                </div>
                <Footer/>
                <Modal
                    show={!props.modalIsClosed && props.sessionIsAboutToExpire}
                    onHide={handleModalPopup}
                    onExited={handleModalPopup}
                >
                    <Modal.Body>
                        <ExpiryPopup/>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    );

}

export default App
