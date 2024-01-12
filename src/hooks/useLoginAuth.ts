import { useContext } from 'react';
import {AppContextProps, LoginAuthProps} from "../types/types.ts";
import { AuthContext } from "../contexts/ApplicationContext.tsx";


export function useLoginAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useLoginAuth must be used within a AuthProvider')
    }

    return context as Pick<AppContextProps, keyof LoginAuthProps>;
}