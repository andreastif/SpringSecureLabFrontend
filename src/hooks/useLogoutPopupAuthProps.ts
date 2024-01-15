import {useContext} from "react";
import {AuthContext} from "../contexts/ApplicationContext.tsx";
import {AppContextProps, LogoutPopupAuthProps} from "../types/PropTypes.ts";


export function useLogoutPopupAuthProps() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useLogoutPopupAuthProps must be used within a AuthProvider')
    }

    return context as Pick<AppContextProps, keyof LogoutPopupAuthProps>;
}