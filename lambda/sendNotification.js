const request = require('superagent');
const Promise  = require('promise');

// Fetch data for endpoint passed in
module.exports = {
    sendNot: function(token, body) {
        var endpoint = `https://api.amazonalexa.com/v1/proactiveEvents/stages/development`
        return request('POST', endpoint)
        .set("content-type", "application/json")
        .set("authorization", `Bearer ${token}`)
        .send(body)
        .then((res) => {
            const responseBody = JSON.stringify(res.body)
            return Promise.resolve(responseBody || {})
        }).catch((err) => {
            const response = JSON.parse(err.response.text);
            console.log(response);
            console.log(response.code);
            if(response.code === 'ACCESS_DENIED') {
                return Promise.resolve(response || {})
            }
            console.log(`${err} triggered for endpoint: ${endpoint}`)
        })
    }
}