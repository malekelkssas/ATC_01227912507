import { UserRepository } from './user.repository';
import { TagRepository } from './tag.repository';
import { EventRepository } from './event.repository';

const userRepository = UserRepository.getInstance();
const tagRepository = TagRepository.getInstance();
const eventRepository = EventRepository.getInstance();

export { userRepository, tagRepository, eventRepository };