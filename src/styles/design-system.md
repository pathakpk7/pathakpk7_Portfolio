# Premium Dark Theme Design System

## Overview
Ultra-premium cinematic 3D immersive portfolio design system for Prasoon Pathak. Built with luxury aesthetics, cyber-inspired accents, and Apple-level polish.

## Color Palette

### Primary Dark Theme
- **Background**: `hsl(210, 10%, 4%)` - Deep charcoal black
- **Foreground**: `hsl(210, 40%, 98%)` - Premium white
- **Card**: `hsl(210, 12%, 8%)` - Subtle dark surface
- **Border**: `hsl(210, 16%, 23%)` - Elegant dark borders

### Cyber Accent Colors
- **Cyber Blue**: `hsl(200, 65%, 55%)` - Primary cyber highlight
- **Cyber Cyan**: `hsl(185, 65%, 55%)` - Secondary cyber accent
- **Cyber Purple**: `hsl(260, 65%, 55%)` - Luxury purple accent

### Neutral Slate Scale
- **50-950**: Complete neutral palette from light to dark
- **Key values**: 900 (deep dark), 800 (dark), 700 (medium dark)

## Typography System

### Font Pairing
- **Display/Heading**: Space Grotesk (luxury geometric)
- **Body**: Inter (premium readability)
- **Mono**: JetBrains Mono (technical elegance)

### Typography Scale
- **Display**: `10rem` (160px) - Hero headlines
- **9xl**: `8rem` (128px) - Large headlines
- **8xl**: `6rem` (96px) - Major headlines
- **7xl**: `4.5rem` (72px) - Section titles
- **6xl**: `3.75rem` (60px) - Large titles
- **5xl**: `3rem` (48px) - Medium titles
- **4xl**: `2.25rem` (36px) - Small titles
- **3xl**: `1.875rem` (30px) - Subtitles
- **2xl**: `1.5rem` (24px) - Large body
- **xl**: `1.25rem` (20px) - Body text
- **lg**: `1.125rem` (18px) - Small body
- **base**: `1rem` (16px) - Default
- **sm**: `0.875rem` (14px) - Small text
- **xs**: `0.75rem` (12px) - Tiny text

## Shadow System

### Premium Shadows
- **soft**: Subtle depth for minimal elevation
- **medium**: Standard elevation for cards
- **large**: Prominent elevation for important elements
- **xlarge**: High elevation for floating elements
- **xxlarge**: Maximum elevation for hero elements

### Cyber Glow Effects
- **glow-blue**: Blue cyber glow effect
- **glow-cyan**: Cyan cyber glow effect
- **glow-purple**: Purple cyber glow effect

### Cinematic Shadows
- **cinematic**: Large atmospheric shadow
- **cinematic-blue**: Blue-tinted cinematic shadow

## Glassmorphism System

### Glass Variants
- **glass**: Standard glassmorphism with blur
- **glass-strong**: Enhanced glass with stronger blur
- **glass-cyber**: Cyber-themed glass with gradient

### Blur Levels
- **xs**: 2px - Minimal blur
- **sm**: 4px - Light blur
- **md**: 12px - Medium blur
- **lg**: 16px - Strong blur
- **xl**: 24px - Heavy blur
- **2xl**: 40px - Maximum blur
- **3xl**: 64px - Extreme blur

## Animation System

### Key Animations
- **fade-in**: Smooth opacity transition
- **fade-in-up**: Fade with upward movement
- **fade-in-down**: Fade with downward movement
- **scale-in**: Fade with scale effect
- **slide-in-right**: Slide from right
- **slide-in-left**: Slide from left
- **glow-pulse**: Pulsing glow effect
- **float**: Gentle floating animation
- **shimmer**: Shimmer loading effect

### Transitions
- **premium**: `cubic-bezier(0.25, 0.1, 0.25, 1)` - Smooth
- **premium-in**: `cubic-bezier(0.4, 0, 1, 1)` - Ease in
- **premium-out**: `cubic-bezier(0, 0, 0.2, 1)` - Ease out
- **premium-in-out**: `cubic-bezier(0.4, 0, 0.2, 1)` - Ease in-out

## Component Variants

### Premium Button Variants
- **default**: Standard primary button
- **cyber**: Cyber-themed gradient button
- **glass**: Glassmorphism button
- **luxury**: Premium luxury button
- **minimal**: Minimal elegant button

### Premium Card Variants
- **default**: Standard dark card
- **glass**: Glassmorphism card
- **cyber**: Cyber-themed card
- **luxury**: Premium luxury card
- **minimal**: Minimal card

## Utility Classes

### Text Effects
- **gradient-text**: Blue to purple gradient
- **gradient-text-cyber**: Blue to cyan gradient
- **text-shadow-premium**: Subtle text shadow
- **text-shadow-glow**: Glowing text effect

### Hover Effects
- **hover-lift**: Lift on hover
- **hover-glow**: Glow on hover
- **transition-premium**: Smooth transitions
- **transition-premium-slow**: Slow transitions

### Background Effects
- **gradient-bg**: Subtle gradient background
- **gradient-bg-subtle**: Minimal gradient
- **gradient-bg-cyber**: Cyber-themed gradient

## Usage Guidelines

### Hero Typography
```tsx
<h1 className="text-display text-9xl font-bold gradient-text-cyber">
  PRASOON PATHAK
</h1>
```

### Premium Cards
```tsx
<PremiumCard variant="cyber" className="hover-lift">
  <h3 className="text-heading text-xl">Title</h3>
  <p className="text-muted-foreground">Description</p>
</PremiumCard>
```

### Glassmorphism
```tsx
<div className="glass-strong border-cyber">
  Content with premium glass effect
</div>
```

### Cyber Glow Effects
```tsx
<div className="glow-cyber border-cyber-blue-500/30">
  Element with cyber glow
</div>
```

## Design Principles

1. **Dark First**: Always design for dark theme first
2. **Minimal Accents**: Use cyber colors sparingly for impact
3. **Premium Typography**: Large, bold headlines with luxury fonts
4. **Cinematic Depth**: Use shadows and blur for depth
5. **Smooth Motion**: All interactions should feel premium
6. **Glassmorphism**: Use glass effects for modern aesthetics
7. **Consistent Spacing**: Follow the premium spacing system

## Performance Considerations

- All animations use CSS transforms for GPU acceleration
- Blur effects are optimized for performance
- Gradients use CSS for better performance than images
- Font loading is optimized with proper font-display
- Transitions use hardware-accelerated properties

This design system provides a complete foundation for building ultra-premium, cinematic portfolio experiences with consistent luxury aesthetics.
