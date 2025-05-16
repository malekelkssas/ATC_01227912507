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
  } as const;

  static readonly COMMON = {
    LOADING: 'common.loading',
    BUTTONS: {
      SUBMIT: 'common.buttons.submit',
      CANCEL: 'common.buttons.cancel',
      THEME_TOGGLE: 'common.buttons.theme_toggle',
    },
    MESSAGES: {
      SUCCESS: 'common.messages.success',
      ERROR: 'common.messages.error',
      NOT_FOUND: 'common.messages.not_found',
      SUCCESS_DESCRIPTION: 'common.messages.success_description',
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
  } as const;
} 