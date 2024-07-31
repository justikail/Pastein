# Pastein

Pastein - Modern paste tool. Store your text online with Pastein.

![Preview](https://raw.githubusercontent.com/justikail/Pastein/main/public/preview.png)

## Tech

- Next.js v14.2.5
- Tailwind CSS
- Supabase

## Installation & Setup

<details>
  <summary>
    Open
  </summary>
  
- Run this command :
  ```
  git clone https://github.com/justikail/Pastein
  cd Pastein
  npm i
  code .
  ```
- [Login / Register Supabase Account.](https://supabase.com/)
- Create a new project with any name & any password.
- Go to Table Editor & click Create a new table with table name "pastein" & unchecklist RLS.
- Add or edit column with this detail:

| column     | typewidth   | other            |
| ---------- | ----------- | ---------------- |
| id         | int8        | ai, notnull      |
| title      | text        | notnull          |
| content    | text        | notnull          |
| type       | text        | notnull          |
| endPoint   | uuid        | genuuid, notnull |
| created_at | timestamptz | now, notnull     |
| expired_at | timestamptz | null             |

- Click insert & click insert row.
- Go to **SQL Editor**.
- Copy and paste this code on textarea field.

```pgsql
CREATE OR REPLACE FUNCTION delete_expired_paste()
RETURNS void LANGUAGE plpgsql AS $$
BEGIN
    DELETE FROM pastein
    WHERE expired_at < NOW();
END;
$$;
```

- Then click Run.
- Go to New query, copy and paste this code.

```pgsql
SELECT cron.schedule('*/5 * * * *', 'SELECT delete_expired_paste();');
```

- Then click Run.
- Go to New query, copy and paste this code.

```pgsql
SELECT * FROM cron.job;
```

- Then click Run again.
- Go to Project Settings -> API.
- Copy URL on Project URL field, Paste on .env **NEXT_SUPABASE_URL**.
- Copy Api Key on Project API Keys, Paste on .env **NEXT_SUPABASE_KEY**.
</details>
