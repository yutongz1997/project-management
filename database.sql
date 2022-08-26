CREATE TABLE participants (
    id             CHAR(36) NOT NULL,
    firstName      VARCHAR(255),
    lastName       VARCHAR(255) NOT NULL,
    dateOfBirth    DATE NOT NULL,
    email          VARCHAR(255) NOT NULL,
    position       VARCHAR(255) NOT NULL,
    description    LONGTEXT,
    notes          LONGTEXT,
    joinDate       DATE NOT NULL,
    lastUpdateTime DATETIME NOT NULL,

    PRIMARY KEY (id)
);


CREATE TABLE projects (
    id             CHAR(36) NOT NULL,
    title          VARCHAR(1000) NOT NULL,
    description    LONGTEXT,
    notes          LONGTEXT,
    year           YEAR NOT NULL,
    lastUpdateTime DATETIME NOT NULL,

    PRIMARY KEY (id)
);


CREATE TABLE lookup_project_participants (
    id_project     CHAR(36) NOT NULL,
    id_participant CHAR(36) NOT NULL,

    FOREIGN KEY (id_project) REFERENCES projects(id),
    FOREIGN KEY (id_participant) REFERENCES participants(id)
);
