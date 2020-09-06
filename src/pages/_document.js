import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/styles';
import { COLORS } from '../constants/Colors';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collect(<App {...props} />),
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
      ctx.renderPage(sheet);
    }
  }
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" type="image/png" href="favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css?family=Lato:300,400,700,800,Regular"
            rel="stylesheet"
          />
          <link rel="manifest" href="/manifest.webmanifest"></link>
          <style>{`body { margin: 0 } /* custom! */`}</style>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, user-scalable=no"
          />
          <meta name="theme-color" content={COLORS.primaryLight} />
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
