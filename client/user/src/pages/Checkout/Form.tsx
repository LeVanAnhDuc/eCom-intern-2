import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ICheckout from '../../types/ICheckout';
import imgVNPAY from '../../assets/img/check-out/logo_VnPay.png';
import imgCOD from '../../assets/img/check-out/logo_COD.jpg';
import imgMOMO from '../../assets/img/check-out/logo_MoMo.png';
import imgVCB from '../../assets/img/check-out/logo_VCB.jpg';
import IAddress, { IDistrict, IWard } from '../../types/IAddress';
import IBuyHistory from '../../types/IBuyHistory';
import { selectListProductCart, setClearProductInCart } from '../Cart/cartSlice';
import { useTranslation } from 'react-i18next';
import AnimationTransform from '../../components/AnimationTransform';
import { setAddToBillHistory } from '../PurchaseHistory/purchaseHistorySlice';
import config from '../../config';

interface Iprops {
    isChecked: boolean;
    totalPrice: number;
}

const currentDate = new Date();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const seconds = currentDate.getSeconds();
const day = currentDate.getDate();
const month = currentDate.getMonth() + 1;
const year = currentDate.getFullYear();

const time = `${hours}:${minutes}:${seconds} | ${day}/${month}/${year}`;

const Form = (props: Iprops) => {
    const { isChecked, totalPrice } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation('checkOut');
    const listProduct = useSelector(selectListProductCart);

    const schema = yup.object().shape({
        city: yup.string(),
        district: yup.string(),
        ward: yup.string(),
        typePayment: yup.string().required(t('paymentsIsRequired')),
        address: yup.string().required(t('addressHomeIsRequired')),
        note: yup.string(),
    });

    const [cities, setCities] = useState<Array<IAddress>>([]);
    const [districts, setDistricts] = useState<Array<IDistrict>>();
    const [wards, setWards] = useState<Array<IWard>>();
    const [selectedCityID, setSelectedCityID] = useState<string>('');
    const [selectedCityName, setSelectedCityName] = useState<string>('');
    const [selectedDistrictID, setSelectedDistrictID] = useState<string>('');
    const [selectedDistrictName, setSelectedDistrictName] = useState<string>('');
    const [selectedWardID, setSelectedWardID] = useState<string>('');
    const [selectedWardName, setSelectedWardName] = useState<string>('');

    if (listProduct.length <= 0) {
        navigate(config.Routes.shop);
    }

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ICheckout>({
        resolver: yupResolver(schema),
    });
    const onSubmit: SubmitHandler<ICheckout> = async (data) => {
        const object: IBuyHistory = {
            checkOut: {
                typePayment: data.typePayment,
                city: selectedCityName,
                district: selectedDistrictName,
                ward: selectedWardName,
                address: data.address,
                note: data.note,
            },
            name: localStorage.getItem('userName') || '',
            products: listProduct,
            status: 'true',
            time: time,
            totalPrice: totalPrice,
        };
        dispatch(setAddToBillHistory(object));
        dispatch(setClearProductInCart(true));
        const listBillHistoryLocal = localStorage.getItem('listBill');

        if (listBillHistoryLocal) {
            const listBillHistory = JSON.parse(listBillHistoryLocal);
            navigate(config.Routes.detailPurchaseHistory + '/' + (listBillHistory.length - 1));
        }
    };

    useEffect(() => {
        const handleGetCities = () => {
            const api = `https://provinces.open-api.vn/api/?depth=3`;
            axios.get<IAddress[]>(api).then((response) => {
                setCities(response.data);
            });
        };
        handleGetCities();
    }, []);
    const handleCityChange = (e: SelectChangeEvent) => {
        const selectedCityCode = e.target.value;
        setSelectedCityID(selectedCityCode);
        handleGetDistrict(selectedCityCode);
        const selectedCityItem = cities.find((item) => item.code === selectedCityCode);

        if (selectedCityItem) {
            setSelectedCityName(selectedCityItem.name);
        }
    };
    const handleGetDistrict = (cityCode: string) => {
        const selectedCityID: IAddress | undefined = cities.find((item) => item.code === cityCode);
        if (selectedCityID) {
            setDistricts(selectedCityID.districts);
        }
    };
    const handleDistrictChange = (e: SelectChangeEvent) => {
        const selectedDistrictCode = e.target.value;

        setSelectedDistrictID(selectedDistrictCode);
        handleGetWard(selectedDistrictCode);

        const selectedDistrictItem = districts?.find((item) => item.code === selectedDistrictCode);
        if (selectedDistrictItem) {
            setSelectedDistrictName(selectedDistrictItem.name);
        }
    };
    const handleGetWard = (districtCode: string) => {
        const selectedWardID: IDistrict | undefined = districts?.find((item) => item.code === districtCode);
        if (selectedWardID) {
            setWards(selectedWardID?.wards);
        }
    };
    const handleWardChange = (e: SelectChangeEvent) => {
        const selectedWardCode = e.target.value;

        setSelectedWardID(e.target.value);

        const selectedWardItem = wards?.find((item) => item.code === selectedWardCode);
        if (selectedWardItem) {
            setSelectedWardName(selectedWardItem.name);
        }
    };

    return (
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="typePayment"
                control={control}
                render={({ field }) => (
                    <AnimationTransform TransX={{ to: -100, from: 0 }}>
                        <FormControl fullWidth>
                            <InputLabel>{t('payments')}</InputLabel>
                            <Select
                                input={<OutlinedInput label={t('payments')} />}
                                fullWidth
                                error={errors.typePayment ? true : false}
                                {...field}
                                defaultValue=""
                            >
                                <MenuItem value="Momo" sx={{ height: '50px' }}>
                                    <div className="w-full flex justify-between items-center">
                                        Momo
                                        <Avatar src={imgMOMO} variant="rounded" />
                                    </div>
                                </MenuItem>
                                <MenuItem value="VNpay" sx={{ height: '50px' }}>
                                    <div className="w-full flex justify-between items-center">
                                        VNpay
                                        <Avatar src={imgVNPAY} variant="rounded" className="!object-cover " />
                                    </div>
                                </MenuItem>
                                <MenuItem value="COD" sx={{ height: '50px' }}>
                                    <div className="w-full flex justify-between items-center">
                                        COD
                                        <Avatar src={imgCOD} className="!object-cover" variant="rounded" />
                                    </div>
                                </MenuItem>
                                <MenuItem value="VCB" sx={{ height: '50px' }}>
                                    <div className="w-full flex justify-between items-center">
                                        VCBank
                                        <Avatar src={imgVCB} className="!object-cover" variant="rounded" />
                                    </div>
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </AnimationTransform>
                )}
            />
            <p className="text-red-600 text-base mt-1.5">{errors.typePayment?.message}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <AnimationTransform TransX={{ to: -150, from: 0 }}>
                    <FormControl fullWidth>
                        <InputLabel>{t('cityOrProvince')}</InputLabel>
                        <Select
                            fullWidth
                            error={errors.city ? true : false}
                            value={selectedCityID}
                            onChange={handleCityChange}
                            defaultValue=""
                            input={<OutlinedInput label={t('cityOrProvince')} />}
                        >
                            {cities.map((item, index) => (
                                <MenuItem value={item.code} sx={{ height: '50px' }} key={index}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <p className="text-red-600 text-base mt-1.5">{errors.city?.message}</p>
                </AnimationTransform>

                <AnimationTransform TransX={{ to: -200, from: 0 }}>
                    <FormControl fullWidth disabled={districts ? false : true}>
                        <InputLabel>{t('districtOrCountyOrTown')}</InputLabel>
                        <Select
                            disabled={districts ? false : true}
                            fullWidth
                            error={errors.district ? true : false}
                            value={selectedDistrictID}
                            onChange={handleDistrictChange}
                            defaultValue=""
                            input={<OutlinedInput label={t('districtOrCountyOrTown')} />}
                        >
                            {districts?.map((item, index) => (
                                <MenuItem value={item.code} sx={{ height: '50px' }} key={index}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <p className="text-red-600 text-base mt-1.5">{errors.district?.message}</p>
                </AnimationTransform>

                <AnimationTransform TransX={{ to: -250, from: 0 }}>
                    <FormControl fullWidth disabled={wards ? false : true}>
                        <InputLabel>{t('wardOrCommune')}</InputLabel>
                        <Select
                            disabled={wards ? false : true}
                            fullWidth
                            error={errors.ward ? true : false}
                            value={selectedWardID}
                            onChange={handleWardChange}
                            defaultValue=""
                            input={<OutlinedInput label={t('wardOrCommune')} />}
                        >
                            {wards?.map((item, index) => (
                                <MenuItem value={item.code} sx={{ height: '50px' }} key={index}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <p className="text-red-600 text-base mt-1.5">{errors.ward?.message}</p>
                </AnimationTransform>
            </div>
            <AnimationTransform TransX={{ to: -300, from: 0 }}>
                <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            error={errors.address ? true : false}
                            fullWidth
                            label={t('addressHome')}
                            placeholder={t('enterAddressHome')}
                            defaultValue=""
                            autoComplete="address"
                        />
                    )}
                />
                <p className="text-red-600 text-base mt-1.5">{errors.address?.message}</p>
            </AnimationTransform>
            <AnimationTransform TransX={{ to: -350, from: 0 }}>
                <Controller
                    name="note"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            error={errors.note ? true : false}
                            multiline
                            rows={9}
                            fullWidth
                            label={t('note')}
                            placeholder={t('enterNote')}
                        />
                    )}
                />
                <p className="text-red-600 text-base mt-1.5">{errors.note?.message}</p>
            </AnimationTransform>
            <AnimationTransform TransX={{ to: -400, from: 0 }}>
                <Button type="submit" variant="contained" fullWidth color="primary" size="large" disabled={!isChecked}>
                    {t('placeAnOrder')}
                </Button>
            </AnimationTransform>
        </form>
    );
};

export default Form;
