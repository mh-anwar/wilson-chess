# [Wilson Chess Server](https://nanwar.ca)

## Available Scripts
In this project directory, you can run:
### `space new`

Instantiate your own Deta Space, visit the [Documentation](https://deta.space/docs/en/introduction/start) to get started and **install the CLI for this command to work**.
### `space dev`

Runs the app in production simulation mode (as if it were on the production server).
Open [http://localhost:4200](http://localhost:4200) to view it in the browser.<br />

This command will fail if `space new` is not used first, and a Deta space isn't created.
### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.<br />

This command will fail if a project key is not defined, thus it is better to use `space dev`.



### Note
This repository requires a Project Key to instantiate Deta (where `process.env.DETA_PROJECT_KEY` is used), this can be obtained with your own [Deta Space](https://deta.space).