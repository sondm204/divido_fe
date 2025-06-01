import ReactDOM from "react-dom/client";
import "./index.css";
import "@radix-ui/themes/styles.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { Theme } from "@radix-ui/themes";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
        <Theme >
          <App />
        </Theme>
    </LocalizationProvider>
  </Provider>
);
