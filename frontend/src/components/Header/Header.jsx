import { Box, Image, useColorModeValue, useMediaQuery } from '@chakra-ui/react';
import { LinkBox, LinkOverlay } from '@chakra-ui/react';
import HeaderLogo from './header.svg';
import DesktopMenu from './DesktopMenu';
import { Link } from 'react-router-dom';

export default function Header() {
  const bg = useColorModeValue('light.header', 'dark.header');
  const [isDesktop] = useMediaQuery('(min-width: 600px)');
  const mainStyle = { base: '2rem', sm: '3rem', md: '5rem', lg: '5rem' };

  return (
    <Box
      display="flex"
      flexDir={{ base: 'column', sm: 'column', md: 'row', lg: 'row' }}
      alignItems="center"
      justifyContent="space-between"
      paddingLeft={mainStyle}
      paddingRight={mainStyle}
      padding="1rem"
      minHeight="5vh"
    >
      <LinkBox as="h1">
        <LinkOverlay as={Link} to="/">
          <Image
            rel="preload"
            loading="eager"
            src={HeaderLogo}
            filter={bg === 'light.header' ? '' : 'invert()'}
            minHeight="5vh"
            maxHeight="8vh"
          />
        </LinkOverlay>
      </LinkBox>
      {isDesktop && <DesktopMenu />}
    </Box>
  );
}
