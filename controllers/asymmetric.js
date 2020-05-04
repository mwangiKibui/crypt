const nacl = require('tweetnacl');
nacl.util = require('tweetnacl-util');

const bob = nacl.box.keyPair();
const alice = nacl.box.keyPair();


class AsymmetricController {

    //all the functionalitiies shall be here
    async encryptDecrypt(req,res){

        //generating a one time nonce for encryption
        const nonce = nacl.randomBytes(24);
        //the message we have
        const {message} = req.body;
        //Bob encrypts message for Alice
        const box = nacl.box(
            nacl.util.decodeUTF8(message),
            nonce,
            alice.publicKey,
            bob.secretKey
        );
        //send the message to alice
        const _message = {box,nonce};
        
        //on Alice side 
        const payload = nacl.box.open(_message.box,_message.nonce,bob.publicKey,alice.secretKey);
        const utf8 = nacl.util.encodeUTF8(payload);


        return res.send({
            success:true,
            message:utf8
        });

    };


};

module.exports = new AsymmetricController();