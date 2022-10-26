import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../../components/Home/Header/Header';

export function HomeTemplate(props) {
  const { Component, ...restParam } = props;
  return (
    <Route
      {...restParam}
      render={(propsRoute) => (
        <>
          <Header />
          <Component {...propsRoute} />
        </>
      )}
    />
  );
}
