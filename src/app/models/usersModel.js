const db = require('../../utilities/db');
const TBL_USERS = 'users';
module.exports = {
    addAccount: function (entity) {
        return db.addacc(TBL_USERS, entity);
    },
    singleByEmail: async function (email) {
        const rowUser = await db.load(`select * from ${TBL_USERS} where email = '${email}'`);
        if (rowUser.length === 0) {
            return null;
        }
        return rowUser[0];
    },
};