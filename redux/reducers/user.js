import { USER_STATE_CHANGE } from "../constants"
import { USER_POSTS_STATE_CHANGE, USER_FOLLOWING_STATE_CHANGE, CLEAR_DATA } from "../constants"

const initalState = {//user is current user 
    currentUser: null,
    //currentUser: 'uggrM1XQ9vYqyKuGmkX4Zy2LE2u1',
    posts: [],
    following: [],
}
export const user = (state = initalState, action) => {
    switch(action.type){
        case USER_STATE_CHANGE:
            return {
                ...state,
                currentUser: action.currentUser
            }
        case USER_POSTS_STATE_CHANGE:
            return {
                ...state,
                posts: action.posts
            }
        case USER_FOLLOWING_STATE_CHANGE:
            return {
                ...state,
                following: action.following
            }
        case CLEAR_DATA:
            return{
                currentUser: null,
                posts: [],
                following: [],
            }
        default:
            return state; 
    }

}