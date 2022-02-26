/**
 * @file implements the interface for Follow controller
 */
import {Request, Response} from "express";

export default interface FollowControllerI{
    followUser (req: Request, res: Response): void;
    unFollowUser (req: Request, res: Response): void;
    findAllUsersFollowing (req: Request, res: Response): void;
    findAllUsersFollowers (req: Request, res: Response): void;
    
}