/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, 
  Star, 
  GitFork, 
  Users, 
  Calendar, 
  Trophy, 
//   TrendingUp, 
  Sparkles,
  Zap,
  Lock,
  Globe,
  GitPullRequest,
  AlertCircle
} from 'lucide-react';
import GithubContributions from './GithubContributions';

// Types for GitHub API data
interface GitHubProfile {
  name: string;
  login: string;
  avatar_url: string;
  bio?: string;
  location?: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

interface GitHubRepo {
  id: number;
  name: string;
  stargazers_count: number;
  forks_count: number;
  language?: string;
  description?: string;
  html_url: string;
}

interface GitHubAchievement {
  name: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface ContributionDay {
  date: Date;
  count: number;
  level: number;
}

interface GitHubHeroSectionProps {
  username: string;
  showAchievements?: boolean;
  showContributions?: boolean;
  showRepos?: boolean;
}

const GitHubHeroSection: React.FC<GitHubHeroSectionProps> = ({ username, showAchievements = true, showContributions = true, showRepos = true }) => {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [achievements, setAchievements] = useState<GitHubAchievement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRepo, setSelectedRepo] = useState<number | null>(null);
//   const [hoveredDate, setHoveredDate] = useState<ContributionDay | null>(null);

  // Animation variants
  // const containerVariants = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: {
  //       staggerChildren: 0.1,
  //       delayChildren: 0.3
  //     }
  //   }
  // };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    //   transition: { type: 'spring', stiffness: 100 }
    }
  };

//   const graphVariants = {
//     hidden: { scale: 0.8, opacity: 0 },
//     visible: {
//       scale: 1,
//       opacity: 1,
//       transition: { duration: 0.5 }
//     }
//   };

  // Fetch all GitHub data
  useEffect(() => {
    const fetchGitHubData = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = (import.meta.env.REACT_APP_GITHUB_TOKEN || import.meta.env.VITE_GITHUB_TOKEN) as string | undefined;
        const headers = token ? { Authorization: `token ${token}` } : {};
        const [profileRes, eventsRes, reposRes] = await Promise.all([
          axios.get(`https://api.github.com/users/${username}`, { headers }),
          axios.get(`https://api.github.com/users/${username}/events/public`, { headers }),
          axios.get(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, { headers })
        ]);
        setProfile(profileRes.data);
        setEvents(eventsRes.data);
        setRepos(reposRes.data.sort((a: GitHubRepo, b: GitHubRepo) => b.stargazers_count - a.stargazers_count).slice(0, 6));
        try {
        //   const achievementsRes = await axios.get(`https://api.github.com/users/${username}/achievements`, { headers });
        //   setAchievements(achievementsRes.data.achievements || []);
        } catch (error: any) {
            console.log(error)
          // Achievements endpoint not available, use mock
          setAchievements(getMockAchievements());
        }
      } catch (err: any) {
        setError(err?.response?.data?.message || 'Failed to load GitHub data');
        if (import .meta.env.NODE_ENV === 'development') {
          setProfile(getMockProfile(username));
          setRepos(getMockRepos());
          setAchievements(getMockAchievements());
        }
      } finally {
        setLoading(false);
      }
    };
    fetchGitHubData();
  }, [username]);

  // Process contribution data for the graph
  const { 
    // contributionGraph, 
    // totalContributions, 
    streak } = useMemo(() => {
    if (!events.length) return { contributionGraph: [] as ContributionDay[], totalContributions: 0, streak: 0 };
    const contributions: Record<string, number> = {};
    events.forEach((event: any) => {
      if (event.type === 'PushEvent') {
        const date = new Date(event.created_at).toDateString();
        contributions[date] = (contributions[date] || 0) + (event.payload.commits?.length || 0);
      }
    });
    const graph: ContributionDay[] = [];
    let currentStreak = 0;
    let maxStreak = 0;
    let total = 0;
    for (let i = 0; i < 90; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toDateString();
      const count = contributions[dateStr] || 0;
      total += count;
      if (count > 0) {
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
      graph.unshift({
        date: new Date(date),
        count,
        level: count === 0 ? 0 : Math.min(4, Math.ceil(count / 3))
      });
    }
    return {
      contributionGraph: graph,
      totalContributions: total,
      streak: maxStreak
    };
  }, [events]);

  // Mock data for development/fallback
  const getMockProfile = (username: string): GitHubProfile => ({
    name: 'John Doe',
    login: username,
    avatar_url: `https://avatars.githubusercontent.com/${username}`,
    bio: 'Full Stack Developer passionate about open source',
    location: 'San Francisco, CA',
    html_url: `https://github.com/${username}`,
    public_repos: 42,
    followers: 128,
    following: 56
  });

  const getMockRepos = (): GitHubRepo[] => [
    { id: 1, name: 'portfolio-website', stargazers_count: 45, forks_count: 12, language: 'TypeScript', description: 'My personal portfolio website', html_url: 'https://github.com/username/portfolio-website' },
    { id: 2, name: 'ai-chatbot', stargazers_count: 89, forks_count: 23, language: 'Python', description: 'An intelligent chatbot using GPT', html_url: 'https://github.com/username/ai-chatbot' },
    { id: 3, name: 'ecommerce-platform', stargazers_count: 67, forks_count: 18, language: 'JavaScript', description: 'Full-stack ecommerce solution', html_url: 'https://github.com/username/ecommerce-platform' }
  ];

  const getMockAchievements = (): GitHubAchievement[] => [
    { name: 'Pull Shark', description: '2 pull requests merged', icon: GitPullRequest },
    { name: 'Galaxy Brain', description: '2 accepted answers', icon: Sparkles },
    { name: 'Pair Extraordinaire', description: 'Pull request reviewed', icon: Users },
    { name: 'Quickdraw', description: 'Issue opened within 5 minutes', icon: Zap },
    { name: 'Arctic Code Vault', description: 'Code in GitHub Arctic Vault', icon: Lock }
  ];

  // Calculate additional stats
  const stats = useMemo(() => {
    if (!profile || !repos.length) return [];
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
    const languages: Record<string, number> = repos.reduce((acc, repo) => {
      if (repo.language) {
        acc[repo.language] = (acc[repo.language] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);
    const topLanguage = Object.entries(languages).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';
    return [
      { icon: Star, label: 'Total Stars', value: totalStars },
      { icon: GitFork, label: 'Total Forks', value: totalForks },
      { icon: Code, label: 'Top Language', value: topLanguage },
      { icon: Calendar, label: 'Current Streak', value: `${streak} days` },
    //   { icon: TrendingUp, label: 'Contributions', value: totalContributions },
      { icon: Trophy, label: 'Achievements', value: achievements.length }
    ];
  }, [profile, repos, streak, achievements]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-black to-gray-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-black to-gray-900">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-gray-800 p-8 rounded-2xl max-w-md text-center"
        >
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Error Loading Data</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <p className="text-sm text-gray-400">
            Check your username or try again later. Using mock data for {username}.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-900 text-white p-4 md:p-8">
      <motion.div
        className="max-w-7xl mx-auto"
      >
        {/* Profile Header */}
        <motion.div 
        // variants={itemVariants}
         className="flex flex-col lg:flex-row items-center gap-8 mb-12">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <img
              src={profile?.avatar_url}
              alt={profile?.name}
              className="w-48 h-48 rounded-full border-4 border-green-500 shadow-2xl shadow-green-500/20"
            />
          </motion.div>
          
          <div className="flex-1 text-center lg:text-left">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-2 bg-clip-text text-transparent bg-linear-to-r from-green-400 to-cyan-400"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {profile?.name || profile?.login}
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-300 mb-4"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {profile?.bio || 'Passionate about coding and open source'}
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap justify-center lg:justify-start gap-4 text-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                {profile?.location || 'Remote'}
              </span>
              <a 
                href={profile?.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
              >
                <Code className="w-5 h-5" />
                @{profile?.login}
              </a>
              <span className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                {profile?.followers} followers • {profile?.following} following
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
        //   variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
            //   variants={itemVariants}
              whileHover={{ y: -5, scale: 1.05 }}
              className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700"
            >
              <div className="flex items-center gap-3 mb-2">
                <stat.icon className="w-6 h-6 text-green-400" />
                <span className="text-gray-400 text-sm">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Contribution Graph */}
        {showContributions && (
          <motion.div 
            // variants={graphVariants}
            className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 mb-12"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Calendar className="w-6 h-6 text-green-400" />
                Contribution Activity
              </h2>
              {/* <span className="text-gray-400">
                Contributions for last 365 days
              </span> */}
            </div>
            
            <div className="flex flex-wrap justify-center gap-1">
                <GithubContributions/>
              {/* {contributionGraph.map((day, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  whileHover={{ scale: 1.2, zIndex: 10 }}
                  onHoverStart={() => setHoveredDate(day)}
                  onHoverEnd={() => setHoveredDate(null)}
                >
                  <div
                    className={`w-3 h-3 rounded-sm transition-all duration-200 ${
                      day.level === 0 ? 'bg-gray-900' :
                      day.level === 1 ? 'bg-green-900' :
                      day.level === 2 ? 'bg-green-700' :
                      day.level === 3 ? 'bg-green-500' : 'bg-green-300'
                    }`}
                  />
                  
                  <AnimatePresence>
                    {hoveredDate === day && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 rounded-lg whitespace-nowrap z-20"
                      >
                        <p className="text-sm font-semibold">
                          {day.count} contribution{day.count !== 1 ? 's' : ''}
                        </p>
                        <p className="text-xs text-gray-400">
                          {day.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
            
            <div className="flex justify-end items-center gap-4 mt-4 text-sm text-gray-400">
              <span>Less</span>
              {[0, 1, 2, 3, 4].map(level => (
                <div
                  key={level}
                  className={`w-3 h-3 rounded-sm ${
                    level === 0 ? 'bg-gray-900' :
                    level === 1 ? 'bg-green-900' :
                    level === 2 ? 'bg-green-700' :
                    level === 3 ? 'bg-green-500' : 'bg-green-300'
                  }`}
                />
              ))}
              <span>More</span> */}
            </div>
          </motion.div>
        )}

        {/* Achievements Section */}
        {showAchievements && achievements.length > 0 && (
          <motion.div 
        //   variants={itemVariants}
           className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Trophy className="w-6 h-6 text-yellow-500" />
              GitHub Achievements
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {achievements.slice(0, 5).map((achievement, index) => (
                <motion.div
                  key={achievement.name}
                //   variants={itemVariants}
                  custom={index}
                  whileHover={{ y: -8, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-linear-to-br from-gray-800 to-gray-900 p-4 rounded-xl border border-gray-700 text-center group"
                >
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-linear-to-br from-yellow-600/20 to-yellow-400/20 flex items-center justify-center">
                    {achievement.icon ? (
                      <achievement.icon className="w-8 h-8 text-yellow-500" />
                    ) : (
                      <Trophy className="w-8 h-8 text-yellow-500" />
                    )}
                  </div>
                  <h3 className="font-bold text-lg mb-1">{achievement.name}</h3>
                  <p className="text-sm text-gray-400">{achievement.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Top Repositories */}
        {showRepos && repos.length > 0 && (
          <motion.div 
        //   variants={itemVariants}
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Star className="w-6 h-6 text-yellow-500" />
              Top Projects
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {repos.map((repo, index) => (
                  <motion.a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={itemVariants}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onMouseEnter={() => setSelectedRepo(repo.id)}
                    onMouseLeave={() => setSelectedRepo(null)}
                    className="block bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 hover:border-green-500/50 transition-all duration-300 group relative overflow-hidden"
                  >
                    {/* Animated background effect */}
                    <motion.div
                      className="absolute inset-0 bg-linear-to-r from-green-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                      animate={{ x: selectedRepo === repo.id ? '0%' : '-100%' }}
                      transition={{ duration: 0.5 }}
                    />
                    
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold truncate">{repo.name}</h3>
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Star className="w-5 h-5 text-yellow-500" />
                        </motion.div>
                      </div>
                      
                      <p className="text-gray-300 mb-6 line-clamp-2">
                        {repo.description || 'No description provided'}
                      </p>
                      
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="flex items-center gap-1.5">
                          <Star className="w-4 h-4" />
                          {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <GitFork className="w-4 h-4" />
                          {repo.forks_count}
                        </span>
                        {repo.language && (
                          <span className="px-3 py-1 bg-gray-700/50 rounded-full text-xs">
                            {repo.language}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Floating Particles Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        {[...Array(20)].map((_, i) => {
          // SSR/Node: window is undefined
          const w = typeof window !== 'undefined' ? window.innerWidth : 1920;
          const h = typeof window !== 'undefined' ? window.innerHeight : 1080;
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-green-500/30 rounded-full"
              initial={{
                x: Math.random() * w,
                y: Math.random() * h,
              }}
              animate={{
                y: [null, Math.random() * -100],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};



export default GitHubHeroSection;