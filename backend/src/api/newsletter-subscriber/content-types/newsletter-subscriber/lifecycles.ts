import crypto from 'crypto';

export default {
  async beforeCreate(event: any) {
    // Generate unique unsubscribe token
    event.params.data.unsubscribeToken = crypto.randomBytes(32).toString('hex');
  },
};
