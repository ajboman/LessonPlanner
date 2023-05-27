import { useState } from 'react';
import createOpenAICompletion from '../services/route';
import Popup from './Popup';
import loaderSvg from '../assets/loader.svg';


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
    const prompt = createString(formData);
    setIsLoading(true);
  
    try {
      let response;
      if (process.env.NODE_ENV === 'test') {
        // Mocked response for testing
        response = { text: 'test response' };
      } else {
        // Actual API call
        response = await createOpenAICompletion(prompt);
      }
  
      setApiResponse(response.text);
      setShowPopup(true);
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
    <section className="mt-16 w-full flex justify-center">
      <form
        className="relative flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <label>
          Grade:
          <input
            type='text'
            name='grade'
            placeholder='9th Grade'
            value={formData.grade}
            onChange={handleChange}
          />
        </label>
        <label>
          Subject:
          <input
            type='text'
            name='subject'
            placeholder='Language Arts'
            value={formData.subject}
            onChange={handleChange}
          />
        </label>
        <label>
          Duration:
          <input
            type='text'
            name='duration'
            placeholder='50 minutes'
            value={formData.duration}
            onChange={handleChange}
          />
        </label>
        <label>
          Class Size:
          <input
            type='text'
            name='classSize'
            placeholder='30'
            value={formData.classSize}
            onChange={handleChange}
          />
        </label>
        <label>
          Learning Objectives:
          <textarea
            name='learningObjectives'
            placeholder='Students should be able to identify and explain the use of at least three literary devices'
            value={formData.learningObjectives}
            onChange={handleChange}
          />
        </label>
        <label>
          Resources Available:
          <textarea
            name='resourcesAvailable'
            placeholder='"To Kill a Mockingbird" novels, digital whiteboard for presenting a PowerPoint on literary devices, computers with internet access for research.'
            value={formData.resourcesAvailable}
            onChange={handleChange}
          />
        </label>
        <label>
          Teaching Style:
          <textarea
            name='teachingStyle'
            placeholder='Lecture, Group discussions, Individual work'
            value={formData.teachingStyle}
            onChange={handleChange}
          />
        </label>
        <label>
          Assessment Methods:
          <textarea
            name='assessmentMethods'
            placeholder='Completion of the literary device worksheet'
            value={formData.assessmentMethods}
            onChange={handleChange}
          />
        </label>
        <label>
          Prior Knowledge:
          <textarea
            name='priorKnowledge'
            placeholder='Students have learned about various literary devices'
            value={formData.priorKnowledge}
            onChange={handleChange}
          />
        </label>
        <label>
          Student Needs:
          <textarea
            name='studentNeeds'
            placeholder='For students who may struggle with the pace, provide a reference sheet of literary devices. For English Language Learners or students with special needs, provide extra support as needed, such as a translated version of the text or additional time to complete the worksheet. For advanced students, include more complex literary devices in their assigned passages.'
            value={formData.studentNeeds}
            onChange={handleChange}
          />
        </label>
        <label>
          Extra Options:
          <textarea
            name='extraOptions'
            placeholder='If something does not fit in the above categories put it here.'
            value={formData.standards}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className='mb-10'>Submit</button>
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
