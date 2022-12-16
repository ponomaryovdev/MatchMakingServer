class User
{
    _userUid = 'default';
    _username = 'default';
    
    constructor(useruid, username)
    {
        this._userUid =useruid;
        this._username = username;
    }

    toJSON()
    {
        return [this._userUid, this._username];
    }
}

module.exports = User;
