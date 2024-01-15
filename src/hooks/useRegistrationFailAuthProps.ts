import {useContext} from "react";
import {AuthContext} from "../contexts/ApplicationContext.tsx";
import {AppContextProps, RegistrationFailAuthProps} from "../types/types.ts";


export function useRegistrationFailAuthProps() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useRegistrationFailAuthProps must be used within a AuthProvider")
    }

    return context as Pick<AppContextProps, keyof RegistrationFailAuthProps>
}