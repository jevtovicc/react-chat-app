import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { store } from "./store/store";
import { Provider } from 'react-redux';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter >
  </StrictMode>,
  document.getElementById('root')
);