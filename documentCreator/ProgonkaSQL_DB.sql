CREATE TABLE proxy3.individuals (
  id INT NOT NULL AUTO_INCREMENT,
  firstName VARCHAR(25) NOT NULL,
  lastName VARCHAR(25) NOT NULL,
  patronymic VARCHAR(25) DEFAULT NULL,
  issued VARCHAR(80) NOT NULL,
  series VARCHAR(4) NOT NULL,
  number VARCHAR(6) NOT NULL,
  post VARCHAR(25) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 9,
AVG_ROW_LENGTH = 2340,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE proxy3.organizations (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(50) NOT NULL,
  inn VARCHAR(10) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 7,
AVG_ROW_LENGTH = 4096,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE proxy3.products (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 7,
AVG_ROW_LENGTH = 4096,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE proxy3.proxybodies (
  id INT NOT NULL AUTO_INCREMENT,
  `count` INT DEFAULT 1,
  unit VARCHAR(8) NOT NULL,
  proxyHeaderId INT NOT NULL,
  productId INT NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 3,
AVG_ROW_LENGTH = 8192,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE proxy3.proxyheaders (
  id INT NOT NULL AUTO_INCREMENT,
  number INT NOT NULL,
  dischargeDate DATE NOT NULL,
  endDate DATE NOT NULL,
  individualId INT NOT NULL,
  organizationId INT NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 6,
AVG_ROW_LENGTH = 8192,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE proxy3.adrepbodies (
  id INT NOT NULL AUTO_INCREMENT,
  numberB INT NOT NULL,
  dateOfDocB DATE NOT NULL,
  numOfDocB INT NOT NULL,
  nameOfDocB VARCHAR(50) NOT NULL,
  rubKopByRepB FLOAT NOT NULL,
  inCurByRepB VARCHAR(50) NOT NULL,
  rubKopByAccountB FLOAT NOT NULL,
  inCurByAccountB VARCHAR(50) NOT NULL,
  debetScore INT NOT NULL,
  adrepHeaderId INT NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 2,
AVG_ROW_LENGTH = 16384,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE proxy3.adrepheaders (
  id INT NOT NULL AUTO_INCREMENT,
  nameOfOrgInd INT NOT NULL,
  byOKPO INT NOT NULL,
  rubTR INT NOT NULL,
  kopTR INT NOT NULL,
  adrepNum1 VARCHAR(50) NOT NULL,
  adrepDate DATE NOT NULL,
  postBossIndId INT NOT NULL,
  dateTR DATE NOT NULL,
  structDivision VARCHAR(50) NOT NULL,
  codeCD INT NOT NULL,
  accountablePerson VARCHAR(50) NOT NULL,
  serviceNumber INT NOT NULL,
  postIndId INT NOT NULL,
  getAd VARCHAR(50) NOT NULL,
  previousAdBalance VARCHAR(50) NOT NULL,
  previousAdOverspending VARCHAR(50) NOT NULL,
  adFirstBoxOffice VARCHAR(50) NOT NULL,
  inCurrency VARCHAR(50) NOT NULL,
  underCurrency2 VARCHAR(50) NOT NULL,
  totalReceived VARCHAR(50) NOT NULL,
  usepUP VARCHAR(50) NOT NULL,
  remains VARCHAR(50) NOT NULL,
  costOverruns VARCHAR(50) NOT NULL,
  dS1 INT NOT NULL,
  dSu1 VARCHAR(50) NOT NULL,
  crS1 INT NOT NULL,
  crSu1 VARCHAR(50) NOT NULL,
  dS2 INT NOT NULL,
  dSu2 VARCHAR(50) NOT NULL,
  crS2 INT NOT NULL,
  crSu2 VARCHAR(50) NOT NULL,
  application VARCHAR(50) NOT NULL,
  documentsOn INT NOT NULL,
  rub2 INT NOT NULL,
  kop2 INT NOT NULL,
  orderNum INT NOT NULL,
  dateUndNum DATE NOT NULL,
  dateUnddateUnd DATE NOT NULL,
  accepForVer VARCHAR(50) NOT NULL,
  adrepNum INT NOT NULL,
  dateUndAdrepNum DATE NOT NULL,
  countOfDoc INT NOT NULL,
  onSheets INT NOT NULL,
  dateLast DATE NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 23,
AVG_ROW_LENGTH = 16384,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_0900_ai_ci;

ALTER TABLE proxy3.adrepbodies 
  ADD CONSTRAINT FK_adrepbodies_adrepHeaderId FOREIGN KEY (adrepHeaderId)
    REFERENCES proxy3.adrepheaders(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE proxy3.adrepheaders 
  ADD CONSTRAINT FK_adrepheaders_nameOfOrgInd FOREIGN KEY (nameOfOrgInd)
    REFERENCES proxy3.organizations(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE proxy3.adrepheaders 
  ADD CONSTRAINT FK_adrepheaders_postBossIndId FOREIGN KEY (postBossIndId)
    REFERENCES proxy3.individuals(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE proxy3.adrepheaders 
  ADD CONSTRAINT FK_adrepheaders_postIndId FOREIGN KEY (postIndId)
    REFERENCES proxy3.individuals(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE proxy3.proxybodies 
  ADD CONSTRAINT FK_proxybodies_productId FOREIGN KEY (productId)
    REFERENCES proxy3.products(id);

ALTER TABLE proxy3.proxybodies 
  ADD CONSTRAINT FK_proxybodies_proxyHeaderId FOREIGN KEY (proxyHeaderId)
    REFERENCES proxy3.proxyheaders(id);

