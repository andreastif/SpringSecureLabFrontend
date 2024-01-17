import './App.css'
import {get, post} from "./hooks/useAxios.ts";
import {FormEvent, useEffect} from "react";
import {useAppAuthProps} from "./hooks/useAppAuthProps.ts";
import {STATUS_COOKIE} from "./types/CookieTypes.ts";
import {Modal} from "react-bootstrap";
import ExpiryPopup from "./components/expirypopup/ExpiryPopup.tsx";
import Navbar from "./components/nav/Navbar.tsx";
import {Route, Routes} from "react-router-dom";
import LandingPage from "./components/landingpage/LandingPage.tsx";
import GenericFailure from "./components/genericfailurepage/GenericFailure.tsx";


function App() {
    const props = useAppAuthProps();

    const getCookies = async () => {
        try {
            await get("members/check-session");
        } catch (error) {
            console.log(error);
        }
    }

    const showCookies = () => {
        const cookie = document.cookie.split(";");
        console.log("TEST TEST TEST", cookie); // Removed concatenation to log the array properly
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>)  => {
        event.preventDefault();

        const form = event.currentTarget;

        const userData = {
            username: (form.elements.namedItem("username") as HTMLInputElement).value,
            password: (form.elements.namedItem("password") as HTMLInputElement).value,
        }

        console.log(userData);

        post("members/login", userData, true)

    }

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
        return { isAdmin: false, isLoggedIn: false, expiryTimeMillis: Number(0) };
    }

    const handleModalPopup = () => {
        props.setModalIsClosed(true);
    }

    useEffect( () => {
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
    },[])



    return (
        <>
            <Navbar/>
            <Routes>
                <Route path="*" element={<GenericFailure/>}/>
                <Route path="/" element={<LandingPage/>}/>
            </Routes>
            <Modal
                show={!props.modalIsClosed && props.sessionIsAboutToExpire}
                onHide={handleModalPopup}
                onExited={handleModalPopup}
            >
                <Modal.Body>
                    <ExpiryPopup />
                </Modal.Body>
            </Modal>
        </>
    );

}

export default App
