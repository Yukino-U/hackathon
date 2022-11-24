import { useState , createContext, FC,ReactNode} from 'react';

const initialState={
    active : -1,
    set :(active : number)=>{},
}
type Props = {
	children: ReactNode;
};
export const ActiveContext = createContext(initialState)
export const ActiveProvider : FC<Props> = (props) => {
    console.log("Actibe");
    const [active, setActive] =useState(-1);
    const set =(active : number) =>{
        setActive(active)}
    const { children } = props;
    return (
        <ActiveContext.Provider   value={{
            active,
            set,
          }}>
        {children}
        </ActiveContext.Provider>
    )
}
