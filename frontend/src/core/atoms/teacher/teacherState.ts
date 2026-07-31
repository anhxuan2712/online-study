import { atom } from "recoil";

export const TeacherState = atom({
    key: 'TEACHER_STATE', // unique ID (with respect to other atoms/selectors)
    default: {
        // isLoading: false,
        // uri: '',
        data: <Array<any>>[],

    }, // default value (aka initial value)
});