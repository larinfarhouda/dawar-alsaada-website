# Hero Media Management Feature

## Overview
Added the ability to manage hero section background media (images and videos) from the dashboard.

## Changes Made

### 1. Database Schema (`prisma/schema.prisma`)
- Added `HeroMedia` model with fields:
  - `id`: Auto-incrementing primary key
  - `url`: Path to the media file
  - `type`: Either 'image' or 'video'
  - `isActive`: Boolean to mark which media is currently active
  - `createdAt` and `updatedAt`: Timestamps

### 2. Server Actions (`app/actions/hero.js`)
Created server-side functions:
- `uploadHeroMedia()`: Upload new image or video files
- `deleteHeroMedia()`: Delete media from database and filesystem
- `setActiveHeroMedia()`: Set which media is currently active
- `getHeroMedia()`: Fetch all uploaded media
- `getActiveHeroMedia()`: Get the currently active media

### 3. Dashboard Page (`app/dashboard/hero/page.js`)
Created a new dashboard page with:
- Upload form supporting both images and videos
- Grid view of all uploaded media
- Preview of images and videos
- Activate/deactivate buttons
- Delete functionality
- Visual indicator for active media

### 4. Hero Component (`components/Hero.js`)
Updated to:
- Accept `media` prop from parent
- Support both image and video backgrounds
- Fallback to default image if no media is active
- Render `<video>` element for video media with autoplay, muted, loop

### 5. Main Page (`app/page.js`)
Updated to:
- Fetch active hero media from database
- Pass media data to Hero component

### 6. Dashboard Navigation (`app/dashboard/layout.js`)
Added:
- New navigation item "خلفية الصفحة الرئيسية" (Hero Background)
- Links to `/dashboard/hero`

## How to Use

1. Navigate to Dashboard → خلفية الصفحة الرئيسية
2. Upload an image or video file
3. Click "تفعيل" (Activate) on the media you want to display
4. The hero section will automatically update to show the active media

## Supported Formats
- **Images**: JPG, PNG, WebP
- **Videos**: MP4, WebM

## Notes
- Only one media can be active at a time
- Videos autoplay, are muted, and loop continuously
- Files are stored in the `/public` directory
- Database migration has been applied successfully
