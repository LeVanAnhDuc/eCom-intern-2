import Button from '@mui/material/Button';
import ContentPasteSearch from '@mui/icons-material/ContentPasteSearch';

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import config from '../../config';
import Card from '../../components/Card';

const RelatedProduct = () => {
    const { t } = useTranslation('detailProduct');

    return (
        <>
            <div className="flex flex-wrap justify-between items-center bg-primary-50 p-3 rounded text-xl font-normal dark:bg-primary-600">
                <span>{t('relatedProducts')}</span>
                <Link to={config.Routes.shop}>
                    <Button>{`Xem tất cả >>`} </Button>
                </Link>
            </div>
            {[].length !== 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
                    {[].map((item, index) => (
                        <Card key={index} itemProduct={item} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center py-32 text-xl text-grey-400 gap-5">
                    <ContentPasteSearch sx={{ fontSize: '100px' }} />
                    {t('noProductRelated')}
                </div>
            )}
        </>
    );
};

export default RelatedProduct;
