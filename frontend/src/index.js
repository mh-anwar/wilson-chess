import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { mode } from '@chakra-ui/theme-tools';
import * as serviceWorker from './serviceWorker';
import Join from './routes/Join';
import LeaderBoard from './routes/LeaderBoard';
import Entry from './routes/Entry';
import Header from './components/Header/Header';
import Footer from './components/Footer';
import Instructions from './routes/Instructions';
import MobileMenu from './components/Header/MobileMenu';
import Error from './components/Error';
import './index.css';
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <Entry />
        <Footer />
        <MobileMenu />
      </>
    ),
    errorElement: <Error />,
  },
  {
    path: '/board',
    element: (
      <>
        <Header />
        <LeaderBoard />
        <Footer />
        <MobileMenu />
      </>
    ),
  },
  {
    path: '/join',
    element: (
      <>
        <Header />
        <Join />
        <Footer />
        <MobileMenu />
      </>
    ),
  },
  {
    path: '/instructions',
    element: (
      <>
        <Header />
        <Instructions />
        <Footer />
        <MobileMenu />
      </>
    ),
  },
]);
const theme = extendTheme({
  initialColorMode: 'dark',
  useSystemColorMode: true,
  colors: {
    dark: {
      header: '#322659',
      bg: '#065666',
      fg: 'white',
      sec: '#182747',
      tri: '#171923',
    },

    light: {
      header: '#c4e7ff',
      bg: '#CDF0EA',
      fg: 'black',
      sec: '#D8D8D8',
      tri: '#ECF9FF',
    },
  },
  styles: {
    global: props => ({
      body: {
        bg: mode('#fafafa', '')(props),
      },
    }),
  },
});
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();
