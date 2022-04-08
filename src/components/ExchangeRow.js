import React from 'react';

function ExchangeRow({ children }) {
  return <tr>{children}</tr>;
}

export default React.memo(ExchangeRow);
