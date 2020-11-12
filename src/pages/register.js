import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import Layout from '../components/Layout'
import { navigate } from '@reach/router'
import { Link } from 'gatsby';
import { API_URL } from '../utils/url';


const Register = () => {

  const [username, setUsername] = useState(''); // username
  const [email, setEmail] = useState(''); // email
  const [password, setPassword] = useState(''); // password
  const [confirm, setConfirm] = useState(''); // confirm password
  const [error, setError] = useState('');

  const { user, setUser } = useContext(UserContext);
  console.log("user:", user);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/auth/local/register`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          username,
          email,
          password
        })
      })
      const data = await response.json();
      console.log("data from register", data);

      if (password !== confirm) {
        setError("Confirmation password does not match");
        return;
      }
      if (data.message) {
        setError(data.message[0].messages[0].message);
        return;
      }
      setUser(null);
      console.log("after setUser", user);
      navigate('/welcome')

    } catch (error) {
      console.log("inside the register",error);
    }
  }
  return (
    <Layout>
      <section className="register-page">
        <div className="register" >
          <div className="register-form-box">
            <h3 className="title">Register</h3>

            <form onSubmit={handleSubmit} id="register" className="input-group">
              <input
                className="input-field"
                type="name"
                placeholder="Name"
                onChange={e => {
                  setError('');
                  setUsername(e.target.value);
                }
                }
                required
                minLength="1"
                maxLength="100"
              />
              <input
                className="input-field"
                type="email"
                placeholder="Email"
                onChange={e => {
                  setError('');
                  setEmail(e.target.value);
                }
                }
                required
                maxLength="100"
              />
              <input
                className="input-field"
                type="password"
                placeholder="Password"
                onChange={e => {
                  setError('');
                  setPassword(e.target.value)
                }
                }
                required
                minLength="6"
                maxLength="50"
              />
              <input
                className="input-field"
                type="password"
                placeholder="Confirm Password"
                onChange={e => {
                  setError('');
                  setConfirm(e.target.value)
                }
                }
                required
                minLength="6"
                maxLength="50"
              />
              <button type="submit" className="register-btn">Register</button>
            </form>
            {
              error && <p style={{ padding: "0.3rem", textAlign: "center", fontWeight: "bolder", color: "red" }}>{error}</p>
            }
            <div className="toLogin">
              Back to  <Link style={{ marginTop: "2rem", fontWeight: "bolder" }} to="./login" >Login</Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Register
