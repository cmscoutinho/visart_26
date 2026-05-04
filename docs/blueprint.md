# **App Name**: VISART

## Core Features:

- Gaze Tracking & Artistic Transformation Engine: Utilizes WebGazer.js to estimate user gaze direction as an AI-powered tool, interpreting this data to dynamically generate and modify diverse visual traces (lines, particles, heatmaps, etc.) over displayed artwork in real-time. This includes smoothing gaze coordinates and handling rendering based on image boundaries.
- Webcam Integration & Calibration: Manages webcam permissions, prioritizes front-facing cameras on mobile, provides a guided calibration process using interactive points, and displays user-friendly error messages if access is denied. Initializes WebGazer.js only upon successful permission.
- Interactive Artwork Display: Presents a large central image with an overlaid, transparent HTML5 canvas where gaze-driven visuals are rendered. Supports fullscreen mode for an immersive art experience and ensures the canvas dynamically resizes and aligns with the image on window changes.
- Artwork Content Management: Offers a default artistic image as a fallback and allows users to upload local images from their device, automatically centering and scaling them for display within the main interaction screen.
- Customizable Trace Styles & Controls: Provides a selection menu for various artistic gaze trace styles (e.g., Red Line, Neon Trace, Artistic Heatmap, Particles) and includes controls to adjust stroke thickness, opacity, pause/resume tracking, clear the drawing, and recalibrate.
- Export Artwork Functionality: Enables users to export their final gaze-drawn composition as a single PNG image file, combining the original background image with all generated visual traces.
- Responsive & Elegant UI: Implements a minimalist, dark-themed user interface that adapts seamlessly across desktop and mobile devices, optimizing control panel placement and layout for different screen orientations, while ensuring core information (like privacy notices and university footers) is accessible.

## Style Guidelines:

- Dark Color Scheme. Primary accent: A vibrant, tech-inspired purple (#B54DFF) chosen to evoke digital luminescence and artistic flair against a dark canvas. Background: A very dark, subtle purplish-black (#19141D) providing an elegant, immersive backdrop. Secondary accent: A bright electric blue (#68A1FF) for interactive elements and highlights, creating contrast and dynamic visual interest.
- Headline and body font: 'Inter' (sans-serif) for a modern, clean, and objective aesthetic that complements the technological art theme, ensuring readability across all text elements.
- Minimalist line-art icons for controls, designed with a subtle glow or vibrant accent color to maintain consistency with the dark theme and highlight interactive elements. Emphasis on clarity and discreet integration.
- Responsive layout prioritizing the central artwork. On desktop, a large centered image with control panels positioned to the side or bottom. On mobile, compact controls primarily at the bottom, adapting to portrait and landscape orientations to maintain usability. Generous spacing for a gallery-like presentation.
- Subtle, fluid animations for gaze traces, control panel interactions, and transitions. For instance, soft fading for menu changes, and glowing pulsation for active states to enhance the futuristic, experimental feel without distracting from the artwork.