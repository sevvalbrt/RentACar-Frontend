export interface Rental{
    rentalId?:number;
    carId:number;
    brandName : string;
    colorName:string;
    dailyPrice : number;
    customerId : number;
    rentDate : Date;
    returnDate:Date;
}