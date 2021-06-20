import AWS from 'aws-sdk';
import configuration from '../configuration';

export default class S3 {
    constructor() {
        this.s3 = new AWS.S3({
            endpoint: configuration.s3.host,
            accessKeyId: configuration.s3.keyID,
            secretAccessKey: configuration.s3.keySecret,
            region: '',
        });
    }

    async createPresignedPost(bucket, key) {
        const params = {
            Bucket: bucket,
            Fields: {
                key,
            },
            ACL: 'public-read',
        };
        return new Promise((resolve, reject) =>
            this.s3.createPresignedPost(params, (err, data) => {
                if (err) {
                    return reject(err);
                }
                return resolve(data);
            }),
        );
    }
}
