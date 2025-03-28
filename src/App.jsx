import React from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home'
import Details from './components/Details';
import Create from './components/Create';
import Edit from './components/Edit';

function App() {
  const { search, pathname } = useLocation();
 
  return (
    <>
      <div className='w-screen h-screen  flex'>
        {(pathname!= '/' || search.length > 0) && (
          <Link to="/" className="text-red-300 absolute left-[17%] top-[5%]">Home</Link>
        )}
       <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Create" element={<Create/>}></Route>
        <Route path="/details/:id" element={<Details/>}></Route>
        <Route path="/edit/:id" element={<Edit/>}></Route>
       </Routes>
      </div>
    </>
  )
}

export default App



