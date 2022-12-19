import {v1 as uuidv1} from 'uuid';
export default class Users {
  static async findUserByEmail(email) {
    try {
      var db_res = await global.db.select().table('admin_users').where({ email });
      if (db_res.length === 0) throw new Error('Email or password is wrong');
      return db_res[0];
    } catch (err) {
      console.log(err);
      res.status(500).send
    }
  }
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

}

