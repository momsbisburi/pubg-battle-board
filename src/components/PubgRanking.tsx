import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import teamEyLogo from "@/assets/team-ey-logo.png";
import teamOneLogo from "@/assets/team-one-logo.png";
import teamXLogo from "@/assets/team-x-logo.png";
import team777Logo from "@/assets/team-777-logo.png";
import teamLstLogo from "@/assets/team-lst-logo.png";
import teamEueLogo from "@/assets/team-eue-logo.png";
import teamW7kLogo from "@/assets/team-w7k-logo.png";

// Mock logo mapping - you can update this with actual team logos
const TEAM_LOGOS: Record<string, string> = {
  "Team1": teamEyLogo,
  "Team2": teamOneLogo,
  "Team3": teamXLogo,
  "Team4": team777Logo,
  "Team5": teamLstLogo,
  "Team6": teamEueLogo,
  "Team7": teamW7kLogo,
};

// PUBG API Data Types
interface PubgPlayer {
  uId: number;
  playerName: string;
  teamId: number;
  teamName: string;
  bHasDied: boolean;
  liveState: number;
  killNum: number;
  health: number;
}

interface PubgTeam {
  teamId: number;
  teamName: string;
  killNum: number;
  liveMemberNum: number;
}

interface PubgData {
  TotalPlayerList: PubgPlayer[];
  TeamInfoList: PubgTeam[];
  GameStartTime: string;
  CurrentTime: string;
}

interface Team {
  rank: number;
  name: string;
  logo: string;
  points: number;
  eliminations: number;
  players: Array<{
    id: string;
    name: string;
    status: 'alive' | 'dead' | 'missing';
  }>;
}

interface PlayerStatusIndicatorProps {
  status: 'alive' | 'dead' | 'missing';
}

const PlayerStatusIndicator = ({ status }: PlayerStatusIndicatorProps) => {
  const getStatusClasses = () => {
    switch (status) {
      case 'alive':
        return 'bg-gaming-alive animate-pulse-glow';
      case 'dead':
        return 'bg-gaming-dead';
      case 'missing':
        return 'bg-gaming-missing';
    }
  };

  return (
    <div 
      className={`w-3 h-6 rounded-full ${getStatusClasses()} transition-all duration-300`}
      aria-label={`Player ${status}`}
    />
  );
};

// Function to fetch data from Google Sheets
const fetchPubgData = async (): Promise<PubgData | null> => {
  try {
    // You'll need to replace this with your actual Google Sheets API endpoint
    // For now, return sample data based on your provided structure
    const sampleData: PubgData = {
      TotalPlayerList: [
        {
          uId: 5745274827,
          playerName: "AnhenKulhi",
          teamId: 1,
          teamName: "Team1",
          bHasDied: false,
          liveState: 2,
          killNum: 0,
          health: 100
        },
        {
          uId: 5280194007,
          playerName: "COMMANDOngb",
          teamId: 1,
          teamName: "Team1",
          bHasDied: false,
          liveState: 2,
          killNum: 0,
          health: 100
        },
        {
          uId: 51020878340,
          playerName: "666・DeadNERD",
          teamId: 2,
          teamName: "Team2",
          bHasDied: false,
          liveState: 2,
          killNum: 0,
          health: 100
        }
      ],
      TeamInfoList: [
        {
          teamId: 1,
          teamName: "Team1",
          killNum: 0,
          liveMemberNum: 2
        },
        {
          teamId: 2,
          teamName: "Team2",
          killNum: 0,
          liveMemberNum: 1
        }
      ],
      GameStartTime: "1757443714",
      CurrentTime: "1757443792"
    };
    
    return sampleData;
  } catch (error) {
    console.error('Error fetching PUBG data:', error);
    return null;
  }
};

// Function to process PUBG data into teams
const processPubgData = (data: PubgData): Team[] => {
  const teams: Team[] = [];
  
  data.TeamInfoList.forEach((teamInfo, index) => {
    const teamPlayers = data.TotalPlayerList.filter(player => player.teamId === teamInfo.teamId);
    
    const players = teamPlayers.map(player => ({
      id: player.uId.toString(),
      name: player.playerName,
      status: (player.bHasDied ? 'dead' : (player.liveState === 2 ? 'alive' : 'missing')) as 'alive' | 'dead' | 'missing'
    }));
    
    // Calculate points (you can adjust this formula based on your scoring system)
    const points = (teamInfo.killNum * 2) + (teamInfo.liveMemberNum * 5) + Math.max(0, 10 - index);
    
    teams.push({
      rank: index + 1,
      name: teamInfo.teamName,
      logo: TEAM_LOGOS[teamInfo.teamName] || teamEyLogo,
      points: points,
      eliminations: teamInfo.killNum,
      players: players
    });
  });
  
  // Sort teams by points (descending)
  teams.sort((a, b) => b.points - a.points);
  
  // Update ranks after sorting
  teams.forEach((team, index) => {
    team.rank = index + 1;
  });
  
  return teams;
};

const PubgRanking = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const data = await fetchPubgData();
      if (data) {
        const processedTeams = processPubgData(data);
        setTeams(processedTeams);
      }
      setIsLoading(false);
    };

    loadData();
    
    // Refresh data every 5 seconds to match your Google Sheets update frequency
    const interval = setInterval(loadData, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const getRankStyle = (rank: number) => {
    if (rank === 1) return "text-gaming-gold font-bold";
    if (rank === 2) return "text-gaming-silver font-bold";
    if (rank === 3) return "text-gaming-bronze font-bold";
    return "text-foreground font-bold";
  };

  if (isLoading && teams.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-foreground">Loading live data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Streaming Widget Header */}
        <div className="text-center mb-6 animate-fade-in">
          <h1 className="text-5xl font-black text-primary mb-3 tracking-widest drop-shadow-lg">
            LIVE RANKING
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-gaming-alive mx-auto rounded-full animate-pulse-glow"></div>
        </div>

        {/* Compact Streaming Widget */}
        <div className="bg-card/95 backdrop-blur-md border border-primary/30 rounded-2xl shadow-2xl overflow-hidden">
          {/* Widget Header - Removed ALIVE column */}
          <div className="bg-gradient-to-r from-primary/20 to-gaming-alive/20 p-4 border-b border-primary/20">
            <div className="grid grid-cols-5 gap-3 text-center">
              <div className="text-sm font-black text-foreground">RANK</div>
              <div className="text-sm font-black text-foreground">TEAM</div>
              <div className="text-sm font-black text-foreground">PTS</div>
              <div className="text-sm font-black text-foreground">STATUS</div>
              <div className="text-sm font-black text-foreground">ELIMS</div>
            </div>
          </div>

          {/* Team Rows - Compact for Streaming */}
          <div className="max-h-96 overflow-y-auto">
            {teams.map((team, index) => (
              <div 
                key={team.name}
                className={`grid grid-cols-5 gap-3 p-3 border-b border-primary/10 hover:bg-primary/5 transition-all duration-300 animate-slide-in ${
                  index % 2 === 0 ? 'bg-muted/10' : 'bg-transparent'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Rank */}
                <div className="flex items-center justify-center">
                  <span className={`text-2xl font-black ${getRankStyle(team.rank)}`}>
                    #{team.rank}
                  </span>
                </div>

                {/* Team - More Compact */}
                <div className="flex items-center gap-2">
                  <img 
                    src={team.logo} 
                    alt={`${team.name} logo`}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/30 transition-transform hover:scale-110"
                  />
                  <span className="text-lg font-bold text-foreground tracking-wide">
                    {team.name}
                  </span>
                </div>

                {/* Points */}
                <div className="flex items-center justify-center">
                  <div className="bg-primary/20 px-3 py-1 rounded-full border border-primary/30">
                    <span className="text-lg font-bold text-primary">
                      {team.points}
                    </span>
                  </div>
                </div>

                {/* Player Status Capsules */}
                <div className="flex items-center justify-center gap-1">
                  {team.players.map((player, idx) => (
                    <PlayerStatusIndicator 
                      key={player.id} 
                      status={player.status} 
                    />
                  ))}
                </div>

                {/* Eliminations */}
                <div className="flex items-center justify-center">
                  <span className="text-xl font-bold text-gaming-dead">
                    {team.eliminations}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Streaming Widget Footer */}
          <div className="bg-gradient-to-r from-primary/10 to-gaming-alive/10 p-3">
            <div className="flex justify-center gap-6 text-xs">
              <div className="flex items-center gap-1">
                <PlayerStatusIndicator status="alive" />
                <span className="text-muted-foreground font-medium">ALIVE</span>
              </div>
              <div className="flex items-center gap-1">
                <PlayerStatusIndicator status="dead" />
                <span className="text-muted-foreground font-medium">ELIMINATED</span>
              </div>
              <div className="flex items-center gap-1">
                <PlayerStatusIndicator status="missing" />
                <span className="text-muted-foreground font-medium">MISSING</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Indicator */}
        <div className="mt-4 flex justify-center">
          <div className="flex items-center gap-2 bg-gaming-dead/20 px-4 py-2 rounded-full border border-gaming-dead/30">
            <div className="w-2 h-2 bg-gaming-dead rounded-full animate-pulse-glow"></div>
            <span className="text-sm font-bold text-gaming-dead">LIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PubgRanking;