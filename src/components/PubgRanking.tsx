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
        return 'bg-gaming-alive';
      case 'dead':
        return 'bg-gaming-dead';
      case 'missing':
        return 'bg-gaming-missing';
    }
  };

  return (
    <div 
      className={`w-3 h-3 rounded-full ${getStatusClasses()}`}
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
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-black text-primary mb-2 tracking-wider">
            LIVE RANKING
          </h1>
          <div className="w-32 h-1 bg-primary mx-auto"></div>
        </div>

        {/* Ranking Table */}
        <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-2xl">
          {/* Table Header */}
          <div className="grid grid-cols-6 gap-4 p-6 bg-primary/10 border-b border-primary/20">
            <div className="text-center">
              <h2 className="text-xl font-black text-foreground tracking-wider">RANK</h2>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-black text-foreground tracking-wider">TEAM</h2>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-black text-foreground tracking-wider">PTS</h2>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-black text-foreground tracking-wider">ALIVE</h2>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-black text-foreground tracking-wider">ELIMS</h2>
            </div>
            <div></div>
          </div>

          {/* Team Rows */}
          {teams.map((team, index) => (
            <div 
              key={team.name}
              className={`grid grid-cols-6 gap-4 p-6 border-b border-primary/10 hover:bg-primary/5 transition-colors ${
                index % 2 === 0 ? 'bg-muted/20' : 'bg-transparent'
              }`}
            >
              {/* Rank */}
              <div className="flex items-center justify-center">
                <span className={`text-4xl ${getRankStyle(team.rank)}`}>
                  #{team.rank}
                </span>
              </div>

              {/* Team */}
              <div className="flex items-center gap-3">
                <img 
                  src={team.logo} 
                  alt={`${team.name} logo`}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/30"
                />
                <span className="text-2xl font-bold text-foreground tracking-wider">
                  {team.name}
                </span>
              </div>

              {/* Points */}
              <div className="flex items-center justify-center">
                <span className="text-3xl font-bold text-foreground">
                  {team.points}
                </span>
              </div>

              {/* Player Status Indicators */}
              <div className="flex items-center justify-center gap-2">
                {team.players.map((player) => (
                  <PlayerStatusIndicator 
                    key={player.id} 
                    status={player.status} 
                  />
                ))}
              </div>

              {/* Eliminations */}
              <div className="flex items-center justify-center">
                <span className="text-3xl font-bold text-foreground">
                  {team.eliminations}
                </span>
              </div>

              {/* Alive Count Display */}
              <div className="flex items-center justify-center">
                <span className="text-2xl font-bold text-gaming-alive">
                  {team.aliveCount}
                </span>
              </div>
            </div>
          ))}
        </Card>

        {/* Legend */}
        <div className="mt-8 flex justify-center gap-8">
          <div className="flex items-center gap-2">
            <PlayerStatusIndicator status="alive" />
            <span className="text-sm font-medium text-muted-foreground">Alive</span>
          </div>
          <div className="flex items-center gap-2">
            <PlayerStatusIndicator status="dead" />
            <span className="text-sm font-medium text-muted-foreground">Dead</span>
          </div>
          <div className="flex items-center gap-2">
            <PlayerStatusIndicator status="missing" />
            <span className="text-sm font-medium text-muted-foreground">Missing</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PubgRanking;