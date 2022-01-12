import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { store } from "./store/store";
import { Provider } from 'react-redux';
import { StrictMode } from 'react';

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);