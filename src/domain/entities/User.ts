export class User {
    // @ts-ignore
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public role: string // 'dueño' o 'cliente'
    ) {}
}