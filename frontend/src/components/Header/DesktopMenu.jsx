import { Box, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import ColorModeSwitcher from './ColorModeSwitcher';

import UserAvatar from './UserAvatar';
export default function Menu() {
  return <DesktopMenu />;
}

function DesktopMenu({ headerAction }) {
  let urlPath = window.location.pathname;

  return (
    <Box
      display="flex"
      flexDir="row"
      flexWrap="wrap"
      marginTop="1rem"
      gap="0.5rem"
      alignItems="center"
      justifyContent="center"
    >
      <Link to="/">
        <Button variant={urlPath === '/' ? 'solid' : 'outline'}>Home</Button>
      </Link>
      <Link to="/board">
        <Button variant={urlPath === '/board' ? 'solid' : 'outline'}>
          Play
        </Button>
      </Link>
      <Link to="/instructions">
        <Button variant={urlPath === '/instructions' ? 'solid' : 'outline'}>
          Help
        </Button>
      </Link>
      <ColorModeSwitcher />
      <UserAvatar />
    </Box>
  );
}
