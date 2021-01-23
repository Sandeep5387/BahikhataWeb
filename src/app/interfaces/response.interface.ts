

    export interface Customer {
        id?: any;
        name: string;
        contactNumber: string;
    }

    export interface TransactionProduct {
        id?: any;
        name: string;
        price: number;
        gst: number;
    }

    export interface Product {
        product: TransactionProduct;
        quantity: number;
        amount: number;
    }

    export interface Transactions {
        id: string;
        customer: Customer;
        products: Product[];
        date: string;
        isPaid: boolean;
    }

    export interface Metadata {
        status: string;
        module: string;
    }

    export interface Response<T> {
        errors?: any;
        payload: T;
        metadata: Metadata;
    }

