
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { store, persistor } from '../redux/Stire'; // Correct path to Store.js
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
             <App />
    </PersistGate>
 
  </Provider >,
)
