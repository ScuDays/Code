import threading
import requests

# 服务器地址和端口
server_url = 'http://localhost:8080/'

# 用户访问数量
num_users = 10

def simulate_user_request(user_id):
    try:
        # 发送GET请求
        response = requests.get(server_url)
        print(f'用户{user_id} GET请求响应: {response.status_code}, 内容: {response.text[:100]}')

        # 发送HEAD请求
        response = requests.head(server_url)
        print(f'用户{user_id} HEAD请求响应头: {response.headers}')

        # 发送POST请求
        response = requests.post(server_url, data={'data': f'test_data_from_user_{user_id}'})
        print(f'用户{user_id} POST请求响应: {response.status_code}, 内容: {response.text[:100]}')
    except Exception as e:
        print(f'用户{user_id} 请求失败: {e}')

def main():
    threads = []

    # 创建多个线程来模拟多个用户请求
    for i in range(num_users):
        thread = threading.Thread(target=simulate_user_request, args=(i,))
        threads.append(thread)
        thread.start()

    # 等待所有线程完成
    for thread in threads:
        thread.join()


main()
