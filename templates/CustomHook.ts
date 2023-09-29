import { useState, useEffect } from "react"

type DataType = {
    // example
    name: string
    email: string
    age: number
    // other props
}

export const useCustomHook = () => {
    const [data, setData] = useState<DataType[]>([])

    function getData() {
        // some fetching and assigning to state (setData)
    }

    function changeName(name: string, newName: string) {
        // example
        let person = data.find((e) => e.name)
        if (!person) throw new Error("No person with this name")
        person.name = newName
        setData(p => [...p])
    }

    return {
        data,
        getData,
        changeName
    }
}


// _____ USAGE (in tsx file) _____

// const Page = () => {
//     const { data, getData, changeName } = useCustomHook()
//     return (
//         <div>

//         </div>
//     )
// }
