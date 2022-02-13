DROP TABLE IF EXISTS `applications`;
DROP TABLE IF EXISTS `courses`;

CREATE TABLE applications
(
  id             INT         NOT NULL AUTO_INCREMENT,
  name           VARCHAR(80) NOT NULL,
  version_number INT         NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE courses
(
  id             int         NOT NULL AUTO_INCREMENT,
  name           VARCHAR(80) NOT NULL,
  creation_date  DATE        NOT NULL,
  application_id INT         NOT NULL,
  PRIMARY KEY (id)
);

ALTER TABLE courses
  ADD CONSTRAINT FK_applications_TO_courses
    FOREIGN KEY (application_id)
    REFERENCES applications (id);
