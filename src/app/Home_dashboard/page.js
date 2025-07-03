// In this we will add the section to upload the image and all get the results
"use client"
import React, { useState, useRef } from 'react';
import { Upload, Camera, Users, CheckCircle, XCircle, Image as ImageIcon } from 'lucide-react';
import axios from 'axios';
import { ToastContainer ,toast  } from 'react-toastify';



export default function MaskDetectionApp() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [results, setResults] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      // Reset previous results
      setProcessedImage(null);
      setResults(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      setProcessedImage(null);
      setResults(null);
    }
  };

  // function to post the image and video to the backend

  const handelpostingimageandvideo= async ()=>{
    console.log("Hello world")

    if (!selectedImage) {
      toast.error('image not uploaded successfully')
      
    }

    const formdata=new FormData()  // this is the built in function in which create key value pair for the data which we append inn this

    formdata.append("file" , selectedImage)  //adding the selectedImage and with the name of file 

    try {

      // not writinng the code to send the images 

      const response= await axios.post('https://mask-detector-backend.onrender.com/detect/image',formdata)

      console.log(response)
      console.log(response.data)
      console.log(response.data.message)
      toast.success('Upload successful!');
      
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong');
      
    }



  }

  const processImage = async () => {
    if (!selectedImage) return;

    setIsProcessing(true);
    
    // Simulate API call - replace with your actual API endpoint
    try {
      // Mock processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock results - replace with actual API response
      const mockResults = {
        totalPeople: 5,
        withMask: 3,
        withoutMask: 2,
        processedImageUrl: imagePreview // In real app, this would be the processed image from API
      };
      
      setResults(mockResults);
      setProcessedImage(mockResults.processedImageUrl);
    } catch (error) {
      console.error('Error processing image:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const resetAll = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setProcessedImage(null);
    setResults(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <ToastContainer></ToastContainer>
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Mask Detection AI</h1>
            </div>
            <div className="text-sm text-gray-500">
              Upload • Analyze • Results
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Section */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Upload className="w-5 h-5 mr-2 text-blue-600" />
                Upload Image
              </h2>
              
              {!imagePreview ? (
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg text-gray-600 mb-2">
                    Drag and drop your image here, or click to browse
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports JPG, PNG, GIF up to 10MB
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full max-w-md mx-auto rounded-lg shadow-md"
                    />
                  </div>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={()=>handelpostingimageandvideo()}
                      disabled={isProcessing}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                    >
                      {isProcessing ? (
                        <>
                          <div  className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <Camera className="w-4 h-4" />
                          <span>Detect Masks</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={resetAll}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Section */}
        {results && (
          <div className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total People</p>
                    <p className="text-3xl font-bold text-gray-900">{results.totalPeople}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">With Mask</p>
                    <p className="text-3xl font-bold text-green-600">{results.withMask}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Without Mask</p>
                    <p className="text-3xl font-bold text-red-600">{results.withoutMask}</p>
                  </div>
                  <XCircle className="w-8 h-8 text-red-600" />
                </div>
              </div>
            </div>

            {/* Image Comparison */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Detection Results</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-700 mb-3">Original Image</h4>
                    <img
                      src={imagePreview}
                      alt="Original"
                      className="w-full rounded-lg shadow-md"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-700 mb-3">Processed Image</h4>
                    <img
                      src={processedImage}
                      alt="Processed"
                      className="w-full rounded-lg shadow-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Accuracy Badge */}
            <div className="flex justify-center">
              <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-3 rounded-full font-medium shadow-lg">
                Detection Complete ✓
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        {!imagePreview && (
          <div className="bg-blue-50 rounded-xl border border-blue-200 p-6 mt-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">How it works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">1</div>
                <p className="text-blue-800">Upload an image with people</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">2</div>
                <p className="text-blue-800">AI analyzes faces for mask detection</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">3</div>
                <p className="text-blue-800">View results with annotated image</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}