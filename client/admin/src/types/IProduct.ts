export interface IImage {
    id: number;
    url: string;
}

export interface IParamsProductAPI {
    searchTerm?: string;
    page?: number;
    sortBy?: string;
    sortType?: string;
    active?: boolean;
}

export interface IProduct {
    id?: number;
    name: string;
    price: number;
    description: string;
    active?: boolean | string;
    createdAt?: string;
    updatedAt?: string;
    ProductImage?: Array<IImage>;
    quantity?: number;
    totalPrice?: number;
    hasReview?: boolean;
    images?: Array<string>;
}

export type IProductUpdate = Pick<IProduct, 'name' | 'price' | 'description'> & {
    images?: string[];
};
