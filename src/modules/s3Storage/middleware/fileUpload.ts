import fs from 'fs';
import AWS from 'aws-sdk';
import { ManagedUpload, PutObjectRequest } from 'aws-sdk/clients/s3';

const s3 = new AWS.S3({
	accessKeyId: process.env.S3AccessKeyId,
	secretAccessKey: process.env.S3SecretAccessKey,
});

const fileName = 'test.txt';

const uploadFile = () => {
	fs.readFile(fileName, (err, data) => {
		if (err) throw err;
		const params: PutObjectRequest = {
			Bucket: 'michael-longtime-storage',
			Key: fileName,
			ACL: 'public-read',
			Body: data,
		};
		s3.upload(params, function (s3Err: Error, data: ManagedUpload.SendData) {
			if (s3Err) throw s3Err;
			console.log(`File uploaded successfully at ${data.Location}`);
		});
	});
};

uploadFile();
