import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  Box,
  Highlight,
  Alert,
  AlertIcon,
  useColorModeValue,
} from '@chakra-ui/react';
import UserGames from '../components/UserGames';
import Board from '../components/Board';
import { Link } from 'react-router-dom';

export default function LeaderBoard() {
  const bg = useColorModeValue('light.sec', 'dark.sec');
  const fg = useColorModeValue('light.fg', 'dark.fg');
  return (
    <Box>
      <Tabs isFitted variant="enclosed" align="center">
        <TabList>
          <Tab _selected={{ color: fg, bg: bg }} borderTopRadius="0.8em">
            Leaderboard
          </Tab>
          <Tab _selected={{ color: fg, bg: bg }} borderTopRadius="0.8em">
            Your Games
          </Tab>
        </TabList>

        <TabPanels minHeight="60vh">
          <TabPanel sx={{ display: 'flex', flexDirection: 'column' }}>
            <Alert
              rounded="full"
              marginBottom="0.5em"
              display="flex"
              flexDir={{ base: 'column', sm: 'column', md: 'row' }}
              gap={{ base: '0', sm: '0', md: '0.5em' }}
              colorScheme="blue"
            >
              <AlertIcon />
              If your result is not present let us know.
            </Alert>
            <Board width="100%" />
          </TabPanel>
          {localStorage.getItem('name') !== null ? (
            <TabPanel>
              <UserGames />
            </TabPanel>
          ) : (
            <TabPanel>
              <Heading>
                <Link to="/join">
                  <Highlight
                    query="Login"
                    styles={{
                      px: '2',
                      py: '1',
                      rounded: 'full',
                    }}
                  >
                    Login to see your games!
                  </Highlight>
                </Link>
              </Heading>
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </Box>
  );
}
