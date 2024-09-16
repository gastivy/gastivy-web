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
      <Head />
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
