// src/contexts/AuthContext.tsx
import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { User, AuthState } from '../types';

// Define action types
type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'SIGNUP_START' }
  | { type: 'SIGNUP_SUCCESS'; payload: User }
  | { type: 'SIGNUP_FAILURE'; payload: string }
  | { type: 'LOGOUT' };

// Define context type
interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Reducer function
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
    case 'SIGNUP_START':
      return { ...state, isLoading: true, error: null };
    case 'LOGIN_SUCCESS':
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case 'LOGIN_FAILURE':
    case 'SIGNUP_FAILURE':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

// Create provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for saved user in localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    }
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock user data (in a real app, this would come from your API)
      const user: User = {
          id: '1',
          email,
          displayName: ''
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid email or password' });
    }
  };

  // Sign up function
  const signUp = async (email: string, password: string, displayName: string) => {
    dispatch({ type: 'SIGNUP_START' });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock user creation (in a real app, this would be your API registration)
      const user: User = {
          id: Date.now().toString(),
          email,
          displayName: ''
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: 'SIGNUP_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'SIGNUP_FAILURE', payload: 'Failed to create account' });
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ state, login, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};