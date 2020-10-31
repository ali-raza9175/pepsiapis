const pool = require("../../config/database");

module.exports = {
    DbCreateUser: (data , callback) => {
         pool.query(
             'insert into user(username, password, name, email, role, phone_number, dob) values(?,?,?,?,?,?,?)',
             [data.username , data.password, data.name, data.email, data.role, data.phone_number, data.dob],
             (error, result, fields) => {
                 if(error){
                 return callback(error)
                 }
                 return callback(null, result);                 
             }
         );
    },

    DbGetUsers: callback =>{
        pool.query(
            'select id, username, name, email, role, phone_number, dob from user',
            [], (error, result, fields)=>{
                if(error){
                return callback(error);
                }
                return callback(null, result);
            }
        );
    },

    DbGetUsersById: (id,callback) =>{
        pool.query(
            'select id, username, name, email, role, phone_number, dob from user where id=?',
            [id], (error, result)=>{
                if(error){
                return callback(error);
                }
                return callback(null, result[0]);
            }
        );
    },
    DbGetUsersByUsername: (username,callback) =>{
        pool.query(
            'select id, username, name, email, role, phone_number, dob from user where username=?',
            [username], (error, result)=>{
                if(error){
                return callback(error);
                }
                return callback(null, result[0]);
            }
        );
    },

    DbUpdateUser: (data , callback) => {
        pool.query(
            'update user set username=?, password=?, name=?, email=?, role=?, phone_number=?, dob=? where id=?',
            [data.username , data.password, data.name, data.email, data.role, data.phone_number, data.dob,data.id],
            (error, result, fields) => {
                if(error){
                return callback(error)
                }
                return callback(null, result);                 
            }
        );
   },

   DbDeleteUser: (data , callback) => {
    pool.query(
        'delete from user where id=?',
        [data.id],
        (error, result, fields) => {
            if(error){
            return callback(error)
            }
            return callback(null, result);                 
        }
    );
},

login: (username , callback)=> {
    pool.query(
        'select * from user where username=?',[username],
        (err, result) =>{
            console.log(result);
            console.log(err);
            if(!err && result.length >0)
            {
                return callback(null,result);

            }
            return callback(err);

        }
    );
}
};