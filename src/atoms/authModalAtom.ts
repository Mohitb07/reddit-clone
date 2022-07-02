import {atom} from 'recoil'

export interface AuthModalState {
    open: boolean;
    view: 'login' | 'signup' | 'resetPassword';
}

const defaultModalState: AuthModalState = {
    open: false,
    view: 'login'
}
export type ModalView = "login" | "signup" | "resetPassword";

export const authModalState = atom<AuthModalState>({
    key: "authModalState",
    default: defaultModalState,
})