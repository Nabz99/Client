import React from "react";
import { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import Header from "./../components/Header";
import { login } from '../api/auth';

const Login = () => {
  const history = useHistory(); // Access the history object

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await login(email, password);
      await localStorage.setItem('token', res.data.token);
      await localStorage.setItem('client', JSON.stringify(res.data.client));
      console.log(res.data.client);
      history.push('/');
      // Redirect or perform other actions upon successful login
    } catch (error) {
      console.error(error);
      // Display an error message to the user
      alert('Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        <form className="Login col-md-8 col-lg-4 col-11">
          <input type="email" placeholder="Email" onChange={(event) => setEmail(event.target.value.toLowerCase())} />
          <input type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
          <button type="button" onClick={handleLogin} disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>
          <p>
            <Link to={"/register"}>Create Account</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
