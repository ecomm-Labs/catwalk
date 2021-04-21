import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle as farCheckCircle } from '@fortawesome/free-regular-svg-icons';
import Price from './Price';

const StyleWrapper = styled.div`
  padding: 0,
  margin: 0
`;

const StyleText = styled.span`
  font-weight: 700;
  color: #535353;
  text-transform: uppercase;
`;
const CurrentStyle = styled.span`
  padding-left: 5px;
  text-transform: uppercase;
  font-weight: 300;
  color: #535353;
`;

const ThumbWrapper = styled.div`
  padding-top: 1.5rem;
`;
const Thumbnail = styled.img`
  justify-content: space-between;
  align-items: center;
  border-radius: 50%;
  height: 60px;
  width: 60px;
  margin: 5px;
  object-fit: cover;
  opacity: 0.5;

  &:hover {
    border: 2px solid #fb3640;
    opacity: 1;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    transform: scale(1.5);
    transition: transform 0.5s;
  }
`;
const SelectedImageWrapper = styled.span`
  position: relative;
`;
const SelectedImage = styled.img`
  justify-content: space-between;
  align-items: center;
  border-radius: 50%;
  height: 60px;
  width: 60px;
  margin: 5px;
  object-fit: cover;
  opacity: 1;
  border: 2px solid #e63946;
`;

class StyleSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStyle: null,
      style_id: null,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id, name) {
    const { handleStyleChange } = this.props;
    handleStyleChange(id);
    this.setState({
      selectedStyle: name,
      style_id: id,
    });
  }

  render() {
    const {
      name, sale_price, original_price, style_id, photos,
    } = this.props.selectedStyle;
    const { styles } = this.props;

    const checkmark = {
      position: 'absolute',
      right: '0',
      color: '#e63946',
    };

    return (
      <StyleWrapper>
        <Price price={original_price} sale={sale_price} />
        <StyleText>Style &gt;</StyleText>
        <CurrentStyle>{name}</CurrentStyle>
        <ThumbWrapper>
          {
            styles.map((style, index) => (
              <React.Fragment key={index}>
                {
                (style.style_id === style_id)
                  ? (
                    <SelectedImageWrapper>
                      <SelectedImage
                        key={style.style_id}
                        src={style.photos[0].thumbnail_url || 'https://www.arraymedical.com/wp-content/uploads/2018/12/product-image-placeholder-564x564.jpg'}
                      />
                      <FontAwesomeIcon icon={farCheckCircle} style={checkmark} />
                    </SelectedImageWrapper>
                  )
                  : (
                    <Thumbnail
                      key={style.style_id}
                      src={style.photos[0].thumbnail_url || 'https://www.arraymedical.com/wp-content/uploads/2018/12/product-image-placeholder-564x564.jpg'}
                      onClick={() => this.handleClick(style.style_id, style.name)}
                    />
                  )
              }

              </React.Fragment>
            ))
          }
        </ThumbWrapper>

      </StyleWrapper>
    );
  }
}

export default StyleSelector;
