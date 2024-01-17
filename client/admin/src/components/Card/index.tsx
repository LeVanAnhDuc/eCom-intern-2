import { SvgIconComponent } from '@mui/icons-material';

interface Iprops {
    icon: React.ReactElement<SvgIconComponent>;
    classIcon: string;
    title: string;
    statictis: string;
}

const Card = (props: Iprops) => {
    const { icon, classIcon, title, statictis } = props;

    return (
        <div className="flex items-center gap-2 h-full px-6 py-7 shadow-lg p-2 rounded-2xl bg-white dark:bg-primary-600">
            <div className={`${classIcon} h-16 w-16 rounded-full flex place-content-center place-items-center`}>
                {icon}
            </div>

            <div className="flex flex-col place-content-center gap-2">
                <div className="font-thin">{title}</div>
                <div className="font-black">{statictis}</div>
            </div>
        </div>
    );
};

export default Card;
