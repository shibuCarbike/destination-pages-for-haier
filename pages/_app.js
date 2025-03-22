import "styles/globals.scss";
import Head from "next/head";
import Script from "next/script";
import Header from "components/Header";
import Footer from "components/Footer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DFPSlotsProvider } from "react-dfp";
import "bootstrap/dist/css/bootstrap.min.css";
import SSRProvider from "react-bootstrap/SSRProvider";
import RouteChangeLoader from "components/RouteChangeLoader";

export default function App({ Component, pageProps }) {
  const seo = pageProps.seo;
  var title = "Comparos";
  var description = "";
  const router = useRouter();
  const [isSponser, setIsSponser] = useState(false);
  const [loading, setLoading] = useState(false);

  if (seo && seo.title) {
    title = seo.title;
  }
  if (seo && seo.description) {
    description = seo.description;
  }

  // one signal
  useEffect(() => {
    window.OneSignal = window.OneSignal || [];
    OneSignal.push(function () {
      OneSignal.init({
        appId: "11240a27-d81f-42a8-87cf-afd73df26fbf",
        safari_web_id:
          "web.onesignal.auto.6b1e0125-c07a-4d4d-8123-db80df1063df",
        promptOptions: {
          slidedown: {
            prompts: [
              {
                type: "push", // current types are "push" & "category"
                autoPrompt: true,
                text: {
                  /* limited to 90 characters */
                  actionMessage:
                    "We'd like to show you notifications for the latest news and updates.",
                  /* acceptButton limited to 15 characters */
                  acceptButton: "Allow",
                  /* cancelButton limited to 15 characters */
                  cancelButton: "Cancel",
                },
                icon: "/images/favicon.svg",
                delay: {
                  pageViews: 1,
                  timeDelay: 3,
                },
              },
            ],
          },
        },
        allowLocalhostAsSecureOrigin: true,
      });
    });
    return () => {
      window.OneSignal = undefined;
    };
  }, []);

  useEffect(() => {
    let body = document.body;
    if (router.asPath.split("/")[1] == "refrigerator") {
      body.style.paddingTop = "48px";
      setIsSponser(true);
    } else {
      body.style.paddingTop = "115px";
      setIsSponser(false);
    }
  }, [router]);

  useEffect(() => {
    const start = () => setLoading(true);
    const end = () => setLoading(false);
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, []);

  if (loading) {
    return <RouteChangeLoader />;
  } else {
    return (
      <>
        <Head>
          <title>{title}</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          ></meta>
          {seo && seo.description && (
            <meta name="description" content={description} />
          )}
          {seo && seo.robots ? (
            <meta name="robots" content={seo.robots} />
          ) : (
            <meta name="robots" content="index, follow" />
          )}
          {seo && seo.url && (
            <meta
              property="og:url"
              content={seo && seo.url ? seo.url : `https://comparos.in`}
            />
          )}
          {seo && seo.url && (
            <meta
              property="twitter:url"
              content={seo && seo.url ? seo.url : `https://comparos.in`}
            />
          )}
          {seo && seo.canonical && (
            <link rel="canonical" href={seo.canonical} />
          )}

          {seo && seo.title && <meta property="og:title" content={title} />}
          {seo && seo.title && (
            <meta property="twitter:title" content={title} />
          )}

          {
            <meta
              property="og:image"
              content={
                seo && seo.image
                  ? seo.image
                  : "https://www.comparos.in/images/logo.png"
              }
            />
          }
          {
            <meta
              property="twitter:image"
              content={
                seo && seo.image
                  ? seo.image
                  : "https://www.comparos.in/images/logo.png"
              }
            />
          }
          {seo && seo.description && (
            <meta property="og:description" content={description} />
          )}
          {seo && seo.description && (
            <meta property="twitter:description" content={description} />
          )}
          <meta property="og:type" content="article" />
          {/* <Script
            async
            dangerouslySetInnerHTML={{
              __html: `
                var _comscore = _comscore || [];
                _comscore.push({ c1: "2", c2: "37110609" });
                (function() {
                var s = document.createElement("script"), el = document.getElementsByTagName("script")[0]; s.async = true;
                s.src = "https://sb.scorecardresearch.com/cs/37110609/beacon.js";
                el.parentNode.insertBefore(s, el);
                })();`,
            }}
          ></Script> */}
        </Head>
        <Header isSponser={isSponser} />
        <DFPSlotsProvider
          lazyLoad={{
            fetchMarginPercent: 0,
            renderMarginPercent: 0,
            mobileScaling: 1.0,
          }}
          dfpNetworkId="22243352901"
          // dfpNetworkId="22297686590" // fake
        >
          <Component {...pageProps} />
        </DFPSlotsProvider>
        <Footer isSponser={isSponser} />
        {/* <Script src="vanilla-js-tooltip.min.js"></Script> */}
        <Script
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-C2Q4JJ5FT0"
        ></Script>
        <Script
          strategy="lazyOnload"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7071582718054907"
          crossOrigin="anonymous"
        ></Script>
        <Script
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-C2Q4JJ5FT0', {
                  page_path: window.location.pathname,
                });`,
          }}
        ></Script>

        {/* // from document */}
        {/* <Script
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
				(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
				new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
				j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
				'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
				})(window,document,'script','dataLayer','GTM-MF7BFZF')
				`,
          }}
        ></Script> */}
        <Script
          src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"
          // strategy="afterInteractive"
        />
        <Script
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
				!function(f,b,e,v,n,t,s)
				{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
				n.callMethod.apply(n,arguments):n.queue.push(arguments)};
				if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
				n.queue=[];t=b.createElement(e);t.async=!0;
				t.src=v;s=b.getElementsByTagName(e)[0];
				s.parentNode.insertBefore(t,s)}(window,document,'script',
				'https://connect.facebook.net/en_US/fbevents.js');
				fbq('init', '1407509386399254'); 
				fbq('track', 'PageView');
				`,
          }}
        />
      </>
    );
  }
}
