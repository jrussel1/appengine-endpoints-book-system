package com.book.system;

import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

/**
 * Defines a seller
 */
@PersistenceCapable(identityType = IdentityType.APPLICATION)
public class Seller {
	@PrimaryKey
	private Long id;
	@Persistent
	private String email;
	@Persistent
	private String firstName;
	@Persistent
	private String lastName;
	
	
public Seller(int personId, String email, String firstName,
			String lastName) {
	this.id=(long) personId;
	this.email=email;
	this.firstName=firstName;
	this.lastName=lastName;
	}
/**
 * @return the ID
 */
public Long getId() {
	return id;
}
/**
 * @param ID the id to set
 */
public void setISBN(Long id) {
	this.id = id;
}
/**
 * @return the email
 */
public String getEmail() {
	return email;
}
/**
 * @param email the email to set
 */
public void setEmail(String email) {
	this.email = email;
}
/**
 * @return the firstName
 */
public String getFirstName() {
	return firstName;
}
/**
 * @param firstName the firstName to set
 */
public void setfFirstName(String firstName) {
	this.firstName = firstName;
}
/**
 * @return the lastName
 */
public String getLastName() {
	return lastName;
}
/**
 * @param lastName the lastName to set
 */
public void setfLastName(String lastName) {
	this.lastName = lastName;
}
 
}