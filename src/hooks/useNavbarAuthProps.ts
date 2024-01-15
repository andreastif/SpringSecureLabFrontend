import {useContext} from "react";
import {AuthContext} from "../contexts/ApplicationContext.tsx";
import {AppContextProps, NavAuthProps} from "../types/types.ts";


export function useNavbarAuthProps() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useNavbarAuthProps must be used within a AuthProvider")
    }

    return context as Pick<AppContextProps, keyof NavAuthProps>

}