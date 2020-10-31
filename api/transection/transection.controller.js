const{DbCreateTransection,DbDeleteTransection,DbGetTransectionByDate,DbGetTransectionByRole,
    DbUpdateTransection,DbGetStockDetail} = require("./transection.service");

    module.exports = {

        createTansection: (req, res) =>{
            var data = new Array();
             
            if(!req.body)
            return;

            req.body.forEach(element => {

                element.check=true
                data.push(element);
                
            });

            data.forEach(element => {

                console.log(element);
            });

            DbGetStockDetail((err , res)=> {
                if(err == null)
                {
                    res.forEach(element => {
                        console.log(element);
                    })
                }
            })

            return res.json({
                success:1,
                message:"will be done soon"
            });
        },
        getByDate: (req, res) =>{

        },
        getByRole: (req, res) =>{

        },
        deleteTransection: (req, res) =>{

        },
        updateTransection: (req, res) =>{

        },
        stockDetail: (req, res) =>{

        },
    };