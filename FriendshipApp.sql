-- Create Login table
-- DROP TABLE UserLogin;

CREATE TABLE UserLogin (
	UserID SERIAL PRIMARY KEY,
    Username VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Pwd VARCHAR(50) NOT NULL
   );

-- Create User Table 
-- Drop TABLE UserProfile
CREATE TABLE UserProfile (
    UserID SERIAL REFERENCES UserLogin,
    UAge INT,
    Gender VARCHAR(10),
    ULocation VARCHAR(100),
    ProfilePicture VARCHAR(255)
);

-- DROP TABLE INTEREST;
-- Create Friendship table
CREATE TABLE Friendship (
    FriendshipID SERIAL PRIMARY KEY,
    User1ID INT REFERENCES UserProfile(UserID),
    User2ID INT REFERENCES UserProfile(UserID),
    Status VARCHAR(20)
);

-- DROP TABLE INTEREST;
-- Create Interest table
CREATE TABLE Interest (
    InterestID SERIAL PRIMARY KEY,
    InterestName VARCHAR(50) NOT null,
    InterestIcon VARCHAR(255) not NULL
);

-- Create UserInterest table
CREATE TABLE UserInterest (
    UserInterestID SERIAL PRIMARY KEY,
    UserID INT REFERENCES UserProfile(UserID),
    InterestID INT REFERENCES Interest(InterestID)
);

-- Retrieve user interests 
/*SELECT
    UserProfile.Username,
    Interest.InterestName
FROM
    UserProfile
JOIN
    UserInterest ON UserProfile.UserID = UserInterest.UserID
JOIN
    Interest ON UserInterest.InterestID = Interest.InterestID;*/


