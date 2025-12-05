# Sonang Interior Backend

Spring Boot + JPA + MySQL 기반 백엔드 서버 (Gradle)

## 요구사항

- Java 17 이상
- MySQL 8.0 이상
- Gradle 8.0 이상 (또는 Gradle Wrapper 사용)

## 데이터베이스 설정

1. MySQL에서 `shop` 스키마 생성:

```sql
CREATE DATABASE IF NOT EXISTS shop DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. 현재 설정된 DB 정보 (`application.properties`):
   - URL: `localhost:3306/shop`
   - Username: `root`
   - Password: `1234`

## 실행 방법

```bash
cd backend
./gradlew bootRun
```

Windows에서:
```bash
cd backend
gradlew.bat bootRun
```

또는 IDE에서 `SonangInteriorApplication.java` 실행

**서버 포트: 8090**

## API 엔드포인트

### 회원가입
- **POST** `/api/users/register`
- Request Body:
```json
{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "name": "테스트",
    "phone": "010-1234-5678",
    "address": "서울시 강남구"
}
```

### 로그인
- **POST** `/api/users/login`
- Request Body:
```json
{
    "username": "testuser",
    "password": "password123"
}
```

### 사용자 조회
- **GET** `/api/users/{id}`

## 테이블 구조

애플리케이션 실행 시 자동으로 `users` 테이블이 생성됩니다:

| 컬럼명      | 타입         | 설명            |
|------------|-------------|-----------------|
| id         | BIGINT      | PK, Auto        |
| username   | VARCHAR(50) | 사용자명 (Unique)|
| email      | VARCHAR(100)| 이메일 (Unique)  |
| password   | VARCHAR(255)| 비밀번호         |
| name       | VARCHAR(50) | 이름            |
| phone      | VARCHAR(20) | 전화번호         |
| address    | VARCHAR(255)| 주소            |
| created_at | DATETIME    | 생성일시         |
| updated_at | DATETIME    | 수정일시         |
| last_login | DATETIME    | 마지막 로그인    |
| is_active  | BOOLEAN     | 활성화 여부      |

