import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="favicon.png" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            rel="preload"
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
            as="style"
            onload="this.onload=null;this.rel='stylesheet'"
          />
          <noscript>
            <link
              href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
              rel="stylesheet"
              type="text/css"
            />
          </noscript>
          <meta name="theme-color" content="#000000" />
          <meta
            name="description"
            content="Talk to a random person and keep your anonimity. Find someone from all over the world"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
