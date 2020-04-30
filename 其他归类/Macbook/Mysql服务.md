## Mysql

To connect:
    mysql -uroot

mysql@5.6 is keg-only, which means it was not symlinked into /usr/local,
because this is an alternate version of another formula.

If you need to have mysql@5.6 first in your PATH run:
  echo 'export PATH="/usr/local/opt/mysql@5.6/bin:$PATH"' >> ~/.zshrc

For compilers to find mysql@5.6 you may need to set:
  export LDFLAGS="-L/usr/local/opt/mysql@5.6/lib"
  export CPPFLAGS="-I/usr/local/opt/mysql@5.6/include"


To have launchd start mysql@5.6 now and restart at login:
  brew services start mysql@5.6
Or, if you don't want/need a background service you can just run:
  /usr/local/opt/mysql@5.6/bin/mysql.server start