import React from 'react'
import { useSelector } from 'react-redux';
import Notauth from '../error pages/Notauth';

export default function Hoc(Component) {
 
    
    
    return function( ){
        
        const userAuth = useSelector(state=>state.userStore.isValid);
        console.log("useState valid? in AdminPage : ",userAuth); 
        
      return userAuth ? <Component/> : <div><Notauth/></div>

    }
}