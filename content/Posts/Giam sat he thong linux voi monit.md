---
title: Giám sát hệ thống linux với monit
tags:
  - linux
  - monitor
draft: true
date: 2024-01-26T04:10:49.844Z
---
## Monit là gì?

Monit là công cụ giám sát hệ thống mã nguồn mở

## Cài đặt Install Monit

**On RedHat/CentOS/Fedora/**

```sh
yum install monit
```

**On Ubuntu/Debian/Linux Mint**

```sh
sudo apt-get install monit
```


## Cấu hình chung

1. Monit is designed for monitoring daemon processes like sendmail, sshd, apache, and mysql, especially those initiated at system boot, with the ability to automatically restart or stop processes based on error situations.

2. It extends monitoring capabilities to files, directories, and filesystems on localhost, detecting changes like timestamps, checksums, or sizes, providing security alerts for unauthorized modifications.

3. Monit is equipped to monitor network connections to servers, supporting TCP, UDP, and Unix Domain Sockets, performing protocol-level tests for internet protocols like HTTP and SMTP.

4. Beyond scheduled program testing similar to cron, Monit evaluates program exit values and triggers actions or alerts for errors, allowing diverse checks using custom scripts.

5. Monit serves as a comprehensive tool for monitoring general system resources on localhost, covering aspects such as overall CPU usage, Memory, and System Load.
