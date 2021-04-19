import React from 'react';
import styled from 'styled-components';
import Price from './Price';
import StarRatings from './StarRatings';
// import Styles from './StarRatings';
// import Selector from './Selector';

const ProductWrapper = styled.div`
  margin: 0;
  padding: 0;
`;
const Title = styled.h1`
  font-weight: 700;
  font-size: 2rem;
  margin: 0;
  padding: 0;
`;

const Category = styled.h2`
  font-weight: 200;
  font-size: 1.5rem;
  margin: 0;
  padding: 0;
`;

class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { currentProduct, selectedStyle, productRatings } = this.props;
    const { name, category } = currentProduct;
    const { original_price, sale_price } = selectedStyle;

    return (
      <ProductWrapper>
        <StarRatings ratings={productRatings} />
        <Category>{category}</Category>

        <Title>{name}</Title>

        <div className="price">
          <Price price={original_price} sale={sale_price} />
        </div>
      </ProductWrapper>
    );
  }
}

// ProductInfo.propTypes = {
//   currentProduct: PropTypes.object.isRequired,
//   name: PropTypes.string.isRequired,
//   category: PropTypes.string.isRequired,
//   description: PropTypes.string,
// };

// ProductInfo.defaultProps = {
//   description: null,
// };

export default ProductInfo;
