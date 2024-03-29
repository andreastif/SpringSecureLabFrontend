export interface LoginAuthProps {
    isLoggedIn: boolean;
    setIsLoggedIn: (loggedIn: boolean) => void;
    setLoginSuccess: (loggedIn: boolean) => void;
    setLoginFailed: (loggedIn: boolean) => void;
    setIsAdmin: (loggedIn: boolean) => void;
    updateSessionExpiryTime: (expiryTimeMillis: number | null) => void;}

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
    updateSessionExpiryTime: (expiryTimeMillis: number | null) => void;
}

export interface NavAuthProps {
    isLoggedIn: boolean;
}

export interface RegistrationAuthProps extends ErrorMessageAuthProps{
    isLoggedIn: boolean;
    setRegistrationComplete: (complete: boolean) => void;
    setRegistrationFailed: (failed: boolean) => void;
}

export interface RegistrationFailAuthProps {
    registrationFailed: boolean;
    setRegistrationFailed: (failed: boolean) => void;
}

export interface RegistrationSuccessAuthProps {
    registrationComplete: boolean;
    setRegistrationComplete: (complete: boolean) => void;
}

export interface LogoutPageAuthProps {
    isLoggedIn: boolean;
}

export interface RegisterPageAuthProps {
    isLoggedIn: boolean;
}

export interface AppAuthProps {
    isLoggedIn: boolean;
    setIsAdmin: (loggedIn: boolean) => void;
    updateSessionExpiryTime: (expiryTimeMillis: number | null) => void;
    sessionIsAboutToExpire: boolean;
    modalIsClosed: boolean;
    setModalIsClosed: (closed: boolean) => void;
    setIsLoggedIn: (loggedIn: boolean) => void;

}

export interface ErrorMessageAuthProps {
    errorMessage: string,
    setErrorMessage: (error: string) => void;
}

// Combined type for the context provider:
export interface AppContextProps extends AppAuthProps, LoginAuthProps, LogoutPageAuthProps, LoginFailAuthProps, LoginSuccessAuthProps, LogoutPopupAuthProps, ExpiryPopupAuthProps, NavAuthProps, RegistrationAuthProps, RegistrationFailAuthProps, RegistrationSuccessAuthProps, RegisterPageAuthProps, ErrorMessageAuthProps {
    // This will include all properties from both AppAuthProps and other props as needed.
}