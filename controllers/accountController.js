import Account from '../models/account.js' //Importar modelo
import bcrypt from 'bcryptjs'


  
//Método Get
export async function getAccount(req, res) {
            const accounts = await Account.find();
            return res.json(accounts);

}
         

//Método Post
export async function postAccount (req, res)  {
    let msg = 'Account inserted'
    const body = req.body
    
    try {

        const account = new Account(body)
        account.access_key=await bcrypt.hash(body.access_key, 10)
        await account.save() 

    
        
        
    } catch (error) {
        msg = error.message
    }
    
    res.json({ msg: msg })
}

//Método put

export async function putAccount(req,res){
    const {account_number,customer_document}=req.body
    let msg='Account updated'
    try{
        await Account.findOneAndUpdate({account_number:account_number},{customer_document:customer_document})
        
        
} catch(error){
 msg=error
}
res.json({msg:msg})
}


//Método delete
export async function deleteAccount(req,res){
    let msg='Account deleted'
    const id=req.params.id
    try{
        const {founds}=req.body
        if(founds==0){
        await Account.findByIdAndDelete({_id:id})
        }
        else{
            return res.status(400).json({msg:'The found has to be 0'})
        }
    } catch (error) {
        msg='There was a problem while deleting'

    }
    res.json({msg:msg})
}



export async function consign(req, res)  {
    try {
        const { id } = req.body;
        const { founds } = req.body;
    
        // Validar si el saldo es un numero positivo
        if (founds <= 0) {
          return res.status(400).json({ message: 'El saldo debe ser un número positivo' });
        }
    
        // Buscar la cuenta por ID
        const account = await Account.findById(id);
    
        if (!account) {
          return res.status(404).json({ message: 'Cuenta no encontrada' });
        }
    
        // Actualizar el saldo de la cuenta
        account.founds += founds; // Update the saldo property
        await account.save();
        
        res.status(200).json({ message: 'Dinero consignado exitosamente', account });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al consignar dinero' });
      }
    }

    export async function withdraw(req, res)  {
        try {
            const { id } = req.body;
            const { withdraw_qty } = req.body;
        
            // Validar si el saldo es un numero positivo
            if (withdraw_qty < 0 && withdraw_qty > account.founds) {
              return res.status(400).json({ message: 'El saldo a retirar debe ser menor a el saldo de la cuenta' });
            }
        
            // Buscar la cuenta por ID
            const account = await Account.findById(id);
        
            if (!account) {
              return res.status(404).json({ message: 'Cuenta no encontrada' });
            }
        
            // Actualizar el saldo de la cuenta
            account.founds -= withdraw_qty; // Update the saldo property
            await account.save();
            
            res.status(200).json({ message: 'Dinero retirado exitosamente', account });
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al retirar dinero' });
          }
        
        }

 