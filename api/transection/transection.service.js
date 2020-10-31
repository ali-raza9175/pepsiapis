const pool = require("../../config/database")

module.exports =
{

    DbGetStockDetail:(callback) =>{
        pool.query(`select s.id,s.inventoryId, s.stock, i.title, i.size from stock as s INNER JOIN inventory as i ON s.inventoryId = i.id`,[],(err, res , fields) =>{
            if(err)
            {
                callback(err);
            }
            else{
                callback(null, res);
            }
        });  
    },

    DbCreateTransection: (data , callback) => {

    },

    DbGetTransectionByDate: (data , callback) => {

    },

    DbUpdateTransection: (data , callback) => {

    },

    DbGetTransectionByRole:(date , callback) =>{

    },
    DbDeleteTransection:(data, callback)=> {

    }


};
