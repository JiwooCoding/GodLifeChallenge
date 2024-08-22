export interface IProduct {
    id: number;
    productCompany:string;
    productName: string;
    category: string;
    productImages: string;
    price: number; //상품가격
    total:number; //토탈 가격
    quantity:number; //상품 갯수
}