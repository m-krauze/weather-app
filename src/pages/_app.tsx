import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { NotificationsList } from "@/features/notification/components/NotificationsList";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <NotificationsList />
      <Component {...pageProps} />
    </Provider>
  );
}
