import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import { useAuthContext } from '../context/AuthContext';

const AuthModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, signUp } = useAuthContext();

  const handleSubmit = async () => {
    if (isSignUp) {
      await signUp(email, password);
    } else {
      await signIn(email, password);
    }
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen}>ログイン / サインアップ</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isSignUp ? 'サインアップ' : 'ログイン'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              mb={3}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              mb={3}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              {isSignUp ? 'サインアップ' : 'ログイン'}
            </Button>
            <Button variant="ghost" onClick={onClose}>
              閉じる
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Button onClick={() => setIsSignUp(!isSignUp)} mt={3}>
        {isSignUp ? 'ログイン画面へ' : 'サインアップ画面へ'}
      </Button>
    </>
  );
};

export default AuthModal;
