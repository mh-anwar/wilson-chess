import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Radio,
  RadioGroup,
  Stack,
  Heading,
  useToast,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { RiSwordLine } from 'react-icons/ri';
import { HOST } from './constants';

export default function Challenge({ opponent, rank }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [gameResult, setGameResult] = React.useState('won');
  const [gameType, setGameType] = React.useState('checkmate');
  const toast = useToast();
  let userName;
  try {
    userName = localStorage.getItem('name').split(' ');
  } catch (exception) {
    userName = '';
  }
  let objectRank = typeof rank !== 'number';
  return (
    <Box>
      {userName !== '' ? (
        <Button
          onClick={
            userName[0] !== opponent[0] ? onOpen : () => userError(toast)
          }
          gap="0.3em"
          variant="outline"
          bg={objectRank ? 'gold' : ''}
          color={objectRank ? 'black' : ''}
        >
          <RiSwordLine
            height="20px"
            fontWeight={objectRank ? 'bold' : ''}
            aria-label="Challenge"
          />
          <Text height="20px">{rank}</Text>
        </Button>
      ) : (
        rank
      )}

      <Modal
        isCentered
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
        size={{ base: 'full', sm: 'md', md: 'md', lg: 'xl' }}
        zIndex="10000"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Challenge {opponent[0]} {opponent[1]}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            pb={5}
            sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <h3 size="sm">Only winner should report result</h3>
            <>
              <Heading size="md">Game Result:</Heading>
              <RadioGroup onChange={setGameResult} value={gameResult}>
                <Stack direction="row">
                  <Radio value="won">I won</Radio>
                  <Radio isDisabled value="lost">
                    I lost
                  </Radio>
                  <Radio value="draw">Draw</Radio>
                </Stack>
              </RadioGroup>
            </>
            <>
              <Heading size="md">Game Type:</Heading>
              <RadioGroup onChange={setGameType} value={gameType}>
                <Stack direction="row">
                  <Radio value="checkmate">Checkmate</Radio>
                  <Radio value="time">Win on time</Radio>
                  <Radio value="resignation">Resignation</Radio>
                </Stack>
              </RadioGroup>
            </>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() =>
                submitResult(gameResult, gameType, opponent, onClose, toast)
              }
            >
              Submit Result
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

function submitResult(gameResult, gameType, opponent, onClose, toast) {
  const date = new Date();
  let presentTime = date.getTime();

  fetch(HOST + '/gamePlay', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      opponent: window.btoa(opponent),
      gameResult: window.btoa(gameResult),
      gameType: window.btoa(gameType),
      gameDate: presentTime,
      name: window.btoa(localStorage.getItem('name')),
      passKey: window.btoa(localStorage.getItem('passKey')),
    }),
  })
    .then(data => data.json())
    .then(response => {
      onClose();
      if (response.success) {
        toast({
          title: 'Game Submitted.',
          description: 'Refresh to see updated leaderboard.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      } else if (response.failed) {
        toast({
          title: 'Game Not Submitted.',
          description: 'Your login was invalid.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    });
}

function userError(toast) {
  toast({
    title: 'Uh oh...',
    description: 'You cannot challenge yourself!',
    status: 'error',
    duration: 9000,
    isClosable: true,
  });
}
