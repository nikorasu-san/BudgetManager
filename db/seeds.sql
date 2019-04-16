use budget;
INSERT INTO users (preferredName, password, monthlyIncome, email, phone, cat0name, cat1name,cat2name, cat3name,cat4name,cat5name,cat6name,cat7name,cat8name,cat9name,cat0cap, cat1cap,cat2cap,cat3cap,cat4cap,cat5cap,cat6cap,cat7cap,cat8cap,cat9cap,cat0warn, cat1warn,cat2warn,cat3warn,cat4warn,cat5warn,cat6warn,cat7warn,cat8warn,cat9warn)
VALUES ("Connie","sugarrush",9000,"star@star.com","5554443333","Travel","Concert","Food","Socializing","Clothes","Car note","Rent","Gas","Electric","Dance Class", 300, 35, 150, 100, 80, 200, 1000, 30, 50, 20, 250,20,100,80,40,190,800,20,40,10),
("Sonny", "jambam",8500,"bra@ski.com","9998887777","Brew Supplies","CTA","Food","Rent","Utilities","Loans","Music Lessons", "Weekend","Gym","Clothes", 50, 60, 80, 600, 110, 300, 35, 50, 80, 30,40,40,60,500,90,250,30,40,60,20);
SELECT * FROM budget.Users;

insert into events( userId, description, category, amount,date, createdAt, updatedAt)
Values( 1, "cheetos", 2, 2.00, "2019-04-01","2019-04-15","2019-04-15"),
( 1, "cheetos", 2, 2.00, "2019-04-02","2019-04-15","2019-04-15"),
( 2, "cheetos", 2, 2.00, "2019-04-01","2019-04-15","2019-04-15"),
( 2, "CheezeWhiz", 2, 5.00, "2019-04-01","2019-04-15","2019-04-15"),
( 2, "rent", 3, 1500.00, "2019-04-01","2019-04-15","2019-04-15"),
( 1, "rent", 6, 500.00, "2019-04-01","2019-04-15","2019-04-15"),
( 1, "cheetos", 2, 2.00, "2019-04-01","2019-04-15","2019-04-15"),
( 1, "cheezeWhiz", 2, 5.00, "2019-04-01","2019-04-15","2019-04-15");

INSERT into events( userId, description, category, amount,date, billFlag,createdAt,updatedAt)
Values( 1, "car insurance", 5, 500.00, "2019-04-30", true,"2019-04-15","2019-04-15"),
( 1, "venmo", 1, 20.00, "2019-04-30", true,"2019-04-15","2019-04-15"),
( 2, "taxes", 4, 30.00, "2019-04-30", true,"2019-04-15","2019-04-15");