var express = require('express');
var app = express();

app.get('*', function (req, res) {
    var result = {
        ipaddress: null,
        language: null,
        software: null,
    };
    
    result.ipaddress = req.get('X-Forwarded-For');
    
    var languageString = req.get('Accept-Language');
    var idx = languageString.indexOf(',');
    result.language = languageString.substring(0, idx);
    
    var userAgentString = req.get('User-Agent');
    var idxBegin = userAgentString.indexOf('(');
    var idxEnd = userAgentString.indexOf(')');
    result.software = userAgentString.substring(idxBegin+1, idxEnd);
    
    
    res.send(result);
});

app.listen(8080, function () {
    console.log('whoami app listening on port 8080!');
});