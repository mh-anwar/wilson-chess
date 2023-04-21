import { Box, Text, Link } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Box
      sx={{
        textAlign: 'center',
      }}
    >
      <Text fontSize="md">
        Frontend developer{' '}
        <Link isExternal href="https://github.com/koolkrish18">
          <u>Krish Nalam</u>
        </Link>
        , backend developer{' '}
        <Link isExternal href="https://github.com/mh-anwar">
          <u>Mohammad Anwar</u>
        </Link>
      </Text>
    </Box>
  );
}
