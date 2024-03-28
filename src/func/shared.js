
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const handleData = () => {
    return (dispatch) => {
        dispatch(showLoading())
        return getData().then(({ users, questions }) => { dispatch(receiveUsers(users)); dispatch(receiveQuestions(questions)) }).then(() => dispatch(hideLoading()))
    }
}



export const handleNewQuestion = (optionOne, optionTwo) => {
    return (dispatch, getState) => {
  
      let { authUser } = getState()
      let questionId = ''
  
      dispatch(showLoading())
  
      return saveQuestion({ 
        optionOne,
        optionTwo,
        author: authUser.id
      })
        .then((result) => {
          dispatch(addQuestion(result)) 
          questionId = result.id 
          return questionId 
        })
        .then(() => dispatch(addUserQuestion(authUser.id, questionId))) 
        .then(() => {
            dispatch(hideLoading())
            return questionId 
        })
    }
  }


  export const handleVoteAnswer = (questionId, option) => {
    return (dispatch, getState) => {
  
      let { authUser } = getState()
      let answer = {[questionId]: option }
  
      dispatch(showLoading())
  
      return saveQuestionAnswer({ 
        authUser: authUser.id,
        questionId,
        answer: option,
      })
        .then(() => dispatch(updateVotes(questionId, option, authUser.id)))
        .then(() => dispatch(addUserAnswer(authUser.id, answer))) 
        .then(() => dispatch(hideLoading()))
    }
  }