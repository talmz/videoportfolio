import React, { useEffect } from 'react';
import ThemeProvider from './styles/ThemeProvider';
import PortfolioOnePage from './pages/PortfolioOnePage';

// Font Awesome for icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

// Add FontAwesome icons to the library
library.add(fab, fas);

const App: React.FC = () => {
  useEffect(() => {
    // Add Google Fonts Assistant (Hebrew)
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(link);
  }, []);

  return (
    <ThemeProvider>
      <PortfolioOnePage />
    </ThemeProvider>
  );
};

export default App;
