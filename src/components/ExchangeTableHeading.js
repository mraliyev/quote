import React from 'react';
import ExchangeRow from './ExchangeRow';

function ExchangeTableHeading({ headings, onSort }) {
  return (
    <thead>
      <ExchangeRow>
        {headings.map((heading) => (
          <th key={heading.name} id={heading.key} onClick={onSort}>
            {heading.name}
          </th>
        ))}
      </ExchangeRow>
    </thead>
  );
}

export default React.memo(ExchangeTableHeading);
