import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const thing = 'hi im a thing';

const GithubContext = React.createContext();
// gives access to Provider and Consumer

// dont wrap using this directly - GithubContext.Provider
const GithubProvider = ({ children }) => {
  return (
    <GithubContext.Provider value={thing}>{children}</GithubContext.Provider>
  );
};

// useContext needs access to GithubContext;
// Need to use GithubProvider to wrap our app in it
// why we need BOTH
export { GithubProvider, GithubContext };
