import React from "react";
import { Breadcrumb } from "react-bootstrap";

class AboutUs extends React.Component {
  static async getInitialProps({ store, isServer, pathname, query }) {
    return {
      seo: {
        title: "Privacy Policy - Comparos.in",
        url: "https://tv.comparos.in/privacy-policy",
        canonical: "https://tv.comparos.in/privacy-policy",
        description: "Know more about Privacy Policy of Comparos.in",
      },
    };
  }
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  static getDerivedStateFromProps(props, state) {}

  render() {
    const {} = this.state;
    return (
      <div>
        <div className="container mt-50">
          <div className="row">
            <div
              className="content-box-footer"
              style={{ minHeight: "calc(100vh - 180px)" }}
            >
              <h1>Privacy Policy</h1>
              <p>
                At Comparos, We value our customers and protect their privacy,
                as well as are committed to safeguarding the information we
                receive related to our trustable customers. We are bound not to
                sell any information about you to others because we have a
                pledge to protect your shared details with the authorities. This
                Notice will help you to understand what information we collect,
                how we use it, and the ways we maintain your privacy and the
                security of personal information, which you share with us.
              </p>

              <b>SHARING INFORMATION WITH AFFILIATED COMPANIES</b>
              <p>
                We may disclose to our affiliated companies all of the
                information we collect from you as mentioned above. Our
                affiliated companies can be promotional activities, financial
                service providers such as leasing companies, insurance
                companies, payment processing companies and non-financial
                companies such as automotive repair facilities and data
                processing companies. This sharing permits us to give you
                superior service, make a wider range of products available, and
                operate our business more effectively. We do not share
                information with non-affiliated third parties. Where they apply,
                we reserve limits and restrictions set by law as to sharing
                certain kinds of information with our affiliates. Google, as a
                third-party vendor uses cookies to serve ads on your site.
                Googles use of the DART cookie enables it to serve ads to your
                users based on their visit to your sites and other sites on the
                Internet. Users may opt out of the use of the DART cookie by
                visiting the Google ad and content network privacy policy.
              </p>
              <b></b>
              <p></p>
            </div>
          </div>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>

            <Breadcrumb.Item active>Privacy Policy</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
    );
  }
}

export default AboutUs;
