import {
  Box,
  IconButton,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react';
import { AiFillHome, AiOutlineHome } from 'react-icons/ai';
import {
  RiTrophyLine,
  RiLoginBoxLine,
  RiTrophyFill,
  RiFilePaperFill,
  RiFilePaperLine,
  RiLoginBoxFill,
} from 'react-icons/ri';
import { Link } from 'react-router-dom';

import ColorModeSwitcher from './ColorModeSwitcher';
import UserAvatar from './UserAvatar';
export default function MobileMenu() {
  const [isMobile] = useMediaQuery('(max-width: 600px)');
  return isMobile ? <Menu /> : <></>;
}
const Menu = () => {
  const bg = useColorModeValue('light.tri', 'dark.tri');
  const isLoggedIn = localStorage.getItem('name');
  let urlPath = window.location.pathname;

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '7vh',
        backgroundColor: bg,
        position: 'sticky',
        bottom: '0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: '0.3em',
        margin: '0',
        zIndex: '100',
      }}
    >
      <Link to="/">
        <IconButton
          variant="unstyled"
          icon={urlPath === '/' ? <AiFillHome /> : <AiOutlineHome />}
          aria-label="Go to Home Page"
        />
      </Link>
      <Link to="/board">
        <IconButton
          variant="unstyled"
          icon={urlPath === '/board' ? <RiTrophyFill /> : <RiTrophyLine />}
          aria-label="Go to Leaderboard"
        />
      </Link>
      <Link to="/instructions">
        <IconButton
          variant="unstyled"
          icon={
            urlPath === '/instructions' ? (
              <RiFilePaperFill />
            ) : (
              <RiFilePaperLine />
            )
          }
          aria-label="Go to Instructions"
        />
      </Link>
      <ColorModeSwitcher mobile="true" />
      {isLoggedIn !== null ? (
        <UserAvatar mobile={true} />
      ) : (
        <>
          <Link to="/join">
            <IconButton
              variant="unstyled"
              icon={
                urlPath === '/join' ? <RiLoginBoxFill /> : <RiLoginBoxLine />
              }
              aria-label="Go to Login page"
            />
          </Link>
        </>
      )}
    </Box>
  );
};
