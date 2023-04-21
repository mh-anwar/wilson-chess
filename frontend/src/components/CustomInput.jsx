import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputRightElement,
  Button,
  InputGroup,
} from '@chakra-ui/react';
import React, { useState } from 'react';

export default function CustomInput({ options }) {
  // Error checking is local, while state is shared
  const [error, setError] = useState(false);

  const handleInputChange = event => {
    let isFilled = event.target.value === '';
    setError(isFilled);
  };

  return (
    <FormControl isRequired isInvalid={error}>
      <FormLabel>{options.label}</FormLabel>
      {options.type === 'text' ? (
        <Input
          variant="outline"
          type="text"
          placeholder={options.placeholder}
          value={options.value}
          onChange={e => {
            options.onChange(e);
            handleInputChange(e);
          }}
        />
      ) : options.type === 'email' ? (
        <Input
          variant="outline"
          type="email"
          placeholder={options.placeholder}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          value={options.value}
          onChange={e => {
            options.onChange(e);
            handleInputChange(e);
          }}
        />
      ) : (
        PasswordInput(options, handleInputChange)
      )}
      {error ? (
        <FormErrorMessage>{options.label} is required</FormErrorMessage>
      ) : (
        <FormHelperText>{options.helper}</FormHelperText>
      )}
    </FormControl>
  );
}

function PasswordInput(options, handleInputChange) {
  const [showPass, setShowPass] = useState(false);
  const handleClick = () => setShowPass(!showPass);
  return (
    <InputGroup>
      <Input
        variant="outline"
        type={showPass ? 'text' : 'password'}
        placeholder={options.placeholder}
        value={options.value}
        onChange={e => {
          options.onChange(e);
          handleInputChange(e);
        }}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {showPass ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
