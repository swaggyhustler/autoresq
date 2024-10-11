import {create} from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = "http://localhost:3000/api/auth";

axios.defaults.withCredentials=true;

export const useAuthStore = create((set)=>({
    user: null,
    isAuthenticated: false,
    message: null,
    error: null,
    isLoading: false,
    isCheckingAuth: true,

    signupUser: async (registerData)=>{
        set({isLoading: true, error: null});
        try{
            const response = await axios.post(`${API_URL}/register/user`, registerData);
            toast.success(response.data.message);
            set({isLoading: false, user: response.data.data});
        }catch(error){
            toast.error(error.response.data.message);
            set({isLoading: false, error: error.response.data.message || "Error Registering User" });
            throw error;
        }
    },

    signupMechanic: async(registerData)=>{
        set({isLoading: true, error: null, user: null});
        try{
            const response = await axios.post(`${API_URL}/register/mechanic`, registerData);
            toast.success(response.data.message);
            set({isLoading: false, user: response.data.data});
        }catch(error){
            toast.error(error.response.data.message);
            set({isLoading: false, error: error.response.data.message});
            throw error;
        }
    },

    login: async (loginData)=>{
        set({isLoading: true, error: null, user: null, message: null});
        try{
            const response = await axios.post(`${API_URL}/login`, loginData);
            set({isLoading: false, user: response.data.data, isAuthenticated: true, message: response.data.message});
            toast.success(response.data.message);
        }catch(error){
            toast.error(error.response.data.message);
            set({isLoading: false, error: error.message});
        }
    },

    logout: async ()=>{
        set({isLoading: true, error: null});
        try{
            await axios.get(`${API_URL}/logout`);
            set({isLoading: false, user: null, isAuthenticated: false, error: null});
        }catch(error){
            toast.error(error.message);
            set({isLoading: false, error: error.message});
            throw error;
        }
    },

    checkAuth: async ()=>{
        set({isCheckingAuth: true, error: null});
        try{
            const response = await axios.get(`${API_URL}/check-auth`);
            set({isCheckingAuth: false, isAuthenticated: true, user: response.data.data});
        }catch(error){
            set({error: error.message, isCheckingAuth: false, isAuthenticated: false});
        }
    },

    verifyEmail: async (data)=>{
        set({isLoading: true, error: null});
        try{
            const response = await axios.post(`${API_URL}/verify-email`, data);
            set({isLoading: false, user: response.data.data, isAuthenticated: true, });
            toast.success(response.data.message);
        }catch(error){
            toast.error(error.response.data.message);
            set({isLoading: false, error: error.response.data.message});
            throw error;
        }
    }
}))