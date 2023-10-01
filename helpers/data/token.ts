import jwt from "jsonwebtoken"

const TOKEN_SECRET = process.env.USER_TOKEN

type signToken = {
    id: string
} 

export type userTokenType = {
    id: string
    iat: number
    exp: number
}

export function signUserToken(payload: signToken, expiresIn: string) {
    if (!TOKEN_SECRET) throw new Error("Token secret undefined")
   
    const token = jwt.sign(payload, TOKEN_SECRET, { expiresIn })

    return token
}

export function verifyUserToken(token: string) {
    if (!TOKEN_SECRET) throw new Error("Token secret undefined")

    const valid = jwt.verify(token, TOKEN_SECRET)
    return valid
}