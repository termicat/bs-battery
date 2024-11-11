#!/bin/bash

# 设置信号处理函数，当接收到Ctrl+C时终止所有子进程
trap 'kill $(jobs -p)' SIGINT

# 启动命令1，并将其置于后台运行
pnpm run --filter apps-radar dev --port 3000 --host  &

# 启动命令2，并将其置于后台运行
pnpm run --filter apps-battery dev --port 3001 --host &

# 等待所有后台进程完成
wait

echo "所有命令已完成"