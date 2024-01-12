import {useContext} from "react";
import {AuthContext} from "../contexts/ApplicationContext.tsx";
import {AppContextProps, LogoutPopupAuthProps} from "../types/types.ts";


export function useLogoutPopupAuth() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useLogoutPopupAuth must be used within a AuthProvider')
    }

    return context as Pick<AppContextProps, keyof LogoutPopupAuthProps>;
}