import React from 'react';
import { Hourglass } from 'react-loader-spinner';

export const HourGlassLoader = () => (
  <Hourglass
    height="50"
    width="50"
    ariaLabel="hourglass-loading"
    wrapperClass=""
    colors={['#111', '#000']}
  />
);
