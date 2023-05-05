const path = require("path")
const crypto = require("crypto")

class User {

    constructor(name, email, password, sex, preferences) {
        this.id = -1
        this.name = name
        this.email = email
        this.password = crypto.createHash('md5').update(password).digest('hex');
        this.sex = sex
        this.preferences = preferences //key-value pairs based off survey questions

    }


}

class School {

    constructor(name,prefResponse){
        this.id = -1
        this.name = name
        this.prefResponse = prefResponse //key-value pairs based of survey questions
    }
}

module.exports = {school:School,user:User }