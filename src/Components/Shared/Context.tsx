import React, { useState, useEffect, createContext, useContext,ReactNode, FC  } from "react";
import { isContext } from "vm";
const initialState={
    id : "",
    photo : "",
    name: "",
    setUser :(id :string, photo : string, name :string)=>{},
}
type Props = {
	children: ReactNode;
};
export const UserContext = createContext(initialState)
export const UserProvider : FC<Props> = (props) => {
    const [id, setId] =useState("");
    const [photo, setPhoto] =useState("");
    const [name, setName] =useState("");
    const setUser =(id : string, photo: string, name: string):void =>{
        setId(id);
        setPhoto(photo);
        setName(name);
    };
    const { children } = props;
    return (
        <UserContext.Provider   value={{
            id,
            photo,
            name,
            setUser,
          }}>
        {children}
        </UserContext.Provider>
    )
}

