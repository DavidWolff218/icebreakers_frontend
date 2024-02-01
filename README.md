# Icebreakers Web App

![Icebreakers Logo](https://user-images.githubusercontent.com/60520496/91582308-3d48fd00-e915-11ea-9c97-45a667b72a0c.png)

Icebreakers is a social party game web app designed for quick and easy play with a group. It's a fun way to get to know the people at your next party even better.

[Video Demo](https://www.youtube.com/watch?v=qW0Sl7JjD7Y&t=1s)

## Project Links
- [Rails API GitHub Repository](https://github.com/DavidWolff218/icebreakers_backend)

## Future Updates
- Implementing more validation checks for room and user names.
- Deploying Icebreakers.
- Creating a voting feature where users can vote on the next question.
- Allowing the host to remove questions from the game.

## Screenshots

### Homepage and Login
![Homepage](https://user-images.githubusercontent.com/60520496/91499698-8d797e00-e887-11ea-9ea6-685c832abd5b.png)
![Login](https://user-images.githubusercontent.com/60520496/91499742-a5e99880-e887-11ea-8e7c-3188fb72b45c.png)

### Lobby and Game Room
![Lobby](https://user-images.githubusercontent.com/60520496/91499796-bf8ae000-e887-11ea-86d4-7645e3279224.png)
![Game Room](https://user-images.githubusercontent.com/60520496/91499831-d03b5600-e887-11ea-858e-077d466be0de.png)

## Installation

**Note:** The CSS is being refactored for better responsiveness across different screen sizes. It is currently optimized for mobile screens. To view on mobile, press `shift + command + c` to open the console, and click the mobile screen icon in the upper left corner.

![Mobile View](https://user-images.githubusercontent.com/60520496/91590398-f8c35e80-e920-11ea-8c88-81c5cbfa948a.png)

### Prerequisites
- Node.js: Version 21.1.0
- npm: 10.3.0
- Ruby: 2.6.1
- Rails: Version 6.0.3 or higher

### Steps

1. Clone the [backend repository](https://github.com/DavidWolff218/icebreakers_backend).
2. Install gems:

    ```bash
    cd icebreakers_backend
    bundle install
    ```

3. Clone this repository.
4. Install dependencies:

    ```bash
    cd icebreakers_frontend
    npm install
    ```

5. Start the Rails API server from the backend directory:

    ```bash
    rails s
    ```

    Ensure that the API server is running on localhost:3000.

6. Start the frontend server from the frontend directory:

    ```bash
    npm start
    ```

    The frontend server will likely run on localhost:3001. Approve the port when prompted or open a new browser window in incognito/private mode and go to localhost:3001 to join the room as another player.

## Contact

You can reach the project creator, David Wolff, on [LinkedIn](https://www.linkedin.com/in/davidwolff218/) or by email at dcwolff218@gmail.com.


