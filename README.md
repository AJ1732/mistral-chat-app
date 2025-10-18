# Mistral Chat Application

A modern, real-time chat application built with Next.js and TypeScript, powered by Mistral AI's completion API. This project demonstrates seamless integration of Mistral's language models into a user-friendly chat interface.

## 🚀 Features

- **Real-time Chat Interface**: Responsive chat UI with message history
- **Mistral AI Integration**: Direct integration with Mistral's completion API
- **Dynamic Island Component**: Elegant status indicators and notifications
- **Responsive Design**: Mobile-first design using Tailwind CSS
- **TypeScript**: Full type safety throughout the application
- **Modern Stack**: Built with Next.js 14+ and React best practices

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18.x or higher
- npm or pnpm package manager
- A Mistral AI API key (get one at [https://console.mistral.ai](https://console.mistral.ai))

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/AJ1732/mistral-chat-app.git
cd mistral-chat-app
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
MISTRAL_API_KEY=your_mistral_api_key_here
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**Important**: Never commit your `.env.local` file to version control.

### 4. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🏗️ Project Structure

```
chat-app/
├── app/                      # Next.js app directory
│   └── page.tsx             # Main chat page
├── components/              # React components
│   ├── elements/           # UI elements
│   │   ├── ellipsis.tsx
│   │   └── dynamic-island.tsx
│   └── ui/                 # Reusable Shadcn UI components
├── features/               # Feature modules
│   ├── chats/
│   └── theme/
├── lib/                    # Utility functions
│   └── utils.ts
├── mistral/                    # Mistral installtion functions
├── types/                    # Type dclarations
├── provider/                    # Universl context rpoviders
├── public/                 # Static assets
├── .env.local             # Environment variables (create this)
├── next.config.ts         # Next.js configuration
├── package.json           # Project dependencies
└── tsconfig.json          # TypeScript configuration
```

## 🧪 Testing the Application

### Manual Testing

1. **Start the application** following the setup instructions above
2. **Open your browser** to `http://localhost:3000`
3. **Send a message** in the chat interface
4. **Verify** that you receive responses from the Mistral AI model

### Test Scenarios

- **Basic Chat**: Send simple queries and verify responses
- **Multi-turn Conversations**: Test conversation context retention
- **Error Handling**: Test with invalid inputs or network issues
- **Responsive Design**: Test on different screen sizes (mobile, tablet, desktop)

## 🔑 API Integration

This application uses Mistral AI's public completion API. The integration is handled server-side to keep your API key secure.

### Example API Usage

### Example API Usage

The application uses the official Mistral AI JavaScript SDK:

```typescript
import MistralClient from "@mistralai/mistralai";

const apiKey = process.env["MISTRAL_API_KEY"];

const client = new Mistral({ apiKey: apiKey });

const chatResponse = await client.chat.complete({
  model: "mistral-tiny",
  messages: [
    {
      role: "system",
      content: "You are a helpful assistant.",
    },
    {
      role: "user",
      content: "Your message here",
    },
  ],
  temperature: 0.5,
});

// Access the response
console.log(chatResponse.choices?.[0].message.content);
```

## 🎨 Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcb UI Library
- **API**: Mistral AI Completion API
- **State Management**: React Hooks
- **Form Handling**: React Hook Form

## 🚧 Development Best Practices

- **Type Safety**: Full TypeScript coverage with strict mode enabled
- **Component Structure**: Modular, reusable components
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Performance**: Optimized bundle size and lazy loading where appropriate
- **Accessibility**: ARIA labels and semantic HTML
- **Security**: API keys secured server-side, input validation

## 📦 Build for Production

```bash
pnpm run build
pnpm start
```

## 🔧 Configuration

### Customizing the Chat Model

Edit the API call in your chat component to use different Mistral models:

```typescript
// Available models: mistral-tiny, mistral-small, mistral-medium, mistral-large
model: "mistral-tiny";
```

## 🐛 Troubleshooting

### Common Issues

**Issue**: API requests failing

- **Solution**: Verify your `MISTRAL_API_KEY` is correct in `.env.local`
- **Solution**: Check that your API key has sufficient credits

**Issue**: Application not starting

- **Solution**: Ensure all dependencies are installed: `pnpm install`
- **Solution**: Check Node.js version: `node --version` (should be 18+)

**Issue**: Styling not loading

- **Solution**: Clear Next.js cache: `rm -rf .next`
- **Solution**: Rebuild: `npm run build`

## 📝 Future Enhancements

- [ ] Message streaming for real-time responses
- [ ] Conversation history persistence
- [ ] Multi-model support with model selection
- [ ] Export chat conversations
- [ ] User authentication
- [ ] Rate limiting and usage tracking

## 🤝 Contributing

This project was created as part of a job application for Mistral AI's Software Engineer Internship position.

## 📄 License

This project is created for educational and demonstration purposes.

---

**Built with ❤️ for Mistral AI**
