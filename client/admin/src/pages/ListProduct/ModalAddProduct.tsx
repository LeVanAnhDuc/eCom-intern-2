import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import styled from '@mui/material/styles/styled';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Drawer from '@mui/material/Drawer';

import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { ChangeEvent, Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IImage, IProductUpdate } from '../../types/IProduct';
import { createProductAPI, uploadImageAPI } from '../../apis/productApi';
import Image from '../../components/Image';

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
interface Iprops {
    openDrawerAddProduct: boolean;
    toggleDrawerAddProduct: () => void;
}

const ModalAddProduct = (props: Iprops) => {
    const { openDrawerAddProduct, toggleDrawerAddProduct } = props;
    const { t } = useTranslation('detailProduct');

    const schema = yup.object().shape({
        name: yup.string().required(t('nameRequired')),
        price: yup.number().required(t('priceRequired')).positive(t('priceGreater0')),
        description: yup.string().required(t('descriptionRequired')),
        images: yup.array(),
    });

    const [urlStringImages, setURLStringImages] = useState<Array<string>>([]);
    const [displayedImages, setDisplayedImages] = useState<Array<IImage> | undefined>([]);
    const [isLoadingDialog, setIsLoadingDialog] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IProductUpdate>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<IProductUpdate> = async (data) => {
        const object: IProductUpdate = {
            name: data.name,
            description: data.description,
            price: data.price,
            images: urlStringImages,
        };
        setIsLoadingDialog(true);
        try {
            const response = await createProductAPI(object);

            if (response.status === 201) {
                toast.success(t('addSuccess'));
                toggleDrawerAddProduct();
            } else {
                toast.error(response.data.message || response.data);
            }
        } catch (error) {
            toast(`${error}`);
        } finally {
            setIsLoadingDialog(false);
        }
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const imageUrls = Array.from(e.target.files).map((file, index) => ({
                id: index,
                url: URL.createObjectURL(file),
            }));
            setDisplayedImages((prev) => prev && [...prev, ...imageUrls]);
            handleUpload(e.target.files);
        }
    };

    const handleUpload = async (imageFiles: FileList) => {
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
            <Drawer anchor={'top'} open={openDrawerAddProduct} onClose={toggleDrawerAddProduct}>
                <Dialog onClose={() => setIsLoadingDialog(false)} open={isLoadingDialog} fullWidth maxWidth="sm">
                    <DialogTitle>{t('addLoading')}</DialogTitle>
                    <DialogContent>
                        <LinearProgress color="success" />
                    </DialogContent>
                </Dialog>
                <form
                    className="space-y-3 py-3 px-9 m-auto w-full h-screen md:w-10/12 lg:w-8/12 xl:w-6/12"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="px-10 py-10 bg-primary-100 dark:bg-primary-700 rounded-3xl shadow-xl space-y-2">
                        <div>
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
                        </div>
                        <div>
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
                        </div>
                    </div>

                    <div className="px-10 py-5 bg-primary-100 dark:bg-primary-700 rounded-3xl shadow-xl space-y-2">
                        <div className="font-medium text-xl font-serif">{t('listImage')}</div>
                        <div className="relative">
                            <div className="flex flex-wrap gap-1.5 h-full pb-3 min-h-10">
                                {displayedImages?.map((imageUrl, index) => (
                                    <Fragment key={index}>
                                        <input type="hidden" value={imageUrl.url} />
                                        <Image src={imageUrl.url} alt={`Image ${index}`} className="w-12 h-12" />
                                    </Fragment>
                                ))}
                            </div>

                            <Button component="label" variant="outlined" fullWidth startIcon={<CloudUploadIcon />}>
                                {t('uploadFile')}
                                <VisuallyHiddenInput type="file" multiple onChange={handleImageChange} />
                            </Button>
                        </div>
                    </div>
                    <div className="px-10 py-5 bg-primary-100 dark:bg-primary-700 rounded-3xl shadow-xl space-y-2">
                        <div className="font-medium text-xl font-serif">{t('descriptionProduct')}</div>
                        <div>
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
                                        rows={5}
                                    />
                                )}
                            />
                            <p className="text-red-600 text-base mt-1.5">{errors.description?.message}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <Button
                            fullWidth
                            variant="outlined"
                            color="primary"
                            size="large"
                            className="dark:!bg-primary-600 dark:hover:!bg-primary-800"
                            onClick={toggleDrawerAddProduct}
                        >
                            {t('back')}
                        </Button>
                        <Button fullWidth type="submit" variant="contained" color="primary" size="large">
                            {t('addNew')}
                        </Button>
                    </div>
                </form>
            </Drawer>
        </>
    );
};

export default ModalAddProduct;
