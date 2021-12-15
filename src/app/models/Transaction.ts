export interface Transaction {
    id: number,
    data: string,
    method: string,
    coinName: string,
    price: number,
    amount: number,
    totalPrice: number
}