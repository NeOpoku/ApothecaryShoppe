import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../utils/mutations';
import Auth from '../utils/auth';

export default function Register() {
const [formState, setFormState] = useState({ email: '', password: '' });
const [register] = useMutation(REGISTER_USER);

const handleSubmit = async (e) => {
e.preventDefault();
const { data } = await register({ variables: { ...formState } });
Auth.login(data.register.token);
};

return (
<form onSubmit={handleSubmit}>
<input
type="email"
placeholder="Email"
value={formState.email}
onChange={(e) => setFormState({ ...formState, email: e.target.value })}
/>
<input
type="password"
placeholder="Password"
value={formState.password}
onChange={(e) => setFormState({ ...formState, password: e.target.value })}
/>
<button type="submit">Register</button>
</form>
);
}
