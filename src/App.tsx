import { RouterProvider } from "react-router";
import GetRouter from "./router/GetRouter.tsx";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./styles/theme.ts";

function App() {
    return (
        <ThemeProvider theme={lightTheme}>
            <RouterProvider router={GetRouter}></RouterProvider>
        </ThemeProvider>
    );
}
export default App;
