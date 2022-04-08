import { useEffect, useReducer } from "react";

function quotesReducer(state, [type, payload]) {
  switch (type) {
    case "ticker":
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}

function useWebSocket(url) {
  const [quotes, dispatch] = useReducer(quotesReducer, {});

  useEffect(() => {
    const ws = new WebSocket(url);
    let payload = {};
    const batchRate = 10;

    function subscribe(symbols) {
      Array.isArray(symbols) &&
        symbols.forEach((symbol, index) => {
          ws.send(
            JSON.stringify({
              method: "subscribeTicker",
              params: {
                symbol: symbol.id,
              },
              id: index + 1,
            })
          );
        });
    }

    function getSymbols() {
      ws.send(
        JSON.stringify({
          method: "getSymbols",
          params: {},
          id: 0,
        })
      );
    }

    ws.onopen = () => {
      getSymbols();
    };

    ws.onmessage = ({ data }) => {
      data = JSON.parse(data);

      if (data.id === 0 && data.result) {
        subscribe(data.result);
      } else if (data.method) {
        if (Object.keys(payload).length < batchRate) {
          payload = { ...payload, [data.params.symbol]: data.params };
        } else {
          dispatch([data.method, payload]);
          payload = {};
        }
      }
    };

    ws.onerror = (err) => {
      console.error(err);
    };

    ws.onclose = () => {
      console.log("connection closed");
    };

    return () => {
      ws.close();
    };
  }, [url]);

  return quotes;
}

export default useWebSocket;
