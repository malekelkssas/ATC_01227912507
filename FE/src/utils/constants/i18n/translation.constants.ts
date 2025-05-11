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
    LOGIN_SUCCESS: 'auth.login_success',
    LOGIN_FAILED: 'auth.login_failed',
  } as const;

  static readonly NAV = {
    HOME: 'nav.home',
    EVENTS: 'nav.events',
    DASHBOARD: 'nav.dashboard',
    LOGOUT: 'nav.logout',
    LOGIN: 'nav.login',
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
    },
  } as const;

  static readonly VALIDATION = {
    REQUIRED: {
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