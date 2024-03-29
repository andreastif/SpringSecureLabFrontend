import {createContext, ReactNode, useEffect, useState} from "react";
import {AppContextProps} from "../types/PropTypes.ts";

interface ApplicationContextProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AppContextProps | null>(null)

export const ApplicationContextProvider: React.FC<ApplicationContextProviderProps> = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const [sessionExpiryTime, setSessionExpiryTime] = useState<Date | null>(null);
    const [sessionIsAboutToExpire, setSessionIsAboutToExpire] = useState(false);

    const [loginSuccess, setLoginSuccess] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);

    const [registrationComplete, setRegistrationComplete] = useState(false);
    const [registrationFailed, setRegistrationFailed] = useState(false);

    const [modalIsClosed, setModalIsClosed] = useState(false);

    const [errorMessage, setErrorMessage] = useState<string>("");

    const updateSessionExpiryTime = (expiryTimeMillis: number | null) => {

        if (expiryTimeMillis !== null) {
            const expiryTime = new Date(expiryTimeMillis);
            setSessionExpiryTime(expiryTime);
            setSessionIsAboutToExpire(false);
        } else {
            setSessionExpiryTime(null);
        }

    }

    const contextValues: AppContextProps = {
        isLoggedIn,
        loginFailed,
        loginSuccess,
        registrationFailed,
        registrationComplete,
        sessionExpiryTime,
        modalIsClosed,
        sessionIsAboutToExpire,
        errorMessage,
        setIsLoggedIn,
        setIsAdmin,
        setLoginSuccess,
        setLoginFailed,
        updateSessionExpiryTime,
        setSessionIsAboutToExpire,
        setModalIsClosed,
        setRegistrationComplete,
        setRegistrationFailed,
        setErrorMessage,
    }

    //prettier-ignore
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            /**
             * Remake conditional when you have time.
             */
            if (sessionExpiryTime && (sessionExpiryTime.getTime() - now.getTime()) < 5 * 60 * 1000 && (sessionExpiryTime.getTime() - now.getTime()) > -1) {
                //5min
                setSessionIsAboutToExpire(true);
            } else {
                setSessionIsAboutToExpire(false);
                clearInterval(interval)
            }
        }, 30000); //milliseconds
        return () => clearInterval(interval);
    }, [sessionExpiryTime]);

    return <AuthContext.Provider value={contextValues}>{children}</AuthContext.Provider>;


}

