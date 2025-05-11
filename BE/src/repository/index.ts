import { UserRepository } from './user.repository';
import { TagRepository } from './tag.repository';

const userRepository = UserRepository.getInstance();
const tagRepository = TagRepository.getInstance();

export { userRepository, tagRepository };