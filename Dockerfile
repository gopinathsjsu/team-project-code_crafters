FROM openjdk:17-jdk-slim

# Set the working directory to /app
WORKDIR /app

# Copy the executable jar file and any other necessary files to the container
COPY Apollo_Fitness-v1.jar /app

# Expose the port that the Spring Boot app listens on
EXPOSE 8080

# Set the command to run the Spring Boot app
CMD ["java", "-jar", "Apollo_Fitness-v1.jar"]
