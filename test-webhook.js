const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbzvbapVjFRtlaVyJIxqsqZ2_vUR_jSae4k2K1zNhUPMDLOFlnllJTYo6MX0kn6HeTGi/exec';

const data = {
  fullName: 'Test User',
  phone: '0555555555',
  email: 'test@example.com',
  wilaya: 'Algiers',
  commune: 'Algiers Centre',
  birthDate: '2000-01-01',
  gender: 'male',
  address: 'Test Address',
  telegram: '@testuser',
  profilePicture: '',
  interests: ['Tech', 'Reading'],
  otherInterests: '',
  hobbies: ['Coding'],
  otherHobbies: '',
  skills: ['JavaScript'],
  otherSkills: '',
  hoursPerWeek: 5,
  availableDays: ['Monday', 'Tuesday'],
  preferredTime: 'flexible',
  hasPreviousExperience: true,
  experienceDetails: 'Test experience',
  preferredRoles: ['Developer'],
  motivation: 'Testing the webhook',
  shortTermGoals: 'Test',
  longTermGoals: 'Test',
  expectations: 'Test'
};

const searchParams = new URLSearchParams();
Object.entries(data).forEach(([key, value]) => {
  if (Array.isArray(value)) {
    searchParams.append(key, value.join(', '));
  } else if (value !== undefined && value !== null) {
    searchParams.append(key, String(value));
  }
});

fetch(WEBHOOK_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: searchParams.toString(),
})
.then(response => response.text())
.then(result => {
  console.log('Success:', result);
})
.catch(error => {
  console.error('Error:', error);
});
