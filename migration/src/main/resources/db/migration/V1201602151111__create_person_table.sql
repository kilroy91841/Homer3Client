USE homer3;

CREATE TABLE player (
	id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    mlbTeam VARCHAR(100) NOT NULL,
    position VARCHAR(20) NOT NULL,
    createdDateUTC BIGINT NOT NULL,
    updatedDateUTC BIGINT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE playerSeason (
    id BIGINT NOT NULL AUTO_INCREMENT,
    season INT NOT NULL,
    playerId BIGINT NOT NULL,
    teamId BIGINT NOT NULL,
    position VARCHAR(20) NOT NULL,
    keeperSeason INT NOT NULL DEFAULT 0,
    salary INT NOT NULL DEFAULT 0,
    isMinorLeaguer TINYINT(1) NOT NULL DEFAULT 0,
    createdDateUTC BIGINT NOT NULL,
    updatedDateUTC BIGINT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE test (
	id BIGINT NOT NULL AUTO_INCREMENT,
    createdDateUTC BIGINT NOT NULL,
    updatedDateUTC BIGINT NOT NULL,
    count INT NOT NULL,
    name VARCHAR(100),
    longObject BIGINT NULL,
    myBool TINYINT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);