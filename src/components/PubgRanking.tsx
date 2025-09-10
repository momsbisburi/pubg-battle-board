import { Card } from "@/components/ui/card";
import teamEyLogo from "@/assets/team-ey-logo.png";
import teamOneLogo from "@/assets/team-one-logo.png";
import teamXLogo from "@/assets/team-x-logo.png";
import team777Logo from "@/assets/team-777-logo.png";
import teamLstLogo from "@/assets/team-lst-logo.png";
import teamEueLogo from "@/assets/team-eue-logo.png";
import teamW7kLogo from "@/assets/team-w7k-logo.png";

interface Team {
  rank: number;
  name: string;
  logo: string;
  points: number;
  aliveCount: number;
  totalPlayers: number;
  eliminations: number;
  players: Array<{
    id: string;
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

const PubgRanking = () => {
  const teams: Team[] = [
    {
      rank: 1,
      name: "EY",
      logo: teamEyLogo,
      points: 62,
      aliveCount: 2,
      totalPlayers: 4,
      eliminations: 2,
      players: [
        { id: "1", status: "alive" },
        { id: "2", status: "alive" },
        { id: "3", status: "dead" },
        { id: "4", status: "dead" }
      ]
    },
    {
      rank: 2,
      name: "ONE",
      logo: teamOneLogo,
      points: 58,
      aliveCount: 0,
      totalPlayers: 4,
      eliminations: 0,
      players: [
        { id: "1", status: "dead" },
        { id: "2", status: "dead" },
        { id: "3", status: "dead" },
        { id: "4", status: "dead" }
      ]
    },
    {
      rank: 3,
      name: "X",
      logo: teamXLogo,
      points: 42,
      aliveCount: 0,
      totalPlayers: 4,
      eliminations: 0,
      players: [
        { id: "1", status: "dead" },
        { id: "2", status: "dead" },
        { id: "3", status: "dead" },
        { id: "4", status: "missing" }
      ]
    },
    {
      rank: 4,
      name: "777",
      logo: team777Logo,
      points: 37,
      aliveCount: 0,
      totalPlayers: 4,
      eliminations: 0,
      players: [
        { id: "1", status: "dead" },
        { id: "2", status: "dead" },
        { id: "3", status: "dead" },
        { id: "4", status: "dead" }
      ]
    },
    {
      rank: 5,
      name: "LST",
      logo: teamLstLogo,
      points: 37,
      aliveCount: 6,
      totalPlayers: 4,
      eliminations: 6,
      players: [
        { id: "1", status: "alive" },
        { id: "2", status: "alive" },
        { id: "3", status: "alive" },
        { id: "4", status: "alive" }
      ]
    },
    {
      rank: 6,
      name: "EUE",
      logo: teamEueLogo,
      points: 27,
      aliveCount: 1,
      totalPlayers: 4,
      eliminations: 1,
      players: [
        { id: "1", status: "alive" },
        { id: "2", status: "dead" },
        { id: "3", status: "dead" },
        { id: "4", status: "dead" }
      ]
    },
    {
      rank: 7,
      name: "W7K",
      logo: teamW7kLogo,
      points: 20,
      aliveCount: 0,
      totalPlayers: 4,
      eliminations: 0,
      players: [
        { id: "1", status: "dead" },
        { id: "2", status: "dead" },
        { id: "3", status: "dead" },
        { id: "4", status: "dead" }
      ]
    }
  ];

  const getRankStyle = (rank: number) => {
    if (rank === 1) return "text-gaming-gold font-bold";
    if (rank === 2) return "text-gaming-silver font-bold";
    if (rank === 3) return "text-gaming-bronze font-bold";
    return "text-foreground font-bold";
  };

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
          {/* Widget Header */}
          <div className="bg-gradient-to-r from-primary/20 to-gaming-alive/20 p-4 border-b border-primary/20">
            <div className="grid grid-cols-6 gap-3 text-center">
              <div className="text-sm font-black text-foreground">RANK</div>
              <div className="text-sm font-black text-foreground">TEAM</div>
              <div className="text-sm font-black text-foreground">PTS</div>
              <div className="text-sm font-black text-foreground">STATUS</div>
              <div className="text-sm font-black text-foreground">ELIMS</div>
              <div className="text-sm font-black text-foreground">ALIVE</div>
            </div>
          </div>

          {/* Team Rows - Compact for Streaming */}
          <div className="max-h-96 overflow-y-auto">
            {teams.map((team, index) => (
              <div 
                key={team.name}
                className={`grid grid-cols-6 gap-3 p-3 border-b border-primary/10 hover:bg-primary/5 transition-all duration-300 animate-slide-in ${
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
                  <span className="text-xl font-bold text-foreground">
                    {team.points}
                  </span>
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

                {/* Alive Count */}
                <div className="flex items-center justify-center">
                  <div className="bg-gaming-alive/20 px-3 py-1 rounded-full border border-gaming-alive/30">
                    <span className="text-lg font-bold text-gaming-alive">
                      {team.aliveCount}
                    </span>
                  </div>
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