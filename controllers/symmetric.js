
const crypto = require('crypto');
//specify the algorithm
const algorithm = 'aes-192-cbc';
const password = 'myPassword';
const key = crypto.scryptSync(password,'salt',24);
const iv = Buffer.alloc(16);
const cipher = crypto.createCipheriv(algorithm,key,iv);
const decipher = crypto.createDecipheriv(algorithm,key,iv);

class SymmetricController {

    //all the functionalities shall go here
    async encrypt(req,res){

        //we are converting from a utf8 to a hex
        let {message} = req.body;
        let encoded;
        cipher.on('readable', () => {
            return encoded = cipher.read();
        })
        cipher.write(message);
        cipher.end();

        return res.send({
            success:true,
            message:encoded.toString('hex') //Encoded
        });

    };

    async decrypt(req,res){
        
        //we are converting from an already hex to utf8
        let {message} = req.body; //Cipher
        let decoded;
        decipher.on('readable', () => {
            decoded = decipher.read();
        })
        
        decipher.write(message, 'hex')
        decipher.end();

        return res.send({
            success:true,
            message:decoded.toString('utf8')
        })
    }

};

module.exports = new SymmetricController();