import ICheckout from './ICheckout';
import { IProduct } from './IProduct';

export default interface IBuyHistory {
    id?: number;
    name: string;
    checkOut: ICheckout;
    products: Array<IProduct>;
    time: string;
    status: string;
    totalPrice: number;
}
