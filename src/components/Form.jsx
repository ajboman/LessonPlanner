import { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';

const openAiKey = import.meta.env.OPEN_AI_LESSON_PLAN_KEY;

const Form = () => {
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
    standards: '',
  });

  const [prompt, setPrompt] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const createString = (data) => {
    let new_prompt = "Create a lesson plan that abides by the following requirements: "

    for (const item in data) {
      if (data[item]) {
        new_prompt += item + ": " + data[item] + ", ";
      }
    }

    if (new_prompt.endsWith(', ')) {
      new_prompt = new_prompt.slice(0, -2);
    }
    setPrompt(new_prompt);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    createString(formData);
    setLoading(true);

    const APIBody = {
      "model": "text-davinci-003",
      "prompt": "Say this is a test",
      "max_tokens": 7,
      "temperature": 0,
      "top_p": 1.0,
      "frequency_penalty": 0.0,
      "presence_penalty": 0.0
    }

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer" + openAiKey,
      },
      body: JSON.stringify(APIBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
    });

    setLoading(false);
  };


  return (
    <section className='mt-16 w-full'>
      <form className='relative flex flex-col justify-center gap-4'
        onSubmit={handleSubmit}>
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
          Standards:
          <textarea
            name='standards'
            placeholder='This lesson aligns with Common Core Standards for 9th Grade English'
            value={formData.standards}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className='mb-10'>Submit</button>
      </form>
    </section>
  );
};

export default Form;
