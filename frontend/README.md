# [Wilson Chess Frontend](https://nanwar.ca)

## Available Scripts
In this project directory, you can run:
### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.<br />
The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `deploy` folder. The output folder can be changed in the `.env` file.
It correctly bundles React in production mode and optimizes the build for the best performance.<br />
The build is minified and the filenames include the hashes.
Your app is ready to be deployed!
## Note
The frontend requires an X-API-KEY in the Board.jsx component as well as a HOST. The X-API-KEY can be obtained with your own [Deta Space](https://deta.space), the HOST can be added to constants.js with: `export const HOST = 'http://localhost:4000';`.
