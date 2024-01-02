import React, { useEffect, useState } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { requestImagesByQuery } from 'services/api';
import { STATUSES } from 'utils/constants';
import { AppContainer, Text } from './App.styled';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(STATUSES.idle);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isEmpty, setIsEmpty] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    async function getImages() {
      if (!query) return;
      setStatus(STATUSES.loading);

      try {
        const { hits, totalHits } = await requestImagesByQuery(query, page);

        if (hits.length === 0) {
          setIsEmpty(true);
        }
        setStatus(STATUSES.success);
        setImages(prevImages => [...prevImages, ...hits]);
        setLoadMore(page < Math.ceil(totalHits / 12));
      } catch (error) {
        setError(error);
        setStatus(STATUSES.error);
      }
    }
    getImages();
  }, [query, page]);

  const onHandleFormSubmit = searchQuery => {
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
    setIsEmpty(false);
    setError(null);
  };

  const handleLoadMore = () => setPage(prevPage => prevPage + 1);

  return (
    <AppContainer>
      <Searchbar onSubmit={onHandleFormSubmit} />
      {status === STATUSES.loading && <Loader />}
      {isEmpty && <Text>Sorry. There are no images ...</Text>}
      {status === STATUSES.success && (
        <ImageGallery className="gallery" images={images} />
      )}
      {error &&
        Notify.failure(`❌ Woops...some error occured! ${error.message}`, {
          position: 'right-top',
          clickToClose: true,
          timeout: 3000,
        })}
      {loadMore && status !== STATUSES.loading && images.length > 0 && (
        <Button onClick={handleLoadMore} />
      )}
    </AppContainer>
  );
};
