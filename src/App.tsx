import './App.css'
import {get, post} from "./hooks/useAxios.ts";
import {FormEvent, useEffect} from "react";
import {useAppAuthProps} from "./hooks/useAppAuthProps.ts";
import {STATUS_COOKIE} from "./types/CookieTypes.ts";


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

        checkSession();

    },[])



    return (
        <>
            <h1>Hello World</h1>
            <form onSubmit= {handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" />
                </div>
                <button type="submit">Login</button>
            </form>
            <button onClick={getCookies}>click here</button>
            <button onClick={showCookies}>print cookies here</button>
        </>
    );

}

export default App
