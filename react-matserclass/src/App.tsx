
import Router from "./Router";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { ReactQueryDevtools } from 'react-query/devtools'
import { darkTheme, ligtTheme } from "./theme";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";
const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-weight: 300;
  font-family: 'Source Sans Pro', sans-serif;
  background-color:${(props) => props.theme.bgColor};
  color:${(props) => props.theme.textColor};
  line-height: 1.2; 
}
a {
  text-decoration:none;
  color:inherit; 
}
`;
interface DefaultTheme {
  textColor: string;
  bgColor: string;
  accentColor: string;
  HomeColor: string;
}

/*#5.0 Dark Mode part One ~ 5.1 Dark Mode part Two 
  ★Recoil: state management를 위한 해결 > 왜 필요한가 ? 
    1. [index.tsx시트] ThemeProvider > [App.tsx 시트]로 이동 > 이유: 'state'를 사용하기 위해 
    2.[theme.ts시트] 'darkTheme'과 'lightTheme'을 만듬
    3.setState function은 두가지 옵션이 있다
      ①() => setIsDark(true) "vaue를 흘려보낸다 " 
      ② () => setIsDark((current) => !current) "함수를 보낸다"
    4. 정리: [index.tsx시트] 'root'에 'App'을 랜더링 > [App.tsx 시트] Router 컴포넌트에서 prop1 prop2  전달 
            > [Router.tsx 시트] Router function(porp1 prop2 ) > return 'Coins 컴포넌트' prop2 전달 
            > [Coin.tsx시트]에서 function Coin({isDark}:ICoinsProps) return 'Chart 컴포넌트' coinId={coinId} isDark={isDark} 전달
    5. '어플리케이션'이 '다크모드'이면 'Chart' 에서도 dark로 두는거다 > [Chart.tsx시트] theme {mode: isDark? "dark" : "light" }
    7. toggleDark는 'function'인데 argument를 받지 않고 void를 return
    8. ◆'global state management'가 왜 필요한가 ? > global state: 어플리케이션이 특정 value(isDark)에 접근해야 할 때 쓰는거다
     component가 어디에 있던지, 누가 접근하고자 하는지에 상관없이 어플리케이션 전체에서 공유되는 ★state
     예) Header -> (isDark) <- Chart 값을 가져 올수있음 
    9. Recoil 설치&세팅: npm start recoil  > src폴더 > [atom.ts 시트] 만듦 > [index.tsx시트] <RecoilRoot>
    10. ★사용법:export const isDarkAtom = atom({key:isDark, Default: false, }) 
       > [App.tsx시트] const isDark = useRecoilValue(isDarkAtom)
    11.#5.3 atom의 value를 어떻게 수정?    
*/



function App() {
  const isDark = useRecoilValue(isDarkAtom)
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : ligtTheme}>

        <GlobalStyle />
        <Router />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
};

export default App;





