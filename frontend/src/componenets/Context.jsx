// ProductContext.js
import React, { createContext, useEffect, useState } from 'react';

// Create Context
export const Context = createContext();

// Provider Component
export const ProductProvider = ({ children }) => {
 const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [islogin, setislogin] = useState(false)

   useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setislogin(true);
    }
  }, []);
  return (
    <Context.Provider value={{islogin, setislogin,isSearchOpen,setIsSearchOpen}}>
      {children}
    </Context.Provider>
  );
};
