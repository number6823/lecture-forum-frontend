// // Enum 타입

// // enum 키워드를 통해서 타입을 작성하는 방법이 2년 전까지는 통용되었음
// 이렇게 만든 GenderType은 객체도 괴고, 타입도 되었음
// 객체(값)으로 사용할 때에는  GenderType.MALE
// 타입으로 사용할 때는 GenderType
// enum GenderType {
//     MALE= "MALE",
//     FEMALE = "FEMALE",
// }

export const Gender = {
    MALE: "MALE",
    FEMALE: "FEMALE",
}

export type GenderType = typeof Gender[keyof typeof Gender];
// typeof 키쿼드 : 해당 변수 에 타입을 반환
// keyof 키워드 : 해당 객체의 키를 반환

export const Role = {
    USER : "USER",
    ADMIN : "ADMIN",
}

export type RoleType = typeof Role[keyof typeof Role];


export interface  User {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    username: string;
    name: string;
    nickname: string;
    email: string;
    phoneNumber: string | null;
    birthdate: Date | null;
    gender: GenderType;
    role: RoleType;
}