const {verify} = require ("jsonwebtoken");

module.exports = {

    checkToken: (req, res, next) =>{
        let token = req.get("authorization");
        if(!token)
        {
            return res.json({
                success: 0,
                message: "access denied: unauthorized user"
            });
        }
        else{
            
            token = token.slice(7);
            console.log(token);
            verify(token , "asimtraders123", (err , data) => {
                if(err)                
                {
                    return res.json({
                        success: 0,
                        message: "access denied: invalid user"
                    });
                }
                next();

            })
        }
    }
};