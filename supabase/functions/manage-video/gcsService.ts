import { Storage } from "npm:@google-cloud/storage@7.9.0";

export class GCSService {
  private storage: Storage;
  private bucketName: string;

  constructor(credentials: any) {
    this.storage = new Storage({
      projectId: credentials.project_id,
      credentials: credentials
    });
    this.bucketName = 'bucketdolacia';
  }

  async verifyBucket() {
    const bucket = this.storage.bucket(this.bucketName);
    const [exists] = await bucket.exists();
    if (!exists) {
      throw new Error(`Bucket ${this.bucketName} não encontrado`);
    }
    return bucket;
  }

  async generateUploadUrl(filePath: string, fileType: string) {
    const bucket = await this.verifyBucket();
    const [url] = await bucket.file(filePath).getSignedUrl({
      version: 'v4',
      action: 'write',
      expires: Date.now() + 60 * 60 * 1000, // URL válida por 1 hora
      contentType: fileType,
    });
    return url;
  }

  async deleteFile(fileName: string) {
    const bucket = await this.verifyBucket();
    await bucket.file(fileName).delete();
  }

  getGcsPath(filePath: string) {
    return `gs://${this.bucketName}/${filePath}`;
  }
}
