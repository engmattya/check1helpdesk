import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { analyzeImage } from '../services/imageAnalysis';

const ImageUpload: React.FC = () => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setIsLoading(true);
      try {
        const result = await analyzeImage(acceptedFiles[0]);
        setAnalysis(result);
      } catch (error) {
        console.error('Error analyzing image:', error);
        setAnalysis('Error analyzing image. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="h-full flex flex-col">
      <div
        {...getRootProps()}
        className="flex-grow mb-4 p-4 bg-white rounded shadow border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the image here ...</p>
        ) : (
          <div className="text-center">
            <Upload className="mx-auto mb-2" size={48} />
            <p>Drag 'n' drop an image here, or click to select an image</p>
          </div>
        )}
      </div>
      {isLoading && <p className="text-center">Analyzing image...</p>}
      {analysis && (
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-2">Analysis Result:</h3>
          <p>{analysis}</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;