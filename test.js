exports.send_email = async (req,res) => {
    try{
        Urltest = 'http://localhost:3000/kitty';
        Url = 'https://smtp-tufinho.herokuapp.com/kitty';

    var options = {
      uri: Url,
      method: 'POST',
      json: true,
    };
    await rp(options)
    .then(function () {
      process.exit(0);
    });
    }catch(err){
      console.log("sending email")
      console.log(err)
    }
  };