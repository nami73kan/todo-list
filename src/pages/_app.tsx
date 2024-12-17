import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '../context/AuthContext';
import { TodoProvider } from '../context/TodoContext'; // TodoProvider のインポート

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <TodoProvider>
          <Component {...pageProps} />
        </TodoProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
