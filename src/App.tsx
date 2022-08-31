import React, { useEffect } from "react";
import "./App.css";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/storeConfig/store";
import Toast from "./components/toast/Toast";
import Loader from "./components/Loader";
import AppRoutes from "./routes/AppRoute";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <AppRoutes />
        <Loader />
        <Toast />
      </PersistGate>
    </Provider>
  );
}

export default App;
