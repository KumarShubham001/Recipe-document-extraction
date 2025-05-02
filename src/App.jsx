import { Navigate, Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import { DocumentProvider } from './context/DocumentContext';
import { AuthProvider } from './context/AuthContext';
import './App.css';
import { useAuth } from './context/AuthContext';
import LoginPage from './components/LoginPage';

// other imports
import Tab1 from './components/Tab1';
import Tab2 from './components/Tab2';
import Tab3 from './components/Tab3';
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

const MainApp = () => {
  const { username } = useAuth();
  return (
    <div className="app">
      <h1>
        Recipe Document Extraction Agent
      </h1>
      <NavBar links={links} />
      <DocumentProvider>
        <main className='main'>
          <Routes>
            <Route path="/upload" element={<Tab1 username={username} />} />
            <Route path="/validation" element={<Tab2 />} />
            <Route path="/output" element={<Tab3 />} />
          </Routes>
        </main>
      </DocumentProvider>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <DocumentProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/app/*" element={<MainApp />} />
            <Route path='/*' element={<Navigate to="/" />} />
          </Routes>
        </DocumentProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
