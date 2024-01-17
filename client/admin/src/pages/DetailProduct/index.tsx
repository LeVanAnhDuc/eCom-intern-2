import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import styled from '@mui/material/styles/styled';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import config from '../../config';
import { IImage, IProduct } from '../../types/IProduct';
import { getProductAPI, updateProductAPI, uploadImageAPI } from '../../apis/productApi';
import Image from '../../components/Image';
import AnimationTransform from '../../components/AnimationTransform';
import AnimationScale from '../../components/AnimationScale';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function convertTime(time: string) {
    const date = new Date(time);

    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    const hour = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const second = ('0' + date.getSeconds()).slice(-2);

    const timeConverted = `${hour}:${minutes}:${second} - ${day}/${month}/${year}`;

    return timeConverted;
}

const DetailProduct = () => {
    const navigate = useNavigate();
    const { t } = useTranslation('detailProduct');
    const id = useParams();
    const idProduct = id.id;

    const schema = yup.object().shape({
        name: yup.string().required(t('nameRequired')),
        price: yup.number().required(t('priceRequired')).positive(t('priceGreater0')),
        description: yup.string().required(t('descriptionRequired')),
        images: yup.array(),
    });

    const [product, setProduct] = useState<IProduct>();
    const [urlStringImages, setURLStringImages] = useState<Array<string>>([]);
    const [displayedImages, setDisplayedImages] = useState<Array<IImage> | undefined>([]);
    const [isLoadingAPI, setIsLoadingAPI] = useState(false);

    const getProductInfomation = async (id: number) => {
        try {
            if (idProduct && !isNaN(+idProduct)) {
                const response = await getProductAPI(id);
                const dataProduct: IProduct = response.data;

                if (response.status === 200) {
                    setProduct(dataProduct);
                    setDisplayedImages(dataProduct.ProductImage);
                    setValue('name', dataProduct.name);
                    setValue('active', dataProduct.active ? t('active') : t('unActive'));
                    setValue('createdAt', convertTime(dataProduct.createdAt ? dataProduct.createdAt : ''));
                    setValue('description', dataProduct.description);
                    setValue('id', dataProduct.id);
                    setValue('price', dataProduct.price);
                    setValue('updatedAt', convertTime(dataProduct.updatedAt ? dataProduct.updatedAt : ''));
                } else {
                    toast.error(response.data.message);
                    navigate(config.Routes.listProducts);
                }
            } else {
                navigate(config.Routes.listProducts);
            }
        } catch (error) {
            toast.error(`${error}`);
        }
    };

    useEffect(() => {
        if (idProduct) {
            getProductInfomation(+idProduct);
        }
    }, [idProduct]);

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<IProduct>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<IProduct> = async (data) => {
        const object: IProduct = {
            name: data.name,
            description: data.description,
            price: data.price,
            images: urlStringImages,
        };
        setIsLoadingAPI(true);
        try {
            if (idProduct) {
                const response = await updateProductAPI(+idProduct, object);

                if (response.status === 200) {
                    toast.success(t('updateSuccess'));
                } else {
                    toast.error(response.data.message || response.data);
                }
            }
        } catch (error) {
            toast(`${error}`);
        } finally {
            setIsLoadingAPI(false);
        }
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const imageUrls = Array.from(e.target.files).map((file, index) => ({
                id: index,
                url: URL.createObjectURL(file),
            }));
            setDisplayedImages((prev) => prev && [...prev, ...imageUrls]);
            handleUploadImageAPI(e.target.files);
        }
    };

    const handleUploadImageAPI = async (imageFiles: FileList) => {
        try {
            for (let i = 0; i < imageFiles.length; i++) {
                const formData = new FormData();
                formData.append('file', imageFiles[i]);

                const response = await uploadImageAPI(formData);

                if (response.status === 201) {
                    setURLStringImages((prev) => [...prev, response.data.url]);
                } else {
                    toast.error(response.data.message || response.data);
                }
            }
        } catch (error) {
            toast.error(`${error}`);
        }
    };

    return (
        <>
            <Dialog onClose={() => setIsLoadingAPI(false)} open={isLoadingAPI} fullWidth maxWidth="sm">
                <DialogTitle>{t('updateLoading')}</DialogTitle>
                <DialogContent>
                    <LinearProgress color="success" />
                </DialogContent>
            </Dialog>
            <Breadcrumbs>
                <Link to={config.Routes.listProducts} className="hover:!underline font-semibold !text-lg">
                    {t('product')}
                </Link>
                <Typography color="text.primary" className="!text-lg">
                    {product?.id}
                </Typography>
            </Breadcrumbs>
            <div className="my-10 ">
                <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
                    <div className="px-10 py-16 bg-primary-100 dark:bg-primary-700 rounded-3xl shadow-xl space-y-6">
                        <AnimationTransform TransX={{ to: -100, from: 0 }} className="font-medium text-xl font-serif">
                            {t('infoProduct')}
                        </AnimationTransform>

                        <div className="grid lg:grid-cols-2 gap-5">
                            <AnimationTransform TransY={{ to: -100, from: 0 }}>
                                <Controller
                                    name="id"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            error={errors.id ? true : false}
                                            fullWidth
                                            placeholder="ID"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">{t('id')}:</InputAdornment>
                                                ),
                                                readOnly: true,
                                            }}
                                            disabled
                                        />
                                    )}
                                />
                                <p className="text-red-600 text-base mt-1.5">{errors.id?.message}</p>
                            </AnimationTransform>
                            <AnimationTransform TransY={{ to: -100, from: 0 }}>
                                <Controller
                                    name="active"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            error={errors.active ? true : false}
                                            fullWidth
                                            placeholder={t('active')}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            disabled
                                        />
                                    )}
                                />
                                <p className="text-red-600 text-base mt-1.5">{errors.active?.message}</p>
                            </AnimationTransform>
                        </div>
                        <div className="grid lg:grid-cols-2 gap-5">
                            <AnimationTransform TransY={{ to: -200, from: 0 }}>
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">{t('name')}:</InputAdornment>
                                                ),
                                            }}
                                            error={errors.name ? true : false}
                                            fullWidth
                                            placeholder={t('name')}
                                        />
                                    )}
                                />
                                <p className="text-red-600 text-base mt-1.5">{errors.name?.message}</p>
                            </AnimationTransform>
                            <AnimationTransform TransY={{ to: -200, from: 0 }}>
                                <Controller
                                    name="price"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">{t('price')} ($):</InputAdornment>
                                                ),
                                            }}
                                            error={errors.price ? true : false}
                                            fullWidth
                                            placeholder={t('price')}
                                        />
                                    )}
                                />
                                <p className="text-red-600 text-base mt-1.5">{errors.price?.message}</p>
                            </AnimationTransform>
                        </div>
                        <div className="grid lg:grid-cols-2 gap-5">
                            <AnimationTransform TransY={{ to: -300, from: 0 }}>
                                <Controller
                                    name="createdAt"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            error={errors.createdAt ? true : false}
                                            fullWidth
                                            placeholder={t('createdAt')}
                                            InputProps={{
                                                readOnly: true,
                                                startAdornment: (
                                                    <InputAdornment position="start">{t('createdAt')}:</InputAdornment>
                                                ),
                                            }}
                                            disabled
                                        />
                                    )}
                                />
                                <p className="text-red-600 text-base mt-1.5">{errors.createdAt?.message}</p>
                            </AnimationTransform>
                            <AnimationTransform TransY={{ to: -300, from: 0 }}>
                                <Controller
                                    name="updatedAt"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            error={errors.updatedAt ? true : false}
                                            fullWidth
                                            placeholder={t('updatedAt')}
                                            InputProps={{
                                                readOnly: true,
                                                startAdornment: (
                                                    <InputAdornment position="start">{t('updatedAt')}:</InputAdornment>
                                                ),
                                            }}
                                            disabled
                                        />
                                    )}
                                />
                                <p className="text-red-600 text-base mt-1.5">{errors.updatedAt?.message}</p>
                            </AnimationTransform>
                        </div>
                    </div>

                    <div className="px-10 pb-16 pt-10 bg-primary-100 dark:bg-primary-700 rounded-3xl shadow-xl space-y-2">
                        <AnimationTransform TransX={{ to: -100, from: 0 }} className="font-medium text-xl font-serif">
                            {t('listImage')}
                        </AnimationTransform>
                        <div className="relative">
                            <div className="flex flex-wrap gap-1.5 h-full pb-3 min-h-28">
                                {displayedImages?.map((imageUrl, index) => (
                                    <AnimationScale Scale={{ to: 0.7, from: 1 }} key={index}>
                                        <input type="hidden" value={imageUrl.url} />
                                        <Image src={imageUrl.url} alt={`Image ${index}`} className="w-28 h-28" />
                                    </AnimationScale>
                                ))}
                            </div>

                            <Button component="label" variant="outlined" fullWidth startIcon={<CloudUploadIcon />}>
                                {t('uploadFile')}
                                <VisuallyHiddenInput type="file" multiple onChange={handleImageChange} />
                            </Button>
                        </div>
                    </div>
                    <div className="px-10 pb-16 pt-10 bg-primary-100 dark:bg-primary-700 rounded-3xl shadow-xl space-y-2">
                        <AnimationTransform TransX={{ to: -100, from: 0 }} className="font-medium text-xl font-serif">
                            {t('descriptionProduct')}
                        </AnimationTransform>
                        <AnimationTransform TransX={{ to: 100, from: 0 }}>
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        error={errors.description ? true : false}
                                        fullWidth
                                        placeholder={t('description')}
                                        multiline
                                        rows={9}
                                    />
                                )}
                            />
                            <p className="text-red-600 text-base mt-1.5">{errors.description?.message}</p>
                        </AnimationTransform>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <AnimationScale Scale={{ to: 0.7, from: 1 }}>
                            <Link to={config.Routes.listProducts}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                    size="large"
                                    className="dark:!bg-primary-600 dark:hover:!bg-primary-800"
                                >
                                    {t('back')}
                                </Button>
                            </Link>
                        </AnimationScale>
                        <AnimationScale Scale={{ to: 0.7, from: 1 }}>
                            <Button fullWidth type="submit" variant="contained" color="primary" size="large">
                                {t('update')}
                            </Button>
                        </AnimationScale>
                    </div>
                </form>
            </div>
        </>
    );
};

export default DetailProduct;
