import { UserController } from './user.controller';
import { TagController } from './tag.controller';

const userController = UserController.getInstance();
const tagController = TagController.getInstance();

export { userController, tagController };
