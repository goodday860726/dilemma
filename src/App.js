import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import Info from './pages/Info';
import NewDilemma from './pages/NewDilemma';
import Header from './pages/Header';
import Footer from './pages/Footer';
import Game from './pages/Game';
import Result from './pages/Result';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className='w-screen h-screen flex flex-col overflow-hidden justify-between'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path='/' element={<Main />}></Route>
          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/info' element={<Info />}></Route>
          <Route exact path='/newdilemma' element={<NewDilemma />}></Route>
          <Route exact path='/game/:gId' element={<Game />}></Route>
          <Route exact path='/result/:gId' element={<Result />}></Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
