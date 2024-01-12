import {useContext} from "react";
import {AuthContext} from "../contexts/ApplicationContext.tsx";
import {AppContextProps, ExpiryPopupAuthProps} from "../types/types.ts";

export function useExpiryPopupAuthProps() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useExpiryPopupAuthProps must be used within a AuthProvider')
    }

    return context as Pick<AppContextProps, keyof ExpiryPopupAuthProps>;
}