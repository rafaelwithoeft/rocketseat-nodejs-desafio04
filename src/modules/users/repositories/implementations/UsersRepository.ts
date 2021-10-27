import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  /**
   * Get class instance.
   * @returns UsersRepository
   */
  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  /**
   * Create a new user.
   * @param {Object} param
   * @returns {User} user
   */
  create({ name, email }: ICreateUserDTO): User {
    const user = new User();
    Object.assign(user, {
      name,
      email,
      admin: false,
      created_at: new Date(),
      updated_at: new Date(),
    });
    this.users.push(user);
    return user;
  }

  /**
   * Find a user by id.
   * @param {String} id
   * @returns {User|undefined} user
   */
  findById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  /**
   * Find a user by email.
   * @param {String} email
   * @returns {User|undefined} user
   */
  findByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }

  /**
   * Turn user in admin.
   * @param {User} receivedUser user received
   * @returns {User} user
   */
  turnAdmin(receivedUser: User): User {
    const userIndex = this.users.findIndex(
      (user) => user.id === receivedUser.id
    );
    if (userIndex < 0) {
      throw new Error("User not found!");
    }

    this.users[userIndex].admin = true;
    return this.users[userIndex];
  }

  /**
   * Return a list of users.
   * @returns {User[]} users
   */
  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
