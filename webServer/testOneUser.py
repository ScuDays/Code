import requests

# 发送GET请求
response = requests.get('http://localhost:8080/')
print('GET请求响应:')
print(response.text)

# 发送HEAD请求
response = requests.head('http://localhost:8080/')
print('\nHEAD请求响应头:')
print(response.headers)

# 发送POST请求
response = requests.post('http://localhost:8080/', data={'data': 'test'})
print('\nPOST请求响应:')
print(response.text)
