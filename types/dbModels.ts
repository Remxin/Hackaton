export type userDBType = {
    id: string,
    name: string
    password: string,
    email: string
}

export type userClientType = Omit<userDBType, "password">