import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { S3Client } from '@aws-sdk/client-s3';

const required = ['AWS_REGION', 'AWS_DYNAMODB_TABLE', 'AWS_S3_BUCKET', 'COGNITO_USER_POOL_ID', 'COGNITO_CLIENT_ID', 'COGNITO_DOMAIN', 'CMS_ADMIN_EMAIL'] as const;

export const isAwsCmsConfigured = required.every((name) => Boolean(process.env[name]));

export function cmsConfig() {
  if (!isAwsCmsConfigured) throw new Error('AWS CMS is not configured.');
  return {
    region: process.env.AWS_REGION!,
    table: process.env.AWS_DYNAMODB_TABLE!,
    bucket: process.env.AWS_S3_BUCKET!,
    userPoolId: process.env.COGNITO_USER_POOL_ID!,
    clientId: process.env.COGNITO_CLIENT_ID!,
    domain: process.env.COGNITO_DOMAIN!,
    adminEmail: process.env.CMS_ADMIN_EMAIL!.toLowerCase(),
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://danish.sh',
  };
}

const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const s3 = new S3Client({});

export { dynamo, s3 };

export function publicAssetUrl(key: string) {
  const { bucket, region } = cmsConfig();
  return `https://${bucket}.s3.${region}.amazonaws.com/${encodeURIComponent(key).replace(/%2F/g, '/')}`;
}
