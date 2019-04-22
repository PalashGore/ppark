FROM mariadb:latest

ENV MYSQL_DATABASE parking
ENV MYSQL_ROOT_PASSWORD palash

ADD db-script.sql .

VOLUME /var/lib/mysql

RUN /etc/init.d/mysql start
RUN mysql -u palash -p mydb < db-script 
RUN db-script.sql
EXPOSE 3306

CMD mysqld 



