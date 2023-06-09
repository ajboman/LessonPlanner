import { useState, useContext, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import UserContext from '../services/UserContext';

import createOpenAICompletion from '../services/route';
import Popup from './Popup';
import loaderSvg from '../assets/loader.svg';
import FormInput from './FormInput';
import { Button } from 'flowbite-react';


const formFields = [
  { name: 'grade', placeholder: '9th Grade', type: 'text' },
  { name: 'subject', placeholder: 'Language Arts', type: 'text' },
  { name: 'duration', placeholder: '50 minutes', type: 'text' },
  { name: 'classSize', placeholder: '30', type: 'text' },
  { name: 'learningObjectives', placeholder: 'Students should be able to identify and explain the use of at least three literary devices', type: 'textarea' },
  { name: 'resourcesAvailable', placeholder: '"To Kill a Mockingbird" novels, digital whiteboard for presenting a PowerPoint on literary devices, computers with internet access for research.', type: 'textarea' },
  { name: 'teachingStyle', placeholder: 'Lecture, Group discussions, Individual work', type: 'textarea' },
  { name: 'assessmentMethods', placeholder: 'Completion of the literary device worksheet', type: 'textarea' },
  { name: 'priorKnowledge', placeholder: 'Students have learned about various literary devices', type: 'textarea' },
  { name: 'studentNeeds', placeholder: 'For students who may struggle with the pace, provide a reference sheet of literary devices. For English Language Learners or students with special needs, provide extra support as needed, such as a translated version of the text or additional time to complete the worksheet. For advanced students, include more complex literary devices in their assigned passages.', type: 'textarea' },
  { name: 'extraOptions', placeholder: 'If something does not fit in the above categories put it here.', type: 'textarea' },
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
  const [buttonText, setButtonText] = useState('Submit');

  const user = useContext(UserContext);
  const isAnonymous = user ? user.isAnonymous : true;

  useEffect(() => {
    if (errorMessage !== '') {
      setButtonText(errorMessage);
      setTimeout(() => {
        setButtonText('Submit');
      }, 3000);
    }
  }, [errorMessage]);

  const isSameDay = (date1, date2) => {
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
  }

  const getMaxClicks = (accountType) => {
    switch (accountType) {
      case "anonymous":
        return 1;
      case "basic":
        return 2;
      case "verified":
        return 3;
      default:
        return 1;
    }
  }

  const getUserData = async (uid) => {
    const db = getFirestore();
    const userRef = doc(db, 'users', uid);

    const docSnap = await getDoc(userRef);
    let data = docSnap.data();

    const currentDate = new Date();
    if (!data.last_click_date || !isSameDay(data.last_click_date.toDate(), currentDate)) {
      data.clicksRemaining = getMaxClicks(data.accountType);
      data.last_click_date = currentDate;
      await updateUserData(uid, data.clicksRemaining, data.totalSubmits, data.last_click_date);
    }

    return data;
  }

  const updateUserData = async (uid, newClicks, newTotalSubmits, lastClickDate) => {
    const db = getFirestore();
    const userRef = doc(db, 'users', uid);

    await updateDoc(userRef, { clicksRemaining: newClicks, totalSubmits: newTotalSubmits, last_click_date: lastClickDate });
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage('');

    const auth = getAuth();
    const uid = auth.currentUser.uid;

    let userData = await getUserData(uid);
    if (userData.clicksRemaining <= 0) {
      setErrorMessage("You have reached your maximum daily clicks. Please come back tomorrow.");
      return;
    }

    const prompt = createString(formData);
    setIsLoading(true);

    try {
      const auth = getAuth();
      const uid = auth.currentUser.uid;

      const userData = await getUserData(uid);
      const accountType = userData.accountType;
      const clicksRemaining = userData.clicksRemaining;

      let max_tokens;
      switch (accountType) {
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
          max_tokens = 250;
      }

      let response;
      if (process.env.NODE_ENV === 'test') {
        response = { text: 'test response' };
      } else {
        response = await createOpenAICompletion(prompt, max_tokens);
      }

      setApiResponse(response.text);
      setShowPopup(true);

      const newTotalSubmits = (userData.totalSubmits || 0) + 1;
      const newClicks = userData.clicksRemaining - 1;
      await updateUserData(uid, newClicks, newTotalSubmits, userData.last_click_date);

    } catch (error) {
      console.error("Error:", error);
    }
    setIsLoading(false);
  };

  const handleSave = () => {
    saveLesson(apiResponse);
    closePopup();
  };

  const closePopup = () => setShowPopup(false);

  return (
    <section className="mt-8 w-full flex justify-center">
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
        <Button
          type="submit"
          className="mb-10 col-span-full bg-gradient-to-r from-accent to-primary text-white hover:from-primary hover:to-accent transition-all duration-500 ease-linear relative overflow-hidden"
        >
          {buttonText}
          <div
            className="absolute inset-0 bg-gradient-to-r from-accent to-primary transform translate-x-full transition-transform duration-500 ease-linear"
            style={{ zIndex: -1 }}
          />
        </Button>
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