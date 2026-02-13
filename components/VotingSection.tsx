import React, { useEffect, useState } from 'react';
import { Check, LogIn, LogOut, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useVoting } from '../hooks/useVoting';

const SEGMENTS = [
  { id: 'corp', label: 'Corporate Relocator', color: '#4a4a4a', description: 'Healthcare & manufacturing workers' },
  { id: 'life', label: 'Lifestyle Entrepreneur', color: '#00cc66', description: 'Remote tech workers & founders' },
  { id: 'pivot', label: 'IMG Switcher', color: '#2D8F6F', description: 'Academic/athletic transfers' },
  { id: 'bridge', label: 'Bridge Crosser', color: '#0066ff', description: 'K-8 to high school transitions' },
  { id: 'teen', label: 'Teen Advocate', color: '#9933ff', description: 'Student-influenced decisions' }
];

export const VotingSection: React.FC = () => {
  const { user, signInWithName, signOut, loading: authLoading, setAsAdmin, isAdmin } = useAuth();
  const { userVote, submitVote, deleteVote, fetchUserVote, voteResults, fetchVoteResults, loading: voteLoading, error } = useVoting();
  
  const [name, setName] = useState('');
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [justLoggedIn, setJustLoggedIn] = useState(false);

  // Fetch user's vote when logged in
  useEffect(() => {
    if (user && !justLoggedIn) {
      fetchUserVote(user.id);
    }
  }, [user, justLoggedIn, fetchUserVote]);

  // Fetch vote results if admin
  useEffect(() => {
    if (isAdmin) {
      fetchVoteResults();
    }
  }, [isAdmin, fetchVoteResults]);

  const handleVoteSubmit = async () => {
    if (!user || !selectedSegment) return;
    
    setSubmitError(null);
    const success = await submitVote(user.id, selectedSegment, user.name);
    
    if (!success) {
      setSubmitError(error || 'Failed to submit vote');
    }
  };

  const handleNameLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    
    try {
      await signInWithName(name, '', '');
      setJustLoggedIn(true);
      setShowLoginForm(false);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  if (authLoading) {
    return (
      <div className="border-2 border-[#0a0a0a] bg-white p-6">
        <div className="flex items-center justify-center py-8">
          <div className="font-mono text-[10px] text-[#8a8a8a]">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="border-2 border-[#0a0a0a] bg-white w-full">
        <div className="border-b border-[#0a0a0a] px-4 py-2 bg-[#0a0a0a]">
          <span className="font-mono text-[10px] text-white uppercase tracking-widest">
            Stakeholder Voting
          </span>
        </div>
        <div className="p-6">
          <p className="text-sm text-[#4a4a4a] mb-4">
            Enter your name to vote on priority segments. Your vote helps focus strategic efforts.
          </p>
          
          {!showLoginForm ? (
            <button
              onClick={() => setShowLoginForm(true)}
              className="w-full px-4 py-3 border-2 border-[#0a0a0a] font-mono text-xs uppercase tracking-wider hover:bg-[#f5f5f0] transition-all"
            >
              Enter Name to Vote
            </button>
          ) : (
            <form onSubmit={handleNameLogin} className="space-y-3">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border-2 border-[#0a0a0a] font-mono text-sm focus:outline-none focus:shadow-[2px_2px_0_#0a0a0a]"
                required
              />
              <button
                type="submit"
                className="w-full px-4 py-3 bg-[#2D8F6F] text-white border-2 border-[#2D8F6F] font-mono text-xs uppercase tracking-wider hover:bg-white hover:text-[#2D8F6F] transition-all"
              >
                Continue
              </button>
            </form>
          )}
          
          {submitError && (
            <div className="mt-4 p-3 bg-[#2D8F6F]/10 border border-[#2D8F6F] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#2D8F6F]" />
              <span className="text-sm text-[#2D8F6F]">{submitError}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="border-2 border-[#0a0a0a] bg-white w-full">
      <div className="border-b border-[#0a0a0a] px-4 py-2 bg-[#0a0a0a] flex items-center justify-between">
        <span className="font-mono text-[10px] text-white uppercase tracking-widest">
          Cast Your Vote
        </span>
        <button
          onClick={signOut}
          className="flex items-center gap-1 text-white hover:text-[#2D8F6F] transition-colors"
        >
          <LogOut className="w-3 h-3" />
          <span className="font-mono text-[10px] uppercase">Sign Out</span>
        </button>
      </div>
      
      <div className="p-6">
        <p className="text-sm text-[#4a4a4a] mb-4">
          Welcome, {user.user_metadata?.full_name || user.email}! Select your top priority segment:
        </p>
        
        <div className="space-y-2">
          {availableSegments.map((segment) => {
            const isSelected = selectedSegment === segment.id || userVote === segment.id;
            const hasVoted = userVote !== null;
            
            return (
              <button
                key={segment.id}
                onClick={() => !hasVoted && setSelectedSegment(segment.id)}
                disabled={hasVoted && !isSelected}
                className={`w-full text-left p-3 border-2 transition-all ${
                  isSelected
                    ? 'border-[#0a0a0a] bg-white'
                    : hasVoted
                    ? 'border-[#e5e5e0] bg-[#f5f5f0] opacity-50 cursor-not-allowed'
                    : 'border-[#e5e5e0] bg-[#f5f5f0] hover:border-[#0a0a0a]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 flex-shrink-0"
                    style={{ backgroundColor: segment.color }}
                  />
                  <div className="flex-1">
                    <div className="font-mono text-xs font-bold uppercase tracking-wider">
                      {segment.label}
                    </div>
                    <div className="font-mono text-[9px] text-[#8a8a8a]">
                      {segment.description}
                    </div>
                  </div>
                  {isSelected && (
                    <Check className="w-5 h-5 text-[#00cc66]" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
        
        {!userVote ? (
          <button
            onClick={handleVoteSubmit}
            disabled={!selectedSegment || voteLoading}
            className={`w-full mt-4 px-4 py-3 font-mono text-xs uppercase tracking-wider border-2 transition-all ${
              selectedSegment && !voteLoading
                ? 'bg-[#2D8F6F] text-white border-[#2D8F6F] hover:bg-white hover:text-[#2D8F6F]'
                : 'bg-[#e5e5e0] text-[#8a8a8a] border-[#e5e5e0] cursor-not-allowed'
            }`}
          >
            {voteLoading ? 'Submitting...' : 'Submit Vote'}
          </button>
        ) : (
          <div className="mt-4 p-3 bg-[#00cc66]/10 border border-[#00cc66]">
            <div className="flex items-center gap-2 text-[#00cc66]">
              <Check className="w-4 h-4" />
              <span className="font-mono text-xs font-bold uppercase">
                Vote Submitted Successfully
              </span>
            </div>
            <p className="text-sm text-[#4a4a4a] mt-2">
              You voted for: <strong>{SEGMENTS.find(s => s.id === userVote)?.label}</strong>
            </p>
            <button
              onClick={() => user && deleteVote(user.id)}
              className="mt-2 text-xs text-[#8a8a8a] hover:text-[#2D8F6F] underline"
            >
              Change Vote
            </button>
          </div>
        )}
        
        {submitError && (
          <div className="mt-4 p-3 bg-[#2D8F6F]/10 border border-[#2D8F6F] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#2D8F6F]" />
            <span className="text-sm text-[#2D8F6F]">{submitError}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VotingSection;
