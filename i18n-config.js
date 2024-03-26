import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import i18next from "i18next";

i18next
    .use(Backend)
    .use(initReactI18next)
    .init({
        lng: 'EN',
        fallbackLng: 'EN',
        backend: {
            loadPath: `${process.env.NEXT_PUBLIC_BE_HOST_URL}/api/translations/{{lng}}`
        }
    });

export default i18n;