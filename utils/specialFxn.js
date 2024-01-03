/* eslint-disable prettier/prettier */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-template */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
const User = require('../models/userModel');

function generateRandomNumber(){
    const min = 10000000;
    const max = 99999999;
   return Math.floor(Math.random() * (max - min + 1) + min);
 }

 function generateFacilityID(length) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
  
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return result;
  }

async function generateUserID(firstName, lastName){
    try {
        const randomNumber = generateRandomNumber()

        const firstLetter = firstName.charAt(0)
        const lastLetter = lastName.charAt(0)
     
        const userID = 'U'+firstLetter.toUpperCase()+''+lastLetter.toUpperCase()+'-'+randomNumber
        
        return userID
        
         
    } catch (error) {
       return error
    }
}


function generateRandomChar(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
  }

async function generateProviderID(firstName, lastName){
    try {

        const randomNumber = generateRandomNumber()
        const firstLetter = firstName.charAt(0)
        const lastLetter = lastName.charAt(0)
        const userID = 'P'+firstLetter.toUpperCase()+''+lastLetter.toUpperCase()+'-'+randomNumber
        return userID
    } catch (error) {
       return error
    }
}


async function generateFaciltyID(firstName, lastName){
    try {

        const randomNumber = generateRandomNumber()
        const firstLetter = firstName.charAt(0)
        const lastLetter = lastName.charAt(0)
        const userID = 'F'+firstLetter.toUpperCase()+''+lastLetter.toUpperCase()+'-'+randomNumber
        const facilityID = generateFacilityID(12)
        const data = {userID, facilityID}

        return data   
    } catch (error) {
       return error
    }
}


async function generateLabOrderID(orderType){
  try {
    const randomNumber = generateRandomNumber();
    const initialsChar = orderType.substring(0, 3);
    const initials = initialsChar.toUpperCase()
    const labOrderId = initials+'-'+randomNumber;
    return labOrderId
  } catch (error) {
    return error
  }

}



 module.exports = {
    generateUserID,
    generateRandomChar,
    generateProviderID, 
    generateFaciltyID,
    generateLabOrderID
 }