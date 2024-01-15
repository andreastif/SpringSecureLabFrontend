import {useContext} from "react";
import {AuthContext} from "../contexts/ApplicationContext.tsx";
import {AppContextProps, LoginFailAuthProps} from "../types/types.ts";


export function useLoginFailAuthProps() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useLoginFailAuthProps must be used within a AuthProvider')
    }

    return context as Pick<AppContextProps, keyof LoginFailAuthProps>;
}