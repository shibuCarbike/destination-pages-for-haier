import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* Add Google Tag Manager script here */}
          <Script
            id="google-tag-manager"
            strategy="beforeInteractive"
            src={`https://www.googletagmanager.com/gtm.js?id=GTM-MF7BFZF`}
          />
          
          {/* <!-- Begin comScore Tag for COMPAROS --> */}
          <script
            dangerouslySetInnerHTML={{
              __html: `  var _comscore = _comscore || [];
             _comscore.push({ c1: "2", c2: "37110609" ,  options: { enableFirstPartyCookie: "false" } });
             (function() {
             var s = document.createElement("script"), el = document.getElementsByTagName("script")[0]; s.async = true;
             s.src = "https://sb.scorecardresearch.com/cs/37110609/beacon.js";
             el.parentNode.insertBefore(s, el);
             })();`
            }}
          ></script>

          <noscript>
            <img src="https://sb.scorecardresearch.com/p?c1=2&amp;c2=37110609&amp;cv=3.9.1&amp;cj=1" />
          </noscript>
          {/* <!-- End comScore Tag --> */}

          <link
            rel="icon"
            href="/images/favicon.svg"
            type="image/gif"
            sizes="16x16"
          ></link>
        </Head>
        <body>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=GTM-MF7BFZF`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
