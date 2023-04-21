import { Avatar, Button, IconButton } from '@chakra-ui/react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function UserAvatar({ mobile = false }) {
  let userName = localStorage.getItem('name');
  let passKey = localStorage.getItem('passKey');
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');

  return userName !== null && passKey !== null ? (
    <Menu isLazy={true} closeOnBlur={true}>
      <MenuButton
        as={IconButton}
        variant="outline"
        aria-label="Acccount Options"
      >
        <Avatar
          userSelect="none"
          bg="inherit"
          color="inherit"
          size="sm"
          name={userName}
        />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={logout}>Logout</MenuItem>
        <MenuItem onClick={toggleColorMode}>Enable {text} mode</MenuItem>
      </MenuList>
    </Menu>
  ) : (
    <Link to="/join">
      <Button variant="outline">Join</Button>
    </Link>
  );
}
function logout() {
  if (window.confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('name');
    localStorage.removeItem('passKey');
    window.location.reload();
  }
}

// Old code to actually retreive an avatar
/*
import { useEffect, useState } from 'react';
import { HOST } from '../constants';
  const [avatar, setAvatar] = useState(
    <Link href="/join">
      <Button variant="outline">Join</Button>
    </Link>
  );

  useEffect(() => {
    const evalRes = (response, userName) => {
      if (response.userSignedIn === true) {
        setAvatar(
          <Menu isLazy={true} closeOnBlur={true}>
            <MenuButton
              as={Avatar}
              aria-label="Options"
              userSelect="none"
              size="sm"
              name={userName}
              bg={response.color}
            />
            <MenuList>
              <MenuItem onClick={logout}>Logout</MenuItem>
              <MenuItem onClick={toggleColorMode}>Enable {text} mode</MenuItem>
            </MenuList>
          </Menu>
        );
      }
    };
    const checkLogin = async () => {
      let userName = localStorage.getItem('name');
      let passKey = localStorage.getItem('passKey');
      if (userName !== null && passKey !== null) {
        let data = { userName: [userName], passKey: passKey };
        const auth = await fetch(HOST + '/userCheck', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then(data => {
            return data.json();
          })
          .then(response => {
            localStorage.setItem('color', response.color);
            return response;
          });

        evalRes(auth, userName);
      } else {
        evalRes(false, userName);
      }
    };
    checkLogin();
  }, []);
*/
