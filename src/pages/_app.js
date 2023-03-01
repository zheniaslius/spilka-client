import Head from "next/head";
import {useTranslation} from 'react-i18next';
import "../styles/global.css";

export default function App({ Component, pageProps }) {
  const { t } = useTranslation();

  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-png" href="/images/favicon.png" />
        <title>{t('description')}</title>
        <meta name="description" content={t('description')} />
      </Head>
     <Component {...pageProps} />
   </div>
  )
}