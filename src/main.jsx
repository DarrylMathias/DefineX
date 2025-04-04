import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "./components/ui/provider";
import { ColorModeProvider,  } from "./components/ui/color-mode.jsx";

createRoot(document.getElementById("root")).render(
  <Provider>
     <ColorModeProvider>
    <StrictMode>
      <App />
    </StrictMode>
    </ColorModeProvider>
  </Provider>
);
