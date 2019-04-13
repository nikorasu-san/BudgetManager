
use budget;
insert inTO users (preferredName, password, monthlyIncome, email, phone, cat0name, cat1name,cat2name, cat3name,cat4name,cat5name,cat6name,cat7name,cat8name,cat9name,cat0cap, cat1cap,cat2cap,cat3cap,cat4cap,cat5cap,cat6cap,cat7cap,cat8cap,cat9cap, createdAt, updatedAt)
VALUES ("Connie","sugarrush",6000,"star@star.com","5554443333","Travel","Concert","Food","Socializing","Clothes","Car note","Rent","Gas","Electric","Dance Class", 300, 35, 150, 100, 80, 200, 1000, 30, 50, 20, 122,122),
("Sonny", "jambam",4500,"bra@ski.com","9998887777","Brew Supplies","CTA","Food","Rent","Utilities","Loans","Music Lessons", "Weekend","Gym","Clothes", 50, 60, 80, 600, 110, 300, 35, 50, 80, 30,123,123);
SELECT * FROM budget.Users;

insert into events( userId, description, category, amount,date, createdAt, updatedAt)
Values( 1, "cheetos", 2, 500.00, "2001-01-01", 123, 123),
( 1, "cheetos", 2, 500.00, "2001-01-02", 123, 123),
( 2, "cheetos", 2, 500.00, "2001-01-01", 123, 123),
( 2, "CheezeWhiz", 2, 500.00, "2001-01-01", 123, 123),
( 2, "rent", 3, 1500.00, "2001-01-01", 123, 123),
( 1, "rent", 6, 500.00, "2001-01-01", 123, 123),
( 1, "cheetos", 2, 50.00, "2001-01-01", 123, 123),
( 1, "cheezeWhiz", 2, 500.00, "2001-01-01", 123, 123);




select * from events;

SET FOREIGN_KEY_CHECKS=0;
drop table users ;
drop table events;
drop table seedsuser;

