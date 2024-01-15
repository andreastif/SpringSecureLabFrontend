import {useContext} from "react";
import {AuthContext} from "../contexts/ApplicationContext.tsx";
import {AppContextProps, RegistrationAuthProps} from "../types/types.ts";


export function useRegistrationAuthProps() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error ("useRegistrationAuthProps must be used within a AuthProvider")
    }

    return context as Pick<AppContextProps, keyof RegistrationAuthProps>;
}