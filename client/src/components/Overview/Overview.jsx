import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
// import $ from 'jquery';
import PropTypes from 'prop-types';
import config from '../../../../config';
import ProductInfo from './Subcomponents/ProductInfo';
import Description from './Subcomponents/Description';
import ImageGallery from './Subcomponents/ImageGallery';
import StyleSelector from './Subcomponents/StyleSelector';
import AddToCart from './Subcomponents/AddToCart';

axios.defaults.headers.common.Authorization = config.TOKEN; // authorization for all requests

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopWrapper = styled.div`
  margin: 2rem;
  padding: 2rem;
  display: flex;
  color: #535353;
`;

const LeftDiv = styled.div`
  width: 70%;
  float: left;
`;

const RightDiv = styled.div`
  width: 30%;
  float: right;
`;

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: {},
      productStyles: [],
      selectedStyle: {},
      productRatings: [],
      stylePhotos: [],
    };
    this.handleStyleChange = this.handleStyleChange.bind(this);
  }

  componentDidMount() {
    this.fetchProduct();
  }

  handleStyleChange(id) {
    const { productStyles } = this.state;
    this.setState({
      selectedStyle: productStyles.find((style) => style.style_id === id),
    });
  }

  fetchProduct() {
    const { productId } = this.props;
    const URL = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/products/${productId}`;
    axios.get(URL)
      .then((res) => {
        this.setState({
          currentProduct: res.data,
        });
      })
      .then(() => {
        this.fetchProductStyles();
      })
      .then(() => {
        this.fetchProductRatings();
      })
      .catch((err) => console.error(err));
  }

  fetchProductStyles() {
    const { productId } = this.props;
    const URL = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/products/${productId}/styles`;
    axios.get(URL)
      .then((res) => {
        this.setState({
          productStyles: res.data.results,
          selectedStyle: res.data.results[0],
          stylePhotos: res.data.results[0].photos,
        });
      })
      .catch((err) => console.error(err));
  }

  fetchProductRatings() {
    const { productId } = this.props;
    const URL = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/reviews/?product_id=${productId}`;
    axios.get(URL)
      .then((res) => {
        this.setState({
          productRatings: res.data.results,
        });
      })
      .catch((err) => console.error(err));
  }

  render() {
    const {
      currentProduct, productStyles, selectedStyle, stylePhotos, productRatings,
    } = this.state;

    return (
      <Wrapper>
        <TopWrapper>
          <LeftDiv>
            <ImageGallery photos={stylePhotos} />
          </LeftDiv>
          <RightDiv>
            <ProductInfo
              currentProduct={currentProduct}
              selectedStyle={selectedStyle}
              productRatings={productRatings}
            />
            <StyleSelector
              selectedStyle={selectedStyle}
              styles={productStyles}
              handleStyleChange={this.handleStyleChange}
            />
            <AddToCart />
          </RightDiv>
        </TopWrapper>
        <div className="ProductOverview">
          <div className="Description">
            <Description currentProduct={currentProduct} />
          </div>
        </div>
      </Wrapper>
    );
  }
}

Overview.propTypes = {
  productId: PropTypes.number.isRequired,
};

export default Overview;
