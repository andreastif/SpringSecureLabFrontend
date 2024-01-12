import {useContext} from "react";
import {AuthContext} from "../contexts/ApplicationContext.tsx";
import {AppContextProps, LoginSuccessAuthProps} from "../types/types.ts";


export function useLoginSuccessAuth() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useLoginSuccessAuth must be used within a AuthProvider')
    }

    return context as Pick<AppContextProps, keyof LoginSuccessAuthProps>;
}