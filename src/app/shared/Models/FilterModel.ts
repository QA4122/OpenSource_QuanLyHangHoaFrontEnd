export class FilterModel{
    SearchString: string;
    PageSize: number;
    PageNumber: number;
    Date: Date;
    Actor: string;
    Type: string;
    /**
     *
     */
    constructor() {
        this.SearchString = '';
        this.PageSize = 5;
        this.PageNumber = 1;
        this.Date = null;
        this.Actor = '';
        this.Type= '';
    }
}