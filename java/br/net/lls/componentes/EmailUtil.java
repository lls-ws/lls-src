package br.net.lls.componentes;

import java.util.*;
import javax.mail.*;
import javax.mail.internet.*;

public class EmailUtil {

    private static String USER_NAME = "lls.homeoffice";  // GMail user name (just the part before "@gmail.com")
    private static String PASSWORD = "lls739200"; // GMail password

    public boolean sendFromGMail(String[] to, String subject, String body) {
        
        String from = USER_NAME;
        String pass = PASSWORD;
        
        Properties props = System.getProperties();
        String host = "smtp.gmail.com";
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.user", from);
        props.put("mail.smtp.password", pass);
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.auth", "true");

        Session session = Session.getDefaultInstance(props);
        MimeMessage message = new MimeMessage(session);

		boolean enviado = false;

        try {
            message.setFrom(new InternetAddress(from));
            InternetAddress[] toAddress = new InternetAddress[to.length];

            // To get the array of addresses
            for( int i = 0; i < to.length; i++ ) {
                toAddress[i] = new InternetAddress(to[i]);
            }

            for( int i = 0; i < toAddress.length; i++) {
                message.addRecipient(Message.RecipientType.TO, toAddress[i]);
            }

            message.setSubject(subject);
            
            message.setContent(body, "text/html");
            
            Transport transport = session.getTransport("smtp");
            transport.connect(host, from, pass);
            transport.sendMessage(message, message.getAllRecipients());
            transport.close();
            enviado = true;
        }
        catch (AddressException ae) {
            ae.printStackTrace();
        }
        catch (MessagingException me) {
            me.printStackTrace();
        }
        
        return enviado;
        
    }
    
    public boolean enviaEmail(String destinatario, String titulo, String texto) {
		
		String[] to = { destinatario };
		
		return sendFromGMail(to, titulo, texto);
		
	}
    
}
