import React, { useEffect } from 'react';
import { Trophy, Users } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useVoting } from '../hooks/useVoting';

const SEGMENTS = [
  { id: 'corp', label: 'Corporate Relocator', color: '#4a4a4a' },
  { id: 'life', label: 'Lifestyle Entrepreneur', color: '#00cc66' },
  { id: 'pivot', label: 'IMG Switcher', color: '#2D8F6F' },
  { id: 'bridge', label: 'Bridge Crosser', color: '#0066ff' },
  { id: 'teen', label: 'Teen Advocate', color: '#9933ff' }
];

export const VotingResults: React.FC = () => {
  const { isAdmin } = useAuth();
  const { voteResults, fetchVoteResults, loading } = useVoting();

  useEffect(() => {
    if (isAdmin) {
      fetchVoteResults();
      // Refresh every 30 seconds
      const interval = setInterval(fetchVoteResults, 30000);
      return () => clearInterval(interval);
    }
  }, [isAdmin, fetchVoteResults]);

  if (!isAdmin) return null;

  const totalVotes = voteResults.reduce((sum, r) => sum + r.vote_count, 0);
  const maxVotes = Math.max(...voteResults.map(r => r.vote_count), 0);

  return (
    <div className="border-2 border-[#0a0a0a] bg-white mb-6">
      <div className="border-b border-[#0a0a0a] px-4 py-2 bg-[#0a0a0a] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-[#2D8F6F]" />
          <span className="font-mono text-[10px] text-white uppercase tracking-widest">
            Admin: Voting Results
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-3 h-3 text-[#8a8a8a]" />
          <span className="font-mono text-[10px] text-[#8a8a8a]">
            {totalVotes} votes cast
          </span>
        </div>
      </div>
      
      <div className="p-4">
        {loading ? (
          <div className="text-center py-4">
            <span className="font-mono text-[10px] text-[#8a8a8a]">Loading results...</span>
          </div>
        ) : voteResults.length === 0 ? (
          <div className="text-center py-4">
            <span className="font-mono text-[10px] text-[#8a8a8a]">No votes yet</span>
          </div>
        ) : (
          <div className="space-y-3">
            {voteResults.map((result, index) => {
              const segment = SEGMENTS.find(s => s.id === result.segment_id);
              const percentage = totalVotes > 0 ? Math.round((result.vote_count / totalVotes) * 100) : 0;
              const isWinner = result.vote_count === maxVotes && maxVotes > 0;
              
              return (
                <div key={result.segment_id} className="relative">
                  <div className="flex items-center gap-3 mb-1">
                    <div
                      className="w-4 h-4 flex-shrink-0"
                      style={{ backgroundColor: segment?.color || '#0a0a0a' }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold uppercase">
                          {segment?.label || result.segment_id}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-bold">
                            {result.vote_count}
                          </span>
                          <span className="font-mono text-[10px] text-[#8a8a8a]">
                            ({percentage}%)
                          </span>
                          {isWinner && (
                            <Trophy className="w-4 h-4 text-[#2D8F6F]" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-2 bg-[#f5f5f0] border border-[#0a0a0a]">
                    <div
                      className="h-full transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: segment?.color || '#0a0a0a'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default VotingResults;
