Got it ✅ — here’s the **entire rephrased version in markdown**:

````markdown
# PresentationAI

Turn your written content into polished PowerPoint slides with the help of AI.

## Key Features

- **Intelligent Content Structuring**: Automatically converts text into logically organized slides  
- **Template Recognition**: Adapts colors, fonts, and layouts from uploaded PowerPoint themes  
- **Supports Multiple LLMs**: Compatible with OpenAI, Anthropic Claude, and Google Gemini  
- **Privacy First**: API keys are never logged or stored  
- **Ready-to-Use Output**: Generates professional-grade .pptx presentations  

## Workflow

### Content Processing
The system leverages advanced language models to analyze your text and shape it into a clear slide deck. The AI takes into account:

- Flow of ideas and topic grouping  
- Ideal slide count relative to input length  
- Formatting as bullet points vs. paragraphs  
- Placement of titles and closing slides  
- Automatic generation of speaker notes  

### Applying Styles
When a PowerPoint template is uploaded, the app will:  

1. **Extract Theme Elements**: Read color palettes, fonts, and layout structures from the template  
2. **Scan Visual Assets**: Identify and catalog embedded images or media  
3. **Apply Branding**: Transfer the template’s look and feel to new slides  
4. **Reuse Media**: Place existing template visuals strategically for consistency  

## Installation Guide

1. Clone the repo:  
   ```bash
   git clone <repository-url>
   cd presentation-ai
````

2. Install required packages:

   ```bash
   npm install
   ```
3. Start the development environment:

   ```bash
   npm run dev
   ```
4. Open the provided localhost link in your browser

## How to Use

1. **Add Content**: Paste your text, markdown, or prose into the editor
2. **Give Context** (Optional): Provide hints like “sales pitch deck” or “research report”
3. **Set AI Provider**: Pick your LLM provider and enter the API key
4. **Upload Template**: Drag in a .pptx or .potx file to transfer its styling
5. **Generate Slides**: Click generate and let the AI process your input
6. **Download Deck**: Preview and save the finished presentation

## API Keys

You’ll need an API key from one of the following:

* **OpenAI**: [platform.openai.com](https://platform.openai.com/api-keys)
* **Anthropic**: [console.anthropic.com](https://console.anthropic.com/)
* **Google**: [ai.google.dev](https://ai.google.dev/)

## Known Limitations

* Maximum template upload size: 50MB
* Supported template formats: .pptx, .potx only
* Processing duration: 30–60 seconds depending on content size
* No image generation: Uses only template-provided visuals

## License

Licensed under MIT – see the LICENSE file for details.

## Security Details

* API keys handled only in the client environment
* No server-side storage of user data
* All operations run in the browser
* Template files are parsed locally

## Technology Stack

* React + TypeScript
* Tailwind CSS for UI
* PptxGenJS for creating PowerPoint files
* JSZip for parsing uploads
* Integrations with multiple LLM APIs

```

Do you want me to also **make a polished README.md version** (with emojis, badges, and section dividers) so it feels more GitHub-ready?
```
