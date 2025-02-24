import React from 'react';
import WebViewPage from './WebViewPage';
import { URLs } from '../config';

const HomePage = () => {
  return <WebViewPage route={{ params: { url: URLs.HOME } }} />;
};

export default HomePage;