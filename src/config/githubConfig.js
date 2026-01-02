// src/config/githubConfig.js

export const GITHUB_CONFIG = {
  // Add your GitHub username here
  USERNAME: 'your-github-username',
  
  // Optional: Add a GitHub Personal Access Token for higher rate limits
  // Create one at: https://github.com/settings/tokens
  // Store it in .env file as REACT_APP_GITHUB_TOKEN
  TOKEN: process.env.REACT_APP_GITHUB_TOKEN,
  
  // API endpoints
  ENDPOINTS: {
    USER: (username) => `https://api.github.com/users/${username}`,
    EVENTS: (username) => `https://api.github.com/users/${username}/events/public`,
    REPOS: (username) => `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
    ACHIEVEMENTS: (username) => `https://api.github.com/users/${username}/achievements`,
  },
  
  // Contribution graph colors (matches GitHub's color scheme)
  CONTRIBUTION_COLORS: {
    0: '#161b22',  // No contributions
    1: '#0e4429',  // 1-9 contributions
    2: '#006d32',  // 10-19 contributions
    3: '#26a641',  // 20-29 contributions
    4: '#39d353',  // 30+ contributions
  },
  
  // Animation settings
  ANIMATION: {
    STAGGER_DELAY: 0.1,
    GRAPH_TRANSITION: { duration: 0.5, type: 'spring' },
    HOVER_SCALE: 1.05,
  }
};

// Achievement mapping for icons
export const ACHIEVEMENT_ICONS = {
  'Pull Shark': 'GitPullRequest',
  'Galaxy Brain': 'Sparkles',
  'Pair Extraordinaire': 'Users',
  'Quickdraw': 'Zap',
  'Arctic Code Vault': 'Lock',
  'YOLO': 'Zap',
  'Starstruck': 'Star',
  'Heart On Your Sleeve': 'Heart',
};