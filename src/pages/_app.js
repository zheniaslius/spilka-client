import Head from "next/head";
import {useTranslation} from 'react-i18next';
import "../styles/global.css";

export default function App({ Component, pageProps }) {
  const { t } = useTranslation();

  return (
    <div>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{t('description')}</title>
      </Head>
     <Component {...pageProps} />
   </div>
  )
}