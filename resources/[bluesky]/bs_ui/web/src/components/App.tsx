import "./App.css";
import { isEnvBrowser } from "../utils/misc";
import { ThemeProvider } from "@mui/material";
import Hud from "./hud";
import Balance from "./balance";
import Interaction from "./interaction";
import Radio from "./radio";
import Theme from "./Theme";


export default function App() {
  return (
    <ThemeProvider theme={Theme}>
      <div className="nui-wrapper">
        <div
          style={{
            position: "absolute",
            display: isEnvBrowser() ? "" : "none",
            backgroundColor: "rgb(144, 180, 212)",
            width: "100%",
            height: "100%",
          }}
        />
        <Hud />
        <Balance />
        <Interaction />
        <Radio />
      </div>
    </ThemeProvider>
  );
}
