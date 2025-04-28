import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { DocumentProvider } from './context/DocumentContext';
import './App.css';

// other imports
import Tab1 from './components/Tab1/index';
import Tab2 from './components/Tab2/index';
import Tab3 from './components/Tab3/index';
import NavBar from './components/ui/nav';

const links = [
  {
    path: '/upload',
    label: 'Upload'
  },
  {
    path: '/validation',
    label: 'Validation'
  },
  {
    path: '/output',
    label: 'Output tables'
  }
]

function App() {
  return (
    <Router>
      <div className="app">
        <h1>
          Recipe Document Extraction Agent
        </h1>
        <NavBar links={links} />
        <DocumentProvider>
          <main className='main'>
            <Routes>
              <Route path='/' element={<Navigate to="/upload" />} />
              <Route path="/upload" element={<Tab1 />} />
              <Route path="/validation" element={<Tab2 />} />
              <Route path="/output" element={<Tab3 />} />
            </Routes>
          </main>
        </DocumentProvider>
      </div>
    </Router>
  );
}

export default App;
