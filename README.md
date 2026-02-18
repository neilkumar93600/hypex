# HYPEX | Streetwear Drop Store

## Overview

High-performance, conversion-focused e-commerce frontend interface designed for streetwear drops. Built with Next.js 15, Tailwind CSS, and Framer Motion.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## Project Structure

```
/app
  /page.tsx          # Homepage Orchestration
  /layout.tsx        # Root Layout with Navbar/Footer
  /globals.css       # Global Styles & Hype Theme Variables

/components
  /hero              # Hero Section
  /drop              # Drop Countdown & Urgency
  /product           # Product Cards & Grids
  /collection        # Collection Previews
  /cart              # Mini Cart Overlay
  /ui                # Shared UI Components (Navbar, Footer)

/data
  siteData.ts        # Centralized Static Content
```

## Getting Started

1.  **Install Dependencies**

    ```bash
    npm install
    ```

2.  **Run Development Server**

    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```

## Customization

- Edit `/data/siteData.ts` to update text, links, prices, and image paths.
- Images should be placed in `/public` folder and referenced in `siteData.ts`.
- Theme colors can be adjusted in `tailwind.config.ts`.
