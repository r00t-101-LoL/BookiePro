// List all the actions type used in the app here
export default {
  // Asset Actions
  ASSET_ADD_OR_UPDATE_ASSETS: 'ASSET_ADD_OR_UPDATE_ASSETS',
  ASSET_SET_GET_ASSETS_BY_IDS_LOADING_STATUS: 'ASSET_SET_GET_ASSETS_BY_IDS_LOADING_STATUS',
  // App Actions
  APP_SET_GLOBAL_BETTING_STATISTICS: 'APP_SET_GLOBAL_BETTING_STATISTICS',
  APP_SET_GET_GLOBAL_BETTING_STATISTICS_LOADING_STATUS: 'APP_SET_GET_GLOBAL_BETTING_STATISTICS_LOADING_STATUS',
  APP_SET_CONNECT_TO_BLOCKCHAIN_LOADING_STATUS: 'APP_SET_CONNECT_TO_BLOCKCHAIN_LOADING_STATUS',
  APP_SET_CONNECTION_STATUS: 'APP_SET_CONNECTION_STATUS',
  APP_SET_BLOCKCHAIN_DYNAMIC_GLOBAL_PROPERTY: 'APP_SET_BLOCKCHAIN_DYNAMIC_GLOBAL_PROPERTY',
  APP_SET_BLOCKCHAIN_GLOBAL_PROPERTY: 'APP_SET_BLOCKCHAIN_GLOBAL_PROPERTY',
  APP_SET_CONNECT_TO_BLOCKCHAIN_ERROR: 'APP_SET_CONNECT_TO_BLOCKCHAIN_ERROR',
  APP_SET_GET_GLOBAL_BETTING_STATISTICS_ERROR: 'APP_SET_GET_GLOBAL_BETTING_STATISTICS_ERROR',
  APP_SHOW_LOGOUT_POPUP: 'APP_SHOW_LOGOUT_POPUP',
  APP_SHOW_SOFTWARE_UPDATE_POPUP: 'APP_SHOW_SOFTWARE_UPDATE_POPUP',
  APP_SHOW_NOTIFICATION_CARD: 'APP_SHOW_NOTIFICATION_CARD',
  APP_SET_TITLE_BAR_TRANSPARENCY: 'APP_SET_TITLE_BAR_TRANSPARENCY',
  APP_SET_GATEWAY_ACCOUNT: 'APP_SET_GATEWAY_ACCOUNT',
  // Auth actions
  AUTH_SET_AUTO_LOGIN_LOADING_STATUS: 'AUTH_SET_AUTO_LOGIN_LOADING_STATUS',
  AUTH_SET_AUTO_LOGIN_ERRORS: 'AUTH_SET_AUTO_LOGIN_ERRORS',
  AUTH_SET_SIGNUP_LOADING_STATUS: 'AUTH_SET_SIGNUP_LOADING_STATUS',
  AUTH_SET_SIGNUP_ERRORS: 'AUTH_SET_SIGNUP_ERRORS',
  AUTH_SET_LOGIN_LOADING_STATUS: 'AUTH_SET_LOGIN_LOADING_STATUS',
  AUTH_SET_LOGIN_ERRORS: 'AUTH_SET_LOGIN_ERRORS',
  AUTH_SET_CHANGE_PASSWORD_LOADING_STATUS: 'AUTH_SET_CHANGE_PASSWORD_LOADING_STATUS',
  AUTH_SET_CHANGE_PASSWORD_ERRORS: 'AUTH_SET_CHANGE_PASSWORD_ERRORS',
  AUTH_LOGOUT: 'AUTH_LOGOUT',
  // Sport Actions
  SPORT_SET_GET_ALL_SPORTS_LOADING_STATUS: 'SPORT_SET_GET_ALL_SPORTS_LOADING_STATUS',
  SPORT_ADD_OR_UPDATE_SPORTS: 'SPORT_ADD_OR_UPDATE_SPORTS',
  SPORT_SET_GET_SPORTS_BY_IDS_LOADING_STATUS: 'SPORT_SET_GET_SPORTS_BY_IDS_LOADING_STATUS',
  SPORT_REMOVE_SPORTS_BY_IDS: 'SPORT_REMOVE_SPORTS_BY_IDS',
  // Event Group Actions
  EVENT_GROUP_ADD_OR_UPDATE_EVENT_GROUPS: 'EVENT_GROUP_ADD_OR_UPDATE_EVENT_GROUPS',
  EVENT_GROUP_SET_GET_EVENT_GROUPS_BY_IDS_LOADING_STATUS: 'EVENT_GROUP_SET_GET_EVENT_GROUPS_BY_IDS_LOADING_STATUS',
  EVENT_GROUP_REMOVE_EVENT_GROUPS_BY_IDS: 'EVENT_GROUP_REMOVE_EVENT_GROUPS_BY_IDS',
  // Competitor Actions
  COMPETITOR_ADD_OR_UPDATE_COMPETITORS: 'COMPETITOR_ADD_OR_UPDATE_COMPETITORS',
  COMPETITOR_SET_GET_COMPETITORS_BY_IDS_LOADING_STATUS: 'COMPETITOR_SET_GET_COMPETITORS_BY_IDS_LOADING_STATUS',
  COMPETITOR_SET_GET_COMPETITORS_BY_SPORT_IDS_LOADING_STATUS: 'COMPETITOR_SET_GET_COMPETITORS_BY_SPORT_IDS_LOADING_STATUS',
  COMPETITOR_REMOVE_COMPETITORS_BY_IDS: 'COMPETITOR_REMOVE_COMPETITORS_BY_IDS',
  // Event Actions
  EVENT_SET_GET_EVENTS_BY_SPORT_IDS_LOADING_STATUS: 'EVENT_SET_GET_EVENTS_BY_SPORT_IDS_LOADING_STATUS',
  EVENT_SET_GET_EVENTS_BY_IDS_LOADING_STATUS: 'EVENT_SET_GET_EVENTS_BY_IDS_LOADING_STATUS',
  EVENT_ADD_OR_UPDATE_EVENTS: 'EVENT_ADD_OR_UPDATE_EVENTS',
  EVENT_REMOVE_EVENTS_BY_IDS: 'EVENT_REMOVE_EVENTS_BY_IDS',
  EVENT_SET_SEARCH_EVENTS_LOADING_STATUS: 'EVENT_SET_SEARCH_EVENTS_LOADING_STATUS',
  EVENT_SET_SEARCH_RESULT: 'EVENT_SET_SEARCH_RESULT',
  EVENT_SET_SEARCH_EVENTS_ERROR: 'EVENT_SET_SEARCH_EVENTS_ERROR',
  // Betting Market Group Actions
  BETTING_MARKET_GROUP_ADD_OR_UPDATE_BETTING_MARKET_GROUPS: 'BETTING_MARKET_GROUP_ADD_OR_UPDATE_BETTING_MARKET_GROUPS',
  BETTING_MARKET_GROUP_REMOVE_BETTING_MARKET_GROUPS_BY_IDS: 'BETTING_MARKET_GROUP_REMOVE_BETTING_MARKET_GROUPS_BY_IDS',
  BETTING_MARKET_GROUP_SET_GET_BETTING_MARKET_GROUPS_BY_IDS_LOADING_STATUS: 'BETTING_MARKET_GROUP_SET_GET_BETTING_MARKET_GROUPS_BY_IDS_LOADING_STATUS',
  // Betting Market  Actions
  BETTING_MARKET_ADD_OR_UPDATE_BETTING_MARKETS: 'BETTING_MARKET_ADD_OR_UPDATE_BETTING_MARKETS',
  BETTING_MARKET_REMOVE_BETTING_MARKETS_BY_IDS: 'BETTING_MARKET_REMOVE_BETTING_MARKETS_BY_IDS',
  BETTING_MARKET_SET_GET_BETTING_MARKETS_BY_IDS_LOADING_STATUS: 'BETTING_MARKET_SET_GET_BETTING_MARKETS_BY_IDS_LOADING_STATUS',
  // Bet Actions
  BET_SET_GET_ONGOING_BETS_LOADING_STATUS: 'BET_SET_GET_ONGOING_BETS_LOADING_STATUS',
  BET_SET_GET_ONGOING_BETS_ERROR: 'BET_SET_GET_ONGOING_BETS_ERROR',
  BET_SET_GET_RESOLVED_BETS_LOADING_STATUS: 'BET_SET_GET_RESOLVED_BETS_LOADING_STATUS',
  BET_SET_GET_RESOLVED_BETS_ERROR: 'BET_SET_GET_RESOLVED_BETS_ERROR',
  BET_SET_MAKE_BETS_LOADING_STATUS: 'BET_SET_MAKE_BETS_LOADING_STATUS',
  BET_SET_MAKE_BETS_ERROR: 'BET_SET_MAKE_BETS_ERROR',
  BET_SET_CANCEL_BETS_BY_IDS_LOADING_STATUS: 'BET_SET_CANCEL_BETS_BY_IDS_LOADING_STATUS',
  BET_SET_CANCEL_BETS_ERROR_BY_BET_ID: 'BET_SET_CANCEL_BETS_ERROR_BY_BET_ID',
  BET_SET_EDIT_BETS_BY_IDS_LOADING_STATUS: 'BET_SET_EDIT_BETS_BY_IDS_LOADING_STATUS',
  BET_SET_EDIT_BETS_ERROR_BY_BET_ID: 'BET_SET_EDIT_BETS_ERROR_BY_BET_ID',
  BET_ADD_OR_UPDATE_ONGOING_BETS: 'BET_ADD_OR_UPDATE_ONGOING_BETS',
  BET_REMOVE_ONGOING_BETS: 'BET_REMOVE_ONGOING_BETS',
  BET_ADD_OR_UPDATE_RESOLVED_BETS: 'BET_ADD_OR_UPDATE_RESOLVED_BETS',
  BET_SET_GET_RESOLVED_BETS_EXPORT_LOADING_STATUS: 'BET_SET_GET_RESOLVED_BETS_EXPORT_LOADING_STATUS',
  BET_ADD_OR_UPDATE_RESOLVED_BETS_EXPORT: 'BET_ADD_OR_UPDATE_RESOLVED_BETS_EXPORT',
  BET_SET_GET_RESOLVED_BETS_EXPORT_ERROR: 'BET_SET_GET_RESOLVED_BETS_EXPORT_ERROR',
  BET_CLEAR_RESOLVED_BETS_EXPORT: 'BET_CLEAR_RESOLVED_BETS_EXPORT',
  // Binned order books actions
  BINNED_ORDER_BOOK_SET_GET_BINNED_ORDER_BOOKS_BY_BETTING_MARKET_IDS_LOADING_STATUS: 'BINNED_ORDER_BOOK_SET_GET_BINNED_ORDER_BOOKS_BY_BETTING_MARKET_IDS_LOADING_STATUS',
  BINNED_ORDER_BOOK_ADD_OR_UPDATE_BINNED_ORDER_BOOKS_BY_BETTING_MARKET_ID: 'BINNED_ORDER_BOOK_ADD_OR_UPDATE_BINNED_ORDER_BOOKS_BY_BETTING_MARKET_ID',
  BINNED_ORDER_BOOK_REMOVE_BINNED_ORDER_BOOKS_BY_BETTING_MARKET_ID: 'BINNED_ORDER_BOOK_REMOVE_BINNED_ORDER_BOOKS_BY_BETTING_MARKET_ID',
  // Account Actions
  ACCOUNT_SET_IS_LOGGED_IN: 'ACCOUNT_SET_IS_LOGGED_IN',
  ACCOUNT_SET_ACCOUNT: 'ACCOUNT_SET_ACCOUNT',
  ACCOUNT_SET_PASSWORD_AND_KEYS: 'ACCOUNT_SET_PASSWORD_AND_KEYS',
  ACCOUNT_SET_STATISTICS: 'ACCOUNT_SET_STATISTICS',
  // Balance Actions
  BALANCE_ADD_OR_UPDATE_AVAILABLE_BALANCES: 'BALANCE_ADD_OR_UPDATE_AVAILABLE_BALANCES',
  BALANCE_REMOVE_AVAILABLE_BALANCES_BY_IDS: 'BALANCE_REMOVE_AVAILABLE_BALANCES_BY_IDS',
  BALANCE_SET_DEPOSIT_ADDRESS: 'BALANCE_SET_DEPOSIT_ADDRESS',
  BALANCE_SET_GET_BALANCE_LOADING_STATUS: 'BALANCE_SET_GET_BALANCE_LOADING_STATUS',
  BALANCE_SET_WITHDRAW_LOADING_STATUS: 'BALANCE_SET_WITHDRAW_LOADING_STATUS',
  BALANCE_SET_WITHDRAW_ERROR: 'BALANCE_SET_WITHDRAW_ERROR',
  BALANCE_SET_TOPMENU_WITHDRAW_LOADING_STATUS: 'BALANCE_SET_TOPMENU_WITHDRAW_LOADING_STATUS',
  BALANCE_SET_TOPMENU_WITHDRAW_ERROR: 'BALANCE_SET_TOPMENU_WITHDRAW_ERROR',
  BALANCE_SET_GET_DEPOSIT_ADDRESS_LOADING_STATUS: 'BALANCE_SET_GET_DEPOSIT_ADDRESS_LOADING_STATUS',
  BALANCE_SET_GET_DEPOSIT_ADDRESS_ERROR: 'BALANCE_SET_GET_DEPOSIT_ADDRESS_ERROR',
  // History Actions
  HISTORY_SET_TRANSACTION_HISTORY: 'HISTORY_SET_TRANSACTION_HISTORY',
  HISTORY_SET_GET_TRANSACTION_HISTORY_ERROR: 'HISTORY_SET_GET_TRANSACTION_HISTORY_ERROR',
  HISTORY_SET_GET_TRANSACTION_HISTORY_ERROR_EXPORT: 'HISTORY_SET_GET_TRANSACTION_HISTORY_ERROR_EXPORT',
  HISTORY_SET_GET_TRANSACTION_HISTORY_LOADING_STATUS_EXPORT: 'HISTORY_SET_GET_TRANSACTION_HISTORY_LOADING_STATUS_EXPORT',
  HISTORY_SET_TRANSACTION_HISTORY_EXPORT: 'HISTORY_SET_TRANSACTION_HISTORY_EXPORT',
  HISTORY_SET_GET_TRANSACTION_HISTORY_LOADING_STATUS: 'HISTORY_SET_GET_TRANSACTION_HISTORY_LOADING_STATUS',
  HISTORY_SET_INIT_TRANSACTION_HISTORY_LOADING_STATUS: 'HISTORY_SET_INIT_TRANSACTION_HISTORY_LOADING_STATUS',
  HISTORY_SET_INIT_TRANSACTION_HISTORY_ERROR: 'HISTORY_SET_INIT_TRANSACTION_HISTORY_ERROR',
  HISTORY_PREPEND_TRANSACTIONS_TO_THE_HISTORY: 'HISTORY_PREPEND_TRANSACTIONS_TO_THE_HISTORY',
  HISTORY_SET_CHECK_FOR_NEW_TRANSACTION_HISTORY_LOADING_STATUS: 'HISTORY_SET_CHECK_FOR_NEW_TRANSACTION_HISTORY_LOADING_STATUS',
  HISTORY_SET_CHECK_FOR_NEW_TRANSACTION_HISTORY_ERROR: 'HISTORY_SET_CHECK_FOR_NEW_TRANSACTION_HISTORY_ERROR',
  // Liquidity Actions
  LIQUIDITY_SET_GET_TOTAL_MATCHED_BETS_BY_BETTING_MARKET_GROUP_IDS_LOADING_STATUS: 'LIQUIDITY_SET_GET_TOTAL_MATCHED_BETS_BY_BETTING_MARKET_GROUP_IDS_LOADING_STATUS',
  LIQUIDITY_ADD_OR_UPDATE_TOTAL_MATCHED_BETS_BY_BETTING_MARKET_GROUP_ID: 'LIQUIDITY_ADD_OR_UPDATE_TOTAL_MATCHED_BETS_BY_BETTING_MARKET_GROUP_ID',
  // Setting Actions
  SETTING_UPDATE_LANG: 'SETTING_UPDATE_LANG',
  SETTING_UPDATE_TIMEZONE: 'SETTING_UPDATE_TIMEZONE',
  SETTING_UPDATE_NOTIFICATION: 'SETTING_UPDATE_NOTIFICATION',
  SETTING_UPDATE_CURRENCY_FORMAT: 'SETTING_UPDATE_CURRENCY_FORMAT',
  SETTING_SET_INITIAL_SETTING: 'SETTING_SET_INITIAL_SETTING',
  SETTING_MARK_SKIP_LOGOUT_POPUP: 'SETTING_MARK_SKIP_LOGOUT_POPUP',
  // Notification Actions
  NOTIFICATION_PREPEND_NOTIFICATIONS: 'NOTIFICATION_PREPEND_NOTIFICATIONS',
  NOTIFICATION_SET_LATEST_TRANSACTION_HISTORY_ID: 'NOTIFICATION_SET_LATEST_TRANSACTION_HISTORY_ID',
  NOTIFICATION_SET_INIT_NOTIFICATION_ERROR: 'NOTIFICATION_SET_INIT_NOTIFICATION_ERROR',
  NOTIFICATION_SET_INIT_NOTIFICATION_LOADING_STATUS: 'NOTIFICATION_SET_INIT_NOTIFICATION_LOADING_STATUS',
  NOTIFICATION_SET_UPDATE_NOTIFICATION_ERROR: 'NOTIFICATION_SET_UPDATE_NOTIFICATION_ERROR',
  NOTIFICATION_SET_UPDATE_NOTIFICATION_LOADING_STATUS: 'NOTIFICATION_SET_UPDATE_NOTIFICATION_LOADING_STATUS',
  NOTIFICATION_MARK_NOTIFICATIONS_AS_READ: 'NOTIFICATION_MARK_NOTIFICATIONS_AS_READ',
  NOTIFICATION_REMOVE_NOTIFICATIONS: 'NOTIFICATION_REMOVE_NOTIFICATIONS',
  // Sidebar Actions
  SIDEBAR_UPDATE_COMPLETE_TREE: 'SIDEBAR_UPDATE_COMPLETE_TREE',
  SIDEBAR_SET_ERROR: 'SIDEBAR_SET_ERROR',
  SIDEBAR_SET_LOADING_STATUS: 'SIDEBAR_SET_LOADING_STATUS',
  // All Sports Actions
  ALL_SPORTS_SET_LOADING_STATUS: 'ALL_SPORTS_SET_LOADING_STATUS',
  ALL_SPORTS_SET_DATA: 'ALL_SPORTS_SET_DATA',
  ALL_SPORTS_SET_ERROR: 'ALL_SPORTS_SET_ERROR',
  // Software update actions
  SOFTWARE_UPDATE_SET_REFERENCE_ACCOUNT: 'SOFTWARE_UPDATE_SET_REFERENCE_ACCOUNT',
  SOFTWARE_UPDATE_SET_REFERENCE_ACCOUNT_STATISTICS: 'SOFTWARE_UPDATE_SET_REFERENCE_ACCOUNT_STATISTICS',
  SOFTWARE_UPDATE_SET_UPDATE_PARAMETER: 'SOFTWARE_UPDATE_SET_UPDATE_PARAMETER',

  // Sport Page Actions
  SPORT_PAGE_SET_LOADING_STATUS: 'SPORT_PAGE_SET_LOADING_STATUS',
  SPORT_PAGE_SET_DATA: 'SPORT_PAGE_SET_DATA',
  SPORT_PAGE_SET_ERROR: 'SPORT_PAGE_SET_ERROR',
  // Event Group Page Actions
  EVENT_GROUP_PAGE_SET_LOADING_STATUS: 'EVENT_GROUP_PAGE_SET_LOADING_STATUS',
  EVENT_GROUP_PAGE_SET_DATA: 'EVENT_GROUP_PAGE_SET_DATA',
  EVENT_GROUP_PAGE_SET_ERROR: 'EVENT_GROUP_PAGE_SET_ERROR',
  // Betting Mkt Group Page Actions
  BETTING_MARKET_GROUP_PAGE_SET_LOADING_STATUS: 'BETTING_MARKET_GROUP_PAGE_SET_LOADING_STATUS',
  BETTING_MARKET_GROUP_PAGE_SET_ERROR: 'BETTING_MARKET_GROUP_PAGE_SET_ERROR',

  // Quick Bet Drawer Actions
  QUICK_BET_DRAWER_ADD_ONE_BET: 'QUICK_BET_DRAWER_ADD_ONE_BET',
  QUICK_BET_DRAWER_DELETE_ONE_BET: 'QUICK_BET_DRAWER_DELETE_ONE_BET',
  QUICK_BET_DRAWER_DELETE_MANY_BETS: 'QUICK_BET_DRAWER_DELETE_MANY_BETS',
  QUICK_BET_DRAWER_DELETE_ALL_BETS: 'QUICK_BET_DRAWER_DELETE_ALL_BETS',
  QUICK_BET_DRAWER_UPDATE_ONE_BET: 'QUICK_BET_DRAWER_UPDATE_ONE_BET',
  QUICK_BET_DRAWER_SHOW_BETSLIP_CONFIRMATION: 'QUICK_BET_DRAWER_SHOW_BETSLIP_CONFIRMATION',
  QUICK_BET_DRAWER_HIDE_BETSLIP_CONFIRMATION: 'QUICK_BET_DRAWER_HIDE_BETSLIP_CONFIRMATION',
  QUICK_BET_DRAWER_HIDE_BETSLIP_ERROR: 'QUICK_BET_DRAWER_HIDE_BETSLIP_ERROR',
  // Market Drawer Actions
  MARKET_DRAWER_ADD_UNCONFIRMED_BET: 'MARKET_DRAWER_ADD_UNCONFIRMED_BET',
  MARKET_DRAWER_DELETE_ONE_UNCONFIRMED_BET: 'MARKET_DRAWER_DELETE_ONE_UNCONFIRMED_BET',
  MARKET_DRAWER_DELETE_MANY_UNCONFIRMED_BETS: 'MARKET_DRAWER_DELETE_MANY_UNCONFIRMED_BETS',
  MARKET_DRAWER_DELETE_ALL_UNCONFIRMED_BETS: 'MARKET_DRAWER_DELETE_ALL_UNCONFIRMED_BETS',
  MARKET_DRAWER_UPDATE_ONE_UNCONFIRMED_BET: 'MARKET_DRAWER_UPDATE_ONE_UNCONFIRMED_BET',
  MARKET_DRAWER_SHOW_BETSLIP_CONFIRMATION: 'MARKET_DRAWER_SHOW_BETSLIP_CONFIRMATION',
  MARKET_DRAWER_HIDE_BETSLIP_CONFIRMATION: 'MARKET_DRAWER_HIDE_BETSLIP_CONFIRMATION',
  MARKET_DRAWER_HIDE_BETSLIP_ERROR: 'MARKET_DRAWER_HIDE_BETSLIP_ERROR',
  MARKET_DRAWER_GET_PLACED_BETS: 'MARKET_DRAWER_GET_PLACED_BETS',
  MARKET_DRAWER_UPDATE_ONE_UNMATCHED_BET: 'MARKET_DRAWER_UPDATE_ONE_UNMATCHED_BET',
  MARKET_DRAWER_DELETE_ONE_UNMATCHED_BET: 'MARKET_DRAWER_DELETE_ONE_UNMATCHED_BET',
  MARKET_DRAWER_DELETE_MANY_UNMATCHED_BETS: 'MARKET_DRAWER_DELETE_MANY_UNMATCHED_BETS',
  MARKET_DRAWER_SHOW_PLACED_BETS_CONFIRMATION: 'MARKET_DRAWER_SHOW_PLACED_BETS_CONFIRMATION',
  MARKET_DRAWER_HIDE_PLACED_BETS_CONFIRMATION: 'MARKET_DRAWER_HIDE_PLACED_BETS_CONFIRMATION',
  MARKET_DRAWER_HIDE_PLACED_BETS_ERROR: 'MARKET_DRAWER_HIDE_PLACED_BETS_ERROR',
  MARKET_DRAWER_RESET_UNMATCHED_BETS: 'MARKET_DRAWER_RESET_UNMATCHED_BETS',
  MARKET_DRAWER_SET_GROUP_BY_AVERAGE_ODDS: 'MARKET_DRAWER_SET_GROUP_BY_AVERAGE_ODDS',
  //MyWager Actions
  MYWAGER_SET_ACTIVE_TAB: 'MYWAGER_SET_ACTIVE_TAB',
  MYWAGER_SET_START_END_DATE: 'MYWAGER_SET_START_END_DATE',
  // My account page Actions
  MY_ACCOUNT_PAGE_SET_HISTORY_TIME_RANGE: 'MY_ACCOUNT_PAGE_SET_HISTORY_TIME_RANGE',
  MY_ACCOUNT_PAGE_SET_EXPORT_HISTORY_TIME_RANGE: 'MY_ACCOUNT_PAGE_SET_EXPORT_HISTORY_TIME_RANGE',
  MY_ACCOUNT_PAGE_RESET_TIME_RANGE: 'MY_ACCOUNT_PAGE_RESET_TIME_RANGE',
  MY_ACCOUNT_PAGE_PREPEND_TRANSACTION_HISTORY: 'MY_ACCOUNT_PAGE_PREPEND_TRANSACTION_HISTORY',
  MY_ACCOUNT_PAGE_SET_GENERATE_TRANSACTION_HISTORY_EXPORT_DATA_LOADING_STATUS: 'MY_ACCOUNT_PAGE_SET_GENERATE_TRANSACTION_HISTORY_EXPORT_DATA_LOADING_STATUS',
  MY_ACCOUNT_PAGE_SET_TRANSACTION_HISTORY_EXPORT_DATA: 'MY_ACCOUNT_PAGE_SET_TRANSACTION_HISTORY_EXPORT_DATA',
  MY_ACCOUNT_PAGE_SET_GENERATE_TRANSACTION_HISTORY_EXPORT_DATA_ERROR: 'MY_ACCOUNT_PAGE_SET_GENERATE_TRANSACTION_HISTORY_EXPORT_DATA_ERROR',
  MY_ACCOUNT_PAGE_RESET_TRANSACTION_HISTORY_EXPORT_DATA: 'MY_ACCOUNT_PAGE_RESET_TRANSACTION_HISTORY_EXPORT_DATA',
}
