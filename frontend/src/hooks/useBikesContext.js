import { BikeContext } from "../context/BikeContext";
import { useContext } from "react";

export const useBikesContext = () => {
    const context = useContext(BikeContext);
    if (!context) {
        throw new Error("useBikesContext must be used within BikeContextProvider");
    }   
    return context;
};
