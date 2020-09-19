module.exports = {
    dialect:'mysql',
    host:'localhost',
    username:'cliente',
    password:'135326',
    database:'wkfree',
    port:process.env.BD_PORTA,   
    define:{
        timestamps:true,
        underscored:true
    } 
}

