const Sequelize=require("sequelize");
const db=require("../config/database")

const User=db.define("user",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name:{
        type:Sequelize.STRING
    },
    email:{
        type:Sequelize.STRING
    },
    password:{
        type:Sequelize.STRING
    },
    gender:{
        type:Sequelize.STRING
    },
    age:{
        type:Sequelize.INTEGER
    },
    mobile:{
        type:Sequelize.INTEGER
    },
},{
    timestamps:false
});

module.exports=User;