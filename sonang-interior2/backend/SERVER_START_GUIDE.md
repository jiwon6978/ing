# 서버 실행 가이드

## 🔴 연결 거부 오류 해결 방법

### 1단계: MySQL 확인

**MySQL이 실행 중인지 확인:**
```bash
# Windows에서 MySQL 서비스 확인
net start | findstr MySQL
```

**MySQL이 실행되지 않았다면:**
```bash
# MySQL 서비스 시작
net start MySQL80
# 또는 MySQL57, MySQL 등 (설치된 버전에 따라 다름)
```

### 2단계: 데이터베이스 생성

MySQL에 접속하여 `shop` 데이터베이스를 생성:

```sql
CREATE DATABASE IF NOT EXISTS shop DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

**MySQL 접속 방법:**
```bash
mysql -u root -p
# 비밀번호 입력: 1234
```

### 3단계: 서버 실행

**방법 1: IntelliJ에서 실행 (권장)**
1. IntelliJ에서 `backend` 폴더를 프로젝트로 열기
2. `SonangInteriorApplication.java` 파일 열기
3. 우클릭 → `Run 'SonangInteriorApplication'`
4. 콘솔에서 "Started SonangInteriorApplication" 메시지 확인

**방법 2: 터미널에서 실행**
```bash
cd backend
gradlew.bat bootRun
```

**방법 3: 빌드 후 실행**
```bash
cd backend
gradlew.bat build
java -jar build/libs/sonang-interior-backend-1.0.0.jar
```

### 4단계: 서버 실행 확인

서버가 정상적으로 시작되면 콘솔에 다음과 같은 메시지가 표시됩니다:
```
Started SonangInteriorApplication in X.XXX seconds
```

### 5단계: 브라우저에서 접속

서버가 실행된 후 브라우저에서:
- http://localhost:8090/
- http://localhost:8090/portfolio.html
- http://localhost:8090/login.html

## ⚠️ 문제 해결

### 문제 1: "Connection refused" 오류
**원인:** 서버가 실행되지 않음
**해결:** 위의 3단계를 따라 서버를 실행하세요.

### 문제 2: MySQL 연결 오류
**원인:** MySQL이 실행되지 않았거나 데이터베이스가 없음
**해결:** 
1. MySQL 서비스 시작
2. `shop` 데이터베이스 생성
3. `application.properties`에서 비밀번호 확인

### 문제 3: 포트 8090이 이미 사용 중
**원인:** 다른 프로세스가 포트 8090을 사용 중
**해결:**
```bash
# Windows에서 포트 사용 확인
netstat -ano | findstr :8090

# 프로세스 종료 (PID는 위 명령어 결과에서 확인)
taskkill /PID [PID번호] /F
```

또는 `application.properties`에서 다른 포트로 변경:
```properties
server.port=8091
```

### 문제 4: Gradle 빌드 오류
**원인:** 의존성 다운로드 실패 또는 컴파일 오류
**해결:**
```bash
cd backend
gradlew.bat clean build --refresh-dependencies
```

## 📝 체크리스트

서버 실행 전 확인사항:
- [ ] MySQL 서비스가 실행 중인가?
- [ ] `shop` 데이터베이스가 생성되었는가?
- [ ] MySQL 비밀번호가 `application.properties`와 일치하는가? (현재: 1234)
- [ ] Java 17 이상이 설치되어 있는가?
- [ ] 포트 8090이 사용 가능한가?

## 🚀 빠른 시작 (MySQL 없이 테스트)

MySQL 없이 서버만 실행하려면 임시로 H2 데이터베이스를 사용할 수 있습니다:

1. `build.gradle`에 추가:
```gradle
runtimeOnly 'com.h2database:h2'
```

2. `application.properties`에 추가:
```properties
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driver-class-name=org.h2.Driver
spring.h2.console.enabled=true
```

하지만 프로덕션 환경에서는 MySQL을 사용해야 합니다.

