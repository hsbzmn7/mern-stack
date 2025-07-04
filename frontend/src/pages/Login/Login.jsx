import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Invalid email format';
    if (!form.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setApiError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      setApiError('');
      
      const result = await login(form.email, form.password);
      
      if (result.success) {
        navigate('/products');
      } else {
        setApiError(result.error);
      }
      
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div style={{ maxWidth: 350, width: '100%', background: '#fff', borderRadius: 10, boxShadow: '0 2px 12px #0001', padding: 32 }}>
          <div className="text-center mb-3">
            <div style={{ fontWeight: 700, color: '#f26522', fontSize: 22, marginBottom: 4 }}>
              <span style={{ background: '#fff', borderRadius: '50%', padding: 6, border: '1px solid #eee', marginRight: 6, color: '#f26522' }}>P</span>
              Product Hunt
            </div>
          </div>
          <h4 className="text-center mb-4">Sign In</h4>
          
          {apiError && (
            <Alert variant="danger" className="mb-3">
              {apiError}
            </Alert>
          )}
          
          <Form onSubmit={handleSubmit} autoComplete="off">
            <Form.Group className="mb-2">
              <Form.Label className="mb-0">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="off"
                isInvalid={!!errors.email}
              />
              {errors.email && <div className="text-danger small">{errors.email}</div>}
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label className="mb-0">Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
                isInvalid={!!errors.password}
              />
              {errors.password && <div className="text-danger small">{errors.password}</div>}
            </Form.Group>
            
            <Button 
              type="submit" 
              className="w-100 mb-3" 
              style={{ background: '#006eff', border: 'none' }}
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
            
            <div className="text-center">
              <small>
                Don't have an account?{' '}
                <Link to="/register" style={{ color: '#006eff', textDecoration: 'none' }}>
                  Sign up here
                </Link>
              </small>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Login; 