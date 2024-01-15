import {useContext} from "react";
import {AuthContext} from "../contexts/ApplicationContext.tsx";
import {AppContextProps, RegisterPageAuthProps} from "../types/PropTypes.ts";


export function useRegisterPageAuthProps() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useRegisterPageAuthProps must be used within a AuthProvider")
    }
    return context as Pick<AppContextProps, keyof RegisterPageAuthProps>;
}