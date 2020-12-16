const crypto = require('crypto');
const Promise = require('promise');

exports.hashHamcSHa256Base64 = (secret) => {
  try {
    return crypto.createHmac('sha256', secret).digest('base64');
  } catch (err) {
    return undefined;
  }
};

exports.initialKey = (algorithm, secret) => {
  try {
    const hash = this.hashHamcSHa256Base64(secret);
    const key = crypto.scryptSync(hash, 'salt', 24);
    const iv = Buffer.alloc(16, 0);

    return { algorithm, hash, key, iv };
  } catch (err) {
    return undefined;
  }
};

exports.cipher = (plainText, options) => {
  return new Promise((resolve, reject) => {
    try {
      const { algorithm, key, iv } = options;
      const cipher = crypto.createCipheriv(algorithm, key, iv);

      let value = cipher.update(plainText, 'utf8', 'hex');
      value += cipher.final('hex');

      resolve(value);
    } catch (err) {
      reject(err);
    }
  });
};

exports.decipher = (encrypted, options) => {
  return new Promise((resolve, reject) => {
    try {
      const { algorithm, key, iv } = options;
      const decipher = crypto.createDecipheriv(algorithm, key, iv);

      let value = decipher.update(encrypted, 'hex', 'utf8');
      value += decipher.final('utf8');

      resolve(value);
    } catch (err) {
      reject(err);
    }
  });
};
