```java
try {
    Process process = runtime.exec("ping www.baidu.com");
    InputStreamReader inputStreamReader = new InputStreamReader(process.getInputStream());
    BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
    String content = bufferedReader.readLine();
    while (null != content) {
        sender.sendMessage(content);
        content = bufferedReader.readLine();
    }
} catch (IOException e) {
    e.printStackTrace();
}
```
