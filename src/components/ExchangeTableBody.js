import React from 'react';
import ExchangeCell from './ExchangeCell';
import ExchangeRow from './ExchangeRow';

function ExchangeTableBody({ headings, quotes }) {
  return (
    <tbody>
      {quotes.map((quote) => (
        <ExchangeRow key={quote.symbol}>
          {headings.map((header) => (
            <ExchangeCell key={header.name} value={quote[header.key] || '-'} />
          ))}
        </ExchangeRow>
      ))}
    </tbody>
  );
}

export default React.memo(ExchangeTableBody);
