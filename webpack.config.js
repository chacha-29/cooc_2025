const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: {
      'mdb.free': './public/scss/mdb.free.scss'
    },
    
    output: {
      path: path.resolve(__dirname, 'public/assets'),
      filename: 'js/[name].bundle.js',
      clean: false // assets 폴더를 완전히 지우지 않음
    },

    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: !isProduction,
                url: false // 기존 이미지/폰트 경로 유지
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: !isProduction,
                sassOptions: {
                  outputStyle: isProduction ? 'compressed' : 'expanded',
                  sourceComments: !isProduction
                }
              }
            }
          ]
        }
      ]
    },

    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['css/**/*', 'js/**/*'],
        dangerouslyAllowCleanPatternsOutsideProject: false
      }),
      
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
        chunkFilename: 'css/[id].css'
      }),

      // 기존 정적 파일들 복사 (필요한 경우)
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'public/assets/img',
            to: 'img',
            noErrorOnMissing: true
          },
          {
            from: 'public/assets/fonts',
            to: 'fonts',
            noErrorOnMissing: true
          },
          {
            from: 'public/assets/vendor',
            to: 'vendor',
            noErrorOnMissing: true
          }
        ]
      })
    ],

    devtool: isProduction ? false : 'source-map',
    
    watch: false,
    watchOptions: {
      poll: 1000,
      aggregateTimeout: 300,
      ignored: /node_modules/
    },

    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: true,
      assets: true,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: true,
      warnings: true,
      publicPath: false
    }
  };
}; 