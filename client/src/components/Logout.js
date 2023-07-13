import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = (props) => {

    const navigateTo = useNavigate();

    const logoutFunction = () =>{
        localStorage.removeItem("TOKEN");
        props.setAuth(null);
        navigateTo('/login');
    }

    useEffect(()=>{
        logoutFunction();
    },[]);

}

export default Logout
