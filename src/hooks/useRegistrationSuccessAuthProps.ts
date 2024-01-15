import {useContext} from "react";
import {AuthContext} from "../contexts/ApplicationContext.tsx";
import {AppContextProps, RegistrationSuccessAuthProps} from "../types/PropTypes.ts";


export function useRegistrationSuccessAuthProps() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useRegistrationSuccessAuthProps must be used within a AuthProvider")
    }

    return context as Pick<AppContextProps, keyof RegistrationSuccessAuthProps>;
}