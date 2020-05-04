
const crypto = require('crypto');
//specify the algorithm
const algorithm = 'aes-256-ctr';
const password = 'myPassword';
// const key = crypto.scryptSync(password,'salt',24);
// const iv = Buffer.alloc(16);
const cipher = crypto.createCipher(algorithm,password);
const decipher = crypto.createDecipher(algorithm,password);

class SymmetricController {

    //all the functionalities shall go here
    async encrypt(req,res){

        //we are converting from a utf8 to a hex
        let {message} = req.body;
        let encoded_message = cipher.update(message,'utf8','hex');
        encoded_message += cipher.final('hex');

        return res.send({
            success:true,
            message:encoded_message
        });

    };

    async decrypt(req,res){
        
        //we are converting from an already hex to utf8
        let {message} = req.body;
        let decoded_message = decipher.update(message,'hex','utf8');
        decoded_message += decipher.final('utf8');


        return res.send({
            success:true,
            message:decoded_message
        })
    }

};

module.exports = new SymmetricController();