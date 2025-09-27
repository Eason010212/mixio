#!/bin/bash

# 设置 API 地址
API_URL="http://localhost:8081/tinydb"

echo "=== TinyWebDB API 测试 ==="
echo "服务器地址: $API_URL"
echo

# 1. 测试更新操作
echo "1. 测试更新操作:"
curl -X POST $API_URL \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "user=1371033826@qq.com&secret=20b7b5eff3bd414ad42d7870feee4f45&action=update&tag=test_key&value=Hello World"
echo
echo

# 2. 测试读取操作
echo "2. 测试读取操作:"
curl -X POST $API_URL \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "user=1371033826@qq.com&secret=20b7b5eff3bd414ad42d7870feee4f45&action=get&tag=test_key"
echo
echo

# 3. 测试计数操作
echo "3. 测试计数操作:"
curl -X POST $API_URL \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "user=1371033826@qq.com&secret=20b7b5eff3bd414ad42d7870feee4f45&action=count"
echo
echo

# 4. 测试查询操作
echo "4. 测试查询操作:"
curl -X POST $API_URL \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "user=1371033826@qq.com&secret=20b7b5eff3bd414ad42d7870feee4f45&action=search&count=5"
echo
echo

# 5. 测试删除操作
echo "5. 测试删除操作:"
curl -X POST $API_URL \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "user=1371033826@qq.com&secret=20b7b5eff3bd414ad42d7870feee4f45&action=delete&tag=test_key"
echo
echo

# 6. 测试批量操作
echo "6. 测试批量操作 - 插入多条数据:"
for i in {1..5}; do
  curl -X POST $API_URL \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "user=1371033826@qq.com&secret=20b7b5eff3bd414ad42d7870feee4f45&action=update&tag=key_$i&value=Value $i" > /dev/null 2>&1
  echo "插入 key_$i"
done
echo

# 7. 测试条件查询
echo "7. 测试条件查询 (tag包含'key'):"
curl -X POST $API_URL \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "user=1371033826@qq.com&secret=20b7b5eff3bd414ad42d7870feee4f45&action=search&tag=key&count=10"
echo
echo

# 8. 测试错误情况 - 认证失败
echo "8. 测试错误情况 - 认证失败:"
curl -X POST $API_URL \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "user=wrong&secret=wrong&action=get&tag=test_key"
echo
echo

# 9. 测试错误情况 - 缺少参数
echo "9. 测试错误情况 - 缺少参数:"
curl -X POST $API_URL \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "user=1371033826@qq.com&secret=20b7b5eff3bd414ad42d7870feee4f45&action=update&tag=test_key"
echo
echo

echo "=== 测试完成 ==="

# 按任意键退出功能
echo "按任意键退出..."
read -n 1 -s -r