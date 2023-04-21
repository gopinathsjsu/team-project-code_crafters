CREATE TABLE Members (
  member_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20),
  membership_type ENUM('Basic', 'Premium', 'VIP') NOT NULL,
  membership_status ENUM('Active', 'Inactive') NOT NULL,
  location_id INT NOT NULL,
  FOREIGN KEY (location_id) REFERENCES Locations(location_id)
);

CREATE TABLE Classes (
  class_id INT AUTO_INCREMENT PRIMARY KEY,
  class_name VARCHAR(255) NOT NULL,
  class_description VARCHAR(255),
  instructor_id INT NOT NULL,
  location_id INT NOT NULL,
  class_capacity INT NOT NULL,
  FOREIGN KEY (instructor_id) REFERENCES Instructors(instructor_id),
  FOREIGN KEY (location_id) REFERENCES Locations(location_id)
);

CREATE TABLE Class_Enrollment (
  enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
  class_id INT NOT NULL,
  member_id INT NOT NULL,
  enrollment_date DATE NOT NULL,
  enrollment_status ENUM('Enrolled', 'Cancelled') NOT NULL,
  FOREIGN KEY (class_id) REFERENCES Classes(class_id),
  FOREIGN KEY (member_id) REFERENCES Members(member_id)
);

CREATE TABLE Instructors (
  instructor_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20),
  location_id INT NOT NULL,
  FOREIGN KEY (location_id) REFERENCES Locations(location_id)
);

CREATE TABLE Locations (
  location_id INT AUTO_INCREMENT PRIMARY KEY,
  location_name VARCHAR(255) NOT NULL,
  location_address VARCHAR(255) NOT NULL,
  location_city VARCHAR(255) NOT NULL,
  location_state VARCHAR(255) NOT NULL,
  location_zip VARCHAR(10) NOT NULL
);

CREATE TABLE Equipment_Usage (
  usage_id INT AUTO_INCREMENT PRIMARY KEY,
  member_id INT NOT NULL,
  equipment_type ENUM('Treadmill', 'Cycling', 'Stair Machine', 'Weight Training') NOT NULL,
  usage_date DATE NOT NULL,
  usage_time TIME NOT NULL,
  FOREIGN KEY (member_id) REFERENCES Members(member_id)
);

CREATE TABLE Checkins (
  checkin_id INT AUTO_INCREMENT PRIMARY KEY,
  member_id INT NOT NULL,
  checkin_date DATE NOT NULL,
  checkin_time TIME NOT NULL,
  FOREIGN KEY (member_id) REFERENCES Members(member_id)
);

CREATE TABLE Checkouts (
  checkout_id INT AUTO_INCREMENT PRIMARY KEY,
  member_id INT NOT NULL,
  checkout_date DATE NOT NULL,
  checkout_time TIME NOT NULL,
  FOREIGN KEY (member_id) REFERENCES Members(member_id)
);

CREATE TABLE Analytics (
  analytics_id INT AUTO_INCREMENT PRIMARY KEY,
  location_id INT NOT NULL,
  user_activity INT NOT NULL,
  class_enrollment INT NOT NULL,
  gym_hours INT NOT NULL,
  visitor_count INT NOT NULL,
  FOREIGN KEY (location_id) REFERENCES Locations(location_id)
);
