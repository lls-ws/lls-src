package br.net.lls.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

@ControllerAdvice
public class ThymeleafGlobalVariables {

    @Value("${app.logo}")
    private String appLogo;
    
    @Value("${app.author}")
    private String appAuthor;

    @Value("${app.version.bootstrap}")
    private String bootstrapVersion;

    @Value("${app.version.fontawesome}")
    private String fontawesomeVersion;
    
    @Value("${app.version.flagicons}")
    private String flagiconsVersion;
    
    @Value("${app.version.jquery}")
    private String jqueryVersion;
    
    @Value("${url.login.passwordForgot}")
    private String passwordForgotURL;

    // Esse método disponibiliza a variável "logoApp" em QUALQUER arquivo HTML automaticamente
    @ModelAttribute("appLogo")
    public String getAppLogo() { return appLogo; }
    
    @ModelAttribute("appAuthor")
    public String getAppAuthor() { return appAuthor; }

    @ModelAttribute("bootstrapVersion")
    public String getBootstrapVersion() { return bootstrapVersion; }

    @ModelAttribute("fontawesomeVersion")
    public String getFontawesomeVersion() { return fontawesomeVersion; }
    
    @ModelAttribute("flagiconsVersion")
    public String getFlagiconsVersion() { return flagiconsVersion; }
    
    @ModelAttribute("jqueryVersion")
    public String getJqueryVersion() { return jqueryVersion; }
    
    @ModelAttribute("passwordForgotURL")
    public String getPasswordForgotURL() { return passwordForgotURL; }
    
}
