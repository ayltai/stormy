module.exports = {
    webpack : config => ({
        ...config,
        target : 'electron-renderer',
    }),
};
