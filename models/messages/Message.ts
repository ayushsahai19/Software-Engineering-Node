/**
 * @file Declares Like data type representing relationship between
 * users and messages, as in user sends a tuit
 */
 import User from "../users/User";

 /**
  * @typedef Message Represents message relationship between a user and a message,
  * as in a user sends a tuit
  * @property {string} message the message which is to be sent
  * @property {User} sentTo the user to which the message is sent
  * @property {User} sentFrom the user who sends the message
  * @property {Date} sentOn the date when the message was sent
  */
 
 export default interface Message {
     message: string,
     sentTo: User,
     sentFrom: User,
     sentOn: Date
 };