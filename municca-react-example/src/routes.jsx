import { createBrowserRouter } from 'react-router-dom';
import Home from "./pages/Home";

export const routes = createBrowserRouter([
  { element: <Home />, path: '/' }
]);