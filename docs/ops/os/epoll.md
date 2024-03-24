linux io 多路复用

```c
fds = wait_files({fd1,fd2,...fdn},...);
for (fd:fds) {
  read(fd,buf);
  do_something(buf);
}
```
