import { BrowserRouter } from "react-router-dom";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import store from "@store/store";
import { swEnvVariables, environment } from "@api/environment";
import { createRoot } from "react-dom/client";
import { ensureVariablesExist } from "@utils/env";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import SwTheme from "./theme/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { config } from "@api/ProviderFactory/setup.config";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// markerSDK.loadWidget({
//   project: `${process.env.REACT_APP_MARKER}`,
//   reporter: {
//     email: "frontend@aut.id",
//     fullName: "Āut Expander"
//   }
// });

// Sentry.init({
//   dsn: `https://e8018550ad7742088d62be4084909caf@o1432500.ingest.sentry.io/${process.env.REACT_APP_SENTRY}`,
//   integrations: [new BrowserTracing(), new SentryRRWeb({})],
//   tracesSampleRate: 1.0
// });
const queryClient = new QueryClient();
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={SwTheme}>
          <CssBaseline />
          <Provider store={store}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </Provider>
        </ThemeProvider>
      </StyledEngineProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

ensureVariablesExist(environment, swEnvVariables);
reportWebVitals(null);
