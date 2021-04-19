import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { farStar } from '@fortawesome/free-regular-svg-icons';
import ReactStars from 'react-rating-stars-component';

const StarWrapper = styled.div`
  display: flex;
`;
const ReviewWrapper = styled.div`
  font-size: 12px;
  padding-top: 5px;
  padding-left: 5px;
`;

class StarRatings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { ratings } = this.props;
    let totalRating = 0;
    let avgRating = 0;
    const totalCount = ratings.length;
    if (totalCount > 0) {
      ratings.forEach((item) => totalRating += item.rating);
      avgRating = totalRating / totalCount;
    }
    return (
      <StarWrapper>
        <ReactStars
          size={20}
          // edit
          isHalf
          value={avgRating}
          // emptyIcon={<FontAwesomeIcon icon={farStar} />}
          // halfIcon={<FontAwesomeIcon icon={faStarHalfAlt} />}
          // filledIcon={<FontAwesomeIcon icon={faStar} />}
        />
        {avgRating}
        <ReviewWrapper>
          <a href="#Reviews">Read {totalCount} reviews</a>
        </ReviewWrapper>
      </StarWrapper>
    );
  }
}

export default StarRatings;
