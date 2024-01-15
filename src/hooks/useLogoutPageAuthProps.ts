import {useContext} from "react";
import {AuthContext} from "../contexts/ApplicationContext.tsx";
import {AppContextProps, LogoutPageAuthProps} from "../types/types.ts";


export function useLogoutPageAuthProps() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useLogoutAuthProps must be used within a AuthProvider")
    }

    return context as Pick<AppContextProps, keyof LogoutPageAuthProps>
}