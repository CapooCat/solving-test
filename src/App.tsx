import { RouterProvider } from "react-router-dom";
import { router } from "./config/configRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { configQuery } from "./config/configQuery";

const queryClient = new QueryClient(configQuery);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
