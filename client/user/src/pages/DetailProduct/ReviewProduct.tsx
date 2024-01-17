import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Pagination from '@mui/material/Pagination';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';

import Review from '../../components/Review';
import { Ireview } from '../../types/IReview';
import AnimationScale from '../../components/AnimationScale';
import AnimationTransform from '../../components/AnimationTransform';

interface Iprops {
    rating: number;
}

const DATA: Array<Ireview> = [
    {
        id: 1,
        content: 'Bạn yên tâm nhé',
        stars: 2,
        createdDate: '17 - 07 - 2023',
        user: {
            username: 'Le Van Anh Duc',
            avatarUrl: 'Duc',
        },
    },
    {
        id: 2,
        content: 'sp không đúng mô tả',
        stars: 3,
        createdDate: '17 - 07 - 2023',
        user: {
            username: 'Le Van Anh Duc 1',
            avatarUrl: 'Duc',
        },
    },
    {
        id: 3,
        content: 'Lưu ý khi mua hàng trên Shopee',
        stars: 3,
        createdDate: '17 - 07 - 2023',
        user: {
            username: 'Le Van Anh Duc 2',
            avatarUrl: 'Duc',
        },
    },
    {
        id: 4,
        content: 'đừng vội đánh giá shop mà hãy NHẮN TIN',
        stars: 4,
        createdDate: '17 - 07 - 2023',
        user: {
            username: 'Le Van Anh Duc 3',
            avatarUrl: 'Duc',
        },
    },
    {
        id: 5,
        content: 'đừng vội đánh giá shop mà hãy NHẮN TIN',
        stars: 5,
        createdDate: '17 - 07 - 2023',
        user: {
            username: 'Le Van Anh Duc 3',
            avatarUrl: 'Duc',
        },
    },
    {
        id: 6,
        content: 'Đẹp',
        stars: 5,
        createdDate: '17 - 07 - 2023',
        user: {
            username: 'Le Van Anh Duc 4',
            avatarUrl: 'Duc',
        },
    },
];

const ReviewProduct = (props: Iprops) => {
    const { rating } = props;
    const { t } = useTranslation('detailProduct');

    const targetComponentRef = useRef<HTMLDivElement | null>(null);
    const totalReviewByStar = {
        all: DATA.length,
        one: DATA.filter((item) => item.stars === 1).length,
        two: DATA.filter((item) => item.stars === 2).length,
        three: DATA.filter((item) => item.stars === 3).length,
        four: DATA.filter((item) => item.stars === 4).length,
        five: DATA.filter((item) => item.stars === 5).length,
    };

    const [page, setPage] = useState<number>(1);
    const [listReview, setListReview] = useState(DATA);

    const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
        scrollToComponent();
    };

    const scrollToComponent = () => {
        if (targetComponentRef.current) {
            targetComponentRef.current.scrollIntoView({
                behavior: 'smooth',
            });
        }
    };

    const handleGetReviewByStar = (star: number) => {
        const newListReview = DATA.filter((item) => item.stars === star);
        star !== 0 ? setListReview(newListReview) : setListReview(DATA);
    };

    return (
        <div className="rounded border-2">
            <div
                ref={targetComponentRef}
                className="bg-primary-200 p-3 rounded text-xl font-medium text-center dark:bg-primary-600"
            >
                {t('productReviews')}
            </div>
            <div className="bg-primary-50 dark:bg-primary-800 h-max p-5">
                <div className="grid grid-cols-8">
                    <div className="col-span-3 lg:col-span-2">
                        <div className="text-center mt-4">
                            <AnimationScale Scale={{ to: 0.8, from: 1 }}>
                                <div>
                                    <span className="text-red-500 text-2xl font-bold">{rating}&nbsp;</span>
                                    <span className="text-red-500 text-lg">{t('outOf')} 5</span>
                                </div>
                                <Rating readOnly value={rating} precision={0.01} sx={{ fontSize: '1.8rem' }} />
                            </AnimationScale>
                        </div>
                    </div>

                    <div className="col-span-5 lg:col-span-6 flex flex-wrap items-center gap-3">
                        <AnimationScale Scale={{ to: 0.8, from: 1 }}>
                            <Button variant="outlined" onClick={() => handleGetReviewByStar(0)}>
                                {t('all')} ({totalReviewByStar.all})
                            </Button>
                        </AnimationScale>
                        <AnimationScale Scale={{ to: 0.8, from: 1 }}>
                            <Button variant="outlined" onClick={() => handleGetReviewByStar(5)}>
                                5 {t('star')} ({totalReviewByStar.five})
                            </Button>
                        </AnimationScale>
                        <AnimationScale Scale={{ to: 0.8, from: 1 }}>
                            <Button variant="outlined" onClick={() => handleGetReviewByStar(4)}>
                                4 {t('star')} ({totalReviewByStar.four})
                            </Button>
                        </AnimationScale>
                        <AnimationScale Scale={{ to: 0.8, from: 1 }}>
                            <Button variant="outlined" onClick={() => handleGetReviewByStar(3)}>
                                3 {t('star')} ({totalReviewByStar.three})
                            </Button>
                        </AnimationScale>
                        <AnimationScale Scale={{ to: 0.8, from: 1 }}>
                            <Button variant="outlined" onClick={() => handleGetReviewByStar(2)}>
                                2 {t('star')} ({totalReviewByStar.two})
                            </Button>
                        </AnimationScale>
                        <AnimationScale Scale={{ to: 0.8, from: 1 }}>
                            <Button variant="outlined" onClick={() => handleGetReviewByStar(1)}>
                                1 {t('star')} ({totalReviewByStar.one})
                            </Button>
                        </AnimationScale>
                    </div>
                </div>
            </div>
            {listReview.map((item, index) => (
                <AnimationTransform TransX={{ to: 200, from: 0 }}>
                    <Review item={item} key={index} />
                </AnimationTransform>
            ))}
            <div className="w-full flex justify-end my-5">
                <Pagination
                    count={1}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    variant="outlined"
                    boundaryCount={1}
                />
            </div>
        </div>
    );
};

export default ReviewProduct;
