---
title: "Create a large file on Linux"
tags:
- front-end-tips
---

Sometimes we need to have a random file of given size. We can name some common examples such as

-   Test the file upload functionality
-   Test if the application is able to handle a large set of data

On Linux we can create an empty file of particular size with the `dd` command. The following command creates `sample.txt` file of `1GB`:

```shell
$ dd if=/dev/urandom of=sample.txt bs=1G count=1
```

The file size is the result of `bs * count` in bytes.

Ref: https://getfrontend.tips/create-a-big-file-on-linux/