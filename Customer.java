package com.ofss;

public class Customer {
    private int custId;
    private String firstName;
    private String lastName;
    private long phoneNumber;
    private String city;
    private String emailId;

    // Getters and Setters
    public int getCustId() { return custId; }
    public void setCustId(int custId) { this.custId = custId; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public long getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(long phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getEmailId() { return emailId; }
    public void setEmailId(String emailId) { this.emailId = emailId; }
	public Customer(int custId, String firstName, String lastName, long phoneNumber, String city, String emailId) {
		super();
		this.custId = custId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.phoneNumber = phoneNumber;
		this.city = city;
		this.emailId = emailId;
	}
	public Customer() {
		super();
	}
}