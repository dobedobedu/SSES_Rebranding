// Simple localStorage-based voting system for browser
// Works without backend - data persists locally per browser

interface Vote {
  userId: string;
  segmentId: string;
  name: string;
  votedAt: Date;
}

const VOTES_KEY = 'sst_votes';
const USER_KEY = 'sst_user';

export function getVotes(): Vote[] {
  try {
    const data = localStorage.getItem(VOTES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveVote(vote: Vote): void {
  const votes = getVotes();
  const existingIndex = votes.findIndex(v => v.userId === vote.userId);
  
  if (existingIndex >= 0) {
    votes[existingIndex] = vote;
  } else {
    votes.push(vote);
  }
  
  localStorage.setItem(VOTES_KEY, JSON.stringify(votes));
}

export function getVoteByUserId(userId: string): Vote | undefined {
  const votes = getVotes();
  return votes.find(v => v.userId === userId);
}

export function getVoteResults(): { segmentId: string; count: number }[] {
  const votes = getVotes();
  const counts: Record<string, number> = {};
  
  votes.forEach(v => {
    counts[v.segmentId] = (counts[v.segmentId] || 0) + 1;
  });
  
  return Object.entries(counts).map(([segmentId, count]) => ({
    segmentId,
    count
  }));
}

export function generateUserId(): string {
  let userId = localStorage.getItem(USER_KEY);
  if (!userId) {
    userId = 'user_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    localStorage.setItem(USER_KEY, userId);
  }
  return userId;
}

export function saveUserName(name: string): void {
  localStorage.setItem('sst_user_name', name);
}

export function getUserName(): string | null {
  return localStorage.getItem('sst_user_name');
}

export function clearUser(): void {
  localStorage.removeItem('sst_user_name');
}
