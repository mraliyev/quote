import React, { useEffect } from "react";
import "./App.css";
import ExchangeTable from "./components/ExchangeTable";
import useSortable from "./Hooks/useSortable";
import useWebSocket from "./Hooks/useWebSocket";

function App() {
  const quotes = useWebSocket(process.env.REACT_APP_WS_URL);
  const [sortedData, setCurrentData] = useSortable();

  useEffect(() => {
    setCurrentData(Object.values(quotes));
  }, [quotes, setCurrentData]);

  return (
    <div className="app">
      <ExchangeTable quotes={sortedData} />
    </div>
  );
}

export default React.memo(App);
