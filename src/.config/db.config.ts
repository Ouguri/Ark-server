export const MYSQLCONFIG:any = {
  type: 'mysql',
  username: 'root',
  password: '123456',
  host: 'localhost',
  port: 3306,
  database: 'ark',
  synchronize: true, // 是否自动将实体类同步到数据库
  retryDelay: 500,
  retryAttempts: 10,
  autoLoadEntities: true // true 则自动加载实体 forFeature() 方法
}