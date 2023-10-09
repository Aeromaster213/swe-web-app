import React, { createContext, useContext, useState } from "react";

const UploadContext = createContext(false);

export const useUploadContext = () => useContext(UploadContext);

export const UploadProvider = ({children}) => {
    const [showComponent, setShowComponent] = useState(false);

    const handleUploadComplete = (bool) => {
        setShowComponent(bool);
    }

    return (
        <UploadContext.Provider value={{showComponent, handleUploadComplete}} >
            {children}
        </UploadContext.Provider>
    )
}