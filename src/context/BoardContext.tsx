import React, { createContext, Dispatch, useState } from "react";

// creamos este contexto, para que si en la ruta esta abierta una card ID- actualice las vbles openCard y setOpenCard

// creamos las clases y tipos para abarcar todo. 
export type OpenCardId = string | null;
export type BoardContextProps = {
    openCard?: OpenCardId;
    setOpenCard?: Dispatch<React.SetStateAction<OpenCardId>>;
};

type ProviderProps = {
    children: React.ReactNode,
};

export const BoardContext = createContext<BoardContextProps>({});

// este componente es qel que pondremos en la page Board 
export function BoardContextProvider({ children }: ProviderProps) {
    // usamos como el carrito, podemos llamarlo de cualquier lugar - creamos el estado correspondiente. 
    const [openCard, setOpenCard] = useState<OpenCardId>(null);
    
    return (
        <BoardContext.Provider value={{
            openCard, setOpenCard,
        }}>
            {children}
        </BoardContext.Provider>
    );
}