export default interface IAddress {
    code: string;
    codename: string;
    districts: Array<IDistrict>;
    division_type: string;
    name: string;
    phone_code: string;
}

export interface IDistrict {
    code: string;
    codename: string;
    division_type: string;
    name: string;
    province_code: string;
    wards: Array<IWard>;
}

export interface IWard {
    code: string;
    codename: string;
    division_type: string;
    name: string;
    short_codename: string;
}
