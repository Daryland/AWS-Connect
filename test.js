// Function to generate all possible combinations of letters for a phone number
function generateVanityNumbers(phoneNumber) {
    const sanitizedPhoneNumber = phoneNumber.replace(/\D/g, ''); // Remove non-digit characters
    const vanityNumbers = []; 