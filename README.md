### Database Stuff

To run the database image

```s
docker run --name pg -e POSTGRES_PASSWORD=SpikeTheBulldog -e POSTGRES_DB=app -p 5432:5432 postgres
```

To remap prisma schema to postgres schema (only for development) run...

```s
npx prisma migrate dev
```
