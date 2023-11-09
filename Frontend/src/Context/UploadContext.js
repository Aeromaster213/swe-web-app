import React, { createContext, useContext, useState } from "react";

const UploadContext = createContext(false);

export const useUploadContext = () => useContext(UploadContext);

export const UploadProvider = ({children}) => {
    const [showComponent, setShowComponent] = useState(false);
    const [strings, setStrings] = useState(); // Initialize with an empty object

    const handleUploadComplete = (bool, data) => {
        setShowComponent(bool);
        setStrings(data);
    }

    return (
        <UploadContext.Provider value={{showComponent, handleUploadComplete, strings}} >
            {children}
        </UploadContext.Provider>
    )
}