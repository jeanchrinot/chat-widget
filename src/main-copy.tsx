import React from "react"
import ReactDOM from "react-dom/client"

// local imports
import "./index.css"
import App from "./App"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { SocketProvider } from "@/lib/socket-provider"
import { BrowserRouter } from "react-router-dom"
// import style from "bundle-text:./css/index.scss?inline";

const queryClient = new QueryClient()

// inject <style> tag
// let styleDoc = document.createElement('style');
// styleDoc.textContent = style;
// document.head.appendChild(styleDoc);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <SocketProvider>
          <App />
        </SocketProvider>
      </QueryClientProvider>
    </React.StrictMode>
  </BrowserRouter>
)
