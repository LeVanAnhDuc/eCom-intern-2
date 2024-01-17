import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import config from '../../config';
import { loginApi, registerApi } from '../../apis/authApi';
import { useAppDispatch } from '../../redux/hook';
import IRegister from '../../types/IRegister';
import { setIsLogin, setUserName } from '../LogIn/loginSlice';
import InputPassword from '../../components/InputPassword';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { t } = useTranslation('register');

    const [dataRegisterUser, setDataRegisterUser] = useState<IRegister>();

    const schema = yup.object().shape({
        email: yup.string().required(t('emailIsRequired')).email(t('emailIsValidate')),
        passWord: yup
            .string()
            .required(t('passwordIsRequired'))
            .min(6, t('passwordLeast6'))
            .max(12, t('passwordMost12')),
        username: yup.string().required(t('usernameIsRequired')),
        fullName: yup.string().required(t('fullNameIsRequired')),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IRegister>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<IRegister> = async (data: IRegister) => {
        try {
            const response = await registerApi(data);

            if (response.status === 201) {
                toast.success(t('registerSuccessful'));
                setDataRegisterUser(data);
            } else if (response.status === 501) {
                toast.error(t('notImplemented'));
            } else {
                toast.error(t('registerFailed'));
            }
        } catch (error) {
            toast.error(`${error}`);
        }
    };

    const handleLogin = async () => {
        try {
            if (dataRegisterUser) {
                const response = await loginApi(dataRegisterUser.username, dataRegisterUser.passWord);

                if (response.status === 201) {
                    if (response.data.accessToken) {
                        toast.success(t('loginSuccessful'));
                        dispatch(setIsLogin(true));
                        dispatch(setUserName(dataRegisterUser.username));
                        navigate(config.Routes.home);
                    }
                } else if (response.status === 401) {
                    toast.error(t('unauthorized'));
                } else {
                    toast.error(t('loginFailed'));
                }
            } else {
                navigate(config.Routes.logIn);
            }
        } catch (error) {
            toast.error(`${error}`);
        }
    };

    return (
        <>
            <div className="flex justify-center items-center relative min-h-screen overflow-hidden bg-primary-100 dark:bg-grey-800">
                <div className="flex my-10 shadow-xl rounded-xl border-2 border-primary-200 min-w-max z-10">
                    <div className="w-[470px] flex flex-col px-12 py-10 h-fit backdrop-blur-3xl md:rounded-tr-xl md:rounded-br-xl rounded-xl">
                        <div className="h-24 w-24 overflow-hidden bg-icon-rotate bg-no-repeat bg-cover absolute -top-12 -left-12 animate-pulse"></div>

                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <h2 className="text-center text-3xl font-bold">{t('register')}</h2>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
                            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <Controller
                                        name="username"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                error={errors.username ? true : false}
                                                fullWidth
                                                label={t('enterUsername')}
                                            />
                                        )}
                                    />
                                    <p className="text-red-600 text-base mt-1.5">{errors.username?.message}</p>
                                </div>
                                <div>
                                    <Controller
                                        name="email"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                error={errors.email ? true : false}
                                                fullWidth
                                                label={t('enterEmail')}
                                                type="email"
                                            />
                                        )}
                                    />
                                    <p className="text-red-600 text-base mt-1.5">{errors.email?.message}</p>
                                </div>
                                <div>
                                    <Controller
                                        name="fullName"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                error={errors.fullName ? true : false}
                                                fullWidth
                                                label={t('enterFullName')}
                                            />
                                        )}
                                    />
                                    <p className="text-red-600 text-base mt-1.5">{errors.fullName?.message}</p>
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

                                <div className="flex gap-4">
                                    <Button type="submit" variant="contained" fullWidth size="large">
                                        {t('register')}
                                    </Button>
                                    <Button
                                        onClick={handleLogin}
                                        variant="outlined"
                                        disabled={dataRegisterUser ? false : true}
                                        fullWidth
                                        size="large"
                                    >
                                        {t('loginNow')}
                                    </Button>
                                </div>
                            </form>

                            <p className="mt-10 text-center text-sm text-gray-500 dark:text-grey-50">
                                {t('alreadyAccount')}?
                                <Link
                                    to={config.Routes.logIn}
                                    className="pl-1 font-semibold leading-6 underline text-gray-600 hover:text-black  dark:text-grey-200 hover:dark:text-grey-400"
                                >
                                    {t('signIn')}.
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div className="w-[28rem] rounded-tr-xl rounded-br-xl bg-register-banner bg-no-repeat bg-cover bg-center hidden lg:block"></div>
                </div>
            </div>
        </>
    );
};

export default Register;
