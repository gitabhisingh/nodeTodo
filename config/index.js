var configValues = require('./config');

module.exports = {
    
    getDbConnectionString: function() {
        return 'mongodb://localhost/nodetodo';
        //return 'mongodb://' + configValues.uname + ':' + configValues.pwd + '@ds023523.mlab.com:23523/nodetodoshine';
    }
    
}