import React, { Component } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { requestImagesByQuery } from 'services/api';
import { STATUSES } from 'utils/constants';
import { AppContainer, Text } from './App.styled';

export class App extends Component {
  state = {
    query: '',
    images: [],
    status: STATUSES.idle,
    error: null,
    page: 1,
    isEmpty: false,
    loadMore: false,
    showModal: false,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.getImages(query, page);
    }
  }
  getImages = async (query, page) => {
    if (!query) return;
    this.setState({ status: STATUSES.loading });

    try {
      const { hits, totalHits } = await requestImagesByQuery(query, page);

      if (hits.length === 0) {
        this.setState({ isEmpty: true });
      }
      this.setState(prevState => ({
        status: STATUSES.success,
        images: [...prevState.images, ...hits],
        loadMore: page < Math.ceil(totalHits / 12),
      }));
    } catch (error) {
      this.setState({
        status: STATUSES.error,
        error,
      });
    }
  };

  onHandleFormSubmit = searchQuery => {
    this.setState({
      query: searchQuery,
      page: 1,
      images: [],
      isEmpty: false,
      error: null,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, loadMore, error, status, isEmpty } = this.state;
    const successStutus = status === STATUSES.success;
    const loadingStutus = status === STATUSES.loading;

    return (
      <AppContainer>
        <Searchbar onSubmit={this.onHandleFormSubmit} />
        {loadingStutus && <Loader />}
        {isEmpty && <Text>Sorry. There are no images ...</Text>}
        {successStutus && <ImageGallery className="gallery" images={images} />}
        {error &&
          Notify.failure(`❌ Woops...some error occured! ${error.message}`, {
            position: 'right-top',
            clickToClose: true,
            timeout: 3000,
          })}
        {loadMore && !loadingStutus && images.length > 0 && (
          <Button onClick={this.handleLoadMore} />
        )}
      </AppContainer>
    );
  }
}
