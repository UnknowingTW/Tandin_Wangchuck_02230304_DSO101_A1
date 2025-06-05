# Secure CI/CD Pipeline with Docker and GitHub Actions

**Assignment 4 - Continuous Integration and Continuous Deployment (DSO101)**  
**Student:** Tandin Wangchuck  
**Student ID:** 02230304  
**Course:** Bachelor's of Engineering in Software Engineering (SWE)  
**Date of Submission:** 28th May 2025

---

## Overview

This project demonstrates the implementation of secure CI/CD pipelines using Docker, Jenkins, and GitHub Actions. The focus is on integrating security best practices to prevent common vulnerabilities such as exposed secrets, privilege escalation, and unauthorized deployments.

---

## Part 1: Docker Security Implementation ✅

### 1.1 Non-Root User Configuration
- **Implementation:** Created non-root user `todouser` with UID 1001 in Dockerfile
- **Security Benefit:** Prevents privilege escalation attacks
- **Verification:** Application runs as UID 1001 instead of root (UID 0)

### 1.2 Docker Secrets Management
- **Implementation:** Used Docker Compose secrets to manage sensitive data
- **Security Benefit:** Secrets stored in memory (`/run/secrets/`), not in image layers
- **Verification:** Application successfully loads secrets without exposing them in logs

![Docker Security](screenshots/docker-security.png)
*Screenshot showing non-root user (UID: 1001) and secrets loaded successfully*

---

## Part 2: Jenkins Secure Pipeline

### Pipeline Implementation
- **Setup:** Jenkins pipeline with secure credential management
- **Credentials:** Docker Hub credentials stored as global credentials with ID `docker-hub-creds`
- **Process:** Build → Security Scan → Push to Docker Hub → Cleanup
- **Security Features:**
  - Credential binding prevents secret exposure in logs
  - Automatic cleanup of Docker resources
  - Security scanning with Trivy

---

## Part 3: GitHub Actions Secure Pipeline ✅

### Implementation
- **Secrets Management:** Repository secrets for Docker Hub authentication
- **Security Features:**
  - Only deploys from main branch
  - Uses official Docker actions
  - Implements proper error handling
  - Multi-platform builds with caching


---

## Security Best Practices Implemented

### 1. Container Security
- ✅ **Non-root containers** - Prevents privilege escalation
- ✅ **Secrets management** - Keeps sensitive data secure
- ✅ **Health checks** - Ensures container reliability
- ✅ **Image scanning** - Detects vulnerabilities

### 2. CI/CD Security
- ✅ **Credential binding** - Prevents exposure in logs
- ✅ **Branch protection** - Only deploys from main branch
- ✅ **Access tokens** - Uses tokens instead of passwords
- ✅ **Resource cleanup** - Prevents resource leaks

### 3. Access Control
- ✅ **Repository secrets** - Secure credential storage
- ✅ **Least privilege** - Minimal required permissions
- ✅ **Audit trail** - Complete deployment history

---

## Deployment Evidence

### Docker Hub Deployments


### Application Security Verification
```json
{
  "message": "Todo App with Docker Secrets",
  "user": "UID: 1001",
  "secrets_status": {
    "db_password": "✅ Loaded",
    "api_key": "✅ Loaded"
  }
}
```

---

## Repository Structure

```
todo-app/
├── Dockerfile                 # Secure container configuration
├── docker-compose.yml         # Secrets management setup
├── Jenkinsfile               # Jenkins pipeline configuration
├── .github/workflows/        # GitHub Actions workflows
├── src/                      # Application source code
├── secrets/                  # Docker secrets (not committed)
└── screenshots/              # Evidence screenshots
```

---

## How to Run

### With Docker Compose (Recommended for testing secrets):
```bash
docker-compose up --build
```

### With Docker only:
```bash
docker build -t todo-app .
docker run -p 3000:3000 todo-app
```

### Local Development:
```bash
npm install
npm start
```

---

## Key Achievements

1. **✅ Implemented non-root Docker containers** - Running as UID 1001
2. **✅ Configured Docker secrets management** - Secrets loaded from `/run/secrets/`
3. **✅ Set up secure Jenkins pipeline** - With credential binding and security scanning
4. **✅ Implemented GitHub Actions workflow** - With repository secrets and branch protection
5. **✅ Achieved end-to-end security** - From development to deployment

---

## Security Measures Summary

| Security Feature | Implementation | Status |
|-----------------|----------------|---------|
| Non-root containers | Dockerfile USER directive | ✅ Complete |
| Docker secrets | docker-compose.yml secrets | ✅ Complete |
| Jenkins credentials | Global credentials binding | ✅ Complete |
| GitHub secrets | Repository secrets | ✅ Complete |
| Branch protection | Main branch only deployment | ✅ Complete |
| Access tokens | Docker Hub tokens vs passwords | ✅ Complete |
| Security scanning | Trivy integration | ✅ Complete |
| Resource cleanup | Automated cleanup scripts | ✅ Complete |

---

## Conclusion

This project successfully demonstrates the implementation of a secure CI/CD pipeline with multiple layers of security:

- **Container-level security** through non-root users and secrets management
- **Pipeline security** through proper credential handling and access controls  
- **Deployment security** through branch protection and audit trails

The implementation addresses all major security vulnerabilities commonly found in CI/CD pipelines and provides a robust foundation for secure application deployment.

**All security requirements for Assignment 4 have been successfully implemented and verified.**