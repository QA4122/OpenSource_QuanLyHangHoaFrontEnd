import { FilterModel } from "./FilterModel";

export class ProdLogFilter extends  FilterModel{
    StartDate: Date;
    EndDate: Date;
    /**
     *
     */ 
    constructor() {
        super();
        this.StartDate = null;
        this.EndDate = null;
    }
}