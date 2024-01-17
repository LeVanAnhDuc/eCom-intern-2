import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import config from '../../config';
import { loginApi } from '../../apis/authApi';
import { useAppDispatch } from '../../redux/hook';
import { setIsLogin, setUserName } from './loginSlice';
import ILogin from '../../types/ILogin';
import InputPassword from '../../components/InputPassword';

const LogIn = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { t } = useTranslation('login');

    const schema = yup.object().shape({
        userName: yup.string().required(t('usernameIsRequired')),
        passWord: yup
            .string()
            .required(t('passwordIsRequired'))
            .min(6, t('passwordLeast6'))
            .max(12, t('passwordMost12')),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ILogin>({
        resolver: yupResolver(schema),
    });
    // handle successful login
    useEffect(() => {
        // const accessToken = localStorage.getItem('accessToken');
        // if (accessToken) {
        //     navigate('/');
        // }
    }, []);

    const onSubmit: SubmitHandler<ILogin> = async (data: ILogin) => {
        try {
            const response = await loginApi(data.userName, data.passWord);

            if (response.status === 201) {
                if (response.data.accessToken) {
                    toast.success(t('loginSuccessful'));
                    // set redux
                    dispatch(setIsLogin(true));
                    dispatch(setUserName(data.userName));
                    navigate(config.Routes.home);
                }
            } else if (response.status === 401) {
                toast.error(t('unauthorized'));
            } else {
                toast.error(t('loginFailed'));
            }
        } catch (error) {
            toast.error(`${error}`);
        }
    };

    return (
        <>
            <div className="flex justify-center items-center min-h-screen overflow-hidden bg-primary-100 dark:bg-grey-800">
                <div className="flex my-10 shadow-xl rounded-xl border-2 border-primary-200 min-w-max">
                    <div className="w-96 rounded-tl-xl rounded-bl-xl bg-login-banner bg-no-repeat bg-cover bg-center hidden md:block"></div>
                    <div className="w-[440px] flex flex-col px-12 py-10 h-fit backdrop-blur-3xl md:rounded-tr-xl md:rounded-br-xl rounded-xl ">
                        <div className="h-24 w-24 overflow-hidden bg-icon-rotate bg-no-repeat bg-cover absolute -top-12 -right-12 animate-pulse"></div>

                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <h2 className="text-center text-3xl font-bold">{t('login')}</h2>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
                            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <Controller
                                        name="userName"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                error={errors.userName ? true : false}
                                                fullWidth
                                                label={t('enterUsername')}
                                            />
                                        )}
                                    />
                                    <p className="text-red-600 text-base mt-1.5">{errors.userName?.message}</p>
                                </div>

                                <div>
                                    <Controller
                                        name="passWord"
                                        control={control}
                                        render={({ field }) => (
                                            <InputPassword
                                                field={{ ...field }}
                                                error={errors.passWord ? true : false}
                                                label={t('enterPassword')}
                                            />
                                        )}
                                    />
                                    <p className="text-red-600 text-base mt-1.5">{errors.passWord?.message}</p>
                                </div>
                                <Link
                                    to={config.Routes.logIn}
                                    className="text-sm font-semibold float-right text-gray-600 hover:text-black dark:text-grey-50 hover:dark:text-grey-400"
                                >
                                    {t('forgotPassword')}?
                                </Link>
                                <Button type="submit" variant="contained" fullWidth size="large">
                                    {t('login')}
                                </Button>
                            </form>

                            <p className="mt-10 text-center text-sm text-gray-500 dark:text-grey-50">
                                {t('noAccount')}?
                                <Link
                                    to={config.Routes.register}
                                    className="pl-1 font-semibold leading-6 underline text-gray-600 hover:text-black  dark:text-grey-200 hover:dark:text-grey-400"
                                >
                                    {t('signUp')}.
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LogIn;
