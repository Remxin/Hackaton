import { useState, useEffect } from "react"
// constants
import { appConstants } from "@/constants/app"

// types
import { studyPathDBType } from "@/types/dbModels"
import { httpresponseType } from "@/types/api"



export const useStudyPath = () => {
    const [data, setData] = useState<studyPathDBType[]>([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true) // TODO: change to false

    async function getStudyPaths() {
        setLoading(true)
        try {
            const res = await fetch(`${appConstants.appIP}/api/study-paths`)
            const resData: httpresponseType<studyPathDBType[]> = await res.json()

            if (resData.status === "failed") {
                setError(resData.error)
                setLoading(false)
                return
            }

            setData(resData.data)
        } catch (err) {
            setError("Fetch failed")
            throw new Error("Fetch failed")
        }
        setLoading(false)
    }

   

    return {
        data,
        loading,
        error,
        dispatch: {
            getStudyPaths
        }
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
