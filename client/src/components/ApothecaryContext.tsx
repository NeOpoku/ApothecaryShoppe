// src/contexts/ApothecaryContext.tsx
import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { Herb, ApothecaryState } from '../types';
import { useAuth } from './AuthContext';

// Define action types
type ApothecaryAction =
  | { type: 'LOAD_SAVED_ITEMS_START' }
  | { type: 'LOAD_SAVED_ITEMS_SUCCESS'; payload: { herbs: Herb[]; } }
  | { type: 'LOAD_SAVED_ITEMS_FAILURE'; payload: string }
  | { type: 'SAVE_HERB'; payload: Herb }
  | { type: 'DELETE_HERB'; payload: string }
  | { type: 'CLEAR_ALL' };

// Define context type
interface ApothecaryContextType {
  state: ApothecaryState;
  saveHerb: (herb: Herb) => void;
  deleteHerb: (herbId: string) => void;
  clearAll: () => void;
}

// Create the context
const ApothecaryContext = createContext<ApothecaryContextType | undefined>(undefined);

// Initial state
const initialState: ApothecaryState = {
  savedHerbs: [],
  isLoading: false,
  error: null,
};

// Reducer function
const apothecaryReducer = (state: ApothecaryState, action: ApothecaryAction): ApothecaryState => {
  switch (action.type) {
    case 'LOAD_SAVED_ITEMS_START':
      return { ...state, isLoading: true, error: null };
    case 'LOAD_SAVED_ITEMS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        savedHerbs: action.payload.herbs,
        error: null,
      };
    case 'LOAD_SAVED_ITEMS_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'SAVE_HERB':
      // Avoid duplicates
      if (state.savedHerbs.some(herb => herb.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        savedHerbs: [...state.savedHerbs, action.payload],
      };
    case 'DELETE_HERB':
      return {
        ...state,
        savedHerbs: state.savedHerbs.filter(herb => herb.id !== action.payload),
      };
    case 'CLEAR_ALL':
      return {
        ...state,
        savedHerbs: [],

      };
    default:
      return state;
  }
};

// Create provider component
export const ApothecaryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(apothecaryReducer, initialState);
  const { state: authState } = useAuth();
  
  // Load saved items when user authenticates
  useEffect(() => {
    if (authState.isAuthenticated && authState.user) {
      loadSavedItems(authState.user.id);
    } else {
      // Clear saved items when user logs out
      dispatch({ type: 'CLEAR_ALL' });
    }
  }, [authState.isAuthenticated, authState.user]);

  // Load saved items from localStorage
  const loadSavedItems = (userId: string) => {
    dispatch({ type: 'LOAD_SAVED_ITEMS_START' });
    try {
      const savedHerbs = JSON.parse(localStorage.getItem(`${userId}_herbs`) || '[]');
      
      dispatch({
        type: 'LOAD_SAVED_ITEMS_SUCCESS',
        payload: {
          herbs: savedHerbs,

        },
      });
    } catch (error) {
      dispatch({
        type: 'LOAD_SAVED_ITEMS_FAILURE',
        payload: 'Failed to load saved items',
      });
    }
  };

  // Save items to localStorage
  useEffect(() => {
    if (authState.isAuthenticated && authState.user) {
      localStorage.setItem(`${authState.user.id}_herbs`, JSON.stringify(state.savedHerbs));
    
    }
  }, [
    authState.isAuthenticated,
    authState.user,
    state.savedHerbs,
   
  ]);

  // Context functions
  const saveHerb = (herb: Herb) => {
    dispatch({ type: 'SAVE_HERB', payload: herb });
  };

  const deleteHerb = (herbId: string) => {
    dispatch({ type: 'DELETE_HERB', payload: herbId });
  };

  
  const clearAll = () => {
    dispatch({ type: 'CLEAR_ALL' });
  };

  return (
    <ApothecaryContext.Provider
      value={{
        state,
        saveHerb,
        deleteHerb,
        clearAll,
      }}
    >
      {children}
    </ApothecaryContext.Provider>
  );
};

// Custom hook to use the apothecary context
export const useApothecary = () => {
  const context = useContext(ApothecaryContext);
  if (context === undefined) {
    throw new Error('useApothecary must be used within an ApothecaryProvider');
  }
  return context;
};