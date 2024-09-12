import express, { json } from 'express'
import dbConnect from '../database/config.js'
import '../database/config.js'
import accountRouter from '../routes/accountRoute.js'
import consignRouter from '../routes/consignRoute.js'
import withdrawRouter from '../routes/withdrawRoute..js'





class Server{
    constructor(){
        this.app=express()
        this.listen()
        this.dbConnection()
        this.pathAccount='/api/account'
      
        this.route()
        
        
        
    }
    async dbConnection(){ //Llamar funcion dbConenction a la base de datos
    await dbConnect()
    }

    route(){
        this.app.use(json()) //Parsear datos
        this.app.use(this.pathAccount, accountRouter)
        this.app.use('/consign',consignRouter)
        this.app.use('/withdraw',withdrawRouter)
     
    }
    listen(){
        this.app.listen(process.env.PORT,()=>{
            console.log('Server running')
        })
    }
}

export default Server //Exports the class server
