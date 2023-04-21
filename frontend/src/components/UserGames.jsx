import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
  Button,
  TableContainer,
  Box,
  Heading,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { HOST } from './constants.js';
import '../index.css';

export default function UserGames() {
  const [userGames, setUserGames] = useState(null);
  const [userStats, setUserStats] = useState(null);
  useEffect(() => {
    if (
      localStorage.getItem('name') !== null &&
      localStorage.getItem('passKey') !== null
    ) {
      const fetchUserGames = async () => {
        let data = await fetch(HOST + '/userGames', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: localStorage.getItem('name'),
            passKey: localStorage.getItem('passKey'),
          }),
        })
          .then(data => data.json())
          .then(response => {
            return response.data;
          });
        populateUserGames(data);
        createUserStats(data);
      };
      fetchUserGames();
    }
  }, []);

  const populateUserGames = data => {
    if (data !== undefined && data !== null) {
      let games = Object.keys(data).map(key => {
        let gameDate = new Date(data[key]['date']);
        // When we get to 2023, _maybe_ I'll change slice from 0,3 to 0,4
        gameDate = gameDate.toString().split(' ').slice(0, 3).join(' ');
        let gameType = data[key]['type'];
        let opponent = data[key]['opponent'];
        let result = data[key]['result'];
        let confirmation = data[key]['confirmed'];

        return (
          <Tr key={key}>
            <Td>{gameDate}</Td>
            <Td>{opponent}</Td>
            <Td textTransform="capitalize">
              You {result} by {gameType}
            </Td>
            <Td>
              {confirmation === 'false' ? (
                <Button>Coming Soon</Button>
              ) : (
                <Button isDisabled>Result Accepted</Button>
              )}
            </Td>
          </Tr>
        );
      });
      if (games.length === 0) {
        setUserGames(
          <Tr>
            <Td>Only games played in 2023 will show.</Td>
          </Tr>
        );
      } else {
        setUserGames(games);
      }
    } else {
      setUserGames(
        <Tr>
          <Td>Only games played in 2023 will show.</Td>
        </Tr>
      );
    }
  };

  const createUserStats = data => {
    let gameConfirmations = true;
    let opponents = [];
    let wins = 0;
    let losses = 0;
    let draws = 0;
    let typCheckmate = 0;
    let typResignations = 0;
    let typTime = 0;
    // Loop through object data and combine data into variables
    Object.keys(data).forEach(element => {
      let game = data[element];
      let gameResult = game.result;
      let gameType = game.type;
      opponents.push(game.opponent);
      gameConfirmations += game.confirmed === true ? 1 : 0;
      // Game result stats
      if (gameResult === 'won') {
        wins += 1;
      } else if (gameResult === 'lost') {
        losses += 1;
      } else if (gameResult === 'draw') {
        draws += 1;
      }
      // Game type results
      if (gameType === 'checkmate') {
        typCheckmate += 1;
      } else if (gameType === 'time') {
        typTime += 1;
      } else if (gameType === 'resignation') {
        typResignations += 1;
      }
    });
    setUserStats({
      gameConfirmations: gameConfirmations,
      wins: wins,
      losses: losses,
      draws: draws,
      typCheckmate: typCheckmate,
      typResignations: typResignations,
      typTime: typTime,
    });
  };
  const bg = useColorModeValue('light.header', 'dark.header');
  return (
    <Box
      sx={{ display: 'flex' }}
      flexDir={{ base: 'column', sm: 'column', md: 'row', lg: 'row' }}
    >
      <Box sx={{ flex: 70, padding: '1em' }}>
        {userGames == null ? (
          <Heading>Play more game!</Heading>
        ) : (
          <TableContainer>
            <Table bg={bg} className="tableContainer">
              <Thead className="blur" bg={bg}>
                <Tr>
                  <Th>Date</Th>
                  <Th>Opponent</Th>
                  <Th>Result</Th>
                  <Th>Challenge Result</Th>
                </Tr>
              </Thead>
              <Tbody>{userGames}</Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>

      <Box sx={{ flex: 30, padding: '1em' }}>
        {userStats == null ? (
          <Heading>Play more games to see stats!</Heading>
        ) : (
          <TableContainer>
            <Table bg={bg} className="tableContainer">
              <Thead className="blur" bg={bg}>
                <Tr>
                  <Th>Stats</Th>
                  <Th>Result</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Confirmed Games</Td>
                  <Td>{userStats.gameConfirmations}</Td>
                </Tr>
                <Tr>
                  <Td>Games Won</Td>
                  <Td>{userStats.wins}</Td>
                </Tr>
                <Tr>
                  <Td>Games Lost</Td>
                  <Td>{userStats.losses}</Td>
                </Tr>
                <Tr>
                  <Td>Games Drawn</Td>
                  <Td>{userStats.draws}</Td>
                </Tr>
                <Tr>
                  <Td>Total Checkmates:</Td>
                  <Td>{userStats.typCheckmate}</Td>
                </Tr>
                <Tr>
                  <Td>Total Time (losses/wins):</Td>
                  <Td>{userStats.typTime}</Td>
                </Tr>
                <Tr>
                  <Td>Total Resignations:</Td>
                  <Td>{userStats.typResignations}</Td>
                </Tr>
                <Tr>
                  <Td>Most common opponent:</Td>
                  <Td></Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
}
