// src/hooks/UserContextProvider.jsx
import  { useState } from 'react';
import { UserContext } from './UserContext';

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        username: '',
        userType: '',
        avatar: '',
    });

    const setUserDetails = (userData) => {
        setUser({
            username: userData.username,
            userType: userData.userType,
            avatar: userData.avatar,
        });
    };

    return (
        <UserContext.Provider value={{ user, setUserDetails }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
