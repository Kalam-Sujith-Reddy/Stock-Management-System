select * from stocks;

CREATE TABLE stocks
(STOCK_ID NUMBER(5) PRIMARY KEY,
STOCK_NAME VARCHAR2(25),
STOCK_PRICE NUMBER(8,2),
STOCK_VOLUME NUMBER(10),
LISTING_PRICE NUMBER(8,2),
LISTED_DATE DATE,
LISTED_EXCHANGE VARCHAR2(8));

CREATE TABLE customers(Cust_id NUMBER(3) PRIMARY KEY,
FIRST_NAME VARCHAR2(20),
LAST_NAME VARCHAR2(20),
PHONE_NUMBER NUMBER(10),
CITY VARCHAR2(20),
EMAIL_ID VARCHAR2(15));

CREATE TABLE TRANSACTIONS(
TXN_ID NUMBER(3) PRIMARY KEY,
CUST_ID NUMBER(3),
stock_id NUMBER(3),
txn_price NUMBER(8,2),
txn_type VARCHAR2(10),
qty NUMBER(10),
txn_date DATE);

INSERT INTO STOCKS VALUES(1,'Reliance Industries',2850.75,4500000, 1000.00,
TO_DATE('2002-06-12', 'YYYY-MM-DD'),'NSE');
INSERT INTO STOCKS VALUES(2,'Infosys Limited',1650.255,32000000, 850.00,
TO_DATE('1993-03-15', 'YYYY-MM-DD'),'BSE');
INSERT INTO STOCKS VALUES(3,'HDFC Bank',1350.20,2800000, 500.00,
TO_DATE('1995-08-30', 'YYYY-MM-DD'),'NSE');
INSERT INTO STOCKS VALUES(4,'TCS',3485.65,3000000, 850.00, TO_DATE('2004-08-25',
'YYYY-MM-DD'),'BSE');
INSERT INTO STOCKS VALUES(5,'Maruti Suzuki',10500.0,1200000, 1250.00,
TO_DATE('2003-09-09', 'YYYY-MM-DD'),'NSE');
INSERT INTO STOCKS VALUES(6,'Titan Company',3325.90,950000, 120.00,
TO_DATE('2001-06-15', 'YYYY-MM-DD'),'NSE');
INSERT INTO STOCKS VALUES(7,'Bajaj Auto',5200.45,870000, 220.00,
TO_DATE('2000-05-07', 'YYYY-MM-DD'),'BSE');
INSERT INTO STOCKS VALUES(8,'Asian Paints',3350.70,780000, 400.00,
TO_DATE('1999-11-12', 'YYYY-MM-DD'),'NSE');
INSERT INTO STOCKS VALUES(9,'SBI',720.30,5400000, 100.00, TO_DATE('1997-07-19',
'YYYY-MM-DD'),'BSE');
INSERT INTO STOCKS VALUES(10,'Wipro Limited',520.65,2000000, 80.00,
TO_DATE('2000-01-11', 'YYYY-MM-DD'),'NSE');

select * from stocks;

INSERT INTO CUSTOMERS
VALUES(1,'Aarav','Sharma',9876543210,'Mumbai','aarav@gmail.com');
INSERT INTO CUSTOMERS
VALUES(2,'Priya','Varma',9123456789,'Delhi','priya@yahoo.com');
INSERT INTO CUSTOMERS
VALUES(3,'Rahul','Mehta',9282758127,'Bengaluru','rahul@gmail.com');
INSERT INTO CUSTOMERS
VALUES(4,'Sneha','Iyer',9611223344,'Chennai','sne@gmail.com');
INSERT INTO CUSTOMERS
VALUES(5,'Roshan','Deshmukh',9877001122,'Pune','ros@gmail.com');
INSERT INTO CUSTOMERS
VALUES(6,'Ananya','Reddy',9788899001,'Hyderabad','ana@gmail.com');
INSERT INTO CUSTOMERS
VALUES(7,'Karan','Singh',9900112233,'Chandigargh','karan@gmail.com');
INSERT INTO CUSTOMERS
VALUES(8,'Meera','Joshi',9811223344,'Ahmedabad','meera@yahoo.com');
INSERT INTO CUSTOMERS
VALUES(9,'Aditya','Kulkarni',9722334455,'Nagpur','adi@gmail.com');
INSERT INTO CUSTOMERS
VALUES(10,'Divya','Nair',9633445566,'Kochi','divya@gmail.com');

select * from customers;

drop table transactions;

CREATE TABLE TRANSACTIONS(
TXN_ID NUMBER(3) PRIMARY KEY,
CUST_ID NUMBER(3),
stock_id NUMBER(3),
txn_price NUMBER(8,2),
txn_type VARCHAR2(10),
qty NUMBER(10),
txn_date DATE);

INSERT INTO TRANSACTIONS
VALUES(1,1,2,2850.0,'BUY',10,TO_DATE('2025-07-15','YYYY-MM-DD'));
INSERT INTO TRANSACTIONS
VALUES(2,2,1,2222.0,'SELL',10,TO_DATE('2025-07-17','YYYY-MM-DD'));
INSERT INTO TRANSACTIONS
VALUES(3,3,3,444.0,'BUY',10,TO_DATE('2025-07-20','YYYY-MM-DD'));
INSERT INTO TRANSACTIONS
VALUES(4,4,1,777.0,'BUY',10,TO_DATE('2025-07-21','YYYY-MM-DD'));
INSERT INTO TRANSACTIONS
VALUES(5,5,5,1230.0,'BUY',10,TO_DATE('2025-07-26','YYYY-MM-DD'));
INSERT INTO TRANSACTIONS
VALUES(6,5,5,1111.1,'SELL',10,TO_DATE('2025-07-15','YYYY-MM-DD'));
INSERT INTO TRANSACTIONS
VALUES(7,6,1,2222.2,'BUY',10,TO_DATE('2025-07-27','YYYY-MM-DD'));
INSERT INTO TRANSACTIONS
VALUES(8,6,7,3222.2,'BUY',10,TO_DATE('2025-07-29','YYYY-MM-DD'));
INSERT INTO TRANSACTIONS
VALUES(9,6,10,1234.5,'SELL',10,TO_DATE('2025-07-15','YYYY-MM-DD'));
INSERT INTO TRANSACTIONS
VALUES(10,9,5,6789.0,'SELL',10,TO_DATE('2025-07-30','YYYY-MM-DD'));

select * from transactions;

CREATE TABLE TRANSACTIONS_BAKUP
AS SELECT * FROM TRANSACTIONS;

TRUNCATE TABLE TRANSACTIONS;

ALTER TABLE TRANSACTIONS
ADD CONSTRAINT FK
FOREIGN KEY(STOCK_ID) REFERENCES STOCKS(STOCK_ID);

INSERT INTO TRANSACTIONS VALUES(12,1,112,777,'SELL',99,SYSDATE);

TRUNCATE table STOCKS;

INSERT INTO stocks VALUES (1, 'Reliance Ind.',     2425.50, 100000, 1200.00, DATE '2010-04-01', 'NSE');
INSERT INTO stocks VALUES (2, 'TCS',               3620.10,  95000, 2100.00, DATE '2015-06-01', 'BSE');
INSERT INTO stocks VALUES (3, 'Infosys',           1550.75,  80000,  900.00, DATE '2012-07-15', 'NSE');
INSERT INTO stocks VALUES (4, 'HDFC Bank',         1650.90, 120000, 1430.00, DATE '2016-08-01', 'BSE');
INSERT INTO stocks VALUES (5, 'Kotak Bank',        1725.00,  70000, 1250.00, DATE '2013-01-20', 'NSE');
INSERT INTO stocks VALUES (6, 'ITC',                435.45, 150000,  350.00, DATE '2008-03-01', 'BSE');
INSERT INTO stocks VALUES (7, 'Axis Bank',         940.70,   75000,  600.00, DATE '2011-09-30', 'NSE');
INSERT INTO stocks VALUES (8, 'ONGC',              228.85,  80000,  180.00, DATE '2014-11-20', 'BSE');
INSERT INTO stocks VALUES (9, 'ICICI Bank',        918.00,   60000,  670.00, DATE '2011-03-05', 'NSE');
INSERT INTO stocks VALUES (10,'State Bank India',  601.15, 130000,  510.00, DATE '2007-02-14', 'BSE');
INSERT INTO stocks VALUES (11,'SBI Life',          1370.90,  40000,  700.00, DATE '2019-09-10', 'NSE');
INSERT INTO stocks VALUES (12,'Maruti Suzuki',     9779.00,  35000, 4201.00, DATE '2008-06-09', 'BSE');
INSERT INTO stocks VALUES (13,'Tata Motors',        892.40,  95000,  600.00, DATE '2011-11-18', 'NSE');
INSERT INTO stocks VALUES (14,'Bajaj Finance',     7332.00,  70000, 3500.00, DATE '2016-05-10', 'BSE');
INSERT INTO stocks VALUES (15,'HUL',               2698.00, 100000, 1650.00, DATE '2013-03-02', 'NSE');
INSERT INTO stocks VALUES (16,'Asian Paints',      2959.50,  60000, 2000.00, DATE '2017-12-21', 'BSE');
INSERT INTO stocks VALUES (17,'Mahindra & Mah.',   1650.60,  45000,  750.00, DATE '2009-07-23', 'NSE');
INSERT INTO stocks VALUES (18,'Wipro',              494.95,  55000,  360.00, DATE '2012-09-16', 'BSE');
INSERT INTO stocks VALUES (19,'Zomato',             161.85, 140000,   76.00, DATE '2021-07-23', 'NSE');
INSERT INTO stocks VALUES (20,'HCL Technologies',  1393.75,  40000,  800.00, DATE '2018-04-01', 'BSE');
INSERT INTO stocks VALUES (21,'Adani Enterprises',  3100.25, 20000,  150.00, DATE '2019-01-08', 'BSE');
INSERT INTO stocks VALUES (22,'Vedanta',            422.50,  80000,  210.00, DATE '2012-02-11', 'NSE');
INSERT INTO stocks VALUES (23,'JSW Steel',          812.00, 110000,  630.00, DATE '2015-11-11', 'BSE');
INSERT INTO stocks VALUES (24,'Nestle India',      24600.00, 18000, 12800.00, DATE '2013-03-10', 'NSE');
INSERT INTO stocks VALUES (25,'Bharti Airtel',      982.50, 110000,  800.00, DATE '2010-07-27', 'BSE');
INSERT INTO stocks VALUES (26,'NTPC',               387.30, 120000,  275.00, DATE '2014-02-17', 'NSE');
INSERT INTO stocks VALUES (27,'Power Grid',         249.05, 100000,  178.00, DATE '2015-04-11', 'BSE');
INSERT INTO stocks VALUES (28,'DMart',             4321.00,  60000,  619.00, DATE '2017-03-21', 'NSE');
INSERT INTO stocks VALUES (29,'Godrej CP',          1161.09,  30000,  800.00, DATE '2012-12-13', 'BSE');
INSERT INTO stocks VALUES (30,'Titan',              3412.80,  75000, 1180.00, DATE '2016-07-11', 'NSE');
INSERT INTO stocks VALUES (31,'Britannia',          5010.00,  50000, 2200.00, DATE '2012-03-13', 'BSE');
INSERT INTO stocks VALUES (32,'Dabur India',         565.10,  60000,  420.00, DATE '2013-05-29', 'NSE');
INSERT INTO stocks VALUES (33,'Pidilite Ind.',      2719.00,  37000, 1590.00, DATE '2014-11-09', 'BSE');
INSERT INTO stocks VALUES (34,'Bharat Forge',        1136.20,  47000,  600.00, DATE '2012-09-23', 'NSE');
INSERT INTO stocks VALUES (35,'Siemens',            4739.85,  21000, 2700.00, DATE '2011-08-01', 'BSE');
INSERT INTO stocks VALUES (36,'Eicher Motors',      3842.20,  15000, 1570.00, DATE '2013-10-23', 'NSE');
INSERT INTO stocks VALUES (37,'Aurobindo Pharma',   1320.00,  37000,  600.00, DATE '2015-03-06', 'BSE');
INSERT INTO stocks VALUES (38,'Divis Labs',         4280.80,  19000, 1200.00, DATE '2016-12-20', 'NSE');
INSERT INTO stocks VALUES (39,'GAIL',                166.45,  71000,   95.00, DATE '2013-06-10', 'BSE');
INSERT INTO stocks VALUES (40,'IndusInd Bank',      1151.94,  62000,  900.00, DATE '2017-10-02', 'NSE');
INSERT INTO stocks VALUES (41,'IDFC First Bank',     81.60,  77000,   44.00, DATE '2019-08-21', 'BSE');
INSERT INTO stocks VALUES (42,'Grasim',            2460.75,  26000,  900.00, DATE '2015-06-28', 'NSE');
INSERT INTO stocks VALUES (43,'SRF',               2510.44,  29000, 2250.00, DATE '2018-05-14', 'BSE');
INSERT INTO stocks VALUES (44,'Sun Pharma',        1283.00,  82000,  830.00, DATE '2009-02-10', 'NSE');
INSERT INTO stocks VALUES (45,'Lupin',              1367.55,  32000, 1030.00, DATE '2010-11-23', 'BSE');
INSERT INTO stocks VALUES (46,'Dr Reddy''s',       5643.90,  24000, 2050.00, DATE '2011-06-19', 'NSE');
INSERT INTO stocks VALUES (47,'UCO Bank',            61.23,  91000,   23.00, DATE '2008-01-18', 'BSE');
INSERT INTO stocks VALUES (48,'Bandhan Bank',        195.80,  87000,   80.00, DATE '2018-08-27', 'NSE');
INSERT INTO stocks VALUES (49,'Yes Bank',             25.70, 150000,   18.00, DATE '2007-05-05', 'BSE');
INSERT INTO stocks VALUES (50,'PVR Inox',           1689.90,  55000,  800.00, DATE '2012-04-03', 'NSE');


select * from stocks;

TRUNCATE TABLE customers;

INSERT INTO customers VALUES (1, 'Priya',  'Tiwari',   8877315621, 'Delhi',      'priya.ti@ex.com');
INSERT INTO customers VALUES (2, 'Arjun',  'Singh',    7895621430, 'Mumbai',     'arjun.s@ex.com');
INSERT INTO customers VALUES (3, 'Sneha',  'Sharma',   9654123786, 'Bengaluru',  'sneha.sh@ex.com');
INSERT INTO customers VALUES (4, 'Rahul',  'Verma',    9875631245, 'Pune',       'rahul.ve@ex.com');
INSERT INTO customers VALUES (5, 'Fatima', 'Khan',     9856743210, 'Chennai',    'fatima.kh@ex.com');
INSERT INTO customers VALUES (6, 'Gaurav', 'Patel',    9123456780, 'Ahmedabad',  'gaurav.pa@ex.com');
INSERT INTO customers VALUES (7, 'Divya',  'Gupta',    9978654321, 'Jaipur',     'divya.gu@ex.com');
INSERT INTO customers VALUES (8, 'Ankit',  'Mehta',    8812345678, 'Hyderabad',  'ankit.me@ex.com');
INSERT INTO customers VALUES (9, 'Swati',  'Chowdhury',9741567832, 'Kolkata',    'swati.ch@ex.com');
INSERT INTO customers VALUES (10,'Rohit',  'Roy',      9810456372, 'Lucknow',    'rohit.ro@ex.com');

select * from customers;

TRUNCATE table transactions;

INSERT INTO transactions VALUES (1, 1,  5,  1500.00, 'BUY',   10, DATE '2022-10-11');
INSERT INTO transactions VALUES (2, 1, 10,   580.00, 'BUY',   25, DATE '2022-10-12');
INSERT INTO transactions VALUES (3, 2, 13,   805.00, 'BUY',   18, DATE '2023-01-14');
INSERT INTO transactions VALUES (4, 2, 25,   900.00, 'BUY',   12, DATE '2023-03-15');
INSERT INTO transactions VALUES (5, 3,  3,  1340.00, 'BUY',    5, DATE '2023-04-11');
INSERT INTO transactions VALUES (6, 3, 44,   950.00, 'BUY',   16, DATE '2023-04-18');
INSERT INTO transactions VALUES (7, 4, 19,   115.00, 'BUY',   50, DATE '2023-06-25');
INSERT INTO transactions VALUES (8, 4, 38,  4000.00, 'BUY',    7, DATE '2023-07-03');
INSERT INTO transactions VALUES (9, 5,  2,  3300.00, 'BUY',    4, DATE '2022-11-22');
INSERT INTO transactions VALUES (10,5, 17,   890.00, 'BUY',    9, DATE '2022-11-22');
INSERT INTO transactions VALUES (11,6,  6,   410.00, 'BUY',   22, DATE '2022-09-05');
INSERT INTO transactions VALUES (12,6, 15,  1700.00, 'BUY',   12, DATE '2022-09-06');
INSERT INTO transactions VALUES (13,7, 11,   900.00, 'BUY',    3, DATE '2022-10-07');
INSERT INTO transactions VALUES (14,7, 33,  1600.00, 'BUY',    5, DATE '2022-10-08');
INSERT INTO transactions VALUES (15,8,  8,   180.00, 'BUY',   30, DATE '2023-01-31');
INSERT INTO transactions VALUES (16,8, 36,  1600.00, 'BUY',    2, DATE '2023-09-02');
INSERT INTO transactions VALUES (17,9, 20,  1200.00, 'BUY',    6, DATE '2023-07-09');
INSERT INTO transactions VALUES (18,9, 28,   620.00, 'BUY',   12, DATE '2023-08-21');
INSERT INTO transactions VALUES (19,10,40,   950.00, 'BUY',   10, DATE '2022-11-02');
INSERT INTO transactions VALUES (20,10,50,   900.00, 'BUY',    2, DATE '2022-11-03');

-- Add a few SELL examples for completeness
INSERT INTO transactions VALUES (21, 1,  5,  1550.00, 'SELL',   3, DATE '2023-10-19');
INSERT INTO transactions VALUES (22, 2, 13,   900.00, 'SELL',   7, DATE '2023-12-15');
INSERT INTO transactions VALUES (23, 3,  3,  1400.00, 'SELL',   2, DATE '2023-10-01');
INSERT INTO transactions VALUES (24, 4, 38, 4100.00, 'SELL',   1, DATE '2023-07-10');
INSERT INTO transactions VALUES (25, 5,  2,  3350.00, 'SELL',   2, DATE '2022-12-19');
INSERT INTO transactions VALUES (26, 6,  6,   430.00, 'SELL',   5, DATE '2022-11-25');
INSERT INTO transactions VALUES (27, 7,  9,   800.00, 'BUY',    6, DATE '2022-10-10');
INSERT INTO transactions VALUES (28, 8, 15,  1800.00, 'SELL',   1, DATE '2023-02-20');
INSERT INTO transactions VALUES (29, 9, 20,  1300.00, 'SELL',   2, DATE '2023-08-19');
INSERT INTO transactions VALUES (30, 10,44,  1200.00, 'SELL',   7, DATE '2023-03-02');

select * from transactions;

select * from stocks;
