export class InOut{
    Id: number 
    CreateDate: Date 
    Type: string  //In, //Out
    Receiver: string;
    Deliver: string;
    CreatedBy : string 
    ProductCode : string 
    /**
     *
     */
    constructor() {
        this.Id = null;
        this.CreateDate = new Date();
        this.Type ='';
        this.Receiver = '';
        this.Deliver = '';
        this.CreatedBy = '';
        this.ProductCode = '';
    }
}