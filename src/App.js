import AppRouter from "./routes/routers";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <ToastContainer position="bottom-right"/>
      <AppRouter/>
    </>
  );
}

export default App;
