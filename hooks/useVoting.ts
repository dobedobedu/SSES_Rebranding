import { useState, useCallback } from 'react';
import { getVoteResults, getVoteByUserId, saveVote } from '../lib/storage';

export type VoteResult = {
  segment_id: string;
  vote_count: number;
};

export function useVoting() {
  const [userVote, setUserVote] = useState<string | null>(null);
  const [voteResults, setVoteResults] = useState<VoteResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch vote results
  const fetchVoteResults = useCallback(() => {
    try {
      const results = getVoteResults();
      setVoteResults(results.map(r => ({
        segment_id: r.segmentId,
        vote_count: r.count
      })));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch vote results');
    }
  }, []);

  // Fetch user's current vote
  const fetchUserVote = useCallback((userId: string) => {
    try {
      const vote = getVoteByUserId(userId);
      setUserVote(vote?.segmentId || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user vote');
    }
  }, []);

  // Submit or update vote
  const submitVote = useCallback(async (userId: string, segmentId: string, name: string = '') => {
    try {
      setLoading(true);
      setError(null);
      
      saveVote({
        userId,
        segmentId,
        name,
        votedAt: new Date()
      });
      
      setUserVote(segmentId);
      fetchVoteResults();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit vote');
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchVoteResults]);

  // Delete vote - simplified for localStorage
  const deleteVote = useCallback(async (userId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // For localStorage, we just clear the user's vote
      saveVote({
        userId,
        segmentId: '',
        name: '',
        votedAt: new Date()
      });
      
      setUserVote(null);
      fetchVoteResults();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete vote');
      return false;
    }
  }, [fetchVoteResults]);

  return {
    userVote,
    voteResults,
    loading,
    error,
    fetchVoteResults,
    fetchUserVote,
    submitVote,
    deleteVote
  };
}
