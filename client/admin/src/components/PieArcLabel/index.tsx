import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { useTranslation } from 'react-i18next';

export default function PieArcLabel() {
    const { t } = useTranslation('home');
    const data = [
        { value: 17000, label: t('totalRevenue') },
        { value: 5600, label: t('profit') },
        { value: 3460, label: t('importCosts') },
        { value: 7920, label: t('additionalExpenses') },
    ];

    const size = {
        height: 250,
    };
    return (
        <PieChart
            series={[
                {
                    arcLabel: (item) => `(${item.value})`,
                    data,
                    cornerRadius: 5,
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                },
            ]}
            slotProps={{
                legend: {
                    labelStyle: {
                        fontSize: 16,
                        fontWeight: 600,
                    },
                },
            }}
            sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                    fill: 'white',
                },
            }}
            {...size}
        />
    );
}
