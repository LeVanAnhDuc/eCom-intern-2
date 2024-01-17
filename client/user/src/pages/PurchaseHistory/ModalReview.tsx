import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IProduct } from '../../types/IProduct';

interface IreviewOrder {
    content: string;
    rating: number;
}

interface IProps {
    open: boolean;
    handleClose: () => void;
    item: IProduct | undefined;
}

const ModalReview = (props: IProps) => {
    const { open, handleClose, item } = props;
    const { t } = useTranslation('purchaseHistory');

    const [valueRating, setValueRating] = useState<number>(5);
    const [hoverRating, setHoverRating] = useState(-1);

    const labels: { [index: string]: string } = {
        1: t('poor'),
        2: t('bad'),
        3: t('okay'),
        4: t('good'),
        5: t('excellent'),
    };

    const getLabelText = (value: number) => {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    };

    const { register, handleSubmit } = useForm<IreviewOrder>({});
    const onSubmit: SubmitHandler<IreviewOrder> = async (data) => {
        console.log(data);
    };
    return (
        <div>
            <Modal open={open} onClose={handleClose}>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-70 bg-white border-1 border-solid border-black rounded-10 shadow-lg p-7 dark:bg-primary-700">
                    <div className="text-lg mb-4">
                        <span className="font-semibold">{t('productReview')}: </span> {item?.name}
                    </div>
                    <div className="text-lg mb-4">
                        <span className="font-semibold">{t('description')}: </span>
                        {item?.description}
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="font-semibold text-lg flex">
                            <span className="pr-5">{t('Rate')}:</span>
                            <Box
                                sx={{
                                    width: 500,
                                    display: 'flex',
                                    alignItems: 'center',
                                    paddingBottom: 3,
                                }}
                            >
                                <Rating
                                    value={valueRating}
                                    precision={1}
                                    getLabelText={getLabelText}
                                    onChange={(_, newValue) => {
                                        setValueRating(newValue || 1);
                                    }}
                                    onChangeActive={(_, newHover) => {
                                        setHoverRating(newHover);
                                    }}
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                                {valueRating !== null && (
                                    <Box sx={{ ml: 2 }}>{labels[hoverRating !== -1 ? hoverRating : valueRating]}</Box>
                                )}
                            </Box>
                        </div>

                        <span className="font-semibold text-lg ">{t('writeAReview')}: </span>
                        <TextField minRows={9} multiline fullWidth {...register(`content`)} />

                        <div className="float-right">
                            <Button sx={{ width: 140 }} onClick={handleClose}>
                                {t('back')}
                            </Button>
                            <Button sx={{ width: 140 }} variant="contained" type="submit">
                                {t('confirm')}
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default ModalReview;
