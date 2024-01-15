import {useContext} from "react";
import {AuthContext} from "../contexts/ApplicationContext.tsx";
import {AppAuthProps, AppContextProps} from "../types/PropTypes.ts";


export function useAppAuthProps() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAppAuthProps must be used within a AuthProvider")
    }
    return context as Pick<AppContextProps, keyof AppAuthProps>
}