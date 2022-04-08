import React, { useState } from 'react';

const ThemeContext = React.createContext();

export const useTheme = () => React.useContext(ThemeContext);

const light = {};
const dark = {
  background: '#3a3a3a',
  color: 'whitesmoke',
};

function Theme(props) {
  const [lightTheme, setTheme] = useState(true);

  function toggleTheme() {
    setTheme(!lightTheme);
  }

  return (
    <ThemeContext.Provider value={[lightTheme ? light : dark, toggleTheme]}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export default Theme;
