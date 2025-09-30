import { NextRequest, NextResponse } from 'next/server';

interface SummaryRequest {
  username: string;
  repos: Array<{
    name: string;
    description: string | null;
    language: string | null;
    stargazers_count: number;
    created_at: string;
    updated_at: string;
  }>;
  profile: {
    name: string | null;
    bio: string | null;
    followers: number;
    following: number;
    public_repos: number;
    created_at: string;
  };
}

// Advanced AI summary function with comprehensive analysis
async function generateAISummary(data: SummaryRequest): Promise<string> {
  const { username, repos, profile } = data;
  
  // Advanced repository analysis
  const languages = repos
    .map(r => r.language)
    .filter(Boolean)
    .reduce((acc: Record<string, number>, lang) => {
      acc[lang!] = (acc[lang!] || 0) + 1;
      return acc;
    }, {});

  const topLanguages = Object.entries(languages)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([lang, count]) => ({ lang, count }));

  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const avgStarsPerRepo = totalStars / Math.max(repos.length, 1);
  const mostStarredRepo = repos.reduce((max, r) => 
    r.stargazers_count > max.stargazers_count ? r : max, repos[0] || { stargazers_count: 0, name: '' }
  );

  // Calculate activity metrics
  const now = new Date();
  const recentRepos = repos.filter(r => {
    const updated = new Date(r.updated_at);
    const daysDiff = (now.getTime() - updated.getTime()) / (1000 * 60 * 60 * 24);
    return daysDiff <= 90; // Last 3 months
  });

  const accountAge = Math.floor((Date.now() - new Date(profile.created_at).getTime()) / (1000 * 60 * 60 * 24 * 365));
  
  // Calculate developer type and expertise level
  const getDeveloperType = () => {
    if (totalStars > 10000) return 'highly influential';
    if (totalStars > 1000) return 'well-established';
    if (totalStars > 100) return 'emerging';
    return 'developing';
  };

  const getActivityLevel = () => {
    const recentCount = recentRepos.length;
    if (recentCount > 20) return 'extremely active';
    if (recentCount > 10) return 'very active';
    if (recentCount > 5) return 'moderately active';
    if (recentCount > 0) return 'occasionally active';
    return 'inactive';
  };

  const getTechStackInsight = () => {
    if (topLanguages.length === 0) return 'No primary language detected';
    if (topLanguages.length === 1) return `Specialized in ${topLanguages[0].lang}`;
    if (topLanguages[0].count > repos.length * 0.6) {
      return `Primarily focused on ${topLanguages[0].lang} with ${topLanguages.length - 1} other languages`;
    }
    return `Versatile developer working with ${topLanguages.slice(0, 3).map(t => t.lang).join(', ')}${topLanguages.length > 3 ? ` and ${topLanguages.length - 3} more` : ''}`;
  };

  const getCommunityInsight = () => {
    const followerRatio = profile.followers / Math.max(profile.following, 1);
    if (followerRatio > 10) return 'influential thought leader';
    if (followerRatio > 3) return 'respected community member';
    if (followerRatio > 1) return 'content creator';
    return 'active community participant';
  };

  const getRepoQualityInsight = () => {
    if (avgStarsPerRepo > 100) return 'creates highly valuable projects';
    if (avgStarsPerRepo > 20) return 'produces quality work';
    if (avgStarsPerRepo > 5) return 'develops useful projects';
    return 'builds experimental projects';
  };

  // Generate comprehensive AI summary
  const summary = `## 🤖 AI Profile Analysis: **${username}**

### 👤 **Developer Profile**
${profile.name ? `**Name:** ${profile.name}` : '**Username:** ' + username}
${profile.bio ? `**Bio:** "${profile.bio}"` : '**Bio:** No bio provided'}
**Account Age:** ${accountAge} year${accountAge !== 1 ? 's' : ''} (${accountAge > 5 ? 'veteran' : accountAge > 2 ? 'experienced' : 'newcomer'})

### 📊 **Technical Expertise**
**Primary Languages:** ${getTechStackInsight()}
${topLanguages.length > 0 ? `**Language Distribution:** ${topLanguages.map(t => `${t.lang} (${t.count} repos)`).join(', ')}` : ''}

### 🚀 **Project Portfolio**
**Total Repositories:** ${profile.public_repos}
**Total Stars:** ${totalStars.toLocaleString()}
**Average Stars/Repo:** ${avgStarsPerRepo.toFixed(1)}
**Most Popular Project:** "${mostStarredRepo.name}" (${mostStarredRepo.stargazers_count} ⭐)
**Project Quality:** ${getRepoQualityInsight()}

### 📈 **Activity & Engagement**
**Recent Activity:** ${getActivityLevel()} (${recentRepos.length} repos updated in last 3 months)
**Community Status:** ${getCommunityInsight()}
**Followers:** ${profile.followers.toLocaleString()} | **Following:** ${profile.following.toLocaleString()}
**Follower Ratio:** ${(profile.followers / Math.max(profile.following, 1)).toFixed(1)}:1

### 🎯 **AI Assessment**
This developer appears to be a **${getDeveloperType()}** contributor with a **${getActivityLevel()}** development pattern. Their ${topLanguages.length > 0 ? `focus on ${topLanguages[0].lang}` : 'diverse technical approach'} suggests ${topLanguages.length > 0 && topLanguages[0].count > repos.length * 0.4 ? 'specialized expertise' : 'versatile problem-solving skills'}. The ${totalStars > 1000 ? 'high' : totalStars > 100 ? 'moderate' : 'growing'} star count indicates ${totalStars > 1000 ? 'significant community impact' : totalStars > 100 ? 'notable contributions' : 'emerging potential'}.

${recentRepos.length > 10 ? '🔥 **Highly Active:** Recent commit activity shows strong ongoing engagement' : recentRepos.length > 0 ? '📝 **Active:** Shows consistent development activity' : '⏸️ **Inactive:** Limited recent activity detected'}${profile.followers > profile.following * 2 ? ' | 🌟 **Influencer:** Strong follower-to-following ratio suggests thought leadership' : ''}`;

  return summary;
}

export async function POST(request: NextRequest) {
  try {
    const data: SummaryRequest = await request.json();
    
    if (!data.username || !data.repos || !data.profile) {
      return NextResponse.json(
        { error: 'Missing required data' },
        { status: 400 }
      );
    }

    const summary = await generateAISummary(data);
    
    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Summary generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate summary' },
      { status: 500 }
    );
  }
}
