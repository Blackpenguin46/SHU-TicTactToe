# Sacred Heart University Tic-Tac-Toe

An interactive tic-tac-toe installation designed for display in hallways at Sacred Heart University. Features an attract screen with leaderboards, college facts, and a sleek game interface using SHU's brand colors.

## Features

- **Idle/Attract Screen**: Eye-catching display with "Click to Start", all-time leaderboard, and rotating college facts
- **Game Screen**: Clean tic-tac-toe interface with player names, win counters, and live leaderboards
- **Auto-Reset**: Automatically returns to idle screen after 2 minutes of inactivity
- **Persistent Leaderboard**: SQLite database tracks all-time player wins
- **Sacred Heart Branding**: Uses official SHU colors (Red #CE1141, Black, Grey, White)
- **24/7 Operation**: Dockerized for reliable deployment on mini PCs

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- Sacred Heart University theme colors

### Backend
- Node.js + Express
- TypeScript
- SQLite (better-sqlite3)
- RESTful API

### Deployment
- Docker + Docker Compose
- Nginx (reverse proxy)
- Persistent volumes for database

## Project Structure

```
SHU-TicTactToe/
├── src/                      # Frontend source
│   ├── components/           # React components
│   │   ├── IdleScreen.tsx   # Attract screen
│   │   ├── GameScreen.tsx   # Game interface
│   │   ├── TicTacToeGrid.tsx
│   │   ├── Leaderboard.tsx
│   │   └── FactsDisplay.tsx
│   ├── types/               # TypeScript types
│   ├── utils/               # Game logic
│   ├── services/            # API client
│   ├── App.tsx              # Main app with idle timeout
│   └── index.css            # Tailwind styles
├── backend/                 # Backend API
│   └── src/
│       ├── index.ts         # Express server
│       └── database.ts      # SQLite operations
├── Dockerfile.frontend
├── Dockerfile.backend
└── docker-compose.yml
```

## Quick Start

### Development Mode

1. **Install dependencies:**
```bash
# Frontend
npm install

# Backend
cd backend
npm install
```

2. **Start development servers:**
```bash
# Terminal 1 - Frontend (http://localhost:5173)
npm run dev

# Terminal 2 - Backend (http://localhost:3001)
cd backend
npm run dev
```

### Production Deployment with Docker

1. **Build and run with Docker Compose:**
```bash
docker-compose up -d
```

The application will be available at `http://localhost`

2. **Stop the application:**
```bash
docker-compose down
```

3. **View logs:**
```bash
docker-compose logs -f
```

## Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# Frontend
VITE_API_URL=http://localhost:3001/api

# Backend
PORT=3001
NODE_ENV=production
```

### Customizing College Facts

Facts are stored in the SQLite database. To add more:

1. Access the database: `backend/data/tictactoe.db`
2. Or use the API:
```bash
curl -X POST http://localhost:3001/api/facts \
  -H "Content-Type: application/json" \
  -d '{"fact":"Your new fact here"}'
```

### Adjusting Idle Timeout

Edit `src/App.tsx`:
```typescript
const IDLE_TIMEOUT = 120000; // milliseconds (default: 2 minutes)
```

## Hardware Requirements

**Recommended for Mini PC:**
- CPU: Intel Celeron N4000 or better
- RAM: 4GB minimum
- Storage: 32GB SSD
- OS: Ubuntu Server 22.04 LTS or similar
- Display: HDMI output for hallway screen

## Installation on Mini PC

1. **Install Docker:**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

2. **Clone and deploy:**
```bash
git clone <your-repo-url>
cd SHU-TicTactToe
docker-compose up -d
```

3. **Auto-start on boot:**
```bash
sudo systemctl enable docker
```

4. **Set browser to kiosk mode** (if using browser):
```bash
# Example with Chromium
chromium-browser --kiosk --disable-infobars http://localhost
```

## API Endpoints

### Leaderboard
- `GET /api/leaderboard` - Get all-time leaderboard
- `POST /api/leaderboard` - Add a win (body: `{ "playerName": "string" }`)

### College Facts
- `GET /api/facts` - Get all facts
- `POST /api/facts` - Add a fact (body: `{ "fact": "string" }`)

### Health Check
- `GET /health` - Service health status

## Maintenance

### Backup Database
```bash
docker cp shu-tictactoe-backend:/app/data/tictactoe.db ./backup.db
```

### Reset Leaderboard
```bash
docker exec -it shu-tictactoe-backend rm /app/data/tictactoe.db
docker-compose restart backend
```

### Update Application
```bash
git pull
docker-compose down
docker-compose build
docker-compose up -d
```

## Troubleshooting

**Issue: Frontend can't connect to backend**
- Check that both containers are running: `docker-compose ps`
- Verify network connectivity: `docker-compose logs backend`

**Issue: Leaderboard not persisting**
- Ensure volume is mounted: `docker volume ls`
- Check backend logs: `docker-compose logs backend`

**Issue: Display not going to idle**
- Check browser console for errors
- Verify IDLE_TIMEOUT setting in App.tsx

## License

MIT

## Support

For issues or questions, contact: samoakescyber@proton.me
