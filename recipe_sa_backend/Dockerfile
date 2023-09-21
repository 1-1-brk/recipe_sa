# base docker image

FROM openjdk:17
#LABEL maintainer="ab"
ADD target/recipe_sa-0.0.1-SNAPSHOT.jar recipe-sa.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "recipe-sa.jar"]

#FROM openjdk:17 as build
#
##WORKDIR /app
#
#COPY mvnw .
#COPY .mvn .mvn
#
###RUN dos2unix mvnw
#RUN ./mvnw dependency:go-offline -B
#
#COPY src src
#
#RUN ./mvnw package -Dskiptests
#RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)
#
##########################################
#
#FROM openjdk:17
#
#ARG DEPENDENCY=/app/target/dependency
#
#COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
#COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
#COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app
#
#ENTRYPOINT ["java", "-cp", "app:app/lib/*", "com.example.rsa_app.RecipeSA"]

##, "-jar", "recipe-sa.jar"]
