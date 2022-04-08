import React, { useCallback, useEffect, useRef, useState } from 'react';
import useSortable from '../Hooks/useSortable';
import { useTheme } from '../Hooks/useTheme';
import ExchangeTableBody from './ExchangeTableBody';
import ExchangeTableHeading from './ExchangeTableHeading';

function ExchangeTable({ quotes }) {
  const [sortedData, setCurrentData, switchOrder] = useSortable();
  const [showLimited, setShowLimited] = useState(true);
  const [theme, toggleTheme] = useTheme();
  const limit = 50;
  const headings = useRef([
    { key: 'symbol', name: 'Ticker' },
    { key: 'bid', name: 'Bid' },
    { key: 'ask', name: 'Ask' },
    { key: 'high', name: 'High' },
    { key: 'low', name: 'Low' },
    { key: 'last', name: 'Last' },
  ]);

  function changeLimit() {
    setShowLimited(!showLimited);
  }

  const onSort = useCallback(
    (e) => {
      try {
        switchOrder(e);
      } catch (error) {
        console.error(error.message);
      }
    },
    [switchOrder]
  );

  useEffect(() => {
    if (showLimited) {
      setCurrentData(quotes.slice(0, limit));
    } else {
      setCurrentData(quotes);
    }
  }, [quotes, showLimited, setCurrentData, limit]);

  return (
    <>
      <button
        className='app-button app-border app-margin-bottom'
        onClick={changeLimit}
      >
        {`Show ${showLimited ? 'all' : limit}`}
      </button>
      <button
        className='app-button app-border app-margin-bottom'
        onClick={toggleTheme}
      >
        Toggle Theme
      </button>
      <table className='app-table app-bordered' style={theme}>
        <ExchangeTableHeading headings={headings.current} onSort={onSort} />
        <ExchangeTableBody headings={headings.current} quotes={sortedData} />
      </table>
    </>
  );
}

export default React.memo(ExchangeTable);
