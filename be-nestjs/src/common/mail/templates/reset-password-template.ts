type ResetPasswordTemplate = {
  email: string;
  url: string;
  token: string;
  expires_at: string;
};

const resetPasswordHtml = `
  <p>Xin chào,</p>
  <p>Vui lòng nhấp vào <a href="%url%/reset-password?token=%token%">đường dẫn này</a> để đặt lại mật khẩu cho tài khoản của bạn. Đường dẫn sẽ hết hạn vào lúc %expires_at%.</p>
  <p>Nếu bạn không thực hiện yêu cầu đặt lại mật khảu, hãy bỏ qua email này</p>
  <p>Trân trọng,</p>
  <p>Vu Lan</p>
`;

const resetPasswordSubject = 'Đặt lại mật khẩu';

export { resetPasswordHtml, resetPasswordSubject, ResetPasswordTemplate };
