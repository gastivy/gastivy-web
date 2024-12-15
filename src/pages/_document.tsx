import type { DocumentProps } from "next/document";
import { Head, Html, Main, NextScript } from "next/document";

type Props = DocumentProps & {
  // add custom document props
};

export default function Document(props: Props) {
  const {
    __NEXT_DATA__: { locale },
  } = props;
  return (
    <Html lang={locale} translate="no">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        />
      </Head>
      <body>
        <div className="loader-wrapper">
          <div className="loader" />
        </div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
