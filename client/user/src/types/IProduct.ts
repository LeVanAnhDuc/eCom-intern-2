interface IImage {
    id: number;
    url: string;
}

export interface IAllProductAPI {
    searchTerm?: string;
    page?: number;
    sortBy?: string;
    sortType?: string;
    active?: boolean;
}

export interface IProduct {
    id: number;
    name: string;
    price: number;
    description: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    ProductImage: Array<IImage>;
    quantity?: number;
    totalPrice?: number;
    hasReview?: boolean;
    favourite: boolean;
}

export type IProductCart = Pick<IProduct, 'id' | 'name' | 'price' | 'ProductImage'>;
