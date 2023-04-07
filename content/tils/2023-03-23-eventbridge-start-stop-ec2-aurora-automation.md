---
title: "TIL: EventBridge start/stop aurora automation"
tags:
- til
---
When you stop Amazon RDS instances (including Aurora), they are automatically started after 7 days. In [the aws doc](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_StopInstance.html), you will find this notice.

![You can stop a DB instance for up to seven days. If you don’t manually start your DB instance after seven days, your DB instance is automatically started so that it doesn’t fall behind any required maintenance updates.](https://miro.medium.com/v2/resize:fit:700/1*pb_zYwEwgtdGW_xHltFDgw.png)


## For EC2

Create policy

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "ec2:StartInstances",
                "ec2:StopInstances"
            ],
            "Resource": "*"
        }
    ]
}
```

name:  `eventbridge_automation_ec2_policy`

## For Aurora

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "RDSDescribe",
            "Effect": "Allow",
            "Action": [
                "rds:DescribeDBClusters"
            ],
            "Resource": [
                "*"
            ]
        },
        {
            "Sid": "RDSControl",
            "Effect": "Allow",
            "Action": [
                "rds:StartDBCluster",
                "rds:StopDBCluster"
            ],
            "Resource": [
                "*"
            ]
        }
    ]
}
```
name: `eventbridge_automation_rds_policy`
## EventBridge

https://dev.to/aws-builders/easy-setup-for-ec2-stop-jobs-with-amazon-eventbridge-scheduler-4lpg