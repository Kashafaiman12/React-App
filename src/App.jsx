import React, { useEffect, useState } from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Services from './components/Services';
import About from './components/About';
import Home from './components/Home';
import Contact from './components/Contact';

const App = () => {
  const data = { name: "", email: "", password: "" };
  const [inputData, setInputData] = useState(data)
  const [flag, setFlag] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    if (flag) {
      console.log("Registered")
    }
  }, [flag])

  function handleData(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault();
    const passwordRegex = /^(?=.*[!@#$%^&*()_+{}:;"',.<>/?]).{8,}$/;

    if (!inputData.name || !inputData.email || !inputData.password) {
      alert("All fields are mandatory")
    } else if (!passwordRegex.test(inputData.password)) {
      alert("Password must be at least 8 characters long and include a special character.")
    } else {
      setFlag(true)
      alert("You have successfully logged in!");
      navigate('/Home');
    }
  }

  const [White, setWhite] = useState(true);

  useEffect(() => {
    document.body.style.backgroundColor = White ? 'white' : 'rgb(32, 31, 31)';
    document.body.style.color = !White ? 'white' : 'rgb(32, 31, 31)';
  }, [White]);

  return (
    <>
      <nav>
        <li id="logo">REACT APP</li>
        <ul>
          <li><Link to='/Home'>Home</Link></li>
          <li><Link to='/About'>About</Link></li>
          <li><Link to='/Services'>Services</Link></li>
          <li><Link to='/Contact'>Contact Us</Link></li>
          <li onClick={() => setWhite(!White)}>Dark / Light Mode</li>
        </ul>
      </nav>

      <Routes>
        <Route path='/Home' element={<Home />} />
        <Route path='/About' element={<About />} />
        <Route path='/Services' element={<Services />} />
        <Route path='/Contact' element={<Contact />} />
      </Routes>

      <form className='container' onSubmit={handleSubmit}>
        <div className="header">
          <h1>Registration Form</h1>
        </div>
        <div>
          <input
            type="text"
            placeholder='Enter Your Name'
            name='name'
            value={inputData.name}
            onChange={handleData}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder='Enter Your Email'
            name='email'
            value={inputData.email}
            onChange={handleData}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder='Enter Your Password'
            name='password'
            value={inputData.password}
            onChange={handleData}
          />
        </div>
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </>
  )
}

export default App;
