# Webify

This is a web app built with Next.js, TypeScript, and styled with TailwindCSS that integrates with the Spotify Web API to display information about your playlists and profile.

## Features

- View all of your playlists, including the name, cover image, and number of tracks.
- View details about a specific playlist, including the tracklist, artist, and album.
- View your profile information, including your name, profile picture, and follower count.

## Getting Started

### Prerequisites

Before you begin, you must have the following installed on your machine:

- Node.js
- npm or yarn

### Installation

1.  Clone the repository to your local machine.
2.  Navigate to the project directory in your terminal.
3.  Run `npm install` or `yarn install` to install all dependencies.

### Configuration

To use this web app, you will need to set up a Spotify Web API app and retrieve a client ID and client secret. Follow these steps to create a Spotify Web API app:

1.  Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/) and log in with your Spotify account.
2.  Click the "Create an App" button and follow the prompts to create your app.
3.  Once your app is created, go to the app's settings page and add `http://localhost:3000/api/auth/callback/spotify` to the "Redirect URIs" section.
4.  Save your changes and copy your client ID and client secret.

Create a `.env` file in the root of the project and add the following lines, replacing `<YOUR_CLIENT_ID>` and `<YOUR_CLIENT_SECRET>` with your own client ID and client secret:

```
SPOTIFY_CLIENT_ID=<YOUR_CLIENT_ID>
SPOTIFY_CLIENT_SECRET=<YOUR_CLIENT_SECRET>
NEXTAUTH_URL="http://localhost:3000"

# Next Auth
# You can generate a new secret on the command line with:
# openssl rand -base64 32
# https://next-auth.js.org/configuration/options#secret
NEXTAUTH_SECRET="secret"
```

### Running the App

To run the web app, run the following command in your terminal:

`npm run dev`

This will start the app on `http://localhost:3000`.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
