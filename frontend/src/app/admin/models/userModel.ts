export class UserModel {
    constructor(
        public id?: number,
        public name?: string,
        public cpf?: string,
        public fingerprint?: string,
        public profile?: string,
    ) {}
}
