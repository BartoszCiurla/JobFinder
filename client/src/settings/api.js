const Config = {
  development: {
      'apiUrl': 'http://localhost:5000/'
  },
  production:  {
      'apiUrl': 'fromAssesToTorses'
  }
};

export default (() => {
  return process.env.NODE_ENV === 'production' ? Config.production : Config.development;
})();
