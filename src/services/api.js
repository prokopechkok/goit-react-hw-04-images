import axios from 'axios';
import { PIXABAY_KEY } from 'utils/constants';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const requestImagesByQuery = async (query, page) => {
  const params = new URLSearchParams({
    key: PIXABAY_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
    page,
  });
  const { data } = await axios.get(`?${params}`);

  return data;
};
