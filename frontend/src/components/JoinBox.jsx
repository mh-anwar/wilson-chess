import {
  Box,
  FormControl,
  Button,
  useToast,
  Select,
  FormLabel,
} from '@chakra-ui/react';
import CustomInput from './CustomInput';
import '../index.css';
import React, { useState } from 'react';
import { HOST } from './constants';
const colours = {
  yellow: 'black',
  orange: 'black',
  blue: 'black',
  red: 'black',
  purple: 'white',
  green: 'white',
  teal: 'white',
  cyan: 'black',
  pink: 'black',
  black: 'pink',
};

export default function JoinBox() {
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [colorInput, setColorInput] = React.useState('');
  const toast = useToast();

  const inputs = [
    {
      label: 'Email Address',
      placeholder: 's20100000@ddsbstudent.ca',
      helper: 'Use your student email',
      type: 'email',
      value: emailInput,
      onChange: e => setEmailInput(e.target.value),
    },
    {
      label: 'Name',
      placeholder: 'John Doe',
      helper: 'Please only enter your real name (first and last)',
      type: 'text',
      value: nameInput,
      onChange: e => setNameInput(e.target.value),
    },
    {
      label: 'Password',
      placeholder: '******',
      helper: '',
      type: 'password',
      value: passwordInput,
      onChange: e => setPasswordInput(e.target.value),
    },
  ];
  function changeSelectColour(event) {
    setColorInput(event.target.value);
    event.target.style.backgroundColor = event.target.value;
    event.target.style.color = colours[event.target.value];
  }
  return (
    <Box className="auth">
      {inputs.map(keys => {
        return <CustomInput options={keys} key={keys.label} />;
      })}
      <FormControl isRequired>
        <FormLabel>Select Profile Colour</FormLabel>
        <Select
          onChange={changeSelectColour}
          isRequired
          placeholder="Select color"
          value={colorInput}
        >
          <option value="black">Black</option>
          <option value="purple">Purple</option>
          <option value="blue">Blue</option>
          <option value="red">Red</option>
          <option value="orange">Orange</option>
          <option value="yellow">Yellow</option>
          <option value="green">Green</option>
          <option value="cyan">Cyan</option>
          <option value="teal">Teal</option>
          <option value="pink">Pink</option>
        </Select>
      </FormControl>
      <FormControl>
        <Button
          onClick={() =>
            createUser(emailInput, nameInput, passwordInput, colorInput, toast)
          }
        >
          Submit
        </Button>
      </FormControl>
    </Box>
  );
}

async function createUser(email, name, password, color, toast) {
  const toastCreator = (title, description, type = 'error') => {
    toast({
      title: title,
      description: description,
      status: type,
      duration: 9000,
      isClosable: true,
    });
  };

  if (email.includes('@ddsbstudent.ca')) {
    let nameLength = name.split(' ').length;
    if (nameLength > 1 && nameLength < 3) {
      let fullName = name.split(' ');
      if ((/\d/.test(fullName[0]) || /\d/.test(fullName[1])) !== true) {
        if (password.length > 6) {
          fetch(HOST + '/authjoin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password, color }),
          })
            .then(data => data.json())
            .then(response => {
              if (response.success === true) {
                localStorage.setItem('name', name);
                localStorage.setItem('passKey', response.passKey);
                toastCreator(
                  'Account created',
                  'You are being redirected to the homepage',
                  'success'
                );
                setTimeout(() => (window.location.href = '/'), 2000);
              } else {
                toastCreator(
                  'You already have an account. Please sign in.',
                  ''
                );
              }
            });
        } else {
          toastCreator(
            'Account not created',
            'Your password must be longer than 6 characters'
          );
        }
      } else {
        toastCreator('Account not created', 'There are numbers in your name');
      }
    } else {
      toastCreator(
        'Account not created',
        'Please use your first and last name'
      );
    }
  } else {
    toastCreator('Account not created', 'Please use your student email');
  }
  return true;
}
