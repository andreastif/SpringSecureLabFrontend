import {useContext} from "react";
import {AuthContext} from "../contexts/ApplicationContext.tsx";
import {AppContextProps, ErrorMessageAuthProps} from "../types/PropTypes.ts";

export function useGenericFailureAuthProps() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useGenericFailureAuthProps must be used within a AuthProvider')
    }

    return context as Pick<AppContextProps, keyof ErrorMessageAuthProps>
}