import JSZip from 'jszip';
import { parseString } from 'xml2js';

export interface TemplateData {
  slideCount: number;
  imageCount: number;
  theme: {
    colors: string[];
    fonts: string[];
  };
  layouts: any[];
  images: { [key: string]: ArrayBuffer };
  slides: any[];
}

export async function parseTemplate(file: File): Promise<TemplateData> {
  const zip = new JSZip();
  const content = await file.arrayBuffer();
  const archive = await zip.loadAsync(content);

  const templateData: TemplateData = {
    slideCount: 0,
    imageCount: 0,
    theme: {
      colors: [],
      fonts: []
    },
    layouts: [],
    images: {},
    slides: []
  };

  try {
    // Parse presentation.xml to get slide structure
    const presFile = archive.files['ppt/presentation.xml'];
    if (presFile) {
      const presContent = await presFile.async('text');
      const presData = await parseXML(presContent);
      
      // Count slides
      const slideIds = presData?.presentation?.['p:sldIdLst']?.[0]?.['p:sldId'] || [];
      templateData.slideCount = Array.isArray(slideIds) ? slideIds.length : (slideIds ? 1 : 0);
    }

    // Parse theme colors and fonts
    const themeFile = archive.files['ppt/theme/theme1.xml'];
    if (themeFile) {
      const themeContent = await themeFile.async('text');
      const themeData = await parseXML(themeContent);
      
      // Extract color scheme
      const colorScheme = themeData?.['a:theme']?.['a:themeElements']?.[0]?.['a:clrScheme']?.[0];
      if (colorScheme) {
        templateData.theme.colors = extractColors(colorScheme);
      }

      // Extract font scheme
      const fontScheme = themeData?.['a:theme']?.['a:themeElements']?.[0]?.['a:fontScheme']?.[0];
      if (fontScheme) {
        templateData.theme.fonts = extractFonts(fontScheme);
      }
    }

    // Extract images from media folder
    const mediaFiles = Object.keys(archive.files).filter(name => name.startsWith('ppt/media/'));
    templateData.imageCount = mediaFiles.length;

    for (const mediaFile of mediaFiles) {
      const file = archive.files[mediaFile];
      if (file && !file.dir) {
        const imageData = await file.async('arraybuffer');
        const imageName = mediaFile.split('/').pop() || mediaFile;
        templateData.images[imageName] = imageData;
      }
    }

    // Parse slide layouts
    const layoutFiles = Object.keys(archive.files).filter(name => 
      name.startsWith('ppt/slideLayouts/') && name.endsWith('.xml')
    );

    for (const layoutFile of layoutFiles) {
      const file = archive.files[layoutFile];
      if (file) {
        const layoutContent = await file.async('text');
        const layoutData = await parseXML(layoutContent);
        templateData.layouts.push(layoutData);
      }
    }

    return templateData;

  } catch (error) {
    console.error('Error parsing template:', error);
    throw new Error('Failed to parse PowerPoint template');
  }
}

function parseXML(xmlContent: string): Promise<any> {
  return new Promise((resolve, reject) => {
    parseString(xmlContent, { explicitArray: true }, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

function extractColors(colorScheme: any): string[] {
  const colors: string[] = [];
  
  // Extract common color definitions
  const colorTypes = ['dk1', 'lt1', 'dk2', 'lt2', 'accent1', 'accent2', 'accent3', 'accent4', 'accent5', 'accent6'];
  
  for (const colorType of colorTypes) {
    const colorDef = colorScheme?.[`a:${colorType}`]?.[0];
    if (colorDef) {
      // Try to extract hex color or RGB values
      const sysClr = colorDef['a:sysClr']?.[0]?.['$']?.lastClr;
      const srgbClr = colorDef['a:srgbClr']?.[0]?.['$']?.val;
      
      if (srgbClr) {
        colors.push(`#${srgbClr}`);
      } else if (sysClr) {
        colors.push(`#${sysClr}`);
      }
    }
  }
  
  return colors;
}

function extractFonts(fontScheme: any): string[] {
  const fonts: string[] = [];
  
  // Extract major and minor font names
  const majorFont = fontScheme?.['a:majorFont']?.[0]?.['a:latin']?.[0]?.['$']?.typeface;
  const minorFont = fontScheme?.['a:minorFont']?.[0]?.['a:latin']?.[0]?.['$']?.typeface;
  
  if (majorFont) fonts.push(majorFont);
  if (minorFont && minorFont !== majorFont) fonts.push(minorFont);
  
  return fonts;
}