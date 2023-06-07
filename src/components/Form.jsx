import { useState, useContext } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import UserContext from '../services/UserContext'; 

import createOpenAICompletion from '../services/route';
import Popup from './Popup';
import loaderSvg from '../assets/loader.svg';
import FormInput from './FormInput';  
import { Button } from 'flowbite-react';


const formFields = [
  {name: 'grade', placeholder: '9th Grade', type: 'text'},
  {name: 'subject', placeholder: 'Language Arts', type: 'text'},
  {name: 'duration', placeholder: '50 minutes', type: 'text'},
  {name: 'classSize', placeholder: '30', type: 'text'},
  {name: 'learningObjectives', placeholder: 'Students should be able to identify and explain the use of at least three literary devices', type: 'textarea'},
  {name: 'resourcesAvailable', placeholder: '"To Kill a Mockingbird" novels, digital whiteboard for presenting a PowerPoint on literary devices, computers with internet access for research.', type: 'textarea'},
  {name: 'teachingStyle', placeholder: 'Lecture, Group discussions, Individual work', type: 'textarea'},
  {name: 'assessmentMethods', placeholder: 'Completion of the literary device worksheet', type: 'textarea'},
  {name: 'priorKnowledge', placeholder: 'Students have learned about various literary devices', type: 'textarea'},
  {name: 'studentNeeds', placeholder: 'For students who may struggle with the pace, provide a reference sheet of literary devices. For English Language Learners or students with special needs, provide extra support as needed, such as a translated version of the text or additional time to complete the worksheet. For advanced students, include more complex literary devices in their assigned passages.', type: 'textarea'},
  {name: 'extraOptions', placeholder: 'If something does not fit in the above categories put it here.', type: 'textarea'},
];


const Form = ({ saveLesson }) => {
  const [formData, setFormData] = useState({
    grade: '',
    subject: '',
    duration: '',
    classSize: '',
    learningObjectives: '',
    resourcesAvailable: '',
    teachingStyle: '',
    assessmentMethods: '',
    priorKnowledge: '',
    studentNeeds: '',
    extraOptions: '',
  });
  const [showPopup, setShowPopup] = useState(false);
  const [apiResponse, setApiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const user = useContext(UserContext);
  const isAnonymous = user ? user.isAnonymous : true;

  const getClicksRemaining = async (uid) => {
    const db = getFirestore();
    const userRef = doc(db, 'users', uid);
  
    // Get current document
    const docSnap = await getDoc(userRef);

    // Return the current clicks remaining or 0 if undefined
    return docSnap.data().clicksRemaining || 0;
  }

  const updateClicksRemaining = async (uid, newClicks) => {
    const db = getFirestore();
    const userRef = doc(db, 'users', uid);
  
    // Update clicksRemaining in Firestore
    await updateDoc(userRef, { clicksRemaining: newClicks });
  }

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const createString = (data) => {
    let new_prompt = 'Create a lesson plan that is as brief as possible and abides by the following requirements: ';

    for (const item in data) {
      if (data[item]) {
        new_prompt += item + ': ' + data[item] + ', ';
      }
    }

    if (new_prompt.endsWith(', ')) {
      new_prompt = new_prompt.slice(0, -2);
    }

    return new_prompt;
  };

  const updateTotalSubmits = async (uid) => {
    const db = getFirestore();
    const userRef = doc(db, 'users', uid);
  
    // Get current document
    const docSnap = await getDoc(userRef);
  
    // Check if the document exists
    if (docSnap.exists()) {
      // Increment totalSubmits by 1
      const newTotalSubmits = (docSnap.data().totalSubmits || 0) + 1;
      
      // Update totalSubmits in Firestore
      await updateDoc(userRef, { totalSubmits: newTotalSubmits });
    } else {
      console.log(`No such document for user: ${uid}`);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset error message
    setErrorMessage('');
    
    // Get current user uid
    const auth = getAuth();
    const uid = auth.currentUser.uid;

    // Check if user is anonymous and if they have clicks remaining
    if (isAnonymous) {
      const clicksRemaining = await getClicksRemaining(uid);
      if (clicksRemaining <= 0) {
        setErrorMessage("Please login or sign up to continue");
        return;
      }
    }

    const prompt = createString(formData);
    setIsLoading(true);

    try {
      // Get current user uid
      const auth = getAuth();
      const uid = auth.currentUser.uid;
  
      // Fetch the user's account type from the Firestore database
      const db = getFirestore();
      const userRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userRef);
      const accountType = userDoc.data().accountType;
  
      // Set max_tokens based on the account type
      let max_tokens;
      switch(accountType) {
        case "anonymous":
          max_tokens = 250;
          break;
        case "basic":
          max_tokens = 500;
          break;
        case "verified":
          max_tokens = 1000;
          break;
        default:
          max_tokens = 250; // default value in case account type is not set correctly
      }
  
      let response;
      if (process.env.NODE_ENV === 'test') {
        // Mocked response for testing
        response = { text: 'test response' };
      } else {
        // Actual API call
        response = await createOpenAICompletion(prompt, max_tokens);
      }
  
      setApiResponse(response.text);
      setShowPopup(true);
  
      // Update totalSubmits in Firestore
      await updateTotalSubmits(uid);
  
    } catch (error) {
      console.error("Error:", error);
    }
    setIsLoading(false);
    if (isAnonymous) {
      const newClicks = await getClicksRemaining(uid) - 1;
      await updateClicksRemaining(uid, newClicks);
    }
  };
  
  const handleSave = () => {
    saveLesson(apiResponse);
    closePopup();
  };

  const closePopup = () => setShowPopup(false);
  
  return (
    <section className="mt-16 w-full flex justify-center">
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <form
        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-5"
        onSubmit={handleSubmit}
      >
        {formFields.map((field, index) => (
          <FormInput 
            key={field.name}
            name={field.name}
            placeholder={field.placeholder}
            type={field.type}
            value={formData[field.name] || ''}
            onChange={handleChange}
            className={index % 2 === 0 ? "md:col-span-2" : ""}
          />
        ))}
        <Button type="submit" className='mb-10 bg-black col-span-full'>Submit</Button>
      </form>
      {showPopup && (
        <Popup response={apiResponse} isVisible={showPopup} onClose={closePopup} onSave={handleSave} />
      )}
      {isLoading && (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-500 bg-opacity-75">
          <img src={loaderSvg} alt="Loading" />
        </div>
      )}
    </section>
  );
};


export default Form;