import React, { createContext, useContext, useState } from "react";

const UploadContext = createContext(false);

export const useUploadContext = () => useContext(UploadContext);

export const UploadProvider = ({children}) => {
    const [showComponent, setShowComponent] = useState(false);
    const [strings, setStrings] = useState({}); // Initialize with an empty object
    const [fileName, setFileName] = useState(""); // Initialize with an empty object
    const [logged, setLogged] = useState(false);
    const [username, setUsername] = useState('');
    const [dashboard, setDashboard] = useState(false);

    const handleUploadComplete = (bool, data, name) => {
        setShowComponent(bool);
        setStrings(data);
        setFileName(name);
    }

    const handleLoginContext = (bool) => {
        setLogged(bool);
    }

    const handleUser = (user) => {
        setUsername(user);
    }

    const handleDashboard = (show) => {
        setDashboard(show);
    }

    return (
        <UploadContext.Provider value={{showComponent, handleUploadComplete, strings, fileName, handleLoginContext, logged, username, handleUser, dashboard, setDashboard}} >
            {children}
        </UploadContext.Provider>
    )
}