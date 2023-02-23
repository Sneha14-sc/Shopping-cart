import './App.css';
import { ShoppingCartProvider } from './components/CartContext';

function App() {

  return (
    <ShoppingCartProvider>
      {/**code inside shopping cart context */}
    </ShoppingCartProvider>
  );
}

export default App;
