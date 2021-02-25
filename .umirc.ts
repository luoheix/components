import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'components',
  favicon:
    'https://6865-heixongjun-ok4ws-1302448573.tcb.qcloud.la/xiongzhua.png',
  logo: 'https://6865-heixongjun-ok4ws-1302448573.tcb.qcloud.la/xiong.png',
  outputPath: 'docs-dist',
  // more config: https://d.umijs.org/config
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
  hash: true,
});
