export class Profile{
    id: number;
    fullName: string;
    dob: Date;
    accountId: number;
    /**
     *
     */
    constructor() {
        this.id= null;
        this.fullName = '';
        this.dob = new Date();
        this.accountId = 0;
    }
}