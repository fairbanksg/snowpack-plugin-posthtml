const posthtml = require('posthtml');
const posthtmlrc = require('posthtml-load-config');

module.exports = function (_snowpackConfig, _pluginOptions) {
  // This is an async call, but initialization is not async.
  // So fire it off and await it inside transform.
  const posthtmlrcPromise = posthtmlrc({});

  return {
    name: 'snowpack-plugin-posthtml',
    async transform({ fileExt, contents }) {
      if (fileExt === '.html') {
        const {
          plugins: posthtmlPlugins,
          options: posthtmlOptions,
        } = await posthtmlrcPromise;

        const result = await posthtml(posthtmlPlugins).process(
          contents,
          posthtmlOptions
        );
        return result.html;
      }
    },
  };
};
