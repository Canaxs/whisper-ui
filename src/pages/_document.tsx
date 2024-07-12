import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Söylenti - Haber Sitesi</title>
        </Head>
      <body style={{fontFamily: 'Poppins,sans-serif'}}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
