/**
 * @file Declares Like data type representing relationship between
 * users and follow, as in user follow another user
 */
 import User from "../users/User";

 /**
  * @typedef Follow Represents follow relationship between two users,
  * as in a user follows another user
  * @property {User} userFollowed user which is being followed
  * @property {User} userFollowing user to be followed
  */
 export default interface Follow {
     userFollowed: User,
     userFollowing: User
 };