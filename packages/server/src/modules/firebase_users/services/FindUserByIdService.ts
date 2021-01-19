import firebaseAdmin from '../lib/firebaseAdmin';

class FindUserByIdService {
  public async execute(uid: string): Promise<firebaseAdmin.auth.UserRecord> {
    const user = firebaseAdmin.auth().getUser(uid);

    return user;
  }
}

export default FindUserByIdService;
