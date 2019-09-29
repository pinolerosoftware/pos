const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { 
            // '@primary-color': '#2f3640',
            // '@link-color': '#353b48',
            // '@heading-color': 'rgba(0, 0, 0, 0.85)',
            // '@text-color': 'rgba(0, 0, 0, 0.65)',
            // '@layout-sider-background-light': '#fff'
        },
    }),
);