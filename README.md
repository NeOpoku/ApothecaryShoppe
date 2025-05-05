# The Apothecary Shoppe

A React/TypeScript application that allows users to find herbal remedies for various ailments and maintain a personal collection of herbs and remedies.

## Project Overview

The Apothecary Shoppe is an anime-inspired digital apothecary web application that connects users with the healing power of herbs. Users can search for natural remedies based on their symptoms or ailments, view detailed information about herbs and their benefits, and save their favorite herbs and remedies to their personal collection.

### Key Features

- **User Authentication**: Login and signup functionality 
- **Ailment Search**: Search for herbs and remedies by entering symptoms or ailments
- **Personal Collection**: Save herbs and remedies to "My Apothecary" for future reference
- **Detailed Information**: View comprehensive details about herbs, including scientific names, uses, and preparation methods
- **Responsive Design**: Beautiful interface that works across devices

## Technologies Used

- React 18
- TypeScript
- Context API for state management
- CSS for styling

## Project Structure

```
apothecary-shoppe/
├── public/
│   ├── index.html
│   └── assets/
│       └── images/
│           ├── herbs/
│           ├── backgrounds/
│           └── icons/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   ├── Layout/
│   │   ├── Home/
│   │   ├── Apothecary/
│   │   └── Search/
│   ├── contexts/
│   ├── hooks/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   ├── index.tsx
│   └── index.css
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/apothecary-shoppe.git
   cd apothecary-shoppe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your environment variables:
   ```
   REACT_APP_API_URL=your_api_url
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Usage

### Authentication

- Users can sign up with an email and password
- Returning users can log in with their credentials
- Authentication state is maintained across sessions

### Searching for Remedies

1. Enter your ailment or symptoms in the search bar
2. The application will display recommended herbs and remedies
3. View detailed information about each herb by clicking on it

### Managing Your Apothecary

1. Save herbs and remedies to your personal collection by clicking "Save to My Apothecary"
2. Access your saved items by navigating to "My Apothecary"
3. Remove items from your collection as needed

## Deployment

To build the app for production:

```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

## Further Development

Future enhancements planned for the application:

- Integration with a real database (Firebase, MongoDB, etc.)
- Advanced filtering and categorization of herbs
- User profiles with customization options
- Community features like sharing favorite remedies
- Mobile app version using React Native

## Demo

Insert gif or link to demo

## Authors

- [@Imani](https://www.github.com/neopoku)
- [@Diana](https://github.com/Bahashem)
- [@Bodi](https://www.github.com/bhaktabodi108)
- [@Malcolm](https://www.github.com/KingRaii)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Herbal information compiled from various public domain sources