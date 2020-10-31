const {DbCreateAccountancy ,DbGetAccountancy, DbUpdateAccountancy, DbGetAccountancyByDate, DbDeleteAccountancy,DbGetAccountancyByFilter,
    DbGetdulpicateData} = require("./account.service");

module.exports = {
    createAccountancy:(req , res) =>{
        const body = req.body;
        console.log(req.body);
        if(!req.body || !req.body.amount|| !req.body.year|| !req.body.sender || !req.body.receiver || !req.body.source
             || !req.body.carrier || !req.body.date )
        {
            return res.status(500).json({
                success: 0,
                message: "please provide required data"
            });
        }

        DbGetdulpicateData(req.body , (err , result) =>{
            if(err){
                
            return res.status(500).json({
                success: 0,
                message: "db error in duplicate"
            });
            }

            if(result){
                console.log(result)
            return res.status(500).json({
                success: 0,
                message: "same entry already exist"
            });
            }
            else{
                DbCreateAccountancy(req.body , (err , result)=>{
                    if(err){
                                
                    return res.status(500).json({
                        success: 0,
                        message: "please provide required data"
                    });
                    }
                    else{
                        return res.json({
                            success: 1,
                            data: result
                        });
                    }
                });
            }
        })

    },

    updateAccountancy:(req , res) =>{
        if(!req.body || !req.body.amount|| !req.body.year|| !req.body.sender || !req.body.receiver || !req.body.sorce
            || !req.body.carrier || !req.body.date )
       {
           return res.status(500).json({
            success: 0,
               message: "please provide required data"
           });
       }


        DbUpdateAccountancy(req.body , (err , result) =>{
            if(err)
            {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "update accountancy database error"
                });
            }

            return res.status(200).json({
                success: 1,
                message:"updated successfully" 
            });
        });
    },

    deleteAccountancy:(req , res) =>{
        const id = req.body.id;
        DbDeleteAccountancy(id , (err , result) =>{
            if(err)
            {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "delete accountancy  error"
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
                    message: "accountancy deleted successfully"
                });
        });
    },

    getAccountancy:(req , res) =>{

        DbGetAccountancy((err, result)=>{
            console.log("end point hit");
            if(err){
                return res.status(500).json({
                    success: 0,
                    message: "db error"
                });

            }
            console.log(result);
            if(!result){
                return res.status(500).json({
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

    getbyDateAccountancy:(req , res) =>{
        const date = req.params.date; 
        DbGetAccountancyByDate(date, (err, result)=>{
            if(err){
                return res.status(500).json({
                    success: 0,
                    message: "db error"
                });
            }

            if(!result){
                return res.status(500).json({
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
    
    getAccountancyByFilter:(req , res) =>{
        var filter = null , value=null;
        if(req.body.date)
        {
            filter = "date";
            value = req.body.date;
        }
        else if(req.body.type)
        {
            filter = "type";
            value = req.body.type;
        }
        else if(req.body.sender)
        {
            filter = "sender";
            value = req.body.sender;
        }
        DbGetAccountancyByFilter(filter, value,(err, result)=>{
            console.log("end point hit");
            if(err){
                return res.status(500).json({
                    success: 0,
                    message: "db error"
                });

            }
            if(!result){
                return res.status(500).json({
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
    }

};