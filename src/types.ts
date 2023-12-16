
export interface User {
    readonly id: string
    username: string
    avatar: string
    createdAt?: Date
    updatedAt?: Date
    clients?: Client[]
    accounts?: Account[]
}

export interface Account {
    readonly id: string
    readonly uid: string
    identityType: string
    identifier: string
    certificate: string
    createdAt?: Date
    updatedAt?: Date
}

export interface Client {
    readonly id: string
    secret: string
    name: string
    logo: string
    description: string
    redirectUris: string[]
    grants: string[]
    accessTokenLifetime?: number
    refreshTokenLifetime?: number
    createdAt?: Date
    updatedAt?: Date
    users?: User[]
}

export interface Token {
    readonly accessToken: string
    accessTokenExpiresAt: Date
    refreshToken: string
    refreshTokenExpiresAt: Date
    scope: string
    cid: string
    uid: number
    user: User
    client: Client
    createdAt?: Date
    updatedAt?: Date
}


export interface AuthContextType {
    user: User
    client: Client
    signin: (user: string) => Promise<void>
    signout: () => Promise<void>
}