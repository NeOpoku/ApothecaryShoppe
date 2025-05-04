import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ApolloProvider from "../utils/ApolloProvider";
import Home from "./pages/Home";
import { useState } from 'react';
import SignupForm from './SignupForm';
import Login from './Login';
import Register from "./pages/Register";
import Navbar from "./components/navbar";
import SavedSearches from "./pages/SavedSearches";
import { AuthProvider } from './context/AuthContext';
import SearchHistory from './pages/MyApothecary';
import RequireAuth from './utils/RequireAuth';

import "./App.css";

function App() {
    const [showLogin, setShowLogin] = useState(true);

  return (
    <ApolloProvider>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/saved" element={<SavedSearches />} />
            <Route path="search" element={<HerbSearch/>}/>
            <Route path="/recipes" element={<BrowseRecipies/>}/>
            <Route path="/about" element={<AboutPage/>}/>
            <Route path="/history" element={<>}/>


          </Routes>
          {Auth.loggedIn() && GET_HERBS.length > 0 && (
            <button
              onClick={() =>
                SavedSearches({
                  variables: {
                    query,
                    results: GET_HERBS.map((h) => h._id),
                  },
                })
              }
            >
              Save This Search
            </button>
          )}
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}
export default App;
// This code sets up a basic React application with Apollo Client for GraphQL queries and mutations. It includes routes for the home page, login, and registration, as well as a navigation bar. The application is styled with CSS and uses React Router for client-side routing.

