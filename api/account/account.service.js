const pool = require("../../config/database")

module.exports =
{

    DbCreateAccountancy: (data , callback) => {
        pool.query("insert into accounts(amount, sender, receiver, source, carrier, description, year, date , type)  values(?,?,?,?,?,?,?,?,?)",
        [data.amount, data.sender, data.receiver, data.source, data.carrier, data.description, data.year, data.date, data.type],
        ( err, result , fields) => {

            if(err)
            {
                
                console.log(err);
                callback(err);
            }
            else{
                callback(null, result);
            }

        });
    },

    DbGetAccountancy: callback => {
        pool.query("Select id, amount, sender, receiver, source, carrier, description, year, date , type from accounts",
        [],
        ( err, result , fields) => {

            if(err)
            {
                callback(err);
            }
            else{
                callback(null, result);
            }

        });
    },

    DbUpdateAccountancy: (data , callback) => {
        pool.query("update accounts set amount=?, sender=?, receiver=?, source=?, carrier=?, description=?, year=?, date=? , type=?",
        [data.amount, data.sender, data.receiver, data.source, data.carrier, data.description, data.year, data.date, data.type],
        ( err, result , fields) => {

            if(err)
            {
                console.log(err);
                callback(err);
            }
            else{
                callback(null, result);
            }

        });
    },

    DbGetAccountancyByDate:(date , callback) =>{
        pool.query("Select id, amount, sender, receiver, source, carrier, description, year, date, type from accounts where date=?",
        [date],
        ( err, result , fields) => {

            if(err)
            {
                callback(err);
            }
            else{
                callback(null, result);
            }

        });
    },
    DbDeleteAccountancy:(id, callback)=> {
        pool.query("delete from accounts where id=?",
        [id],
        ( err, result , fields) => {

            if(err)
            {
                callback(err);
            }
            else{
                callback(null, result);
            }

        });
    },

    DbGetAccountancyByFilter:(filter , value , callback) =>{
        pool.query(`Select id, amount, sender, receiver, source, carrier, description, year, date , type from accounts where ${filter}=?`,
        [value],
        ( err, result , fields) => {

            if(err)
            {
                callback(err);
            }
            else{
                callback(null, result);
            }

        });
    },

    DbGetdulpicateData:( data , callback) =>{
        pool.query(`Select id, amount, sender, receiver, source, carrier, description, year, date, type from accounts where amount=?
        AND date=? AND carrier=?`,
        [data.amount, data.date, data.carrier],
        ( err, result , fields) => {

            if(err)
            {
                console.log(err);
                callback(err);
            }
            else{
                callback(null, result[0]);
            }

        });
    }


};
