import React from 'react';

function ExchangeCell({ value }) {
  return <td>{value}</td>;
}

export default React.memo(ExchangeCell);
