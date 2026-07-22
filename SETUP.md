# Pertinent.EA - Universal Trading Bot

## 🚀 Quick Start

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Black-zicko/Pertinent.EA.git
   cd Pertinent.EA
   ```

2. **Setup Backend**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your broker credentials
   ```

4. **Run Backend**
   ```bash
   python main.py
   ```

### Android App Setup

1. **Install Dependencies**
   ```bash
   cd android-app
   npm install
   ```

2. **Update API URL**
   - Open `android-app/services/api.js`
   - Change `API_BASE_URL` to your server IP

3. **Run on Android**
   ```bash
   npx react-native run-android
   ```

## 📱 Features

✅ **Multi-Broker Support**
- MetaTrader 5 (MT5)
- MetaTrader 4 (MT4)
- Deriv (Binary Options)

✅ **Aggressive Growth Strategy**
- Start with $10+
- Progressive stake increases
- Intelligent loss recovery
- Continuous account growth

✅ **Android App**
- Real-time trading dashboard
- Position management
- Auto-trading toggle
- Account monitoring
- Trade history

✅ **Advanced Features**
- 24/7 automated trading
- Risk management
- Strategy configuration
- Real-time notifications

## 🔧 Configuration

### Broker Setup

Edit `.env` file:

```env
BROKER_TYPE=mt5              # mt5, mt4, or deriv
BROKER_LOGIN=your_login
BROKER_PASSWORD=your_password
BROKER_SERVER=your_server

STARTING_BALANCE=10
BASE_STAKE=0.10
MAX_CONSECUTIVE_LOSSES=5
STAKE_MULTIPLIER=1.05
TARGET_PROFIT=10
```

### Trading Strategy

The aggressive growth strategy:
1. Starts with small stake ($0.10)
2. Increases 1.05x on each win
3. Resets on 5 consecutive losses
4. Targets doubling account continuously

## 🐳 Docker Deployment

```bash
docker-compose up
```

The API will be available at `http://localhost:8000`

## 📊 API Endpoints

### Broker
- `POST /api/broker/connect` - Connect to broker
- `GET /api/broker/account-info` - Get account info
- `GET /api/broker/balance` - Get balance

### Trading
- `POST /api/trading/order` - Place order
- `GET /api/trading/positions` - Get positions
- `POST /api/trading/close-order/{id}` - Close order

### Strategies
- `GET /api/strategies/list` - List strategies
- `POST /api/strategies/activate` - Activate strategy

## ⚠️ Risk Disclaimer

Trading involves significant risk. Past performance does not guarantee future results. Always test with small amounts first. Use proper risk management.

## 📝 License

MIT License - see LICENSE file

## 🤝 Support

For issues and features, open an issue on GitHub.

---

**Made with ❤️ by Pertinent.EA Team**