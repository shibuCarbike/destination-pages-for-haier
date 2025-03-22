import React from "react";
import { Breadcrumb } from "react-bootstrap";

export class termsAndConditions extends React.Component {
  static async getInitialProps({ store, isServer, pathname, query }) {
    return {
      seo: {
        title: "Terms and Conditions - Comparos.in",
        url: "https://tv.comparos.in/terms-and-condition",
        canonical: "https://tv.comparos.in/terms-and-condition",
        description: "Know more about Terms & Conditions of Comparos.in.",
      },
    };
  }
  render() {
    return (
      <div>
        <div className="container mt-50">
          <div className="row">
            <div className="content-box-footer">
              <h1>Terms And Condition</h1>
              <p>
                Please read these terms and conditions (terms and
                conditions,Terms ) carefully before using our website
                (“website”, service) operated by Comparos.
              </p>
              <b>CONDITIONS OF USE</b>
              <p>
                By using this website, you certify that you have read and
                reviewed this Agreement and that you agree to comply with its
                terms. If you do not want to be bound by the terms of this
                Agreement, you are advised to leave the website accordingly.
                Comparos only grants use and access of this website, its
                products, and its services to those who have accepted its terms.
              </p>
              <br />
              <b>PRIVACY POLICY</b>
              <p>
                Before you continue using our website, we advise you to read our
                privacy policy, regarding our user data collection. It will help
                you better understand our practices.
              </p>
              <br />
              <b>Age restriction</b>
              <p>
                You must be at least 18 (eighteen) years of age before you can
                use this website. By using this website, you warrant that you
                are at least 18 years of age and you may legally adhere to this
                Agreement. Comparos assumes no responsibility for liabilities
                related to age misrepresentation.
              </p>
              <br />
              <b>Intellectual property</b>
              <p>
                You agree that all materials, products, and services provided on
                this website are the property of Comparos, its affiliates,
                directors, officers, employees, agents, suppliers, or licensors
                including all copyrights, trade secrets, trademarks, patents,
                and other intellectual property. You also agree that you will
                not reproduce or redistribute the Comparos’s intellectual
                property in any way, including electronic, digital, or new
                trademark registrations.
              </p>
              <br />
              <p>
                You grant Comparos a royalty-free and non-exclusive license to
                display, use, copy, transmit, and broadcast the content you
                upload and publish. For issues regarding intellectual property
                claims, you should contact the company in order to come to an
                agreement.
              </p>
              <br />
              <b>User accounts</b>
              <p>
                As a user of this website, you may be asked to register with us
                and provide private information. You are responsible for
                ensuring the accuracy of this information, and you are
                responsible for maintaining the safety and security of your
                identifying information. You are also responsible for all
                activities that occur under your account or password.If you
                think there are any possible issues regarding the security of
                your account on the website, inform us immediately so we may
                address them accordingly. We reserve all rights to terminate
                accounts, edit or remove content and cancel orders a tour sole
                discretion.
              </p>

              <br />
              <b>Applicable law</b>
              <p>
                By visiting this website, you agree that the laws of the India,
                without regard to principles of conflict laws, will govern these
                terms and conditions, or any dispute of any sort that might come
                between Comparos and you, or its business partners and
                associates.
              </p>
              <br />
              <b>Disputes</b>
              <p>
                Any dispute related in any way to your visit to this website or
                to products you purchase from us shall be arbitrated by state or
                federal court of India and you consent to exclusive jurisdiction
                and venue of such courts.
              </p>
              <br />
              <b>Indemnification</b>
              <p>
                You agree to indemnify Comparos and its affiliates and hold
                Comparos harmless against legal claims and demands that may
                arise from your use or misuse of our services. We reserve the
                right to select our own legal counsel.
              </p>
              <br />
              <b>Limitation on liability</b>
              <p>
                Comparos is not liable for any damages that may occur to you as
                a result of your misuse of our website. Comparos reserves the
                right to edit, modify, and change this Agreement at any time. We
                shall let our users know of these changes through electronic
                mail. This Agreement is an understanding between Comparos and
                the user, and this supersedes and replaces all prior agreements
                regarding the use of this website.
              </p>
            </div>
          </div>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>

            <Breadcrumb.Item active>Terms and Conditions</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
    );
  }
}

export default termsAndConditions;
