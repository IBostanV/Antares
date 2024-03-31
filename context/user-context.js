import React, {createContext, useContext, useEffect, useState} from 'react';
import {getUserRoles} from "../api/user";

const UserContext = createContext(undefined);

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [userRoles, setUserRoles] = useState([]);

    useEffect(() => {
        const fetchUserRoles = async () => await getUserRoles();
        fetchUserRoles().then(setUserRoles);
    }, []);

    return (
        <UserContext.Provider value={userRoles}>
            {children}
        </UserContext.Provider>
    );
};