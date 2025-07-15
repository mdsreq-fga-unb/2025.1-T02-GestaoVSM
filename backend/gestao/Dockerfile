# Estágio 1: Build da Aplicação (com Java, Maven e Node.js)
# ATUALIZADO para usar uma imagem com Java 21
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# --- INÍCIO DA SEÇÃO NOVA ---
# Instala as ferramentas necessárias e o Node.js (versão LTS v20)
RUN apt-get update && \
    apt-get install -y ca-certificates curl gnupg && \
    mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
    NODE_MAJOR=20 && \
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list && \
    apt-get update && \
    apt-get install nodejs -y
# --- FIM DA SEÇÃO NOVA ---

# Copia todo o conteúdo do projeto (pom.xml, src, etc.)
COPY . .

# Executa o build do Maven. Agora o comando 'npm' será encontrado.
RUN mvn clean package -DskipTests

# Estágio 2: Execução da Aplicação (continua o mesmo)
# ATUALIZADO para usar uma imagem com Java 21
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
