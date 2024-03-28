import { USERS_RECIVE, USER_QUESTION_ADD } from "../utils/constants"

export const users = (state = {}, action) => {
    switch (action.type) {
        case USERS_RECIVE:
            return { ...state, ...action.users }
        case ADD_USER_ANSWER:
            return {
                ...state, [action.userId]: { ...state[action.userId], answers: { ...state[action.userId].answers, ...action.answer } }
            }
        case USER_QUESTION_ADD:
            return {
                ...state,
                [action.userId]: { ...state[action.userId], questions: state[action.userId].questions.concat([action.questionId]) }
            }
        default:
            return state
    }
}
