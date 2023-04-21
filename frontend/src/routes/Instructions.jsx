import {
  Box,
  Heading,
  IconButton,
  Text,
  Button,
  useMediaQuery,
} from '@chakra-ui/react';
import { RiSwordLine, RiTrophyLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

export default function Instructions() {
  const [isMobile] = useMediaQuery('(max-width: 500px)');
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        padding: '1em',
      }}
      minHeight="80vh"
      maxHeight="90vh"
      gap="0.3em"
    >
      <Heading>How It Works</Heading>
      <Text>
        1. Play your chess game, and <b>if you are the winner</b> click the
        {isMobile ? (
          <IconButton
            icon={<RiTrophyLine />}
            marginLeft="0.5em"
            marginRight="0.5em"
          />
        ) : (
          <Link to="/board">
            <Button variant="outline" marginLeft="0.5em" marginRight="0.5em">
              Play
            </Button>
          </Link>
        )}
        button
      </Text>
      <Text>
        2. Then find your opponents name and click the Challenge button:
        <IconButton
          marginLeft="0.5em"
          marginRight="0.5em"
          icon={<RiSwordLine />}
        />
      </Text>
      <Text>
        3. Submit your result (and refresh the page to see an updated
        leaderboard)
      </Text>
      <Text>4. You're all done! Your game result has been submitted!</Text>
    </Box>
  );
}
