# base docker image

FROM openjdk:17
LABEL maintainer="ab"
ADD target/RecipeSA-0.0.1-SNAPSHOT.jar recipe-sa.jar
ENTRYPOINT ["java", "-jar", "recipe-sa.jar"]