import { UserRepository } from './user.repository';

const userRepository = UserRepository.getInstance();

export { userRepository };