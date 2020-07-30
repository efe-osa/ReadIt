import React from 'react';
import logo from '../../assets/images/logo.svg';

const LoadingIcon = (): JSX.Element => {
  return (
    <picture className="centralise h-screen">
      <img src={logo} className="App-logo" alt="loader" />
    </picture>
  );
};

export default LoadingIcon;
