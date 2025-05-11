import { UserService } from './user.service';
import { TagService } from './tag.service';

const userService = UserService.getInstance();
const tagService = TagService.getInstance();

export { userService, tagService };