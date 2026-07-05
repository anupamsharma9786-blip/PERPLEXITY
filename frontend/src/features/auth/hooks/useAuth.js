import { login, register, getMe } from "../services/auth.api";
import { setError, setLoading, setUser } from "../auth.slice";
import { useDispatch, useSelector } from "react-redux";

export function useAuth() {
    const dispatch = useDispatch();

    async function handleLogin({ email, password }) {
        try{
            dispatch(setLoading(true));
            const data = await login({ email, password });
            dispatch(setUser(data.user));
        }catch(err){
            dispatch(setError(err.response.data.message));
        }finally{
            dispatch(setLoading(false));
        }
    }

    async function handleRegister({email, username, password}) {
        try{
            dispatch(setLoading(true));
            const data = await register({email, username, password});
        }catch(err){
            dispatch(setError(err.response.data.message));
        }finally{
            dispatch(setLoading(false));
        }
    }

    async function handleGetMe() {
        try{
            dispatch(setLoading(true));
            const data = await getMe();
            dispatch(setUser(data.user));
        }catch(err){
            dispatch(setError(err.response.data.message));
        }finally{
            dispatch(setLoading(false));
        }
    }

    return { handleLogin, handleRegister, handleGetMe };
}