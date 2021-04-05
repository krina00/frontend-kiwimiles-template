export class SortingRuleFormat{
    field: string;
    order ?: 'ASC'|'DESC' = 'ASC'; 
}

export class Sorting {

    /**
     * 
     * @param data 
     * @param rules 
     * @returns sorted data
     * 
     * takes unsorted data and list of rules as parameters and 
     * returns sorted data
     */
    public static dataSorting<T>(data: T[], rules: SortingRuleFormat[]): T[]{
        
        if(!rules || rules.length == 0) return data;
        rules.forEach(rule => {
            data = this.sortingUsingField(data, rule.field, rule.order);
        })
        return data;
    }

    /**
     * 
     * @param data 
     * @param field 
     * @param order 
     * @returns sorted data
     * 
     * takes unsorted/ partially sorted data, sorting field and order as inputs and returns 
     * sorted data as an output.
     */
    public static sortingUsingField<T>(data: T[], field: string, order: 'ASC'|'DESC'): T[]{
        return data.sort((v1: T, v2: T) => {
            if(typeof v1[field] == "boolean"){
                if(order == 'ASC'){
                    if(+(v1[field]) < +(v2[field])) return -1;
                    else if(+(v1[field]) > +(v2[field])) return 1;
                    else return 0;
                }
                else if(order == 'DESC'){
                    if(+(v1[field]) < +(v2[field])) return 1;
                    else if(+(v1[field]) > +(v2[field])) return -1;
                    else return 0;
                }
            }
            else if(typeof v1[field] == "string" || typeof v1[field] == "number"){
                if(order == 'ASC'){
                    if((v1[field]) < (v2[field])) return -1;
                    else if((v1[field]) > (v2[field])) return 1;
                    else return 0;
                }
                else{
                    if((v1[field]) < (v2[field])) return 1;
                    else if((v1[field]) > (v2[field])) return -1;
                    else return 0;
                }
            }
            return 0;
          })
    }
}