import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // const TOKEN = sessionStorage.getItem('TOKEN');
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // if(TOKEN){
  //   setIsLoggedIn(true);
  // }else{
  //   setIsLoggedIn(false);
  // }

  // const login = () => setIsLoggedIn(true);
  // const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{  }}>
      {children}
    </AuthContext.Provider>
  );
};
