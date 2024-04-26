import "@/styles/globals.css";
// import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux'
import { ToastContainer } from "react-toastify";
import { store } from "@/redux/store";
export default function App({ Component, pageProps }) {
  return (

    <Provider store={store}>

      <Component {...pageProps} />
    </Provider>


  );
}
