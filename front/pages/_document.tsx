/* import { withFork } from 'effector-next'
import Document from 'next/document'

const enhance = withFork({debug: false})
export default enhance(Document) */

import { withFork } from "effector-next";





import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
  } from 'next/document';
  const enhance = withFork({ debug: false });
  
  class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
      const initialProps = await Document.getInitialProps(ctx);
      return { ...initialProps };
    }
  
    render() {
      return (
        <Html lang="ru" prefix="og: https://sk9.site">
          <Head></Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      );
    }
  }
  
  export default enhance(MyDocument);
  //export default MyDocument;
