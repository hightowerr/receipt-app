// OCR Service for text extraction from images
// TODO: Integrate Google Vision or Azure Computer Vision

export const ocrService = {
  extractText: async (imageUri: string) => {
    console.log('Extracting text from:', imageUri);
    // TODO: Implement actual OCR
    return {
      text: '',
      confidence: 0,
    };
  },
};
