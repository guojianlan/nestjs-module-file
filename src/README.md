## how use

```ts
ImageModule.forRootAsync({
  imports: [TypeOrmModule.forFeature(FileBaseModule.entities), HttpModule],
  controllers: [...FileBaseModule.controllers],
  providers: [...FileBaseModule.providers],
  destination: 'upload/',
  inject: [ConfigService, HttpService],
  useFactory: async (FileStorageInstall, GuardStore) => {
    const imageMaxSize = 1024 * 1024 * 10; //100
    //需要限制大小和使用后卫在这里限制
    // GuardStore.inject = async (context) => {
    //   //限制大小
    //   const req = context.switchToHttp().getRequest<Request>();
    //   const header = req.headers;
    //   if (+header['content-length'] > imageMaxSize) {
    //     throw new BadRequestException();
    //   }
    //   const auth = RootModule.install.get(AdminAuthGuard);
    //   return await auth.canActivate(context);
    // };
    return new FileFactor({
      domain: () => {
        return 'http://127.0.0.1:3001';
      },
    });
    //使用cos上传，自定义上传需要实现IFileFactory
    // return new FileFactorCos({
    //   SecretKey: configService.get('COS_SECRETKEY'),
    //   SecretId: configService.get('COS_SECRETID'),
    //   bucket: configService.get('COS_BUCKET'),
    //   region: configService.get('COS_REGION'),
    //   Key: (path) => {
    //     console.log(path);
    //     return path;
    //   },
    //   domain: () => {
    //     return 'https://testupload-1256172954.cos.ap-chengdu.myqcloud.com';
    //   },
    // });
  },
});
```
