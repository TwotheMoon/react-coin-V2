import { ResetCss } from "./common/css/reset";
import Router from "./routes/Router";
import { themeSelectAtom } from './store/Atom';
import { darkTheme, lightTheme } from './theme';
import { ThemeProvider } from 'styled-components';
import { useRecoilValue } from 'recoil';


function App() {
  const mode = useRecoilValue(themeSelectAtom);

  return (
    <>
      <ThemeProvider theme={mode === "dark" ? darkTheme : lightTheme}>
        <ResetCss />
        <Router />
      </ThemeProvider>
    </>
    );
}

export default App;
