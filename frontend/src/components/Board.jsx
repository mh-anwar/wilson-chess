import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { GiRank1, GiRank2, GiRank3 } from 'react-icons/gi';
import Challenge from './Challenge.jsx';
import { API_KEY } from './constants.js';
import '../index.css';

export default function Board({
  width = '80%',
  showWR = true,
  showChallenge = true,
}) {
  const [leaderBoard, setLeaderBoard] = useState(null);

  useEffect(() => {
    const populateLeaderBoard = data => {
      let bigRanks = [];

      Object.values(data).forEach(key => {
        let wins = key['won'] - 1;
        let lost = key['lost'] - 1;
        let thisFormula = wins - lost;

        if (bigRanks.length === 0) {
          bigRanks.push(key);
        } else {
          for (let i = 0; i < bigRanks.length; i++) {
            let otherFormula = bigRanks[i]['won'] - bigRanks[i]['lost'];
            if (otherFormula > thisFormula) {
              if (bigRanks[i + 1]) {
                continue;
              } else {
                bigRanks.join();
                bigRanks.splice(i + 1, 0, key);
                bigRanks.join();
                break;
              }
            } else if (otherFormula === thisFormula) {
              let otherPerson = bigRanks[i]['name'][0];
              let thisPerson = key['name'][0];
              if (otherPerson.localeCompare(thisPerson) === -1) {
                bigRanks.join();
                bigRanks.splice(i + 1, 0, key);
                bigRanks.join();
                break;
              } else {
                bigRanks.join();
                bigRanks.splice(i, 0, key);
                bigRanks.join();
                break;
              }
            } else {
              bigRanks.join();
              bigRanks.splice(i, 0, key);
              bigRanks.join();
              break;
            }
          }
        }
      }, {});

      let ranks = bigRanks.map(key => {
        let rank = bigRanks.indexOf(key) + 1;
        let fullName = key['name'].split(' ');
        let name = fullName[0];
        return (
          <Tr key={rank}>
            <Td display="flex" flexDir="row" alignItems="center">
              {showChallenge === true ? (
                <Challenge
                  opponent={fullName}
                  rank={
                    rank === 3 ? (
                      <Icon as={GiRank1} />
                    ) : rank === 2 ? (
                      <Icon as={GiRank2} />
                    ) : rank === 1 ? (
                      <Icon as={GiRank3} />
                    ) : (
                      rank
                    )
                  }
                />
              ) : rank === 3 ? (
                <Icon as={GiRank1} />
              ) : rank === 2 ? (
                <Icon as={GiRank2} />
              ) : rank === 1 ? (
                <Icon as={GiRank3} />
              ) : (
                rank
              )}
            </Td>
            <Td>{showWR ? fullName[0] + ' ' + fullName[1] : name}</Td>
            {showWR === true && (
              <>
                <Td>{key['won'] - 1}</Td>
                <Td>{key['lost'] - 1}</Td>
              </>
            )}
          </Tr>
        );
      });
      setLeaderBoard(ranks);
    };

    const fetchLeaderBoard = async () => {
      const data = await fetch(
        'https://database.deta.sh/v1/b0jecxqg/leaderboard/query',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': API_KEY,
          },
        }
      ).then(response => {
        return response.json();
      });
      populateLeaderBoard(data.items);
    };
    fetchLeaderBoard();
  }, [showWR, showChallenge]);

  const bg = useColorModeValue('light.header', 'dark.header');

  return (
    <TableContainer
      className="tableContainer"
      overflowY="auto"
      bg={bg}
      minHeight="60vh"
      maxHeight="65vh"
      width={width}
    >
      <Table
        overflowY="scroll"
        className="tableContainer"
        size={{ base: 'sm', sm: 'md', md: 'lg', lg: 'lg' }}
      >
        <Thead className="blur" bg={bg} zIndex="100" minHeight="10vh">
          <Tr bg={bg} minHeight="10vh" position="sticky" zIndex="100">
            <Th maxWidth="10%" minHeight="10vh">
              Rank
            </Th>
            <Th>Name</Th>
            {showWR === true && (
              <>
                <Th>Won</Th>
                <Th>Lost</Th>
              </>
            )}
          </Tr>
        </Thead>
        <Tbody>{leaderBoard}</Tbody>
      </Table>
    </TableContainer>
  );
}
