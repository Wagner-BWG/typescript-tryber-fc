import User from '../database/models/UserModel';

class UserService {
  private model = User;

  public async FindOne(email: string): Promise<User []> {
    const response = await this.model.findAll<User>({
      where: {
        email,
      },
      raw: true,
    }) as unknown as User [];

    return response;
  }
}

export default UserService;
