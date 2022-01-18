const axios = require('axios');

export default class NewfetchImages {
  constructor() {
    this.inputName = '';
    this.page = 1;
  }

  async fetchImages() {
    try {
      const baseUrl = 'https://pixabay.com/api/';
      const KEY = '25284590-6d373146c28d5b297cc6c7db9';
      const response = await axios.get(
        `${baseUrl}?key=${KEY}&q=${this.inputName}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`,
      );
      return await response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
  get query() {
    return this.inputName;
  }
  set query(newQuery) {
    this.inputName = newQuery;
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}
