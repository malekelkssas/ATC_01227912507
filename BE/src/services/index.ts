import { UserService } from './user.service';
import { TagService } from './tag.service';
import { EventService } from './event.service';

const userService = UserService.getInstance();
const tagService = TagService.getInstance();
const eventService = EventService.getInstance();

export { userService, tagService, eventService };