import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const initialState = {
  fullname: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
};

const Register = () => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.fullname.trim()) newErrors.fullname = 'Fullname is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Invalid email format';
    if (!form.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\d{10,15}$/.test(form.phone)) newErrors.phone = 'Phone must be 10 to 15 digits';
    if (!form.password) newErrors.password = 'Password is required';
    else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!form.confirmPassword) newErrors.confirmPassword = 'Confirm your password';
    else if (form.confirmPassword !== form.password) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      // No backend, so just reset form
      setForm(initialState);
      alert('Registration successful!');
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
          <h4 className="text-center mb-4">Sign Up</h4>
          <Form onSubmit={handleSubmit} autoComplete="off">
            <Form.Group className="mb-2">
              <Form.Label className="mb-0">Fullname</Form.Label>
              <Form.Control
                type="text"
                name="fullname"
                value={form.fullname}
                onChange={handleChange}
                autoComplete="off"
              />
              {errors.fullname && <div className="text-danger small">{errors.fullname}</div>}
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="mb-0">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="off"
              />
              {errors.email && <div className="text-danger small">{errors.email}</div>}
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="mb-0">Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                autoComplete="off"
              />
              {errors.phone && <div className="text-danger small">{errors.phone}</div>}
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="mb-0">Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
              />
              {errors.password && <div className="text-danger small">{errors.password}</div>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="mb-0">Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
              />
              {errors.confirmPassword && <div className="text-danger small">{errors.confirmPassword}</div>}
            </Form.Group>
            <Button type="submit" className="w-100" style={{ background: '#006eff', border: 'none' }}>
              Sign Up
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Register; 