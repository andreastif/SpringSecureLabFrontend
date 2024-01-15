import axios, {AxiosResponse} from "axios";


export const backendAPIclient = axios.create({
    baseURL: "http://localhost:8080/api/v1/",
});


//Arrow Function Expression
export const get = async (endpoint: string, sendCredentials: boolean = true): Promise<AxiosResponse> => {
    try {
        return await backendAPIclient.get(`${endpoint}`, {withCredentials: sendCredentials})
    } catch (error) {
        throw new Error(`Call failed with error: ${error}`)
    }
}

export const post = async (endpoint: string, sendCredentials: boolean = true): Promise<AxiosResponse> => {
    try {
        return await backendAPIclient.post(`${endpoint}`, {withCredentials: sendCredentials})
    } catch (error) {
        throw new Error(`Call failed with error: ${error}`)
    }
}


//Function Declaration
//export async function getAxios(endpoint: string, sendCredentials: boolean): Promise<any> {}