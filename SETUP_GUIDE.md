# Setup Guide - Getting Your Free Google Maps API Key

Follow these steps to get your free Google Maps API key and start playing!

## Step 1: Create a Google Cloud Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account (or create one if you don't have it)
3. Accept the terms of service

## Step 2: Create a New Project

1. Click on the project dropdown at the top of the page
2. Click "NEW PROJECT"
3. Enter a project name (e.g., "Free GeoGuesser")
4. Click "CREATE"

## Step 3: Enable Required APIs

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for and enable these APIs:
   - **Maps JavaScript API** (Required for the map interface)
   - **Street View Static API** (Required for street view)

## Step 4: Create API Key

1. Go to "APIs & Services" > "Credentials"
2. Click "CREATE CREDENTIALS" > "API key"
3. Copy your API key (it will look like: `AIzaSyXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxX`)

## Step 5: Restrict Your API Key (Optional but Recommended)

To prevent unauthorized use:

1. Click on your API key in the credentials list
2. Under "Application restrictions":
   - Select "HTTP referrers (web sites)"
   - Add your domain or `localhost` for local testing
3. Under "API restrictions":
   - Select "Restrict key"
   - Check "Maps JavaScript API" and "Street View Static API"
4. Click "SAVE"

## Step 6: Add API Key to the Game

1. Open `index.html` in a text editor
2. Find this line near the bottom:
   ```html
   src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE&callback=initGame">
   ```
3. Replace `YOUR_API_KEY_HERE` with your actual API key
4. Save the file

## Step 7: Run the Game

1. Simply open `index.html` in your web browser
2. Start playing!

## Free Tier Information

Google Maps provides a generous free tier:
- $200 free credit per month
- Street View usage: ~28,000 requests per month for free
- This is more than enough for personal use!

## Troubleshooting

### "Google Maps API error: RefererNotAllowedMapError"
- Check your API key restrictions
- Make sure your domain/localhost is added to allowed referrers

### Street View not loading
- Verify "Street View Static API" is enabled
- Check browser console for error messages

### Map not appearing
- Verify "Maps JavaScript API" is enabled
- Check that your API key is correctly placed in index.html

## Need Help?

If you encounter issues:
1. Check the browser console (F12) for error messages
2. Verify all APIs are enabled in Google Cloud Console
3. Make sure your API key is correctly placed in the HTML file

Enjoy your free GeoGuesser game!
