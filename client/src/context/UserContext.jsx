import React, { createContext, useEffect, useState } from 'react';
import {auth} from "../api"
const UserContext = createContext();

const UserContextProvider = ({children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await auth();
        if (res.data.user) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
        setLoading(false); 
      } finally {
        setLoading(false); 
      }
    };

    getUser();
  }, []);

  return (
    <UserContext.Provider value={{user, loading}}>
      {children}
    </UserContext.Provider>
  );
};

export {UserContext, UserContextProvider};