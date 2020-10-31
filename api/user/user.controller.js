const {DbCreateUser, DbGetUsers,DbGetUsersById,DbUpdateUser,DbDeleteUser,login, DbGetUsersByUsername} = require("./user.service");

const {genSaltSync, hashSync, compareSync} = require("bcrypt");
const {sign} = require("jsonwebtoken");

module.exports = {
    createUser: (req, res) =>{

        const body = req.body;
        if(!req.body || !req.body.username || !req.body.password || !req.body.name || !req.body.role || !req.body.email )
        {
            return res.json({
                status: 0,
                message: "please provide required data"
            });
        }

        DbGetUsersByUsername(req.body.username, (err , resul) => {
           if(err)
           {
            return res.json({
                status: 0,
                message: "db error"
            }); 
           }
           if(resul)
           {
            return res.json({
                status: 0,
                message: "username already exist"
            }); 
           }
           else{
            const salt = genSaltSync(10);
            body.password = hashSync(body.password , salt);
            DbCreateUser(body , (err , result) =>{
                if(err)
                {
                    console.log(err);
                    return res.status(500).json({
                        status: 0,
                        message: "create user database error"
                    });
                }
    
                return res.json({
                    success: 1,
                    data: result
                });
            });
           }
        });

    },
    getUsersById: (req, res )=>{
        const id = req.params.id; 
        DbGetUsersById(id, (err, result)=>{
            if(err){
                console.log(err);
                return;
            }

            if(!result){
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json(
                {
                    success: 1,
                    data: result
                });

        });
    },
    getUsers: (req, res )=>{


        DbGetUsers((err, result)=>{
            console.log("end point hit");
            if(err){
                console.log(err);
                return;
            }
            console.log(result);
            if(!result){
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json(
                {
                    success: 1,
                    data: result
                });

        });
    },
    updateUser: (req, res) =>{

        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password , salt);
        DbUpdateUser(body , (err , result) =>{
            if(err)
            {
                console.log(err);
                return res.status(500).json({
                    status: 0,
                    message: "update user database error"
                });
            }

            return res.status(200).json({
                success: 1,
                message:"updated successfully" 
            });
        });
    },
    deleteUSer: (req, res) =>{
        const body = req.body;
        DbDeleteUser(body , (err , result) =>{
            if(err)
            {
                console.log(err);
                return res.status(500).json({
                    status: 0,
                    message: "delete user  error"
                });
            }

            if(!result){
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return  res.json({
                    success: 1,
                    message: "user deleted successfully"
                });
        });
    },
    login: (req, res) =>{
        const username = req.body.username;

        if(!(req.body && req.body.username && req.body.password))
        {
            return res.json({
                success : 0,
                message: "provide username and password"
            });
   
        }

        login(username , (err , result)=>{
            if(err)
            {
                console.log(err);
                return res.json({
                    success: 0,
                    message : err
                })
            }
            if(!result)
            {
                return res.json({
                    success : 0,
                    message: "username not exist"
                });
       
            }
            console.log(req.body);
            console.log(result);
            const passCompare = compareSync(req.body.password , result[0].password);

            if(passCompare){
                result[0].password = undefined;
             
            }
            else{
                return res.json({
                    success : 0,
                    message: "invalid email or password"
                });

            }
            const jsonweb = sign({result: result[0]},"asimtraders123" , {expiresIn: "1h"})
      
            return res.json({
                success : 1,
                data: result[0],
                token: jsonweb
            });
        });
    }
}