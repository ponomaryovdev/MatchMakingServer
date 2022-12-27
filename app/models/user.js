class User
{
    useruid = 'default';
    username = 'default';
    avatarid = 'default'
    
    constructor(obj){
        obj && Object.assign(this, obj);
    }

    toJSON()
    {
        return { userid: this.useruid, username: this.username };
    }
}

module.exports = User;
