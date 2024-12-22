import { AppProps } from 'next/app'; // AppProps型をインポート
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '../context/AuthContext';

function MyApp({ Component, pageProps }: AppProps) { // 型をAppPropsに変更
  return (
    <ChakraProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
