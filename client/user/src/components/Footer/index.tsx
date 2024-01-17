import Typography from '@mui/material/Typography';

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import config from '../../config';

function Footer() {
    const { t } = useTranslation('footer');

    const currentYear = new Date().getFullYear();

    const LINKS = [
        {
            title: t('navigation'),
            items: [{ content: t('listProduct'), to: config.Routes.shop }],
        },
        {
            title: t('headOffice'),
            items: [
                {
                    content: t('university'),
                    to: 'https://www.google.com/maps/dir//01+V%C3%B5+V%C4%83n+Ng%C3%A2n,+Linh+Chi%E1%BB%83u,+Th%E1%BB%A7+%C4%90%E1%BB%A9c,+Th%C3%A0nh+ph%E1%BB%91+H%E1%BB%93+Ch%C3%AD+Minh/@10.8506214,106.6895112,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x31752763f23816ab:0x282f711441b6916f!2m2!1d106.7719131!2d10.8506324?entry=ttu',
                },
            ],
        },
    ];
    return (
        <div className="pt-8 pb-2 my-10 border-t-2">
            <footer className="relative w-10/12 m-auto">
                <div className="mx-auto w-full">
                    <div className="grid grid-cols-1 justify-between gap-10 md:grid-cols-2">
                        <Link
                            to={config.Routes.home}
                            className="w-full md:w-fit flex items-start justify-center tracking-widest uppercase text-6xl font-serif font-semibold hover:text-primary-300 transition"
                        >
                            leduc
                        </Link>
                        <div className="grid grid-cols-2 items-start place-content-center">
                            {LINKS.map(({ title, items }) => (
                                <ul key={title}>
                                    <div className="mb-4 font-semibold text-xl cursor-context-menu text-primary-600 dark:text-primary-300">
                                        {title}
                                    </div>
                                    {items.map((content, index) => (
                                        <li key={index}>
                                            <Link to={content.to}>
                                                <p className="py-1 font-medium opacity-60 transition hover:opacity-100 hover:text-primary-300 cursor-pointer">
                                                    {content.content}
                                                </p>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ))}
                        </div>
                    </div>
                    <div className="mt-7 flex w-full flex-col items-center justify-center border-t py-3 gap-3 md:flex-row md:justify-between">
                        <Typography variant="body2" className="mb-4 text-center font-normal md:mb-0">
                            LEDUC &copy; {currentYear} . {t('copyright')}.
                        </Typography>
                        <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
                            <a
                                href="https://www.facebook.com/qb.levananhduc"
                                target="_blank"
                                className="opacity-80 transition hover:opacity-100 hover:text-primary-400"
                            >
                                <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        fillRule="evenodd"
                                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                            <a
                                href="https://www.instagram.com/hi.iam.lvad/"
                                target="_blank"
                                className="opacity-80 transition hover:opacity-100 hover:text-primary-400"
                            >
                                <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        fillRule="evenodd"
                                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                            <a
                                href="https://github.com/LeVanAnhDuc"
                                target="_blank"
                                className="opacity-80 transition hover:opacity-100 hover:text-primary-400"
                            >
                                <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        fillRule="evenodd"
                                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
