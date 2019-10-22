interface IRedInvoice {
    name: string;
    address: string;
    district: string;
    city: string;
    taxCode: string;
}
export interface IStore {
    id: string;
    logoUrl: string;
    name: string;
    address: string;
    district: string;
    city: string;
    phone: string;
    redInvoice: IRedInvoice;
}
