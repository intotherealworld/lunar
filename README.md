# Lunar

Upstage의 [Solar API](https://www.upstage.ai/#block-fc3df43701c13d0ba6ff)를 테스트하기 위한 간단한 애플리케이션입니다.


## 사용 방법
1. Upstage 사이트로 가서 Solar API 사용 신청: [https://console.upstage.ai](https://console.upstage.ai)
2. 애플리케이션 실행 
```
> git clone https://github.com/intotherealworld/lunar.git
> cd lunar
> pip install -r requirements.txt
> vi ./lunar/config/properties.yml # 자신의 Solar API 키 입력.
> python local_server.py
```
3. 브라우저에서 접속: http://127.0.0.1:5000

## Solar API 키 입력 부분
lunar/config/properties.yml
```yaml
solar:
  api:
    base-url: https://api.upstage.ai/v1/solar
    key: 이부분에API키입력
```
