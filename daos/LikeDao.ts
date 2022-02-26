/**
 * @file Implements DAO managing data storage of likes. Uses mongoose likes
 * to integrate with MongoDB
 */
import LikeDaoI from "../interfaces/LikeDaoI";
import LikeModel from "../mongoose/likes/LikeModel";
import Like from "../models/likes/Like";
    /**
     * Class LikeDao implements DAO managing data storage of 
     * likes.
     */
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;
     /**
     * Creates singleton DAO instance
     * @returns LikeDao
     */
    public static getInstance = (): LikeDao => {
        if(LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }
    private constructor() {}
    /**
     * Fetch all the users who liked a tuit
     * @param uid user primary key
     * @return Promise To be notified when the users are fetched
     */
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({tuit: tid})
            .populate("likedBy")
            .exec();
    /**
     * Fetch all the tuits liked by a user
     * @param uid user primary key
     * @return Promise To be notified when the tuits are fetched
     */        
    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel
            .find({likedBy: uid})
            .populate("tuit")
            .exec();
    /**
     * User can like a tuit
     * @param uid user primary key
     * @param tid tuit primary key
     * @return Promise To be notifed when the tuit is liked
     */            
    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({tuit: tid, likedBy: uid});
    /**
     * User can unlike a tuit
     * @param uid user primary key
     * @param tid tuit primary key
     * @return Promise To be notifed when the like is removed
     */    
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({tuit: tid, likedBy: uid});
}