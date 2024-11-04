// src/hooks/UserContext.js
import { createContext, useContext } from 'react';

export const UserContext = createContext();

// Custom hook để sử dụng UserContext
export const useUserContext = () => {
    return useContext(UserContext);
};
