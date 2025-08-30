import pptxgen from 'pptxgenjs';
import { saveAs } from 'file-saver';

export async function downloadPresentation(slides: any[], templateData: any | null) {
  const pres = new pptxgen();

  // Apply template theme if available
  if (templateData?.theme?.colors && templateData?.theme?.colors.length > 0) {
    pres.defineLayout({
      name: 'CUSTOM',
      width: 10,
      height: 5.625
    });

    // Set theme colors
    pres.theme = {
      headFontFace: templateData?.theme?.fonts?.[0] || 'Arial',
      bodyFontFace: templateData?.theme?.fonts?.[1] || templateData?.theme?.fonts?.[0] || 'Arial'
    };
  } else {
    // Set default theme for presentations without templates
    pres.defineLayout({
      name: 'CUSTOM',
      width: 10,
      height: 5.625
    });

    pres.theme = {
      headFontFace: 'Arial',
      bodyFontFace: 'Calibri'
    };
  }

  // Generate slides
  for (let i = 0; i < slides.length; i++) {
    const slideData = slides[i];
    const slide = pres.addSlide();

    // Set slide background color from theme
    if (templateData?.theme?.colors && templateData?.theme?.colors.length > 0) {
      slide.background = { color: templateData?.theme?.colors[1] || 'FFFFFF' };
    } else {
      slide.background = { color: 'FFFFFF' };
    }

    // Add title
    if (slideData.title) {
      slide.addText(slideData.title, {
        x: 0.5,
        y: 0.5,
        w: 9,
        h: 1,
        fontSize: 28,
        bold: true,
        color: templateData?.theme?.colors?.[0]?.replace('#', '') || '1F2937',
        fontFace: templateData?.theme?.fonts?.[0] || 'Arial'
      });
    }

    // Add content
    if (slideData.content) {
      const contentY = slideData.title ? 1.8 : 0.5;
      
      if (Array.isArray(slideData.content)) {
        // Bullet points
        const bulletText = slideData.content.map(item => ({ text: item, options: { bullet: true } }));
        slide.addText(bulletText, {
          x: 0.5,
          y: contentY,
          w: 8.5,
          h: 3,
          fontSize: 18,
          color: templateData?.theme?.colors?.[2]?.replace('#', '') || '374151',
          fontFace: templateData?.theme?.fonts?.[1] || templateData?.theme?.fonts?.[0] || 'Arial'
        });
      } else {
        // Paragraph text
        slide.addText(slideData.content, {
          x: 0.5,
          y: contentY,
          w: 8.5,
          h: 3,
          fontSize: 18,
          color: templateData?.theme?.colors?.[2]?.replace('#', '') || '374151',
          fontFace: templateData?.theme?.fonts?.[1] || templateData?.theme?.fonts?.[0] || 'Arial'
        });
      }
    }

    // Add template image if available
    if (slideData.templateImage && slideData.images && slideData.images.length > 0) {
      try {
        // Convert ArrayBuffer to base64
        const base64Image = arrayBufferToBase64(slideData.templateImage);
        const imageExt = getImageExtension(slideData.images[0]);
        
        slide.addImage({
          data: `data:image/${imageExt};base64,${base64Image}`,
          x: 6.5,
          y: 1.5,
          w: 2.5,
          h: 2
        });
      } catch (error) {
        console.warn('Failed to add image to slide:', error);
      }
    }

    // Add speaker notes if available
    if (slideData.notes) {
      slide.addNotes(slideData.notes);
    }
  }

  // Generate and download the presentation
  const fileName = `generated-presentation-${new Date().getTime()}.pptx`;
  
  try {
    const pptxData = await pres.writeFile({ fileName, outputType: 'blob' });
    saveAs(pptxData as Blob, fileName);
  } catch (error) {
    console.error('Error generating PPTX:', error);
    throw new Error('Failed to generate PowerPoint file');
  }
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function getImageExtension(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'jpg':
    case 'jpeg':
      return 'jpeg';
    case 'png':
      return 'png';
    case 'gif':
      return 'gif';
    default:
      return 'png';
  }
}