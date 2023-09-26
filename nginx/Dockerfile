FROM nginx

#RUN rm -rf /etc/nginx/conf.d/*
#RUN rm -rf /usr/share/nginx/html/*

## WORKDIR /usr/share/nginx/html/

# COPY --from=builder /app/build /usr/share/nginx/html/

## COPY ./.nginx/nginx.conf /etc/nginx/conf.d/default.conf
## COPY --from=builder /app/build /usr/share/nginx/html/
## COPY ../nginx/nginx.conf ../../etc/nginx/conf.d/default.conf
## COPY --from=builder /app/build /usr/share/nginx/html
## COPY --from=builder /app/nginx/nginx.conf /etc/nginx.conf.d/default.conf
COPY ./conf/nginx.conf /etc/nginx/conf.d/default.conf
# COPY usr/share/nginx/nginx.conf /etc/nginx/conf.d/default.conf
# ENTRYPOINT ["nginx", "-g", "daemon off;"]

