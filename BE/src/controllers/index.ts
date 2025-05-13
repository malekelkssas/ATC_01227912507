import { UserController } from './user.controller';
import { TagController } from './tag.controller';
import { EventController } from './event.controller';

const userController = UserController.getInstance();
const tagController = TagController.getInstance();
const eventController = EventController.getInstance();

export { userController, tagController, eventController };
