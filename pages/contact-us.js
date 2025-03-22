import React from "react";
import { Breadcrumb } from "react-bootstrap";

class ContactUs extends React.Component {
  static async getInitialProps({ store, isServer, pathname, query }) {
    return {
      seo: {
        title: "Contact Us - Comparos.in",
        url: "https://tv.comparos.in/contact-us",
        canonical: "https://tv.comparos.in/contact-us",
        description:
          "You can contact us by sending mail at mukesh@delente.in for any query related Air Conditioners, Refrigerators, Mobiles, Watches and Televisions",
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
        <div className="container" style={{ height: "calc(100vh - 390px)" }}>
          <div className="row" style={{ marginTop: 100 }}>
            <div className="content-box-footer">
              <h1 style={{ fontSize: 30, marginBottom: 10 }}>Contact Us</h1>
              <p style={{ fontSize: 16 }}>
                <span style={{ fontWeight: 600, fontSize: 18 }}>Email : </span>{" "}
                mukesh@delente.in
              </p>

              <p>
                Since we are not taking online orders now so customers can send
                us emails
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactUs;
