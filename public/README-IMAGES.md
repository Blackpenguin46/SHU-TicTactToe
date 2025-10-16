# Image Setup Instructions

Please add these two images to this `/public` folder:

1. **pioneer-head.png** - The SHU Pioneer mascot head (will be used for Player X)
2. **shu-logo.png** - The SHU logo with text (will be used for Player O)

## Steps:
1. Download/save both images
2. Rename them to:
   - `pioneer-head.png` (the mascot head image)
   - `shu-logo.png` (the SHU logo with text)
3. Place both files in this `/public` folder
4. Rebuild the Docker containers: `docker-compose down && docker-compose build && docker-compose up -d`

The images will automatically appear in the tic-tac-toe grid!
