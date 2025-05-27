# WATI Widget Integration

## Overview
A custom chat interface has been implemented to provide an in-app chat experience that seamlessly connects to your WATI/WhatsApp automation. This gives customers the feel of chatting directly on your website while still leveraging your existing WhatsApp automation flows.

## Implementation Details

### Component Location
- **Main Widget**: `src/components/WatiWidget.tsx`
- **Chat Interface**: `src/components/WatiChatInterface.tsx`
- **Usage**: Imported and used in `src/App.tsx`

### Key Features
1. **Delayed Loading**: Widget appears after 15 seconds (as requested)
2. **In-App Chat Interface**: Full chat experience within the website
3. **Seamless WhatsApp Integration**: Connects users to your WATI automation after initial interaction
4. **Quick Reply Buttons**: Pre-defined options for common queries
5. **Typing Indicators**: Realistic chat experience with typing animations
6. **Context Preservation**: Passes user messages and page context to WhatsApp
7. **Conditional Display**: Respects the `hide-whatsapp-button` class for pages where it shouldn't appear
8. **Same Phone Number**: Uses the existing GaadiMech WhatsApp number (917300042410)
9. **Custom Branding**: Full GaadiMech branding and styling

### How It Works

The custom chat interface provides a hybrid approach:

1. **In-App Chat Experience**: Users see a professional chat interface within your website
2. **Initial Interaction**: Users can type messages and use quick reply buttons
3. **Seamless Transition**: After the initial interaction, users are smoothly transitioned to WhatsApp
4. **Context Preservation**: User messages and page context are passed to your WATI automation
5. **Automation Integration**: Your existing WATI chatbot flows take over in WhatsApp

### Chat Interface Features

```javascript
// Quick Reply Options
const quickReplies = [
  "Book Express Service",
  "Get Service Quote", 
  "Check Service Status",
  "Emergency Breakdown",
  "Talk to Expert"
];

// Welcome Message
const welcomeMessage = `Hi there! 👋

Welcome to GaadiMech! I'm here to help you with:

• Express 90-min car service
• Service booking & quotes  
• Emergency breakdown support

How can I assist you today?`;
```

### Chat Automation Features
The widget now includes several automation features:

1. **Bot Flow Integration**: `enableBotFlow: true` connects to your existing WhatsApp automation
2. **Quick Reply Buttons**: Pre-defined options for common customer queries:
   - "Book Express Service"
   - "Get Service Quote"
   - "Check Service Status"
   - "Emergency Breakdown"
   - "Talk to Expert"
3. **Welcome Message**: Automated greeting with service options
4. **Typing Indicators**: Shows when the bot is "typing" for better UX
5. **Sound Notifications**: Audio alerts for new messages
6. **Popup Notifications**: Proactive engagement after 3 seconds

### Customization Options
To modify the widget appearance or behavior:

1. **Change Colors**: Update `backgroundColor` in both `chatButtonSetting` and `brandSetting`
2. **Change Position**: Modify `position` in `chatButtonSetting` (options: "left", "right")
3. **Change Timing**: Update the timeout value in `WatiWidget.tsx` (currently 15000ms)
4. **Change Messages**: Update `welcomeText`, `messageText`, and `chatInitMessage` in `brandSetting`
5. **Change Brand Image**: Update `brandImg` URL in `brandSetting`
6. **Modify Quick Replies**: Update the `quickReplies` array with your preferred options
7. **Chat Window Size**: Adjust `chatWindowHeight` and `chatWindowWidth` in `chatButtonSetting`

### Pages Where Widget is Hidden
The widget will not appear on:
- `/franchise` page (explicitly excluded in App.tsx)
- Any page with `hide-whatsapp-button` class on the body or any element

### Migration from Previous WhatsApp Button
- ✅ Removed old `WhatsAppButton.tsx` component
- ✅ Removed old `WhatsAppButton.module.css` styles
- ✅ Updated `App.tsx` to use new `WatiWidget` component
- ✅ Maintained same phone number and timing logic
- ✅ Preserved conditional display logic

### Testing
1. Visit any page on the website
2. Wait 15 seconds for the chat widget to appear in the bottom-right corner
3. Click the green chat button to open the in-app chat interface
4. Verify the welcome message appears with GaadiMech branding
5. Test the quick reply buttons (Book Express Service, Get Service Quote, etc.)
6. Type a custom message and send it
7. Observe the typing indicator and bot response
8. Verify that after the bot response, you're redirected to WhatsApp
9. Check that your message and page context are included in the WhatsApp message
10. Confirm your WATI automation flows trigger correctly in WhatsApp

### Troubleshooting
- If widget doesn't appear, check browser console for script loading errors
- Ensure the WATI service URL is accessible
- Verify the phone number format is correct (917300042410)
- Check if the page has the `hide-whatsapp-button` class applied 