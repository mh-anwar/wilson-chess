const express = require('express');
const cors = require('cors');
const shrinkRay = require('shrink-ray-current');
const app = express();
const path = require('path');
const base64 = require('base-64');
const { Deta } = require('deta');
const crypto = require('crypto');

const deta = Deta(process.env.DETA_PROJECT_KEY);
const userDB = deta.Base('users');
const boardDB = deta.Base('leaderboard');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT);
app.use(cors());
app.use(shrinkRay());
app.use(express.static(path.resolve(__dirname, './deploy')));

app.post('/authjoin', async (request, res) => {
	let name = request.body.name;
	let email = request.body.email;
	let password = request.body.password;
	let color = request.body.color;

	let userExists = await checkUser(name);
	await userExists;
	if (email.includes('@ddsbstudent.ca')) {
		if (userExists === false) {
			let passKey = await createUser(name, email, password, color);
			res.send({ success: true, passKey: passKey });
		} else {
		}
	} else {
		res.send({ success: 'Use your student email.' });
	}
});

async function createUser(userName, email, password, color) {
	var passKey = crypto.randomBytes(12).toString('hex');

	await userDB.put(
		{
			games: {},
			password: password,
			email: email,
			passKey: passKey,
			color: color,
		},
		userName
	);

	const leaderboard = await boardDB.fetch();
	await boardDB.put({
		lost: 1,
		won: 1,
		name: userName,
		move: 0,
		rank: leaderboard.count + 1,
	});
	return passKey;
}

async function checkUser(userName) {
	const user = await userDB.get(userName);
	if (user) {
		return user.passKey;
	} else {
		return false;
	}
}

async function authenticateUser(userName, password) {
	let user = await userDB.get(userName);
	if (user) {
		if (user.password === password) {
			return user.passKey;
		} else {
			return false;
		}
	} else {
		return undefined;
	}
}

app.post('/authlogin', async (request, res) => {
	await request;
	let name = request.body.name;
	let password = request.body.password;
	let userAuthentication = await authenticateUser(name, password);

	if (userAuthentication !== false && userAuthentication !== undefined) {
		res.send({ success: true, passKey: userAuthentication });
	} else if (userAuthentication === undefined) {
		res.send({ success: "User doesn't exist" });
	} else {
		res.send({ success: 'Incorrect password' });
	}
});

app.post('/userGames', async (request, res) => {
	await request;
	const data = request.body;
	const user = await userDB.get(data.name);
	if (user.passKey === data.passKey) {
		res.send({ data: user.games });
	} else {
		res.send({ data: null });
	}
});

app.post('/gamePlay', async (request, res) => {
	await request;
	const data = request.body;
	const userName = base64.decode(data.name);
	const gameType = base64.decode(data.gameType);
	const gameResult = base64.decode(data.gameResult);
	const gameDate = data.gameDate;
	let actualTime = new Date(gameDate).toString().split(' ');
	actualTime = actualTime[4];
	let fullOppName = base64.decode(data.opponent);
	fullOppName = fullOppName.split(',');
	const oppName = fullOppName[0] + ' ' + fullOppName[1];
	const userData = await userDB.get(userName);
	let userGames = userData.games;
	const oppData = await userDB.get(oppName);
	let oppGames = oppData.games;
	let userWins, oppLosses, userKey, oppKey;

	if (userData.passKey === base64.decode(data.passKey)) {
		// Update USERDB with games
		// WINNER INPUTS INTO SYSTEM
		let newUserData = {
			date: gameDate,
			opponent: oppName,
			result: gameResult,
			type: gameType,
			confirmed: true,
		};
		userGames[actualTime] = newUserData;
		const userUpdates = {
			games: userGames,
		};
		await userDB.update(userUpdates, userName);

		let oppResult = gameResult;
		if (gameResult === 'won') {
			oppResult = 'lost';
		}
		let newOppData = {
			date: gameDate,
			opponent: userName,
			result: oppResult,
			type: gameType,
			confirmed: false,
		};
		oppGames[actualTime] = newOppData;
		const oppUpdates = {
			games: oppGames,
		};
		await userDB.update(oppUpdates, oppName);
		// Update leaderboard to increase wing
		if (gameResult === 'won') {
			let boardData = await boardDB.fetch();
			for (let i = 0; i < boardData.items.length; i++) {
				if (boardData.items[i]['name'] === userName) {
					userWins = boardData.items[i]['won'];
					userKey = boardData.items[i]['key'];
				} else if (boardData.items[i]['name'] === oppName) {
					oppLosses = boardData.items[i]['lost'];
					oppKey = boardData.items[i]['key'];
				}
			}
			const userBoardUpdate = {
				won: userWins + 1,
			};
			await boardDB.update(userBoardUpdate, userKey);
			const oppBoardUpdate = {
				lost: oppLosses + 1,
			};
			await boardDB.update(oppBoardUpdate, oppKey);
		}
		res.send({ success: 'Leaderboard updated' });
	} else {
		res.send({ failed: 'Failed. Your login is invalid.' });
	}
});

// In order to deploy a /deploy folder with an index.html will be necessary
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, './deploy', 'index.html'));
});
app.get('/favicon.ico', async (req, res) => {
	res.sendFile(path.resolve(__dirname, './deploy', 'favicon.ico'));
});

// userDB example
/* userDB.put(
  {
    games: { John: 'lost', Doe: 'lost', Jane: 'won' },
    password: 'test',
    email: 'email@gmail.com',
  },
  'Jack'
); */

// TODO Archive old unused code
/*
// Was used when user avatar called on backend, pretty unnecessary
app.use('/userCheck', async (request, res) => {
  const user = await userDB.fetch(request.userName);
  if (user.keyPass === request.keyPass) {
    res.send({ userSignedIn: true, color: user.color });
  } else {
    res.send({ userSignedIn: false });
  }
}); 

app.post('/googleauthas', async (request, res) => {
  await request;

  const CLIENT_ID_GOOGLE =
    '868153396436-mm5sutbunjn1n5m7bebgslr1rp9spg0s.apps.googleusercontent.com';

  const client = new OAuth2Client(CLIENT_ID_GOOGLE);

  const ticket = await client.verifyIdToken({
    idToken: request.body.data.credential,
    audience: CLIENT_ID_GOOGLE,
  });
  let userName = ticket.payload.name;
  let email = ticket.payload.email;

  let userExists = await checkUser(userName);

  if (userExists === false) {
    if (request.body.password) {
      let passKey = await createUser(
        userName,
        email,
        request.body.password,
        'black'
      );
      res.send({
        success: true,
        name: userName,
        passKey: passKey,
        color: 'black',
      });
    } else {
      res.send({ success: 'password required' });
    }
  } else {
    res.send({ success: true, name: userName, passKey: userExists });
  } 
});
*/
