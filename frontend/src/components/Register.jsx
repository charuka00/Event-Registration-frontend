import { useState } from 'react';
import axios from 'axios';

const Register = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/users/register', { email, password });
      setMessage('Registration successful');
      onSuccess();
    } catch (err) {
      setMessage(err.response?.data.message || 'Error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
      <h2 className="text-xl mb-4">Register</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 mb-2 w-full" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 mb-2 w-full" required />
      <button className="bg-blue-500 text-white p-2 w-full">Register</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default Register;