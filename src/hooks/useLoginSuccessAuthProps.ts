import {useContext} from "react";
import {AuthContext} from "../contexts/ApplicationContext.tsx";
import {AppContextProps, LoginSuccessAuthProps} from "../types/types.ts";


export function useLoginSuccessAuthProps() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useLoginSuccessAuthProps must be used within a AuthProvider')
    }

    return context as Pick<AppContextProps, keyof LoginSuccessAuthProps>;
}