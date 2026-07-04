import { mkdirSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

export function initDatabase(dbPath: string = ":memory:") {
  if (dbPath === ":memory:") {
    const db = new DatabaseSync(dbPath);
    migrate(db);

    return db;
  }

  const fullPath = path.resolve(process.cwd(), dbPath);
  mkdirSync(path.dirname(fullPath), { recursive: true });

  const db = new DatabaseSync(dbPath);
  migrate(db);

  return db;
}

function migrate(db: DatabaseSync) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS migrations (
      id          INTEGER   PRIMARY KEY   AUTOINCREMENT,
      migration   TEXT      NOT NULL      UNIQUE
    );
  `);

  const migrationsDir = path.join(process.cwd(), "migrations");

  const files = readdirSync(migrationsDir)
    .filter((file) => file.endsWith(".sql"))
    .sort((a, b) => Number(a.split("_")[0]) - Number(b.split("_")[0]));

  const applied = new Set(
    db
      .prepare("SELECT migration FROM migrations")
      .all()
      .map((row: any) => row.migration),
  );

  const insertMigration = db.prepare(
    "INSERT INTO migrations (migration) VALUES (?)",
  );

  for (const file of files) {
    if (applied.has(file)) {
      continue;
    }

    console.log(`Applying ${file}...`);

    const sql = readFileSync(path.join(migrationsDir, file), "utf8");

    db.exec("BEGIN");

    try {
      db.exec(sql);
      insertMigration.run(file);
      db.exec("COMMIT");

      console.log(`Migration aplicada: ${file}`);
    } catch (err) {
      db.exec("ROLLBACK");
      throw err;
    }
  }
}

