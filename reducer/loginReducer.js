import { useReducer } from 'react'

export default function loginReducer() {

    const initialState = {
        accessToken: "",
        authCode: "",
        exp: "",
        expRef: "",
        idToken: "",
        refreshToken: "",
        sessionId: "",
        username: ""
    }

    /**
     * 
     * @param state 
     * @param action 
     * @returns 
     */
    const loginReducer = (state, action) => {
        return {
            ...state,
            [action.stateName]: action.payload,
        };
    }

    //
    const useLoginReducer = useReducer(loginReducer, initialState);

    //
    return {
        initialState,
        useLoginReducer
    }
}
