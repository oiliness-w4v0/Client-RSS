// 这里的常数主要是为了让主进程和渲染进程共享常数
export enum RUN {

  // ============================ Feed Module ============================
  /**
   * 新增订阅
   */
  ADD_FEED = 'add-feed',
  /**
   * 获取所有订阅及其文章
   */
  GET_ALL_FEEDS_WITH_ARTICLES = 'get-all-feeds-with-articles',
  /**
   * 获取所有订阅
   */
  GET_ALL_FEEDS = 'get-all-feeds',
  /**
   * 根据 ID 查询订阅
   */
  GET_FEED_BY_ID = 'get-feed-by-id',
  /**
   * 根据 URL 查询订阅
   */
  GET_FEED_BY_URL = 'get-feed-by-url',

  // ============================ User Module ============================
  /**
   * 添加用户
   */
  ADD_USER = 'add-user',
  /**
   * 获取所有用户
   */
  GET_ALL_USERS = 'get-all-users',
  /**
   * 根据 ID 获取用户
   */
  GET_USER_BY_ID = 'get-user-by-id',
  /**
   * 根据 ID 更新用户
   */
  UPDATE_USER_BY_ID = 'update-user-by-id',

  // ============================ Article Module ============================
  /**
   * 获取所有文章
   */
  GET_ALL_ARTICLES = 'get-all-articles',
  /**
   * 根据订阅 ID 获取文章列表
   */
  GET_ARTICLES_BY_FEED_ID = 'get-articles-by-feed-id',
  /**
   * 新增文章
   */
  ADD_ARTICLE = 'add-article',
  /**
   * 批量新增文章
   */
  ADD_ARTICLES = 'add-articles',

  // ============================ Common Module ============================
  /**
   * 设置原生主题
   */
  SET_NATIVE_THEME = 'set-native-theme',
  /**
   * 获取原生主题
   */
  GET_NATIVE_THEME = 'get-native-theme',
  /**
   * 发送邮件
   */
  SEND_MAIL = 'send-mail',

  // ============================ Subscription Module ============================
  /**
   * 根据用户 ID 查询订阅列表
   */
  GET_SUBSCRIPTIONS_BY_USER_ID = 'get-subscriptions-by-user-id',
  /**
   * 添加用户订阅
   */
  ADD_SUBSCRIPTION = 'add-subscription',
  /**
   * 删除用户订阅
   */
  REMOVE_SUBSCRIPTION = 'remove-subscription',
}
