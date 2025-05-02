import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
//import { useAuth } from '../../context/AuthContext';

const SIGNUP = gql`
mutation Signup($email: String!, $password: String!) {
signup(email: $email, password: $password) {
token
user {
_id
email
}
}
}
`;

export default function Signup() {
const { login } = useAuth();
const [formState, setFormState] = useState({ email: '', password: '' });
const [signup, { error }] = useMutation(SIGNUP);

const handleSubmit = async (e) => {
e.preventDefault();
const { data } = await signup({ variables: formState });
if (data) {
login(data.signup.token, data.signup.user);
}
};

return (

//Sign Up

type="email"
placeholder="Email"
value={formState.email}
onChange={(e) => setFormState({ ...formState, email: e.target.value })}
required
/>

type="password"
placeholder="Password"
value={formState.password}
onChange={(e) => setFormState({ ...formState, password: e.target.value })}
required
/>
//Create Account
{error &&
Signup failed: {error.message}
}

);
}
