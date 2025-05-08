import jwt from "jsonwebtoken";

export const authMiddleware = async (req , res , next ) =>{
    try {
        const token = req.cookie.jwt;

        if(!token){
            return res.status(401).json({
                message:"unauthorized - invalid toke "
            })
        }

         let decoded

         try {
            decoded = jwt.verify(token , process.env.JWT_SECRET)
         } catch (error) {
            return res.status(401).json({
                message:"unauthorized - invalid toke"
            })
         }

        const user = await db.user.findunique({
            where:{
                id: decoded.id
            },
            select:{
                id:true,
                image:true,
                name:true,
                email:true,
                role:true
            }
        })

        if(!user){
            res.status(404).json({
                message:"unser not found"
            })
        }

        req.user = user;
        next()

    } catch (error) {
        console.error("error in user verify", error)
        res.status(500).json({
            error:"error in user verify"
        })
    }
}