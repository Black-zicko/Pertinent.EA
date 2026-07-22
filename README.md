# Pertinent.EA - Universal Trading Bot

A powerful, broker-agnostic automated trading application that works with MT4, MT5, Deriv, Crypto exchanges, and any broker with API access.

## Features

✅ **Universal Broker Support**
- MT4/MT5 (Forex & CFDs)
- Deriv (Binary Options)
- Binance (Crypto)
- Forex.com, Interactive Brokers, and more

✅ **Aggressive Account Growth Strategy**
- Start with $10 and grow non-stop
- Intelligent stake management
- Progressive stake increases on wins
- Loss recovery system
- Real-time profit tracking

✅ **Android App**
- 24/7 automated trading
- Multi-account management
- Real-time monitoring dashboard
- Profit/loss tracking
- One-click strategy activation

✅ **Backend Services**
- RESTful API for all broker operations
- WebSocket support for real-time data
- Trade execution engine
- Risk management system
- Comprehensive logging

## Architecture

```
Pertinent.EA/
├── backend/              # Python FastAPI server
├── android-app/          # React Native mobile app
├── config/               # Configuration files
├── strategies/           # Trading strategies
├── tests/                # Test suite
└── docs/                 # Documentation
```

## Quick Start

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python main.py
```

### Android App Setup
```bash
cd android-app
npm install
npx react-native run-android
```

## Configuration

Create a `.env` file in the backend directory:
```
BROKER_TYPE=mt5  # or deriv, binance, forex, etc.
BROKER_LOGIN=your_login
BROKER_PASSWORD=your_password
BROKER_SERVER=your_server
STARTING_BALANCE=10
```

## Supported Brokers

- Deriv
- MetaTrader 5
- MetaTrader 4
- Binance
- FTX
- Crypto.com
- Interactive Brokers
- Forex.com
- And more...

## Strategy

The app uses an aggressive account growth strategy:
1. Start with small stake ($0.10+)
2. Increase stake 1.05x on wins
3. Reset on 5 consecutive losses
4. Target: Double account continuously

## License

MIT

## Support

For issues and feature requests, open an issue on GitHub.
