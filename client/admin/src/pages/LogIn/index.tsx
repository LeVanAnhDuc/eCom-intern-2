import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
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
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            navigate('/');
        }
    }, []);

    const onSubmit: SubmitHandler<ILogin> = async (data: ILogin) => {
        if (data.userName === 'admin') {
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
        } else {
            toast.error(t('noAdmin'));
        }
    };

    return (
        <>
            <div className="flex justify-center items-center min-h-screen overflow-hidden bg-primary-100 dark:bg-primary-700">
                <div className="flex my-10 shadow-xl rounded-xl border-2 border-primary-200 min-w-max">
                    <div className="w-96 rounded-tl-xl rounded-bl-xl bg-login-banner bg-no-repeat bg-cover bg-center hidden md:block"></div>
                    <div className="w-[440px] flex flex-col px-12 py-10 h-fit backdrop-blur-3xl md:rounded-tr-xl md:rounded-br-xl rounded-xl ">
                        <div className="h-24 w-24 overflow-hidden bg-icon-rotate bg-no-repeat bg-cover absolute -top-12 -right-12 animate-pulse"></div>

                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <h2 className="text-center text-3xl font-bold">{t('login')}</h2>
                        </div>

                        <div className="my-10 sm:mx-auto sm:w-full sm:max-w-sm ">
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
                                <Button type="submit" variant="contained" fullWidth size="large">
                                    {t('login')}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LogIn;
