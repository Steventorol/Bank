import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';



const uri ="mongodb+srv://fstoro:Medellin2024@cluster0.g76fv5y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const connection = mongoose.createConnection(uri);

const AutoIncrement = AutoIncrementFactory(connection);

const AccountSchema= new mongoose.Schema({
    account_number:{
        type:Number,
        unique:true
    },
    customer_document:{
        type:String,
        required:[true,'the invoice number is required']
    },
    opening_date:{
        type:Date,
        required:[true,'The number of quantities is required']
    },
    founds:{
        type:Number,
        required:[true, 'The founds name is required']
    },
    access_key:{
        type:String,
        maxlenght:[4,'max 4 characters']
        
    },
    withdraw_qty:{
        type:Number,
        default:null
    },
    observations:{
        type:String,
        default:null
    }
   
   
})

AccountSchema.plugin(AutoIncrement, {inc_field : 'account_number'});
export default connection.model('Account', AccountSchema, 'Account')

