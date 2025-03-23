<h1 align="center">
  <img alt="logo" src="./assets/icon.png" width="124px" style="border-radius:10px"/><br/>
Oxygen - AI-Powered Multi-Chain Wallet
</h1>

<p align="center">
  Built for ETHGlobal Trifecta Agent Hackathon 2024
</p>

## 🌟 Overview

Oxygen is an innovative AI-powered crypto wallet that simplifies the complexity of managing digital assets across multiple chains. By integrating natural language processing, voice recognition and intelligent automation, Oxygen makes crypto operations accessible to everyone.

## 🚀 Key Features

- **AI-Powered Assistant**: Natural language interactions for managing your crypto assets
- **Multi-Chain Support**: Seamless management of assets across different blockchain networks
- **Smart Chat Interface**: Execute complex operations through simple conversations
- **Real-Time Portfolio Tracking**: Monitor your assets and performance across chains
- **Voice Commands**: Hands-free operation for common tasks

## 🛠 Tech Stack

### Core Technologies

- **React Native & Expo**: For cross-platform mobile development
- **TypeScript**: For type-safe code
- **Expo Router**: File-based routing system
- **Nativewind**: Tailwind CSS for React Native

### Blockchain & Web3

- **Privy**: For wallet management and authentication
- **Viem & Wagmi**: Ethereum interaction libraries

### AI & Data

- **AI SDK**: Custom AI integration for natural language processing
- **React Query & React Query Kit**: Data fetching and caching
- **Zerion API**: Portfolio tracking and analytics
- **BrianKnowsAI APIs**: API for the AI assistant

### State Management & Storage

- **Zustand**: Global state management
- **MMKV**: High-performance key-value storage

### UI/UX

- **React Native Reanimated**: Smooth animations
- **React Native Gesture Handler**: Touch interactions
- **React Native SVG**: Vector graphics support

## 📁 Project Structure

```
src/
├── api/ # API integrations and queries
├── app/ # Expo Router screens and navigation
├── components/ # Reusable UI components
├── lib/ # Shared utilities and hooks
└── types/ # TypeScript type definitions
```

## 🚀 Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/your-username/oxygen-wallet
cd oxygen-wallet
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Start the development server**

```bash
# For iOS
pnpm ios

# For Android
pnpm android
```

## 🔧 Configuration

Create a `.env` file in the root directory with your API keys:

```
EXPO_PUBLIC_PRIVY_APP_ID=your_privy_app_id
EXPO_PUBLIC_PRIVY_CLIENT_ID=your_privy_client_id
EXPO_PUBLIC_ZERION_API_KEY=your_zerion_api_key
```

## 🔒 Security

- All transactions require explicit user confirmation
- No private keys are stored on device
- AI suggestions are verified before execution
- Regular security audits and updates

## 🎯 Future Roadmap

- [ ] Social recovery options
- [ ] DeFi strategy recommendations
- [ ] Advanced portfolio analytics

## 👥 Team

- orbulo: this is a solo hackathon project!

## 🏆 Hackathon Details

Built during the ETHGlobal Trifecta Agent Hackathon 2024, Oxygen aims to demonstrate the potential of AI integration in crypto wallets, making blockchain technology more accessible to mainstream users.

## 🙏 Acknowledgments

- ETHGlobal for hosting the hackathon
- Privy team for wallet infrastructure
- BrianKnowsAI for the AI APIs
- Zerion for the portfolio tracking API
