import React from "react"
import ReactDOM from "react-dom/client"

// Import prefixed Tailwind CSS
import "./index.css"
import App from "./App"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { SocketProvider } from "@/lib/socket-provider"
import style from "bundle-text:../dist/index.css?inline"

const queryClient = new QueryClient()

function initializeWidget() {
  // inject <style> tag
  let styleDoc = document.createElement("style")
  styleDoc.textContent = style
  document.head.appendChild(styleDoc)

  // Create the widget container
  const widgetContainer = document.createElement("div")
  widgetContainer.id = "chat-widget-container" // Unique ID for the widget
  document.body.appendChild(widgetContainer)
  // widgetContainer.appendChild(styleDoc)

  // Render the React app into the widget container
  ReactDOM.createRoot(widgetContainer).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <SocketProvider>
          <App />
        </SocketProvider>
      </QueryClientProvider>
    </React.StrictMode>
  )
}

initializeWidget()
