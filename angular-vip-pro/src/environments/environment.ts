export const environment = {
  apis: {
    default: {
      url: 'http://localhost:3000',
      apiPrefix: '/api/v1/admin',
    },
    auth: {
      url: 'http://localhost:3000',
      apiPrefix: '/api/v1',
    },
  },
  media: {
    url: 'http://localhost:3000',
    apiPrefix: '/media',
    publishUrl: 'http://localhost:3000/media',
  },
  s3: {
    access_key: 'AKIAT3JGYCEJBU2TZJXX',
    region: 'ap-southeast-1',
    bucket: 'johnsonbaby-game',
    public_url: 'https://johnsonbaby-game.s3.ap-southeast-1.amazonaws.com',
    access_secret: '0HWVoi4Znk8ypwotupoe9TXf1iSgQuqNHcDanPGg',
    end_point: 'https://s3.ap-southeast-1.amazonaws.com',
  },
};
