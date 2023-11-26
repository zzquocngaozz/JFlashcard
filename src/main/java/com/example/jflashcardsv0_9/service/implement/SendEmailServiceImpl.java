package com.example.jflashcardsv0_9.service.implement;

import com.example.jflashcardsv0_9.exception.AppException;
import com.example.jflashcardsv0_9.exception.Error;
import com.example.jflashcardsv0_9.service.SendEmailService;
import com.example.jflashcardsv0_9.util.RandomTokenUtil;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Timestamp;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SendEmailServiceImpl implements SendEmailService {

    @Autowired
    private JavaMailSender javaMailSender;
    @Async
    @Override
    public void sendEmail(String to, String subject, String htmlContent) {
        System.out.println("send roi");
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
            helper.setFrom("jflashcardsg50@gmail.com");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);
            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            throw new AppException(Error.valueOf("Gửi mail không thành công"));
        }

    }
    @Async
    @Override
    public void sendVerifyToken(String email, String token) {

        String htmlContent = "    <!doctype html>\n" +
                "    <html>\n" +
                "      <head>\n" +
                "        <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n" +
                "      </head>\n" +
                "      <body style=\"font-family: sans-serif;\">\n" +
                "        <div style=\"font-family: Helvetica,Arial,sans-serif;width:100%;overflow:auto;line-height:2;\">\n" +
                "            <div style=\"margin:50px auto;width:70%; padding: 10px 20px; border-radius: 8px; box-shadow: 1px 2px 5px -1px rgba(0, 0, 0, .25);\">\n" +
                "            <div style=\"border-bottom:1px solid #eee;display: flex;column-gap: 10px;\">\n" +
                "            <a href=\"#\" style=\"font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600\">\n" +
                "            JFlashcard\n" +
                "            </a>\n" +
                "            </div>\n" +
                "            <p style=\"font-size:1.1em\">Xin chào,</p>\n" +
                "            <p>Cảm ơn bạn cho JFlashcards có cơ hội đồng hành cùng việc học tiếng nhật của bạn</p>\n" +
                "            <p>Đây là mã OTP của bạn, hãy sử dụng để xác minh tài khoản của bạn. OTP có hiệu lực trong vòng 15 phút</p>\n" +
                "            <h2 style=\"background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;\">" + token + "</h2>\n" +
                "            <p style=\"font-size:0.9em;\">Regards,<br />JFlashcard</p>\n" +
                "            <hr style=\"border:none;border-top:1px solid #eee\" />\n" +
                "            <div style=\"float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300\">\n" +
                "            <p>JFlashcard</p>\n" +
                "        </div>\n" +
                "      </div>\n" +
                "    </div>\n" +
                "      </body>\n" +
                "    </html>";

        sendEmail(email, "Mã xác nhận tài khoản", htmlContent);
    }
    @Async
    @Override
    public void sendOTPToken(String email, String token) {

        String htmlContent = "    <!doctype html>\n" +
                "    <html>\n" +
                "      <head>\n" +
                "        <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n" +
                "      </head>\n" +
                "      <body style=\"font-family: sans-serif;\">\n" +
                "        <div style=\"font-family: Helvetica,Arial,sans-serif;width:100%;overflow:auto;line-height:2;\">\n" +
                "            <div style=\"margin:50px auto;width:70%; padding: 10px 20px; border-radius: 8px; box-shadow: 1px 2px 5px -1px rgba(0, 0, 0, .25);\">\n" +
                "            <div style=\"border-bottom:1px solid #eee;display: flex;column-gap: 10px;\">\n" +
                "            <a href=\"#\" style=\"font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600\">\n" +
                "            JFlashcard\n" +
                "            </a>\n" +
                "            </div>\n" +
                "            <p style=\"font-size:1.1em\">Xin chào,</p>\n" +
                "            <p>Đây là mã OTP của bạn, dùng nó để hoàn thành việc đổi mật khẩu mới. OTP có hiệu lực trong vòng 15 phút</p>\n" +
                "            <h2 style=\"background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;\">" + token + "</h2>\n" +
                "            <p style=\"font-size:0.9em;\">Regards,<br />JFlashcard</p>\n" +
                "            <hr style=\"border:none;border-top:1px solid #eee\" />\n" +
                "            <div style=\"float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300\">\n" +
                "            <p>JFlashcard</p>\n" +
                "        </div>\n" +
                "      </div>\n" +
                "    </div>\n" +
                "      </body>\n" +
                "    </html>";

        sendEmail(email, "Mã đổi mật khẩu", htmlContent);


    }

    @Async
    @Override
    public void sendChangeRole(String email) {
        String htmlContent = """
                    <!doctype html>
                    <html>
                      <head>
                        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                      </head>
                      <body style="font-family: sans-serif;">
                        <div style="font-family: Helvetica,Arial,sans-serif;width:100%;overflow:auto;line-height:2;">
                            <div style="margin:50px auto;width:70%; padding: 10px 20px; border-radius: 8px; box-shadow: 1px 2px 5px -1px rgba(0, 0, 0, .25);">
                            <div style="border-bottom:1px solid #eee;display: flex;column-gap: 10px;">
                            <a href="#" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">
                            JFlashcard
                            </a>
                            </div>
                            <p style="font-size:1.1em">Chào [Tên người dùng],</p>
                            <p>Chúng tôi rất vui thông báo rằng yêu cầu của bạn để nâng cấp tài khoản từ học sinh lên tài khoản giáo viên đã được chấp thuận. Chúc mừng bạn đã trở thành một giáo viên trên JFlashcard</p>
                            <p>Chúng tôi chân thành cảm ơn bạn đã sử dụng dịch vụ của chúng tôi và mong rằng bạn sẽ có trải nghiệm tuyệt vời với tài khoản giáo viên của mình.

                Chúc mừng và chúc bạn có nhiều trải nghiêm trong vai trò giáo viên trên JFlashcards!</p>
                            <p style="font-size:0.9em;">Regards,<br />JFlashcard</p>
                            <hr style="border:none;border-top:1px solid #eee" />
                            <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                            <p>JFlashcard</p>
                        </div>
                      </div>
                    </div>
                      </body>
                    </html>""";

        sendEmail(email, "Về yêu cầu nâng cấp tài khoản giáo viên", htmlContent);
    }
    // Gửi email với trạng thái "học đúng tiến độ"
    @Async
    public void sendOnTrackEmail(String email,String userName,String setName,String classname) {
        String subject = "Thông báo về tiến độ học tập";
        String htmlContent = "    <!doctype html>\n" +
                "    <html>\n" +
                "      <head>\n" +
                "        <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n" +
                "      </head>\n" +
                "      <body style=\"font-family: sans-serif;\">\n" +
                "        <div style=\"font-family: Helvetica,Arial,sans-serif;width:100%;overflow:auto;line-height:2;\">\n" +
                "            <div style=\"margin:50px auto;width:70%; padding: 10px 20px; border-radius: 8px; box-shadow: 1px 2px 5px -1px rgba(0, 0, 0, .25);\">\n" +
                "            <div style=\"border-bottom:1px solid #eee;display: flex;column-gap: 10px;\">\n" +
                "            <a href=\"#\" style=\"font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600\">\n" +
                "            JFlashcard\n" +
                "            </a>\n" +
                "            </div>\n" +
                "            <p style=\"font-size:1.1em\">Chào "+ userName +" ,</p>\n" +
                "            <p>Chúc mừng bạn đang học đúng tiến độ của "+ setName +" trong  "+ classname +". Hãy tiếp tục phấn đấu!</p>\n" +
                "            <p>Chúng tôi rất vui thông báo rằng bạn đang học đúng tiến độ của  "+ setName +" trong "+ classname +".\n" +
                "\n" +
                "Chúc mừng bạn  và hãy tiếp tục cố gắng trên JFlashcards!</p>\n" +
                "            <p style=\"font-size:0.9em;\">Regards,<br />JFlashcard</p>\n" +
                "            <hr style=\"border:none;border-top:1px solid #eee\" />\n" +
                "            <div style=\"float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300\">\n" +
                "            <p>JFlashcard</p>\n" +
                "        </div>\n" +
                "      </div>\n" +
                "    </div>\n" +
                "      </body>\n" +
                "    </html>";
        sendEmail(email, subject, htmlContent);
    }

    // Gửi email với trạng thái "học chậm tiến độ"
    @Async
    public void sendBehindScheduleEmail(String email,String userName,String setName,String classname)  {
        String subject = "Thông báo về tiến độ học tập";
        String htmlContent = "    <!doctype html>\n" +
                "    <html>\n" +
                "      <head>\n" +
                "        <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n" +
                "      </head>\n" +
                "      <body style=\"font-family: sans-serif;\">\n" +
                "        <div style=\"font-family: Helvetica,Arial,sans-serif;width:100%;overflow:auto;line-height:2;\">\n" +
                "            <div style=\"margin:50px auto;width:70%; padding: 10px 20px; border-radius: 8px; box-shadow: 1px 2px 5px -1px rgba(0, 0, 0, .25);\">\n" +
                "            <div style=\"border-bottom:1px solid #eee;display: flex;column-gap: 10px;\">\n" +
                "            <a href=\"#\" style=\"font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600\">\n" +
                "            JFlashcard\n" +
                "            </a>\n" +
                "            </div>\n" +
                "            <p style=\"font-size:1.1em\">Chào "+ userName +",</p>\n" +
                "            <p>Chúng tôi nhận thấy bạn đang học chậm tiến độ của  "+ setName +" trong "+ classname +". Hãy nỗ lực hơn để đảm bảo bạn không bị tụt lại.</p>\n" +
                "            <p>Hãy tăng cường việc học tập để đảm bảo bạn đang theo kịp tiến độ của lớp học trên JFlashcards.</p>\n" +
                "\n" +
                "            <p style=\"font-size:0.9em;\">Regards,<br />JFlashcard</p>\n" +
                "            <hr style=\"border:none;border-top:1px solid #eee\" />\n" +
                "            <div style=\"float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300\">\n" +
                "            <p>JFlashcard</p>\n" +
                "        </div>\n" +
                "      </div>\n" +
                "    </div>\n" +
                "      </body>\n" +
                "    </html>";
        sendEmail(email, subject, htmlContent);
    }

    // Gửi email với trạng thái "đang rất lười"
    @Async
    public void sendLazyEmail(String email, String userName,String setName,String classname) {
        String subject = "Thông báo về tiến độ học tập";
        String htmlContent = "    <!doctype html>\n" +
                "    <html>\n" +
                "      <head>\n" +
                "        <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n" +
                "      </head>\n" +
                "      <body style=\"font-family: sans-serif;\">\n" +
                "        <div style=\"font-family: Helvetica,Arial,sans-serif;width:100%;overflow:auto;line-height:2;\">\n" +
                "            <div style=\"margin:50px auto;width:70%; padding: 10px 20px; border-radius: 8px; box-shadow: 1px 2px 5px -1px rgba(0, 0, 0, .25);\">\n" +
                "            <div style=\"border-bottom:1px solid #eee;display: flex;column-gap: 10px;\">\n" +
                "            <a href=\"#\" style=\"font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600\">\n" +
                "            JFlashcard\n" +
                "            </a>\n" +
                "            </div>\n" +
                "            <p style=\"font-size:1.1em\">Chào "+ userName +" ,</p>\n" +
                "            <p>Chúng tôi nhận thấy bạn đang bị tụt lại rất xa theo tiến độ của  "+ setName +" trong "+ classname +". Hãy đặt kế hoạch và bắt đầu học ngay!</p>\n" +
                "            <p>Chúng tôi khuyên bạn nên đặt kế hoạch học tập và bắt đầu ngay, để đảm bảo bạn đang theo kịp tiến độ của lớp học trên JFlashcards.</p>\n" +
                "            <p style=\"font-size:0.9em;\">Regards,<br />JFlashcard</p>\n" +
                "            <hr style=\"border:none;border-top:1px solid #eee\" />\n" +
                "            <div style=\"float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300\">\n" +
                "            <p>JFlashcard</p>\n" +
                "        </div>\n" +
                "      </div>\n" +
                "    </div>\n" +
                "      </body>\n" +
                "    </html>";
        sendEmail(email, subject, htmlContent);
    }

    @Async
    public void sendAcceptEmail(String email, String userName, String setName, Timestamp publicAt, String des) {
        String subject = "Thông báo chấp nhận việc công bố học phần trên JFlashcards";
        String htmlContent = "    <!doctype html>\n" +
                "    <html>\n" +
                "      <head>\n" +
                "        <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n" +
                "      </head>\n" +
                "      <body style=\"font-family: sans-serif;\">\n" +
                "        <div style=\"font-family: Helvetica,Arial,sans-serif;width:100%;overflow:auto;line-height:2;\">\n" +
                "            <div style=\"margin:50px auto;width:70%; padding: 10px 20px; border-radius: 8px; box-shadow: 1px 2px 5px -1px rgba(0, 0, 0, .25);\">\n" +
                "            <div style=\"border-bottom:1px solid #eee;display: flex;column-gap: 10px;\">\n" +
                "            <a href=\"#\" style=\"font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600\">\n" +
                "            JFlashcard\n" +
                "            </a>\n" +
                "            </div>\n" +
                "            <p style=\"font-size:1.1em\">Chào " + userName + " ,</p>\n" +
                "            <p>Chúng tôi hy vọng bạn đang có một ngày tốt lành. Chúng tôi xin thông báo rằng sau quá trình kiểm tra và đánh giá kỹ lưỡng,</p>\n" +
                "            <p>chúng tôi đã quyết định chấp nhận công bố bộ thẻ của bạn trên JFlashcards.</p>\n" +
                "            <p>Bộ Thẻ của bạn đã đáp ứng các tiêu chí và yêu cầu của chúng tôi và được xem xét là phù hợp để chia sẻ với cộng đồng người dùng trên JFlashcards.</p>\n" +
                "            <p>Dưới đây là một số chi tiết cụ thể của Bộ thẻ::\n</p>" +
                "\n" +
                "<p> Tên Khóa Học: " + setName + "</p>\n" +
                "<p> Mô tả Ngắn Gọn: " + des + "</p>\n" +
                "<p> Ngày Công Bố Dự Kiến: " + publicAt + "</p>\n" +
                "            <p>Nếu bạn có bất kỳ câu hỏi hoặc cần hỗ trợ bổ sung, đừng ngần ngại liên hệ với chúng tôi.\n" +
                "\n" +
                "Cảm ơn bạn đã đóng góp vào cộng đồng JFlashcards của chúng tôi và chúc mừng vì việc công bố thành công của bạn!\n" +
                "\n" +

                "            <p style=\"font-size:0.9em;\">Regards,<br />JFlashcard</p>\n" +
                "            <hr style=\"border:none;border-top:1px solid #eee\" />\n" +
                "            <div style=\"float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300\">\n" +
                "Trân trọng,\n" +
                "JFlashcard\n" +
                "        </div>\n" +
                "      </div>\n" +
                "    </div>\n" +
                "      </body>\n" +
                "    </html>";
        sendEmail(email, subject, htmlContent);
    }

    @Async
    public void sendRejectedEmail(String email, String userName, String setName, Timestamp publicAt, String des,String reason) {
        String subject = "Thông Báo Từ Chối Công Bố Bộ Thẻ trên JFlashcards";
        String htmlContent = "    <!doctype html>\n" +
                "    <html>\n" +
                "      <head>\n" +
                "        <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n" +
                "      </head>\n" +
                "      <body style=\"font-family: sans-serif;\">\n" +
                "        <div style=\"font-family: Helvetica,Arial,sans-serif;width:100%;overflow:auto;line-height:2;\">\n" +
                "            <div style=\"margin:50px auto;width:70%; padding: 10px 20px; border-radius: 8px; box-shadow: 1px 2px 5px -1px rgba(0, 0, 0, .25);\">\n" +
                "            <div style=\"border-bottom:1px solid #eee;display: flex;column-gap: 10px;\">\n" +
                "            <a href=\"#\" style=\"font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600\">\n" +
                "            JFlashcard\n" +
                "            </a>\n" +
                "            </div>\n" +
                "            <p style=\"font-size:1.1em\">Chào " + userName + " ,</p>\n" +
                "            <p>Chúng tôi hy vọng bạn có một ngày tốt lành. Chúng tôi xin thông báo rằng sau quá trình kiểm tra và đánh giá kỹ lưỡng,</p>\n" +
                "            <p>chúng tôi nhận thấy học phần của bạn chưa đủ điều kiện để công khai.</p>\n" +
                "            <p>Dưới đây là một số chi tiết cụ thể của Bộ thẻ:\n</p>" +
                "\n" +
                "            <p> Tên học phần: " + setName + "</p>\n" +
                "            <p> Mô tả ngắn gọn: " + des + "</p>\n" +
                "            <p> Ngày công bố dự kiến: " + publicAt + "</p>\n" +
                "            <p> Lý do từ chối : <br/>" + reason + "</p>\n" +
                "            <p>Nếu bạn có bất kỳ câu hỏi hoặc cần hỗ trợ bổ sung, đừng ngần ngại liên hệ với chúng tôi.\n" +
                "\n" +
                "Cảm ơn bạn đã đóng góp vào cộng đồng JFlashcards của chúng tôi và chúc mừng vì việc công bố thành công của bạn!\n" +
                "\n" +

                "            <p style=\"font-size:0.9em;\">Regards,<br />JFlashcard</p>\n" +
                "            <hr style=\"border:none;border-top:1px solid #eee\" />\n" +
                "            <div style=\"float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300\">\n" +
                "Trân trọng,\n" +
                "JFlashcard\n" +
                "        </div>\n" +
                "      </div>\n" +
                "    </div>\n" +
                "      </body>\n" +
                "    </html>";
        sendEmail(email, subject, htmlContent);
    }


}
