// src/types/User.ts
export interface User {
    id: string;
    email: string;
    displayName: string;
  }
  
  // src/types/Herb.ts
  export interface Herb {
    id: string;
    name: string;
    scientificName: string;
    description: string;
    uses: string[];
    benefits: string[];
    imageUrl: string;
  }
  
  // src/types/Ailment.ts
  export interface Ailment {
    name: string;
    description: string;
    recommendedHerbs: Herb[];
  }
  
  // src/types/AuthState.ts
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
  }
  
  // src/types/ApothecaryState.ts
  export interface ApothecaryState {
    savedHerbs: Herb[];
    isLoading: boolean;
    error: string | null;
  }
  
  // src/types/SearchState.ts
  export interface SearchState {
    query: string;
    results: {
      herbs: Herb[];
    };
    ailmentResult: Ailment | null;
    isLoading: boolean;
    error: string | null;
  }
  export interface Remedy {
    id: string;
    title: string;
    description: string;
    ailment: string;
    herbs: Herb[];
    instructions: string;
    imageUrl?: string;
  }