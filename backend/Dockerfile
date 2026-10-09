# Build with the REPO ROOT as the Docker context (Render's default):
#   docker build -f backend/Dockerfile -t rolex-backend .
# ---------- Build stage ----------
FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY backend/pom.xml .
RUN mvn dependency:go-offline -B
COPY backend/src ./src
RUN mvn package -DskipTests

# ---------- Run stage ----------
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
