# solitude

## 由来
solitude 开始只是一个我个人的博客系统，通过她我想转型到全栈而不仅仅局限前端领域。后来，两个伙伴载着各自的心愿加入了进来，希望她可以帮到伙伴们。

## 近况
solitude 目前处于初期开发阶段，由于我们三人都有各自的工作，业余时间还要照顾家人和家务，所以更新缓慢。但是，会持续下去的。

## 是什么，不是什么
solitude 是一个传统型的博客系统，不是流行的静态博客工具。

## demo 运行
1. 克隆项目
2. 安装必要的外部工具：
  * [GraphicsMagick](http://www.graphicsmagick.org/) 或 [ImageMagick](http://www.imagemagick.org/)（处理图片）；
  * [redis](http://redis.io/)（缓存）；
  * [PostgreSQL](http://www.postgresql.org/)（数据库）；
3. 在 terminal 进入项目文件夹并执行 `npm i`；
4. ~~打开 1 个 terminal，执行 `npm run babel`；~~
5. 以项目路径打开 1 个 terminal，执行 `npm run webpack`；
6. 打开 1 个 terminal，进入 redis 安装目录，执行 `./src/redis-server`；
7. 打开 1 个 terminal，进入 redis 安装目录，执行 `./src/redis-cli`；
8. 打开 1 个 terminal，执行 `pg_ctl start`；
9. 以项目路径打开 1 个 terminal，进入项目文件夹并执行 `npm start`；
10. 浏览器地址栏输入 `http://localhost:8000/manager/sign-up`；Have Fun ^_^

## 异常情况
如果碰到 terminal 输出异常信息，可以优先考虑排查外部工具的相关问题。

PS：各种工具请参考相关的文档！

## License
[MIT](https://github.com/rong8296/solitude/blob/master/LICENSE)
