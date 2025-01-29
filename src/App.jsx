import { BrowserRouter as Router, Route, Routes } from 'react-router';
import Preregister from './Pages/Preregister';
import Guide from './Pages/Guide';
import Ikigai from './Pages/Ikigai';
import Notion from './Pages/Notion';
import UniResearch from './Pages/UniResearch';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Preregister />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/ikigai" element={<Ikigai />} />
        <Route path="/notion" element={<Notion />} />
        <Route path="/uni-research" element={<UniResearch />} />
      </Routes>
    </Router>
  );
}

export default App;