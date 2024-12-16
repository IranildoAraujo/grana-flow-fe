export interface AutenticacaoDTO {
    username: string;
    authenticated: boolean,
    created: Date,
    expiration: Date,
    token: string,
    refreshToken: string
}