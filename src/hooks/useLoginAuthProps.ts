import { useContext } from 'react';
import {AppContextProps, LoginAuthProps} from "../types/PropTypes.ts";
import { AuthContext } from "../contexts/ApplicationContext.tsx";


export function useLoginAuthProps() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useLoginAuthProps must be used within a AuthProvider')
    }

    return context as Pick<AppContextProps, keyof LoginAuthProps>;
}