import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import Layout from "./layout.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
