import React from "react";
import { Breadcrumb } from "react-bootstrap";

class AboutUs extends React.Component {
  static async getInitialProps({ store, isServer, pathname, query }) {
    return {
      seo: {
        title: "About Us - Comparos.in",
        url: "https://tv.comparos.in/about-us",
        canonical: "https://tv.comparos.in/about-us",
        description:
          "Know about Comparos.in – We are India’s leading online portal where you can buy refrigerators, air conditioners & mobile phones at very reasonable price.",
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
        <div className="container mt-65">
          <div className="row">
            <div className="content-box-footer">
              <h1>About Comparos.in</h1>
              <p>
                Comparos.in is a one-stop destination for all your queries
                related to day to day electrical appliances including
                refrigerators, Air conditioners, mobiles, television and
                watches. Our mission is to cater customers’ desire for
                reasonable prices, better selection and convenient services .As
                the title signifies, it is a platform where in you would get the
                comfort to know about the product in details with the help of
                expert reviews. With the calculative budget, Comparos provide a
                wide variety of all the products and has been designed in a way
                that helps buyers to make their decision with convenience and
                ease, simplifying the entire process of comparison with detailed
                specifications.
              </p>
              <h2>Here What You Get...</h2>
              <ul>
                <li>
                  <b>Search Platform</b>
                  <p>
                    You can search for refrigerators, Air-Conditioners, mobiles,
                    television and watches, according to your need, taste and
                    style from everywhere and anywhere. The website gives the
                    opportunity to make efficient decision saving your time and
                    efforts. One can search the desired product with detailed
                    specifications alongside analyzing their performance with
                    available reviews and other brand’s products. The website
                    also provides information for the pipeline products and
                    their launch times.
                  </p>
                </li>
                <li>
                  <b>Information About the Product</b>
                  <p>
                    Insight of the product, the website provides all the
                    specifications and features of the product of various
                    brands.
                  </p>
                </li>
                <li>
                  <b>Expert Reviews</b>
                  <p>
                    This Website provides the expert reviews of every product,
                    which helps the buyers in choosing the best with great
                    features and utmost quality.
                  </p>
                </li>
                <li>
                  <b>Informative Comparison</b>
                  <p>
                    The website provides the best comparison to create a
                    clarification amongst the buyers. The platform compares the
                    brand on criteria like price range, features, design,
                    product life, product inner space and other specifications
                    different from other brand and many others .Buyers can also
                    can also fill in their review and read other’s reviews and
                    experience about the product.
                  </p>
                </li>
                <li>
                  <b>Best Dealers</b>
                  <p>
                    Here you also get the information about the best dealers
                    available in the market, across the country. You can look
                    for the nearest dealer online according to your geographical
                    location.
                  </p>
                </li>
                <li>
                  <b>Latest News and Articles</b>
                  <p>
                    The News and article option is to keep the user updated with
                    the latest information. This news section covers almost
                    everything from new launches to major events happening in
                    the tech industry all around the globe. The article section
                    of the website covers all the useful information related to
                    the new launches, maintenance, latest technologies,
                    accessories and many other issues.
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>

            <Breadcrumb.Item active>About Us</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
    );
  }
}

export default AboutUs;
