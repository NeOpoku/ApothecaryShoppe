// src/contexts/SearchContext.tsx
import React, { createContext, useReducer, useContext } from 'react';
import { Herb, Ailment, SearchState, Remedy } from '../types';
import { getHerbalRecommendations, searchHerbs, searchRemedies } from '../api/openaiService';

// Define action types
type SearchAction =
  | { type: 'SEARCH_START'; payload: string }
  | { type: 'SEARCH_SUCCESS'; payload: { herbs: Herb[]; remedies: Remedy[] } }
  | { type: 'SEARCH_FAILURE'; payload: string }
  | { type: 'AILMENT_SEARCH_START'; payload: string }
  | { type: 'AILMENT_SEARCH_SUCCESS'; payload: Ailment }
  | { type: 'AILMENT_SEARCH_FAILURE'; payload: string }
  | { type: 'CLEAR_SEARCH' };

// Define context type
interface SearchContextType {
  state: SearchState;
  searchHerbsAndRemedies: (query: string) => Promise<void>;
  searchByAilment: (ailment: string) => Promise<void>;
  clearSearch: () => void;
}

// Create the context
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Initial state
const initialState: SearchState = {
  query: '',
  results: {
    herbs: [],
  },
  ailmentResult: null,
  isLoading: false,
  error: null,
};

// Reducer function
const searchReducer = (state: SearchState, action: SearchAction): SearchState => {
  switch (action.type) {
    case 'SEARCH_START':
    case 'AILMENT_SEARCH_START':
      return {
        ...state,
        query: action.payload,
        isLoading: true,
        error: null,
      };
    case 'SEARCH_SUCCESS':
      return {
        ...state,
        results: action.payload,
        isLoading: false,
        error: null,
      };
    case 'AILMENT_SEARCH_SUCCESS':
      return {
        ...state,
        ailmentResult: action.payload,
        isLoading: false,
        error: null,
      };
    case 'SEARCH_FAILURE':
    case 'AILMENT_SEARCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'CLEAR_SEARCH':
      return {
        ...state,
        query: '',
        results: {
          herbs: [],
        },
        ailmentResult: null,
        error: null,
      };
    default:
      return state;
  }
};

// Create provider component
export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  // Search for herbs and remedies
  const searchHerbsAndRemedies = async (query: string) => {
    dispatch({ type: 'SEARCH_START', payload: query });
    try {
      // Call search service
      const [herbs, remedies] = await Promise.all([
        searchHerbs(query),
        searchRemedies(query),
      ]);
      
      dispatch({
        type: 'SEARCH_SUCCESS',
        payload: { herbs, remedies },
      });
    } catch (error) {
      dispatch({
        type: 'SEARCH_FAILURE',
        payload: 'Failed to search for herbs and remedies',
      });
    }
  };

  // Search by ailment
  const searchByAilment = async (ailment: string) => {
    dispatch({ type: 'AILMENT_SEARCH_START', payload: ailment });
    try {
      // Call OpenAI service (or mock)
      const result = await getHerbalRecommendations(ailment);
      
      dispatch({
        type: 'AILMENT_SEARCH_SUCCESS',
        payload: result,
      });
    } catch (error) {
      dispatch({
        type: 'AILMENT_SEARCH_FAILURE',
        payload: 'Failed to get herbal recommendations',
      });
    }
  };

  // Clear search results
  const clearSearch = () => {
    dispatch({ type: 'CLEAR_SEARCH' });
  };

  return (
    <SearchContext.Provider
      value={{
        state,
        searchHerbsAndRemedies,
        searchByAilment,
        clearSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook to use the search context
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};