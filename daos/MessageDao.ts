/**
 * @file Implements DAO managing data storage of messages. Uses mongoose Message
 * to integrate with MongoDB
 */
 import MessageDaoI from "../interfaces/MessageDaoI";
 import Message from "../models/messages/Message";
 import MessageModel from "../mongoose/messages/MessageModel";
 
 /**
  * @class MessageDao Implements DAO managing of messages
  * @property {MessageDao} messageDao single instance of Message Dao
  */
 export default class MessageDao implements MessageDaoI {
     public static messageDao: MessageDao | null = null
     /**
      * Creates singleton DAO instance
      * @returns MessageDao
      */
     public static getInstance = (): MessageDao => {
         if (MessageDao.messageDao === null) {
             MessageDao.messageDao = new MessageDao();
         }
         return MessageDao.messageDao;
     }
     private constructor() {}
 
     
     /**
      * Delete instance in the database
      * @param {string} sentFrom senders primary key
      * @param {string} sentTo receivers primary key
      * @returns Promise To be notified when messages is deleted
      */
     deleteMessage = async (sentTo: string, sentFrom: string): Promise<any> =>
         MessageModel.deleteOne({sentTo: sentTo, sentFrom: sentFrom});
 
     /**
      * Creates a send instance in the database
      * @param {string} sentFrom sending user's primary key
      * @param {string} sentTo receiving user's primary key
      * @param {string} message message to be sent
      * @returns Promise to be notified when the message is sent
      */
     sendMessage = async (sentTo: string, sentFrom: string, message: Message): Promise<Message> =>
         MessageModel.create({sentTo: sentTo, sentFrom: sentFrom, message: message});
 
     
     /**
      * Uses MessageModel to retrieve the messages received by a user
      * @param {string} uid user's primary key
      * @returns Promise to be notified when messages are fetched
      * from the database
      */
     viewMessagesReceived = async (uid: string): Promise<Message[]> =>
         MessageModel.find({sentTo: uid})
             .populate("sentFrom")
             .exec();
 
     /**
      * Uses MessageModel to fetch all messages sent by a user
      * @param {string} uid user's primary key
      * @returns Promise to be notified when messages are fetched
      * from the database
      */
     viewMessagesSent = async (uid: string): Promise<Message[]> =>
         MessageModel.find({sentFrom: uid})
             .populate("sentTo")
             .exec();
 }