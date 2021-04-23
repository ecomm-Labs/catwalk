import $ from 'jquery';
import config from '../../../../config';

const fetchersObject = {
  metaGetter: (id) => new Promise((resolve, reject) => $.ajax({
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/reviews/meta?product_id=${id}`,
    headers: {
      Authorization: config.TOKEN,
    },
    success: (data) => resolve(data),
    error: (err) => reject(err),
  })),
  listGetter: (id) => new Promise((resolve, reject) => $.ajax({
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/reviews?product_id=${id}&limit=2`,
    headers: {
      Authorization: config.TOKEN,
    },
    success: (data) => resolve(data),
    error: (err) => reject(err),
  })),
};

export default fetchersObject;