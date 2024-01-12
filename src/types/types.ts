
export interface LoginAuthProps {
    isLoggedIn: boolean;
    setIsLoggedIn: (loggedIn: boolean) => void;
    setLoginSuccess: (loggedIn: boolean) => void;
    setLoginFailed: (loggedIn: boolean) => void;
    setIsAdmin: (loggedIn: boolean) => void;
    updateSessionExpiryTime: (expiryTimeMillis: number) => void;
}

export interface LoginFailAuthProps {
    loginFailed: boolean;
    setLoginFailed: (loginFailed: boolean) => void;
}

export interface LoginSuccessAuthProps {
    loginSuccess: boolean;
    setLoginSuccess: (loginSuccessful: boolean) => void;
}

export interface LogoutPopupAuthProps {
    setLoginSuccess: (loggedIn: boolean) => void;
    setSessionIsAboutToExpire: (isAboutToExpire: boolean) => void;
    setModalIsClosed: (isClosed: boolean) => void;
    setIsLoggedIn: (loggedIn: boolean) => void;
    setIsAdmin: (loggedIn: boolean) => void;
}

export interface ExpiryPopupAuthProps {
    setIsLoggedIn: (loggedIn: boolean) => void;
    setIsAdmin: (loggedIn: boolean) => void;
    setModalIsClosed: (isClosed: boolean) => void;
    setSessionIsAboutToExpire: (isAboutToExpire: boolean) => void;
    setLoginSuccess: (loggedIn: boolean) => void;
    sessionExpiryTime: Date | null;
    updateSessionExpiryTime: (expiryTimeMillis: number) => void;

}

// Combined type for the context provider:
export interface AppContextProps extends LoginAuthProps, LoginFailAuthProps, LoginSuccessAuthProps, LogoutPopupAuthProps, ExpiryPopupAuthProps {
    // This will include all properties from both LoginAuthProps and other props as needed.
}