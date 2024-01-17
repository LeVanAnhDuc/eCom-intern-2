export default interface ICheckout {
    typePayment: string;
    city?: string;
    district?: string;
    ward?: string;
    address: string;
    note?: string;
}
