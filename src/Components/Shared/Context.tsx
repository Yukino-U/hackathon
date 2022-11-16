import React, { useState, useEffect, createContext, useContext,ReactNode, FC  } from "react";
import { isContext } from "vm";
const initialState={
    id : "",
    photo : "",
    name: "",
    point : 0,
    setUser :(id :string, photo : string, name :string, point : number)=>{},
}
type Props = {
	children: ReactNode;
};
export const UserContext = createContext(initialState)
export const UserProvider : FC<Props> = (props) => {
    const [id, setId] =useState("");
    const [photo, setPhoto] =useState("");
    const [name, setName] =useState("");
    const [point, setPoint] =useState(0);
    const setUser =(id : string, photo: string, name: string, point : number):void =>{
        setId(id);
        setPhoto(photo);
        setName(name);
        setPoint(point);
    };
    const { children } = props;
    return (
        <UserContext.Provider   value={{
            id,
            photo,
            name,
            point,
            setUser,
          }}>
        {children}
        </UserContext.Provider>
    )
}

