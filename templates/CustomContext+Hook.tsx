import React, { createContext, useState, useContext } from "react"

// types
type ContextType = {
    name: string
} | null

type ProviderProps = {
    children: React.ReactNode | React.ReactNode[],
}

// context creation
export const CustomContext = createContext<ContextType>(null)


// context Provider
export default function CustomContextProvider({ children }: ProviderProps) {
    const [name, setName] = useState("Me")

    return (
        <CustomContext.Provider value={{ name }}>
            {children}
        </CustomContext.Provider>
    )
}

export function useCustomContext() {
    const contextVals = useContext(CustomContext)

    if (!contextVals?.name) throw new Error("This custom hook can be used only inside provider children")

    return { ...contextVals }
}



// _____ USAGE _____

// const Parent = () => {
//     return (
//         <CustomContextProvider>
//             {/* other components / HTML elements (eg. div) */}
//             <Child />
//         </CustomContextProvider>
//     )
// }

// const Child = () => {
//     const { name } = useCustomContext()

//     return (
//         <p>I can use name {name} inside the context provider</p>
//     )
// }