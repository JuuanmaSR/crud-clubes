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

INSERT INTO  equipos(area_name, name, short_name,crest_url,address ) VALUES ('Argentina','River', 'CARP','./images/CA_river_plate_logo.svg.png','Av.Siempreviva');
SELECT * FROM equipos;
DELETE  FROM equipos;
DELETE FROM equipos WHERE id = 1
DELETE FROM sqlite_sequence WHERE NAME='equipos'
UPDATE equipos SET crest_url = 'images/CA_river_plate_logo.svg.png'