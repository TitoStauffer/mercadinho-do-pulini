export interface Credential {
    credentialId: Uint8Array;
    publicKey: Uint8Array;
}

export class UserModel {
    constructor(
        public id?: number,
        public name?: string,
        public cpf?: string,
        public fingerprint?: string,
        public profile?: string,
        public credentials?: Credential[]
    ) {
        this.credentials = [];
    }
}
