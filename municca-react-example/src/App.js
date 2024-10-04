import './globals.css';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { routes } from './routes';
import { RouterProvider } from 'react-router-dom';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
    </QueryClientProvider>

  );
}

export default App;
