DROP TABLE IF EXISTS equipos;
CREATE TABLE  equipos(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
   area_name TEXT NOT NULL,
    `name` TEXT NOT NULL,
    short_name TEXT NOT NULL,
    crest_url TEXT NOT NULL,
    `address` TEXT NOT NULL,
    created_at DATE DEFAULT (datetime('now', 'localtime')) NOT NULL,
    updated_at DATE DEFAULT (datetime('now', 'localtime')) NOT NULL
);