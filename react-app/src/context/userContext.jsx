// import { createContext } from "react";

// const userContext = createContext(false);

// export default userContext

import React, { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);

    return (
        <UserContext.Provider value={{ isAdmin, setIsAdmin }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
