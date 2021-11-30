import React from 'react';
import ReactLoading, { LoadingProps } from 'react-loading';

const Loading = ({ type, color }: LoadingProps) => (
  <ReactLoading type={type} color={color} height={'20%'} width={'20%'} />
);

export default Loading;
