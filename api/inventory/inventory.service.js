const pool = require("../../config/database")

module.exports =
{

    DbCreateStockDetails:(inventoryId ,callback) =>{
        pool.query(`insert into stock(inventoryId, stock) values(?,?)`,[inventoryId , 0],(err, res , fields) =>{
            if(err)
            {
                callback(err);
            }
            else{
                callback(null, res);
            }
        });
    }, 
    DbCreateInventory: (data , callback) => {
        pool.query(`insert into inventory(title, price, size) values(?,?,?)`,[data.title , data.price, data.size],(err, res , fields) =>{
            if(err)
            {
                callback(err);
            }
            else{
                callback(null, res);
            }
        });
    },

    DbgetInventories: callback => {
        pool.query(`select id,title, price, size from inventory`,[],(err, res , fields) =>{
            if(err)
            {
                callback(err);
            }
            else{
                callback(null, res);
            }
        });
    },

    DbUpdateInventory: (data , callback) => {
        pool.query(`update inventory set title=? , price=? , size=?`,[data.title , data.price , data.sieze],(err, res , fields) =>{
            if(err)
            {
                callback(err);
            }
            else{
                callback(null, res);
            }
        });
    },

    DbGetInventory:(id, callback) =>{
        pool.query(`select title, price, size from inventory where id=?`,[id],(err, res , fields) =>{
            if(err)
            {
                callback(err);
            }
            else{
                callback(null, res[0]);
            }
        });
    },
    DbDeleteInventory:(data, callback)=> {
        pool.query(`delete  from inventory where id=?`,[id],(err, res , fields) =>{
            if(err)
            {
                callback(err);
            }
            else{
                callback(null, res[0]);
            }
        });
    },
    DbNameInventory:(title, callback)=> {
        pool.query(`select id , title, price, size  from inventory where title=?`,[title],(err, res , fields) =>{
            if(err)
            {
                callback(err);
            }
            else{
                callback(null, res[0]);
            }
        });
    }


};
