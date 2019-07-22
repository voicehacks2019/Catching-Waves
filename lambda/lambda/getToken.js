const request = require('superagent');
const Promise  = require('promise');

// Fetch data for endpoint passed in
module.exports = {
    send: function() {
        var endpoint = `https://api.amazon.com/auth/o2/token`
        return request('POST', endpoint)
        .set("content-type", "application/x-www-form-urlencoded")
        .send("grant_type", 'client_credentials')
        .send('client_id', 'amzn1.application-oa2-client.3bbea059136347c9a221809e9757835b')
        .send('client_secret', 'e8abd567362085d46ad4e4396dc547ca82181952c0cf77fa2cefe1052493143d')
        .send('scope', 'alexa::proactive_events')
        .then((res) => {
            const responseBody = JSON.stringify(res.body)
            return Promise.resolve(responseBody || {})
        }).catch((err) => {
           
            console.log(`${err} triggered for endpoint: ${endpoint}`)
        })
    }
}