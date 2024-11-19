'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAxios from '../../../utils/useAxios'
export default function CourseCreationPage() {
  const [step, setStep] = useState(1)
  const navigate = useNavigate()
  const axiosInstance = useAxios()
  const [courseData, setCourseData] = useState({
    title: '',
    subtitle: '',
    category: '',
    description: '',
    target_audience: '',
    price: '',
    img: null,
    objectives: [''],
    requirements: '',
    sections: [{ title: '', description: '', lectures: [{ title: '', video: null }] }]
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCourseData({ ...courseData, [name]: value })
  }

  const handleImageUpload = (e) => {
    setCourseData({ ...courseData, img: e.target.files[0] })
  }

  const handleObjectiveChange = (index, value) => {
    const newObjectives = [...courseData.objectives]
    newObjectives[index] = value
    setCourseData({ ...courseData, objectives: newObjectives })
  }

  const addObjective = () => {
    setCourseData({ ...courseData, objectives: [...courseData.objectives, ''] })
  }

  const handleSectionChange = (index, field, value) => {
    const newSections = [...courseData.sections]
    newSections[index][field] = value
    setCourseData({ ...courseData, sections: newSections })
  }

  const addSection = () => {
    setCourseData({
      ...courseData,
      sections: [...courseData.sections, { title: '', description: '', lectures: [{ title: '', video: null }] }]
    })
  }

  const handleLectureChange = (sectionIndex, lectureIndex, field, value) => {
    const newSections = [...courseData.sections]
    newSections[sectionIndex].lectures[lectureIndex][field] = field === 'video' ? value.target.files[0] : value
    setCourseData({ ...courseData, sections: newSections })
  }

  const addLecture = (sectionIndex) => {
    const newSections = [...courseData.sections]
    newSections[sectionIndex].lectures.push({ title: '', video: null })
    setCourseData({ ...courseData, sections: newSections })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      const response = axiosInstance.post('/course/create/',courseData)
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }finally{
      navigate('/teacher/courses')
    }
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Course Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Course Title</label>
          <input
            id="title"
            type="text"
            name="title"
            value={courseData.title}
            onChange={handleInputChange}
            placeholder="Enter course title"
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">Subtitle</label>
          <input
            id="subtitle"
            type="text"
            name="subtitle"
            value={courseData.subtitle}
            onChange={handleInputChange}
            placeholder="Enter course subtitle"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select 
            id="category"
            name="category" 
            value={courseData.category} 
            onChange={handleInputChange} 
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Category</option>
            <option value="bbb">Programming</option>
            <option value="bbb">Design</option>
            <option value="bbb">Business</option>
          </select>
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              id="price"
              type="number"
              name="price"
              value={courseData.price}
              onChange={handleInputChange}
              placeholder="0.00"
              required
              className="block w-full pl-7 pr-12 py-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Course Description</label>
        <textarea
          id="description"
          name="description"
          value={courseData.description}
          onChange={handleInputChange}
          placeholder="Enter course description"
          required
          rows={4}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="target_audience" className="block text-sm font-medium text-gray-700">Target Audience</label>
        <textarea
          id="target_audience"
          name="target_audience"
          value={courseData.target_audience}
          onChange={handleInputChange}
          placeholder="Describe your target audience"
          rows={3}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Course Media</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Course Image</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageUpload} accept="image/*" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">Course Requirements</label>
          <textarea
            id="requirements"
            name="requirements"
            value={courseData.requirements}
            onChange={handleInputChange}
            placeholder="List course requirements"
            rows={4}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Course Objectives</label>
        {courseData.objectives.map((objective, index) => (
          <div key={index} className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              value={objective}
              onChange={(e) => handleObjectiveChange(index, e.target.value)}
              placeholder={`Objective ${index + 1}`}
              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
            />
            <button
              type="button"
              onClick={() => {
                const newObjectives = courseData.objectives.filter((_, i) => i !== index)
                setCourseData({ ...courseData, objectives: newObjectives })
              }}
              className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addObjective}
          className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Objective
        </button>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Course Structure</h2>
      {courseData.sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Section {sectionIndex + 1}</h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Section Title</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => handleSectionChange(sectionIndex, 'title', e.target.value)}
                    placeholder="Enter section title"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Section Description</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <textarea
                    value={section.description}
                    onChange={(e) => handleSectionChange(sectionIndex, 'description', e.target.value)}
                    placeholder="Enter section description"
                    rows={3}
                    className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                  />
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Lectures</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                    {section.lectures.map((lecture, lectureIndex) => (
                      <li key={lectureIndex} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                        <div className="w-0 flex-1 flex items-center">
                          <span className="ml-2 flex-1 w-0 truncate">
                            <input
                              type="text"
                              value={lecture.title}
                              onChange={(e) => handleLectureChange(sectionIndex, lectureIndex, 'title', e.target.value)}
                              placeholder={`Lecture ${lectureIndex + 1} Title`}
                              className="block w-full pr-12 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </span>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <label htmlFor={`lecture-${sectionIndex}-${lectureIndex}`} className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
                Upload Video
                          </label>
                          <input
                            id={`lecture-${sectionIndex}-${lectureIndex}`}
                            type="file"
                            onChange={(e) => handleLectureChange(sectionIndex, lectureIndex, 'video', e)}
                            accept="video/*"
                            className="sr-only"
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => addLecture(sectionIndex)}
                    className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add Lecture
                  </button>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addSection}
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Section
      </button>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Course Review & Finalization</h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Course Summary</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Review your course details before submission.</p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Course Title</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{courseData.title}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Subtitle</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{courseData.subtitle}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Category</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{courseData.category}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{courseData.description}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Target Audience</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{courseData.target_audience}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Price</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">${courseData.price}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Course Image</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {courseData.img ? courseData.img.name : 'Not uploaded'}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Objectives</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                  {courseData.objectives.map((objective, index) => (
                    <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center">
                        <span className="ml-2 flex-1 w-0 truncate">{objective}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Requirements</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{courseData.requirements}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Course Structure</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {courseData.sections.map((section, index) => (
                  <div key={index} className="mb-4">
                    <h4 className="font-medium">Section {index + 1}: {section.title}</h4>
                    <p>{section.description}</p>
                    <ul className="list-disc pl-5 mt-2">
                      {section.lectures.map((lecture, lectureIndex) => (
                        <li key={lectureIndex}>
                          {lecture.title} - Video: {lecture.video ? lecture.video.name : 'Not uploaded'}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-light-grey-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-5xl mx-auto">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 text-center">Create a New Course</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex justify-between mb-8">
                  {[1, 2, 3, 4].map((stepNumber) => (
                    <div
                      key={stepNumber}
                      className={`w-10 h-10 flex items-center justify-center rounded-full ${
                        step >= stepNumber
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-300 text-gray-600'
                      } ${step === stepNumber ? 'ring-4 ring-indigo-100' : ''}`}
                    >
                      {stepNumber}
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {step === 1 && renderStep1()}
                  {step === 2 && renderStep2()}
                  {step === 3 && renderStep3()}
                  {step === 4 && renderStep4()}
                  <div className="flex justify-between pt-5">
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={() => setStep(step - 1)}
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Previous
                      </button>
                    )}
                    {step < 4 ? (
                      <button
                        type="button"
                        onClick={() => setStep(step + 1)}
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Submit Course
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}