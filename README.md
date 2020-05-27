# richg0ld-deno-boilerplate
Deno 공식 릴리즈 1.0.0버전 기준 보일러 플레이트입니. 1.0.0버전이 공식이라 하더라도 서드파티 모듈의 수도 적고 얼마나 검증되었는지도 알기 힘들기 때문에 계속해서 개선이 필요합니다.
구조는 php Laravel 구조를 참고하였습니다.

# Project <!-- TOC -->

- [Setting](#Setting)다
- [Docker](#Docker)
- [Deno](#Deno)

<!-- /TOC -->

#Setting
1.  도커 환경에서 올라가기 때문에 도커 세팅은 필수. (도커 설치는 공식 홈페이지에서 확인. https://docs.docker.com/get-started/)
1. `cd deno && cp .env.example .env` 로 디폴트 설정파일 카피.

#Docker 
**루트 디렉토리**에서 `docker-compose -f ./docker/dev.yml up -d` 를 실행. (윈도우용: `docker-compose -f ./docker/dev-win.yml up -d`)
명령어가 너무 길어서 bin 폴더에 쉘스크립트를 이용하도록 만들었습니다. (이후 부터는 쉘스크립트를 이용한 명령어로 적어두었습니다.)
**루트 디렉토리**에서 `./bin/dev.sh up -d` 를 실행.

#Deno 
1. **루트 디렉토리**에서 `./bin/dev.sh exec deno bash` 를 통해 도커 내부 진입
2. ./start.sh 로 실행
3. http://localhost:8809 접속