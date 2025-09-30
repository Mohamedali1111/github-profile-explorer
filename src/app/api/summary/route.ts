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

// Mock AI summary function (replace with actual OpenAI API call)
async function generateAISummary(data: SummaryRequest): Promise<string> {
  const { username, repos, profile } = data;
  
  // Analyze repository data
  const languages = repos
    .map(r => r.language)
    .filter(Boolean)
    .reduce((acc: Record<string, number>, lang) => {
      acc[lang!] = (acc[lang!] || 0) + 1;
      return acc;
    }, {});

  const topLanguages = Object.entries(languages)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([lang]) => lang);

  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const avgStarsPerRepo = totalStars / Math.max(repos.length, 1);
  const mostStarredRepo = repos.reduce((max, r) => 
    r.stargazers_count > max.stargazers_count ? r : max, repos[0] || { stargazers_count: 0, name: '' }
  );

  const accountAge = Math.floor((Date.now() - new Date(profile.created_at).getTime()) / (1000 * 60 * 60 * 24 * 365));
  
  // Generate summary
  const summary = `**${username}** is a ${profile.name ? `developer named ${profile.name}` : 'GitHub user'} with ${profile.public_repos} public repositories and ${profile.followers} followers.

**Technical Focus:** ${topLanguages.length > 0 ? `Primarily works with ${topLanguages.join(', ')}` : 'Diverse technology stack'}. 

**Repository Activity:** ${repos.length > 0 ? `Most active in "${mostStarredRepo.name}" (${mostStarredRepo.stargazers_count} stars)` : 'No recent repository activity'}. ${totalStars > 0 ? `Total of ${totalStars} stars across all repositories (avg ${avgStarsPerRepo.toFixed(1)} per repo).` : ''}

**Profile Insights:** ${profile.bio ? `Bio: "${profile.bio}"` : 'No bio provided'}. Account created ${accountAge} year${accountAge !== 1 ? 's' : ''} ago, showing ${accountAge > 5 ? 'long-term' : accountAge > 2 ? 'established' : 'recent'} GitHub presence.

**Community Engagement:** ${profile.followers > 1000 ? 'High' : profile.followers > 100 ? 'Moderate' : 'Growing'} follower base with ${profile.following} following, indicating ${profile.followers > profile.following ? 'a content creator/contributor' : 'an active community participant'}.`;

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
