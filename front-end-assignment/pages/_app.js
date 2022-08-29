import "../styles/global.css";
import { Provider } from "react-redux";
import store from "../utils/store";

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
