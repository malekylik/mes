const worker: any = self;
const crypto = worker.require('crypto');

export function generateSalt(): string {
    return crypto.randomBytes(16).toString('hex');
}

export function generateHash(s: string): string {
    return crypto.createHash('sha256').update(s).digest('hex');
}
