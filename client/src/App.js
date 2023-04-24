import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Admin from './pages/Admin';
import Register from './pages/Register'
import Client from './pages/Client'
import UserDetails from './pages/UserDetails'


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Routes>
              <Route path='/' element={<Login />}/>
              <Route path='/login' element={<Login />}/>
              <Route path='/register' element={<Register />}/>
              <Route path='/admin' element={<Admin />}/>
              <Route path='/client/:id' element={<Client />}/>
              <Route path='/user/:id' element={<UserDetails />}/>

          </Routes>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
