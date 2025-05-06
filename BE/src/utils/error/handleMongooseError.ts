import { IErrorResponse } from "@/types";
import { HTTP_STATUS_CODE, ERROR_MESSAGES, MONGOOSE_ERRORS } from "@/utils";

/**
 * REF: https://www.slingacademy.com/article/how-to-handle-errors-in-mongoose-an-in-depth-guide/
 */

// TEST: need to be tested

export function handleMongooseError(err: any): IErrorResponse {

    const response: IErrorResponse = {
        statusCode: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: err.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    };

  switch (err.name) {
    case MONGOOSE_ERRORS.DUPLICATE_KEY:
      const duplicateField = Object.keys(err.keyValue)[0];
      const duplicateValue = err.keyValue[duplicateField];
      response.message = `Duplicate value '${duplicateValue}' for field '${duplicateField}'`;
      break;
    case MONGOOSE_ERRORS.CAST_ERROR:
      const invalidField = err.path;
      const invalidValue = err.value;
      response.message = `Invalid value '${invalidValue}' for field '${invalidField}'`;
      break;
    case MONGOOSE_ERRORS.VALIDATION_ERROR:
      const invalidFields = Object.keys(err.errors).map(
        (field) => err.errors[field].message
      );
      response.message = invalidFields[0];
      break;
    default:
      response.message = err.message;
  }

  return response;
}