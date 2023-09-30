// import bcrypt from "bcrypt"
import bcrypt from "bcrypt"


type hashResponseType<T> = {
    status: "ok",
    data: T
} | {
    status: "failed",
    error: string
}



export const hashHelpers = {
    hashPass: (password: string) => {
        return new Promise<hashResponseType<string>>(async (resolve, reject) => {
            try {
                const hashed = await bcrypt.hash(password, 12)
           
                resolve({ status: "ok", data: hashed})

            } catch (err) {
                reject({ status: "failed", error: "function error" })
            }
        })

    },

    comparePass: (password: string, typedPass: string) => {
        return new Promise<hashResponseType<boolean>>(async (resolve, reject) => {
            try {
                const match = await bcrypt.compare(typedPass, password)
                if (!match) return resolve({ status: "failed", error: "Passwords do not match"})
                resolve({ status: "ok", data: match })
            } catch (err) {
                reject({ status: "failed", error: "function error" })
            }
        })
    }
}