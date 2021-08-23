# Web & Roll

- [Strapi](https://strapi.io/) for the CMS
- [Next.js](https://nextjs.org/) for the front end

## Deploy

```bash
gcloud app deploy app.yaml --project wr-cms
```

## Strapi notes (to improve later)

- Make sure public permissions are set otherwise can't access API
- Using postgres
- Need to create script to sync db & uploads
- Outline about Google Service Accounts in the doc for uploads when done
- Need to learn more about postgres, but to migrate dev to prod, just dump the local db, upload to Google Cloud Storage, then import from a bucket. The prod database needs to be empty before doing this
- Remove font size from CK Editor or add these classes to the stylesheet
- Remove slug as we are generating routes in next

## Postgres

- To install locally run

```bash
brew install postgresql
```

- To start locally run

```bash
brew services start postgresql
```

- To create a local DB run

```bash
createdb wr-cms-dev
```

- To drop a local DB run

```bash
dropdb wr-cms-dev
```

- To connect to DB run

```bash
psql wr-cms-dev
```

- To dump DB run

```bash
pg_dump -U tomwebroll wr-cms-dev > dump.sql
```

- To import DB on localhost, cascade the tables & run

```bash
psql -U tomwebroll wr-cms-dev < Cloud_SQL_Export.sql
```

- To connect in Tableplus, just use mac username and DB name. No pass.

- To cascade all tables run

```sql
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;
```

## TO DO

- INCREASE FONT SIZE ON MENU
- ADD LAST UPDATED ONTO BLOG POSTS?
- TEST COVER IMAGE ON BLOG POSTS
- MERGE EVERYTHING FROM CENTRAL IN - NEARLY EVERYTHING!
- LOOK AT WHY CUSTOM FIELD NOT SAVING TO DB IN CENTRAL
- BUILD DEPLOY BUTTONS INTO DASHBOARD WHICH SHOW PROGRESS ETC.

- Set up tracking
- Test all fields in Strapi, don't think I set them all up. E.g. Grid styles, accordion
- Add unique schema for project single, project index, and post index
- Organise this readme better!
- Make search API work
- Improve first load times
- Try merge some components & reuse
- Improve OG-Image as just using the default Vercel background
- Dynamically load code style we need in blog
- Infinite scroll on blog/projects
- Improve the fields on Strapi. Add better validation, sort the help messages out, make certain fields required etc
