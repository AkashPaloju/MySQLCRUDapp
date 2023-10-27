
import './App.css';
import { BrowserRouter, Routes , Route} from "react-router-dom"
import Add from './pages/Add';
import Update from './pages/Update';
import Books from './pages/Books';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/books" element={<Books />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
