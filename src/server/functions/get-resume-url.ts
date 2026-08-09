import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3Client } from '../clients/aws';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const bucketName = 'vishesh-general-purpose';

    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: 'cv/Vishesh_Resume.docx',
      ResponseContentDisposition: 'attachment; filename="Vishesh_Resume.docx"',
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn: 900 });

    return res.status(200).json({ url });
  } catch (error) {
    console.error('Error generating pre-signed URL:', error);
    return res.status(500).json({ error: 'Failed to generate pre-signed URL' });
  }
}
