var nodemailer = require('nodemailer');
module.exports.sendMail=function(toAddress,text) {
    return new Promise(function(resolve,reject) {
	var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'expensetracker11@gmail.com ',
            pass: 'expensetracker' 
        }
    });
   
	var mailOptions = {
        from: 'expensetracker11@gmail.com',
        to: toAddress,
        subject: 'Expense Tracker',
        text: text
    };
	transporter.sendMail(mailOptions, function(error, info){
        if(!error){
            console.log(info);
            resolve();
        }else{
            reject();
        }
    });
	});
}
module.exports.generatePassword=function() {
    var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}