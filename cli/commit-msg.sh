#!/bin/sh
##################
# 提交commit信息规范
##################
MERGE_MSG=`cat $1 | egrep '^Merge branch*'`

echo $MERGE_MSG

if [ "$MERGE_MSG" != "" ]; then
    exit 0
fi

COMMIT_MSG=`cat $1 | egrep "^(feat|fix|docs|chore)(\(\w+\))?:\s(\S|\w)+"`

echo "11111"
echo ${#COMMIT_MSG} 
if [ "$COMMIT_MSG" = "" ]; then
    echo "提交格式错误～请重新提交～\n"
    echo "请按下下属规范提交:\n
    必须以feat|fix|chore|docs关键词开头，可选(scope) , 之后必须紧跟冒号和空格: ,之后就是具体的描述\n
    commitType: description\n
    feat: 说明本次提交的是一个新的feature\n
    fix: 修复了一个bug\n
    chore: 一些没有构成feature, 但又不是其他类型的提交\n
    docs: 只是修改了文档相关的内容"
    exit 1
fi

if [ ${#COMMIT_MSG} -lt 10 ]; then
    echo "提交描述请大约10个字符\n"
    exit 1
fi