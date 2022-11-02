import firebase from 'firebase'
import { USER_STATE_CHANGE } from '../constants/index'
import { USER_POSTS_STATE_CHANGE } from '../constants/index'
import { USER_FOLLOWING_STATE_CHANGE } from '../constants/index'
import { USERS_DATA_STATE_CHANGE } from '../constants/index'
import { USERS_POSTS_STATE_CHANGE, CLEAR_DATA } from '../constants/index'
require('firebase/firestore')
//logs if the snapshot exists in the database 
export function clearData() {
    return ((dispatch) => {
        dispatch({type: CLEAR_DATA})
    })
}
export function fetchUser(){
    return((dispatch) => {
        firebase.firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((snapshot) => {
            if(snapshot.exists){
                
                dispatch({type : USER_STATE_CHANGE, currentUser: snapshot.data()})
            }
            else{
                console.log('does not exist')
            }
        })
    })
}

export function fetchUserPosts(){
    return((dispatch) => {
        firebase.firestore()
        .collection("posts")
        .doc(firebase.auth().currentUser.uid)
        .collection("userPosts")
        .orderBy("creation", "asc")
        .get()
        .then((snapshot) => {
            //iterates all the docs inside all of snapshots and creates array for feed
            let posts = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return{id, ...data}
            })
            //console.log(posts)
            dispatch({type : USER_POSTS_STATE_CHANGE, posts})

        })
    })
}

export function fetchUserFollowing(){
    return((dispatch) => {
        firebase.firestore()
        .collection("following")
        .doc(firebase.auth().currentUser.uid)
        .collection("userFollowing")
        .onSnapshot((snapshot) => {
            //iterates all the docs inside all of snapshots and creates array for feed
            let following = snapshot.docs.map(doc => {
                const id = doc.id;
                return id
            })
            //console.log(posts)
            dispatch({type : USER_FOLLOWING_STATE_CHANGE, following})

        })
    })
}

export function fetchUsersData(uid){
    return((dispatch, getState) => {
        const found = getState().usersState.users.some(el => el.uid === uid);

        if(!found){
            firebase.firestore()
        .collection("users")
        .doc(uid)
        .get()
        .then((snapshot) => {
            if(snapshot.exists){
                let user = snapshot.data();
                user.uid = snapshot.id;
                dispatch({type : USERS_DATA_STATE_CHANGE, user});
                dispatch(fetchUsersFollowingPosts(user.id));
            }
            else{
                console.log('does not exist')
            }
        })
        }
    })
}

export function fetchUsersFollowingPosts(uid){
    return((dispatch, getState) => {
        firebase.firestore()
        .collection("posts")
        .doc(uid)
        .collection("userPosts")
        .orderBy("creation", "asc")
        .get()
        .then((snapshot) => {
            //iterates all the docs inside all of snapshots and creates array for feed
            const uid = snapshot.query.EP.path.segments[1];
            console.log({snapshot, uid});
            const user = getState().usersState.users.find(el => el.uid === uid);


            let posts = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return{id, ...data, user}
            })
            //console.log(posts)
            dispatch({type : USERS_POSTS_STATE_CHANGE, posts, uid})
            for(let i = 0; i <following.length; i++){
                dispatch(fetchUsersData(following[i]));
            }

        })
    })
}
