import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html {
    font-family: -apple-system, BlinkMacSystemFont, Roboto, Segoe UI, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 16px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }

  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-kerning: normal;
    -moz-font-feature-settings: "kern", "liga", "clig", "calt";
    -ms-font-feature-settings: "kern", "liga", "clig", "calt";
    -webkit-font-feature-settings: "kern", "liga", "clig", "calt";
    font-feature-settings: "kern", "liga", "clig", "calt";
  }

  :root {
    --main-border-color: #d4d4d4;
    --main-background: #fff;
    --footer-link-color: #757575;
    --footer-link-hover-color: #403d3d;
    --monospace: menlo, monaco, consolas, hack, monospace;
    --font-heading: -apple-system, BlinkMacSystemFont, Assistant, Roboto, Segoe UI, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    --font-sans: -apple-system, BlinkMacSystemFont, Roboto, Segoe UI, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    --card-border-radius: 4px;
    --hover-background: rgba(8, 58, 222, 0.04);
  }

  a {
    font-weight: 500;
    text-decoration: none;
    color: var(--primary-color);
    
    &:hover {
      text-decoration: underline;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-sans);
  }

  input, textarea {
    font: inherit;
  }

  *[data-focused="true"] {
    border: 1px solid #08f !important;
    box-shadow: 0px 0px 1px 3px #0088ff3b;
  }

  option {
    font-weight: normal;
    display: block;
    white-space: pre;
    min-height: 1.2em;
    padding: 0px 2px 1px;
  }
`

export default GlobalStyle
