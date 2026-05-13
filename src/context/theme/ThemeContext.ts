import {createContext} from "react";

export type ThemeType = "light" | "dark";
export type ThemeContextType = {
    theme: ThemeType;
    // VoidFunction 타입은 () => {} 형태를 나타내는 기본 타입
    // 결국 이 이야기는 ,onChangeTheme 항목(프로퍼티)은 함수가 들어갈 수 있는데,
    // 그 함수는 매개변수가 없고, 리턴도 없는 함수가 들어감

    onChangeTheme: VoidFunction;
};

//  여기까지는 ContextAPI를 선언한게 아니라, 선언할 때 사용할 타입을 지정
// 이렇게 만들어진 ThemeContext는 ThemeContextType의 모양(타입)을 저장한다
export const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    onChangeTheme: () => {},
})

// 사실 이렇게 마련한 ThemeContext의 초기값들은 쓸모가 없음
// 그 저장소의 Type만 맞춰서 값을 집어넣은 것 (dummy)
