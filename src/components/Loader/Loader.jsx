import React from 'react';
import { Audio } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Audio
      height="40"
      width="80"
      radius="9"
      color="blue"
      ariaLabel="loading"
      wrapperStyle={{ margin: ' auto' }}
      wrapperClass
    />
  );
};
