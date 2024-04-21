import "@/styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux'
import { ToastContainer } from "react-toastify";
import Layout from '../component/layout'
import { store } from "@/redux/store";
export default function App({ Component, pageProps }) {
  return (
    <>


      <Provider store={store} >

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Component {...pageProps} />;

      </Provider>

    </>
  );
}
