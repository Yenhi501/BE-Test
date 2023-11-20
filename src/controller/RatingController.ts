import { Request, Response } from 'express';
import Container from 'typedi';
import { ICommentService } from '../services/Interfaces/ICommentsService';
import { CommentService } from '../services/CommentService';
import { IRatingService } from '../services/Interfaces/IRatingSerivce';
import { RatingService } from '../services/RatingService';

export class RatingController{
	private ratingService: IRatingService;

	constructor() {
		this.ratingService = Container.get(RatingService);
	}

    addRating = async (req: Request, res: Response) => {
        try {
            // kiem tra la user da xem movie chua moi duoc danh gia (Vi du user mua vip ms dc danh gia nhung movie vip)
            const userId = Number(req.payload.userId);
            if(!userId){
                return res.status(401).json({message:"Unauthorized"});
            }
            const movieId = req.body.movieId;
            const rating = req.body.rating;

            const result = await this.ratingService.addRating(userId, movieId, rating);
            if(result){
                return res.status(200).json({
                    message:'Successfully rated the movie',
                });
            }else{
                return res.status(403).json({
                    message: "Users can only rate a movie once"
                });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Server Error",
            })
        }
    }    
}