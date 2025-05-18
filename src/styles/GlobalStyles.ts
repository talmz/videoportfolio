import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #0a0a0a;
    --secondary-color: #f2f2f2;
    --accent-color: #3a3a3a;
    --text-color: #232323;
    --light-text: #f8f8f8;
    --background: #000000;
    --card-background: #121212;
    --transition: all 0.3s ease-in-out;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Assistant', 'Helvetica Neue', Arial, sans-serif;
    background-color: var(--background);
    color: var(--light-text);
    line-height: 1.6;
    letter-spacing: 0.3px;
    direction: rtl;
    text-align: right;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: var(--transition);
  }

  a:hover {
    opacity: 0.8;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
    font-family: 'Assistant', 'Helvetica Neue', Arial, sans-serif;
  }

  img {
    max-width: 100%;
    display: block;
  }

  ul, ol {
    list-style: none;
  }

  h1, h2, h3, h4, h5, h6 {
    line-height: 1.2;
    font-weight: 500;
    letter-spacing: 0.5px;
  }

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
    text-align: center;
  }
`;

export default GlobalStyles;