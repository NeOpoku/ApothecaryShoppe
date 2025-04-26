import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useAuth } from '../context/AuthContext';
import {useMutation} from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '..utils/auth';

export default function Login(props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN_USER);

    const handleSubmit = async(e) => {e.preventDefault();
        const { data } = await login({variables: { ...formState },
            });
            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        };
        return(

        )
    };

    return (
      <form onSubmit={handleSubmit }>
        <inputtype="email"
        placeholder="Email"
        value={formState.email}
        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
        />
        <input type="password"
        placeholder="Password"
        value={formState.password}
        onChange={(e) => setFormState({ ...formState, password: e.target.value })}
        />
        <button type="submit">Login</button>
        {error && <div>Login failed</div>}
        </form>
    );
}
