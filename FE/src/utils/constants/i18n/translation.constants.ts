export class TranslationConstants {
  static readonly APP = {
    WELCOME: 'app.welcome',
    TITLE: 'app.title',
  } as const;

  static readonly AUTH = {
    LOGIN: 'auth.login',
    SIGNUP: 'auth.signup',
    PASSWORD: 'auth.password',
    EMAIL: 'auth.email',
    NAME: 'auth.name',
    LOGIN_SUCCESS: 'auth.login_success',
    LOGIN_FAILED: 'auth.login_failed',
    SIGNUP_SUCCESS: 'auth.signup_success',
    SIGNUP_FAILED: 'auth.signup_failed',
    ALREADY_HAVE_ACCOUNT: 'auth.already_have_account',
    SIGN_IN_LINK: 'auth.sign_in_link',
    DONT_HAVE_ACCOUNT: 'auth.dont_have_account',
    SIGN_UP_LINK: 'auth.sign_up_link',
  } as const;

  static readonly NAV = {
    HOME: 'nav.home',
    EVENTS: 'nav.events',
    DASHBOARD: 'nav.dashboard',
    LOGOUT: 'nav.logout',
    LOGIN: 'nav.login',
  } as const;

  static readonly EVENTS = {
    GET_EVENTS_FAILED: 'events.get_events_failed',
    GET_EVENT_FAILED: 'events.get_event_failed',
    BOOK_EVENT_FAILED: 'events.book_event_failed',
    BOOKED: 'events.booked',
    DETAILS: 'events.details',
    NAME: 'events.name',
    TITLE: 'events.title',
    DESCRIPTION: 'events.description',
    LOCATION: 'events.location',
    PRICE: 'events.price',
    DATE: 'events.date',
    TIME: 'events.time',
    BOOKING_TITLE: 'events.booking_title',
    BOOK: 'events.book',
    UNBOOK: 'events.unbook',
    ALL_EVENTS: 'events.all_events',
    BOOK_EVENT_SUCCESS: 'events.book_event_success',
    UNBOOK_EVENT_SUCCESS: 'events.unbook_event_success',
    BOOKING: 'events.booking',
    ALL_TAGS: 'events.all_tags',
    SEARCH_EVENTS: 'events.search_events',
    NO_EVENTS: 'events.no_events',
    TOTAL_EVENTS: 'events.total_events',
    IMAGE: 'events.image',
    CATEGORY: 'events.category',
    SELECT_CATEGORIES: 'events.select_categories',
    SELECTED: 'events.selected',
    SEARCH_CATEGORIES: 'events.search_categories',
    NO_CATEGORIES: 'events.no_categories',
    CROP_IMAGE: 'events.crop_image',
  } as const;

  static readonly CATEGORIES = {
    NAME: 'categories.name',
    COLOR: 'categories.color',
    NO_CATEGORIES: 'categories.no_categories',
    MANAGE_CATEGORIES: 'categories.manage_categories',
  } as const;

  static readonly COMMON = {
    LOADING: 'common.loading',
    BUTTONS: {
      PREVIOUS: 'common.buttons.previous',
      NEXT: 'common.buttons.next',
      SUBMIT: 'common.buttons.submit',
      CANCEL: 'common.buttons.cancel',
      THEME_TOGGLE: 'common.buttons.theme_toggle',
      EDIT: 'common.buttons.edit',
      DELETE: 'common.buttons.delete',
      ACTIONS: 'common.buttons.actions',
      PAGE: 'common.buttons.page',
      OF: 'common.buttons.of',
      CHOOSE_FILE: 'common.buttons.choose_file',
    },
    MESSAGES: {
      SUCCESS: 'common.messages.success',
      ERROR: 'common.messages.error',
      NOT_FOUND: 'common.messages.not_found',
      SUCCESS_DESCRIPTION: 'common.messages.success_description',
      DELETE_CONFIRMATION_TITLE: 'common.messages.delete_confirmation_title',
      DELETE_CONFIRMATION_DESCRIPTION: 'common.messages.delete_confirmation_description',
    },
  } as const;

  static readonly VALIDATION = {
    REQUIRED: {
      PAGE: 'validation.required.page',
      LIMIT: 'validation.required.limit',
      EMAIL: 'validation.required.email',
      PASSWORD: 'validation.required.password',
      NAME: 'validation.required.name',
    },
    EMAIL: {
      INVALID: 'validation.email.invalid',
      WRONG: 'validation.email.wrong',
    },
    PASSWORD: {
      MIN: 'validation.password.min',
      MAX: 'validation.password.max',
      WRONG: 'validation.password.wrong',
    },
    NAME: {
      MIN: 'validation.name.min',
      MAX: 'validation.name.max',
    },
    EVENT: {
      NAME: {
        EN: {
          REQUIRED: 'validation.event.name.en.required',
          INVALID_TYPE: 'validation.event.name.en.invalid_type',
          MIN_LENGTH: 'validation.event.name.en.min_length',
          MAX_LENGTH: 'validation.event.name.en.max_length'
        },
        AR: {
          REQUIRED: 'validation.event.name.ar.required',
          INVALID_TYPE: 'validation.event.name.ar.invalid_type',
          MIN_LENGTH: 'validation.event.name.ar.min_length',
          MAX_LENGTH: 'validation.event.name.ar.max_length'
        },
        INVALID_TYPE: 'validation.event.name.invalid_type',
        EMPTY: 'validation.event.name.empty',
        REQUIRED_OBJECT: 'validation.event.name.required_object'
      },
      DESCRIPTION: {
        EN: {
          REQUIRED: 'validation.event.description.en.required',
          INVALID_TYPE: 'validation.event.description.en.invalid_type',
          MIN_LENGTH: 'validation.event.description.en.min_length',
          MAX_LENGTH: 'validation.event.description.en.max_length'
        },
        AR: {
          REQUIRED: 'validation.event.description.ar.required',
          INVALID_TYPE: 'validation.event.description.ar.invalid_type',
          MIN_LENGTH: 'validation.event.description.ar.min_length',
          MAX_LENGTH: 'validation.event.description.ar.max_length'
        },
        INVALID_TYPE: 'validation.event.description.invalid_type',
        EMPTY: 'validation.event.description.empty',
        REQUIRED_OBJECT: 'validation.event.description.required_object'
      },
      VENUE: {
        EN: {
          REQUIRED: 'validation.event.venue.en.required',
          INVALID_TYPE: 'validation.event.venue.en.invalid_type',
          MIN_LENGTH: 'validation.event.venue.en.min_length',
          MAX_LENGTH: 'validation.event.venue.en.max_length'
        },
        AR: {
          REQUIRED: 'validation.event.venue.ar.required',
          INVALID_TYPE: 'validation.event.venue.ar.invalid_type',
          MIN_LENGTH: 'validation.event.venue.ar.min_length',
          MAX_LENGTH: 'validation.event.venue.ar.max_length'
        },
        INVALID_TYPE: 'validation.event.venue.invalid_type',
        EMPTY: 'validation.event.venue.empty',
        REQUIRED_OBJECT: 'validation.event.venue.required_object'
      },
      CATEGORY: {
        REQUIRED: 'validation.event.category.required',
        INVALID_TYPE: 'validation.event.category.invalid_type',
        INVALID_ID: 'validation.event.category.invalid_id',
        MIN_ITEMS: 'validation.event.category.min_items',
        MAX_ITEMS: 'validation.event.category.max_items'
      },
      IMAGE_URL: {
        REQUIRED: 'validation.event.image_url.required',
        INVALID_TYPE: 'validation.event.image_url.invalid_type',
        INVALID: 'validation.event.image_url.invalid',
        SIZE: 'validation.event.image_url.size',
        RATIO: 'validation.event.image_url.ratio',
        MIN_DIMENSIONS: 'validation.event.image_url.min_dimensions',
        MAX_DIMENSIONS: 'validation.event.image_url.max_dimensions'
      },
      PRICE: {
        REQUIRED: 'validation.event.price.required',
        INVALID_TYPE: 'validation.event.price.invalid_type',
        MIN: 'validation.event.price.min'
      },
      DATE: {
        REQUIRED: 'validation.event.date.required',
        INVALID_TYPE: 'validation.event.date.invalid_type'
      },
      UPDATE: {
        EMPTY: 'validation.event.update.empty'
      }
    }
  } as const;
  static readonly ADMIN = {
    DASHBOARD: {
      TITLE: 'admin.dashboard.title',
    },
    CATEGORIES: {
      MANAGE_CATEGORIES: 'admin.categories.manage_categories',
      CREATE_CATEGORY: 'admin.categories.create_category',
    },
    EVENTS: {
      MANAGE_EVENTS: 'admin.events.manage_events',
      CREATE_EVENT: 'admin.events.create_event',
      UPDATE_EVENT: 'admin.events.update_event',
    }
  } as const; 
} 