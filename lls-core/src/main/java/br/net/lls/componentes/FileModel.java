package br.net.lls.componentes;

public class FileModel {

  private String name;
  private String mimeType;
  private byte[] content;

  public FileModel(String name, String mimeType, byte[] content) {
    this.setName(name);
    this.setMimeType(mimeType);
    this.setContent(content);
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getMimeType() {
    return mimeType;
  }

  public void setMimeType(String mimeType) {
    this.mimeType = mimeType;
  }

  public byte[] getContent() {
    return content;
  }

  public void setContent(byte[] content) {
    this.content = content;
  }

}
