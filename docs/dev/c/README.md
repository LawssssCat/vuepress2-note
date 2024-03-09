---
title: C/C++使用笔记
---

```bash
#!/bin/bash

install_arm32() {
  sudo apt install gcc make gcc-arm-linux-gnueabi binutils-arm-linux-gnueabi
}

install_arm64() {
  sudo apt install gcc make gcc-aarch64-linux-gun binutils-aarch64-linux-gnu
}
gen_hello() {
  cat > helloworld.c << EOF
#include<stdio.h>
int main()
{
  printf("Hello World!\n");
  return 0;
}
EOF
}

compile_64() {
  gcc helloworld.c -o helloworld-x86_64
}

compile_arm32() {
  arm-linux-gnueabi-gcc helloworld.c -o helloworld-arm -static
}

compile_arm64() {
  aarchi64-linux-gnu-gcc helloworld.c -o helloworld-aarch64 -static
}

# Main.
# install_arm32
# install_arm64
gen_hello
compile_64 || exit 1
compile_arm32
compile_arm64
```
