const Sequelize=require("sequelize");
const db=require("../config/database")

const Passenger=db.define("passenger",{
    p_id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    b_id:{
        type:Sequelize.INTEGER
    },
    name:{
        type:Sequelize.STRING
    },
    age:{
        type:Sequelize.INTEGER
    },
    gender:{
        type:Sequelize.STRING
    },
},{
    timestamps:false
});

module.exports=Passenger;