
const signer = require('nacl-signature');

//base64 encoded secret key
const SecretKey = "AUBsLQhpSElD5LpLPB1p5JfwYHRIWjrsL+jJkHpBzyt+a1zqQLnX2ovt3czYD3TLU8MBE8MzEkhETP/H6y2ETA==";
//base64 encoded public key
const PublicKey = "fmtc6kC519qL7d3M2A90y1PDARPDMxJIREz/x+sthEw=";

class DigitalSigController {

    async sign(req,res){

        let {message} = req.body;
        let signature = signer.sign(message,SecretKey);
        
        return res.send({
            success:true,
            message:signature
        })
    };

    async verify(req,res){

        //in here we can verify the signature 
        const {message,signature} = req.body;
        const verified = signer.verify(message,signature,PublicKey);

        if(verified) return res.send({
            success:true,
            message:'Signature is valid!!'
        });

        return res.send({
            success:false,
            message:'Signature is not valid!!'
        })
    };


};

module.exports = new DigitalSigController();