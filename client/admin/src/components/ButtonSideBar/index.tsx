import { SvgIconComponent } from '@mui/icons-material';
import { useSelector } from 'react-redux';

import { selectIsTheme } from '../SpeedDial/themeSlice';
import { MouseEventHandler } from 'react';

interface Iprops {
    isActive?: boolean;
    content: string;
    className?: string;
    startIcon?: React.ReactElement<SvgIconComponent>;
    toggleSideBar?: boolean;
    onClick?: MouseEventHandler<HTMLDivElement>;
}
const ButtonSideBar = (props: Iprops) => {
    const { isActive, content, className, startIcon, toggleSideBar, onClick } = props;
    const theme = useSelector(selectIsTheme);

    return (
        <div className={`${className} relative`} onClick={onClick}>
            {isActive ? (
                <>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 117 117"
                        fill="none"
                        className="absolute -top-[2.45rem] -right-[0.1rem]"
                    >
                        <g clipPath="url(#clip0_121_13819)">
                            <path
                                d="M0 116.94H116.94V0C116.94 64.59 64.59 116.94 0 116.94Z"
                                fill={theme == 'dark' ? '#1f91a5' : '#e9f9fc'}
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_121_13819">
                                <rect width="116.94" height="116.94" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <button
                        className={`${
                            !toggleSideBar ? 'pl-5 justify-start ' : 'justify-center '
                        }font-semibold  bg-primary-50 shadow-xl w-full flex gap-3 items-start py-5 rounded-tl-full rounded-bl-full dark:bg-primary-400`}
                    >
                        {startIcon}
                        {!toggleSideBar && content}
                    </button>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 117 117"
                        fill="none"
                        className="absolute -bottom-[2.45rem] -right-0.5 -rotate-90"
                    >
                        <g clipPath="url(#clip0_121_13819)">
                            <path
                                d="M0 116.94H116.94V0C116.94 64.59 64.59 116.94 0 116.94Z"
                                fill={theme == 'dark' ? '#1f91a5' : '#e9f9fc'}
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_121_13819">
                                <rect width="116.94" height="116.94" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </>
            ) : (
                <button
                    className={`${
                        !toggleSideBar ? 'pl-5 justify-start' : 'justify-center '
                    } font-semibold hover:text-grey-600 w-full flex gap-3 items-start py-5 rounded-tl-full rounded-bl-full`}
                >
                    {startIcon}
                    {!toggleSideBar && content}
                </button>
            )}
        </div>
    );
};

export default ButtonSideBar;
