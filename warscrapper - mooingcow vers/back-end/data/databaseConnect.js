var mysql=require('mysql');

var dbConnect={
    getConnection:function(){
        var conn=mysql.createConnection({
            host:"localhost",
            user:"root",
            password:"indigo1alpha",
            database:"warframe_db"
        });
        return conn;
    }
}

module.exports=dbConnect;