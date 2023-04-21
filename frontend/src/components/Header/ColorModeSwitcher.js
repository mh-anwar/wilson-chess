import React from 'react';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { FaRegMoon, FaRegSun } from 'react-icons/fa';

export default function ColorModeSwitcher({ mobile = false }) {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaRegMoon, FaRegSun);

  return (
    <IconButton
      size="md"
      variant={mobile ? 'unstyled' : 'outline'}
      fontSize="lg"
      aria-label={`Switch to ${text} mode`}
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
    />
  );
}
