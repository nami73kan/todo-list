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
    // 1. 入力チェック
    if (!email.trim()) {
      alert('メールアドレスを入力してください。'); // Emailが空の場合はアラート表示
      return; // 処理を終了
    }
    if (!password.trim()) {
      alert('パスワードを入力してください。'); // Passwordが空の場合はアラート表示
      return; // 処理を終了
    }
  
    // 2. ログインまたはサインアップ処理
    if (isSignUp) {
      await signUp(email, password);
    } else {
      await signIn(email, password);
    }
    onClose(); // モーダルを閉じる
  };
  

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isSignUp ? 'サインアップ' : 'ログイン'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              mb={3}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              mb={3}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleSubmit}
              width="100%" // 幅調整
            >
              {isSignUp ? 'サインアップ' : 'ログイン'}
            </Button>
            <Button variant="ghost" onClick={onClose}>
              閉じる
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* ボタンを下方に配置 */}
      <div
        style={{
          display: 'flex', // フレックスボックスでレイアウト管理
          flexDirection: 'column', // 縦並びにする
          gap: '10px', // ボタン間の余白を設定
          alignItems: 'center', // 中央揃え
          marginTop: '20px', // 上部に余白を追加
        }}
      >
       <Button
  colorScheme="blue"
  size="sm" // サイズを小さくする
  onClick={onOpen}
  width="auto" // 幅を内容に合わせる
>
  {isSignUp ? 'サインアップ' : 'ログイン'}
</Button>

<Button
  colorScheme="teal"
  size="sm" // サイズを小さくする
  onClick={() => setIsSignUp(!isSignUp)}
  width="auto" // 幅を内容に合わせる
  ml={2} // ボタン間に少し余白を追加
>
  {isSignUp ? 'ログイン画面へ' : 'サインアップ画面へ'}
</Button>

      </div>
    </>
  );
};

export default AuthModal;
