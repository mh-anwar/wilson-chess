import { Box, FormControl, Button, useToast } from '@chakra-ui/react';
import '../index.css';
import { useState } from 'react';
import CustomInput from './CustomInput';
import { HOST } from './constants';

export default function LoginBox() {
  const [nameInput, setnameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const toast = useToast();

  const inputs = [
    {
      label: 'Full Name',
      placeholder: 'Jane Doe',
      helper: 'Use your full name',
      type: 'text',
      errorMsg: 'name is required',
      value: nameInput,
      onChange: e => setnameInput(e.target.value),
    },
    {
      label: 'Password',
      placeholder: '******',
      helper: 'Click here to Reset Your Password',
      type: 'password',
      errorMsg: 'Password is required',
      value: passwordInput,
      onChange: e => setPasswordInput(e.target.value),
    },
  ];
  return (
    <Box className="auth">
      {inputs.map(keys => {
        return <CustomInput options={keys} key={keys.label} />;
      })}
      <FormControl>
        <Button onClick={() => createUser(nameInput, passwordInput, toast)}>
          Submit
        </Button>
      </FormControl>
    </Box>
  );
}

async function createUser(name, password, toast) {
  const toastCreator = (title, description, type = 'error') => {
    toast({
      title: title,
      description: description,
      status: type,
      duration: 9000,
      isClosable: true,
    });
  };

  let nameLength = name.split(' ').length;
  if (nameLength > 1 && nameLength < 3) {
    let fullName = name.split(' ');

    if ((/\d/.test(fullName[0]) || /\d/.test(fullName[1])) !== true) {
      if (password.length > 6) {
        fetch(HOST + '/authlogin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, password }),
        })
          .then(data => data.json())
          .then(response => {
            if (response.success === true) {
              localStorage.setItem('name', name);
              localStorage.setItem('passKey', response.passKey);
              toastCreator(
                'Login Successful',
                'You are being redirected to the homepage',
                'success'
              );
              setTimeout(() => (window.location.href = '/'), 2000);
            } else {
              localStorage.removeItem('name');
              localStorage.removeItem('color');
              localStorage.removeItem('passKey');
              toastCreator(response.success, '');
            }
          });
      } else {
        toastCreator(
          'Login Unsuccessful',
          'Your password must be longer than 6 characters'
        );
      }
    } else {
      toastCreator('Login Unsuccessful', 'There are numbers in your name');
    }
  } else {
    toastCreator('Login Unsuccessful', 'Please use your first and last name');
  }
  return true;
}
