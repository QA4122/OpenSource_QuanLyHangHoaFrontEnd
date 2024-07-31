export class Account{
    id: number;
    username: string;
    password: string;
    type: string;
    /**
     *
     */
    constructor() {
        this.id = null;
        this.username = '';
        this.password = '';
        this.type = 'STAFF';
    }
}