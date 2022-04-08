import { useMemo, useState } from 'react';

function useSortable() {
  const [sortConfig, setSortConfig] = useState({
    highToLow: true,
    sortBy: 'last',
  });

  const [currentData, setCurrentData] = useState([]);

  const sortedItems = useMemo(() => {
    return currentData
      .sort((a, b) =>
        sortConfig.highToLow
          ? b[sortConfig.sortBy] - a[sortConfig.sortBy]
          : a[sortConfig.sortBy] - b[sortConfig.sortBy]
      )
      .slice(0, sortConfig.limit);
  }, [currentData, sortConfig]);

  function switchOrder(e) {
    if (!e.target.id) {
      throw new Error(
        'Make sure to add an id attribute to the element utilizing the handler'
      );
    }

    setSortConfig((prevState) => ({
      ...prevState,
      highToLow: !prevState.highToLow,
      sortBy: e.target.id,
    }));
  }

  return [sortedItems, setCurrentData, switchOrder];
}

export default useSortable;
