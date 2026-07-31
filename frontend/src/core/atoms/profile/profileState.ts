import { atom } from "recoil";

export const ProfileState = atom({
    key: 'PROFILE_STATE', // unique ID (with respect to other atoms/selectors)
    default: {
        // isLoading: false,
        // uri: '',
        user: <any>{},

    }, // default value (aka initial value)
});