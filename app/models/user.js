class User
{
    useruid = 'default';
    username = 'default';
    
    constructor(obj){
        obj && Object.assign(this, obj);
    }

    init(useruid, username)
    {
        this.useruid =useruid;
        this.username = username;
    }

    toJSON()
    {
        return { userid: this.useruid, username: this.username };
    }
}

module.exports = User;
