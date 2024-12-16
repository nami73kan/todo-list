import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '../context/AuthContext';
import AuthModal from '../components/AuthModal';

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <AuthModal />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;

