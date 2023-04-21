# [Wilson Chess Leaderboard](https://nanwar.ca)

## Purpose
This website is a tournament leaderboard, it lets students sign up for an account, login, report results and see statistics on their games. It officially serves Wilson Chess Club.


## Available Scripts
In the project directory, you can run:
### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.<br />
The page will reload if you make edits (the server will not).
You will also see any lint errors in the console.

### Note
This repository requires an X-API-KEY in the Board.jsx component as well as a HOST. The HOST can be added to constants.js with: `export const HOST = 'http://localhost:4000';`. Along with the X-API-KEY the backend requires a Project Key to instantiate Deta (where `process.env.DETA_PROJECT_KEY` is used), both of these can be obtained with your own [Deta Space](https://deta.space)
