export class DateFormatting{
    /**
     * 
     * @param dateObj 
     * @returns dd/mm/yyyy, hh:mm:ss 12 hour Format
     */
    public static getLocalDateTime12H(dateObj: string): string {
        const localDate: Date = new Date(dateObj);
        const dd: number = localDate.getDate();
        const mm: number = localDate.getMonth() + 1;
        const yyyy: number = localDate.getFullYear();
        const time: string = localDate.toLocaleTimeString();
        
        return `${dd}/${mm}/${yyyy}, ${time}`;
    }

    /**
     * 
     * @param dateObj 
     * @returns dd/mm/yyyy, hh:mm:ss 24 hour Format
     */
     public static getLocalDateTime24H(dateObj: string): string {
        const localDate: Date = new Date(dateObj);
        const dd: number = localDate.getDate();
        const mm: number = localDate.getMonth() + 1;
        const yyyy: number = localDate.getFullYear();
        const time: string = localDate.toLocaleTimeString(undefined,{hour12: false});
        
        return `${dd}/${mm}/${yyyy}, ${time}`;
    }

    /**
     * 
     * @param dateObj 
     * @returns dd-mm-yyyy, hh:mm:ss 12 hour Format
     */
     public static getLocalDateTime12H_Varient1(dateObj: string): string {
        const localDate: Date = new Date(dateObj);
        const dd: number = localDate.getDate();
        const mm: number = localDate.getMonth() + 1;
        const yyyy: number = localDate.getFullYear();
        const time: string = localDate.toLocaleTimeString();
        
        return `${dd}-${mm}-${yyyy}, ${time}`;
    }

    /**
     * 
     * @param dateObj 
     * @returns dd-mm-yyyy, hh:mm:ss 24 hour Format
     */
     public static getLocalDateTime24H_Varient1(dateObj: string): string {
        const localDate: Date = new Date(dateObj);
        const dd: number = localDate.getDate();
        const mm: number = localDate.getMonth() + 1;
        const yyyy: number = localDate.getFullYear();
        const time: string = localDate.toLocaleTimeString(undefined,{hour12: false});
        
        return `${dd}-${mm}-${yyyy}, ${time}`;
    }

    /**
     * 
     * @param dateObj 
     * @returns mm/dd/yyyy, hh:mm:ss 12 hour Format
     */
     public static getLocalDateTime12H_Varient2(dateObj: string): string {
        const localDate: Date = new Date(dateObj);
        const dd: number = localDate.getDate();
        const mm: number = localDate.getMonth() + 1;
        const yyyy: number = localDate.getFullYear();
        const time: string = localDate.toLocaleTimeString();
        
        return `${mm}/${dd}/${yyyy}, ${time}`;
    }

    /**
     * 
     * @param dateObj 
     * @returns mm/dd/yyyy, hh:mm:ss 24 hour Format
     */
     public static getLocalDateTime24H_Varient2(dateObj: string): string {
        const localDate: Date = new Date(dateObj);
        const dd: number = localDate.getDate();
        const mm: number = localDate.getMonth() + 1;
        const yyyy: number = localDate.getFullYear();
        const time: string = localDate.toLocaleTimeString(undefined,{hour12: false});
        
        return `${mm}/${dd}/${yyyy}, ${time}`;
    }

    /**
     * 
     * @param dateObj 
     * @returns mm-dd-yyyy, hh:mm:ss 12 hour Format
     */
     public static getLocalDateTime12H_Varient3(dateObj: string): string {
        const localDate: Date = new Date(dateObj);
        const dd: number = localDate.getDate();
        const mm: number = localDate.getMonth() + 1;
        const yyyy: number = localDate.getFullYear();
        const time: string = localDate.toLocaleTimeString();
        
        return `${mm}-${dd}-${yyyy}, ${time}`;
    }

    /**
     * 
     * @param dateObj 
     * @returns mm-dd-yyyy, hh:mm:ss 24 hour Format
     */
     public static getLocalDateTime24H_Varient3(dateObj: string): string {
        const localDate: Date = new Date(dateObj);
        const dd: number = localDate.getDate();
        const mm: number = localDate.getMonth() + 1;
        const yyyy: number = localDate.getFullYear();
        const time: string = localDate.toLocaleTimeString(undefined,{hour12: false});
        
        return `${mm}-${dd}-${yyyy}, ${time}`;
    }

    /**
     * 
     * @param dateObj 
     * @returns UTC date in readable format
     */
    public static utcDateToString(dateObj: string): string {
        var dateString: string;
        var date: string = dateObj.split('T')[0];
        var time: string = dateObj.split('T')[1];
        time = time.split('.')[0];
        dateString = date + '  ' + time + '  UTC'
        return dateString;
      }

    /**
     * 
     * @param date 
     * @returns UTC date
     */
     public static dateStringToUTC(dateTime: Date): string {
        var dateString: string;
        const localDate: Date = dateTime;
        var dd: string = (localDate.getDate() + 1).toString();
        if (dd.length == 1) dd = ('0' + dd);
        var mm: string = (localDate.getMonth() + 1).toString();
        if (mm.length == 1) mm = ('0' + mm);
        var yyyy: string = (localDate.getFullYear()).toString();
        var time: string = localDate.toLocaleTimeString(undefined,{hour12: false});
        time = time.slice(0, time.length - 3);
        dateString = `${yyyy}-${mm}-${dd}T${time}`
        return dateString;
      }
}
