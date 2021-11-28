## Start the database

```s
docker run --name pg -e POSTGRES_PASSWORD=SpikeTheBulldog -e POSTGRES_DB=app -p 5432:5432 postgres
```
