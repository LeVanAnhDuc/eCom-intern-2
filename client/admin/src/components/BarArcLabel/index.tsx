import { BarChart } from '@mui/x-charts/BarChart';
import { useTranslation } from 'react-i18next';

const chartSetting = {
    YAxis: [
        {
            label: 'rainfall (mm)',
        },
    ],
    height: 300,
};
const dataset = [
    {
        item: 21,
        month: 'Jan',
    },
    {
        item: 28,
        month: 'Fev',
    },
    {
        item: 41,
        month: 'Mar',
    },
    {
        item: 73,
        month: 'Apr',
    },
    {
        item: 99,
        month: 'May',
    },
    {
        item: 144,
        month: 'June',
    },
    {
        item: 319,
        month: 'July',
    },
    {
        item: 249,
        month: 'Aug',
    },
    {
        item: 131,
        month: 'Sept',
    },
    {
        item: 55,
        month: 'Oct',
    },
    {
        item: 48,
        month: 'Nov',
    },
    {
        item: 25,
        month: 'Dec',
    },
];

export default function BarsChart() {
    const { t } = useTranslation('home');
    const valueFormatter = (value: number) => `${value} ${t('items')}`;

    return (
        <BarChart
            dataset={dataset}
            xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
            series={[
                {
                    dataKey: 'item',
                    label: t('numberOfProductsSold'),
                    valueFormatter,
                    color: '#1f91a5',
                    highlightScope: { faded: 'global', highlighted: 'item' },
                },
            ]}
            {...chartSetting}
        />
    );
}
