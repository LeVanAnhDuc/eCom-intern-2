import { LineChart } from '@mui/x-charts/LineChart';
import { useTranslation } from 'react-i18next';

const uData = [24000, 13000, 10000, 20780, 18900, 2390, 30490, 40000, 13000, 22000, 12780, 1890];
const xLabelsEN = ['Jan', 'Fev', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
const valueFormatter = (value: number) => `${value} ($)`;

export default function SimpleAreaChart() {
    const { t } = useTranslation('home');

    return (
        <LineChart
            height={250}
            series={[
                {
                    data: uData,
                    label: t('totalRevenue'),
                    area: true,
                    showMark: false,
                    valueFormatter,
                    highlightScope: { faded: 'global', highlighted: 'item' },
                },
            ]}
            xAxis={[{ scaleType: 'point', data: xLabelsEN }]}
            sx={{
                '.MuiLineElement-root': {
                    display: 'none',
                },
            }}
        />
    );
}
