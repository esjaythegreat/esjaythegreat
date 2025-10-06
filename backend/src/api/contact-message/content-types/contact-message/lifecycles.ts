let isProcessing = false;

export default {
  async afterCreate(event: any) {
    const { result } = event;
    
    // Prevent duplicate sends during hot-reload
    if (isProcessing) {
      console.log('⏭️ Skipping duplicate email trigger');
      return;
    }
    
    isProcessing = true;
    
    try {
      const emailService = strapi.plugins['email']?.services?.email;
      
      if (!emailService) {
        console.error('❌ Email service not found');
        return;
      }
      
      await emailService.send({
        to: process.env.EMAIL_DEFAULT_REPLY_TO,
        from: process.env.EMAIL_DEFAULT_FROM,
        subject: `새로운 문의: ${result.subject || '제목 없음'}`,
        text: `
이름: ${result.name}
이메일: ${result.email}
제목: ${result.subject || '제목 없음'}

메시지:
${result.message}

받은 시간: ${new Date(result.receivedAt).toLocaleString('ko-KR')}
        `,
      });
      
      console.log('✅ Email sent to:', process.env.EMAIL_DEFAULT_REPLY_TO);
    } catch (err) {
      console.error('❌ Email error:', err);
    } finally {
      // Reset after a short delay
      setTimeout(() => {
        isProcessing = false;
      }, 1000);
    }
  },
};
