import { Box, Button, Heading, Text, AspectRatio } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Error() {
  return (
    <Box
      sx={{
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        display: 'flex',
        flexDir: 'column',
        margin: '5em',
        gap: '2em',
      }}
    >
      <Heading>Whoopsie daisy! Seems like there's an error!</Heading>
      <Text fontSize="lg">
        If you were expecting a page, report this error!
      </Text>
      <Link to="/">
        <Button> Go to the Homepage</Button>
      </Link>
      <AspectRatio width="400px" height="560px" ratio={1}>
        <iframe
          title="Daily Chess Puzzle"
          src="https://www.chess.com/daily_puzzle"
          allowtransparency="true"
          frameborder="0"
        ></iframe>
      </AspectRatio>
    </Box>
  );
}
