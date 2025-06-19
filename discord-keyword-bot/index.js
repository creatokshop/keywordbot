require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder, ActivityType } = require('discord.js');
const config = require('./config'); // Import config file

// Bot configuration
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Creatok brand color - purple-red mix from logo colors
const BRAND_COLOR = 0x8B2F7A;  // Purple-red blend of logo colors

// Keywords and their AI-style explanations (your existing keywords)
const keywords = {
    // Account Types & Verification
    'verified': {
        intro: "You don't know what verified accounts are?",
        explanation: "Verified accounts are premium TikTok accounts that come with our proprietary APK technology. These accounts bypass all regional restrictions, giving you global access without needing any VPN. You get full TikTok Shop access, Creativity Rewards Program, and all verification benefits maintained. They're in the higher price tier but offer complete freedom - you can use them from anywhere in the world with regular updates provided.",
        color: BRAND_COLOR,
        category: 'Account Types'
    },
    'unverified': {
        intro: "Not sure about unverified accounts?",
        explanation: "Unverified accounts are our budget-friendly option, typically ranging from $30-$500. These accounts are locked to their country of origin, so you'll need a matching VPN to access them. They still include all standard TikTok features and TTS access, making them perfect if you're targeting content for a specific region and want a lower cost entry point.",
        color: BRAND_COLOR,
        category: 'Account Types'
    },
    'bypass': {
        intro: "Curious about our bypass system?",
        explanation: "Our bypass system uses advanced proprietary APK technology to circumvent regional restrictions. This means no geographical limitations whatsoever - the custom app installation works globally without any VPN required. We provide regular system updates and full technical support to keep everything running smoothly.",
        color: BRAND_COLOR,
        category: 'Technical'
    },

    // Regional Markets
    'usa': {
        intro: "Wondering about USA accounts?",
        explanation: "USA accounts are our premium offering with the highest monetization potential globally. Priced between $200-$500, they come with full TikTok Shop integration and complete Creativity Rewards Program access. You can choose from 10k, 20k, 30k, or 40k follower options. These require US passport/ID verification and include priority customer support.",
        color: BRAND_COLOR,
        category: 'Regional Markets'
    },
    'america': {
        intro: "Looking for American market access?",
        explanation: "American accounts give you top-tier US market access with premium monetization opportunities. You get full e-commerce capabilities, creator fund eligibility, and shop seller verification ready to go. Multiple follower count options are available with immediate account transfer and 24/7 support included.",
        color: BRAND_COLOR,
        category: 'Regional Markets'
    },
    'europe': {
        intro: "Curious about European accounts?",
        explanation: "European Union accounts give you access to the growing EU market, specifically German and French markets. Fixed at $200, they come with multi-language support, GDPR compliant setup, European monetization tools, and expanding market presence with EU creator fund access.",
        color: BRAND_COLOR,
        category: 'Regional Markets'
    },
    'germany': {
        intro: "Interested in German market access?",
        explanation: "German accounts target the Deutsche TikTok market, allowing you to earn in euros with local compliance ready. They're optimized for German trending integration, the DACH region, and include European creator benefits with Deutsch content support built in.",
        color: BRAND_COLOR,
        category: 'Regional Markets'
    },
    'france': {
        intro: "Want French market access?",
        explanation: "French accounts target the Marché Français, earning in euros with French compliance ready to go. They're optimized for local trend integration, European creator benefits, and Francophone content optimization with French monetization tools included.",
        color: BRAND_COLOR,
        category: 'Regional Markets'
    },

    // TikTok Abbreviations & Features
    'tts': {
        intro: "You don't know what TTS is?",
        explanation: "TTS stands for TikTok Shop - it's the complete e-commerce integration. For sellers, you sign up with your TikTok account, upload USA ID for verification, set up your remote website/shop, add profitable products, and earn commission-based income. For creators, you apply for the Creator program (may need 3-4 applications, which is normal), but you must apply from YOUR device and location for affiliate marketing opportunities.",
        color: BRAND_COLOR,
        category: 'Features'
    },
    'crp': {
        intro: "Don't know about CRP?",
        explanation: "CRP is the Creativity Rewards Program - your guaranteed monetization system. You get creator fund access guaranteed, video view-based earnings with monthly payment cycles, performance bonuses, enhanced monetization tools, premium creator benefits, immediate access after setup, and analytics tracking included.",
        color: BRAND_COLOR,
        category: 'Monetization'
    },

    // Process & Ordering
    'buy': {
        intro: "Want to know how to buy?",
        explanation: "The purchase process is simple: Step 1 - Choose your account type (Verified/Non-Verified), Step 2 - Select your region (US/UK/EU), Step 3 - Go to the #buy-accounts channel, Step 4 - Connect with an account manager (1-3 hours), Step 5 - Complete transfer & verification. We guarantee 24-hour delivery with multiple payment options.",
        color: BRAND_COLOR,
        category: 'Process'
    },
    'order': {
        intro: "Not sure about the ordering process?",
        explanation: "Our order management system assigns you a dedicated account manager who contacts you within 1-3 hours. You get order confirmation with timeline, secure transfer session scheduling, order tracking with unique ID, 7-day support period, status updates via ticket system, and completion verification.",
        color: BRAND_COLOR,
        category: 'Process'
    },
    'ticket': {
        intro: "Don't know about our ticket system?",
        explanation: "Our support ticket system provides professional support with dedicated ticket creation, order tracking integration, staff assignment system, priority support levels, issue escalation process, response time guarantees, resolution tracking, and customer satisfaction surveys.",
        color: BRAND_COLOR,
        category: 'Support'
    },
    'delivery': {
        intro: "Wondering about delivery?",
        explanation: "We guarantee fast delivery with a 24-hour standard, secure account transfer, login credentials provided, access verification included, setup assistance available, documentation provided, post-delivery support, and quality assurance checks completed.",
        color: BRAND_COLOR,
        category: 'Process'
    },

    // Security & Setup
    'security': {
        intro: "Need to know about account security?",
        explanation: "Security is critical - follow this protocol: Wait 72 hours for device recognition period, no activity for 1 week after IP changes, don't change username for 1 week, change password immediately after transfer, enable two-factor authentication, follow all guidelines to avoid restrictions, and use our provided APK for verified accounts.",
        color: BRAND_COLOR,
        category: 'Security'
    },
    'apk': {
        intro: "Don't know about our custom APK?",
        explanation: "Our bypass APK setup involves downloading from our Telegram channel, following step-by-step instructions, navigating through ad-supported links (it's free but contains advertisements), checking #apk-setup-verified for help, using at your own risk, compatible with most Android devices, with regular updates provided.",
        color: BRAND_COLOR,
        category: 'Technical'
    },
    'telegram': {
        intro: "Curious about our Telegram APK channel?",
        explanation: "Our Telegram channel provides APK downloads - you join our channel, navigate through multiple links, go through an ad-supported download process for free APK distribution, get step-by-step guidance, but there's a third-party content warning, so use caution with links. Technical support is available.",
        color: BRAND_COLOR,
        category: 'Technical'
    },
    'vpn': {
        intro: "Not sure about VPN requirements?",
        explanation: "VPN is required for non-verified accounts and must match the account's origin region. You need a stable connection, premium VPN services are recommended (avoid free/unreliable ones), consistent IP address is preferred, with security protocol compliance and proper regional server selection.",
        color: BRAND_COLOR,
        category: 'Technical'
    },

    // TikTok Algorithm & Growth
    'algorithm': {
        intro: "You don't understand TikTok's algorithm?",
        explanation: "The algorithm prioritizes engagement rate as the most critical factor, along with watch time for complete video views, shares and comments as social signals, trending sounds and current audio trends, strategic hashtag mixing of popular and niche tags, consistent posting schedules, and high-resolution video content quality.",
        color: BRAND_COLOR,
        category: 'Strategy'
    },
    'fyp': {
        intro: "You don't know what FYP is?",
        explanation: "FYP is the For You Page - TikTok's main feed. To optimize for FYP, you need to hook viewers in 3 seconds, participate in trends and viral challenges, maintain niche consistency to establish your content category, encourage engagement interactions, post at peak times based on audience activity, mix different video types for variety, and maximize all algorithm signals.",
        color: BRAND_COLOR,
        category: 'Strategy'
    },
    'viral': {
        intro: "Want to know the viral content formula?",
        explanation: "Going viral requires trend jacking to capitalize on current trends, emotional triggers that evoke strong reactions, relatability factors with universal experiences, surprise elements and unexpected twists, clear storytelling with compelling narratives, visual appeal with high-quality production, and precise timing by posting at optimal moments.",
        color: BRAND_COLOR,
        category: 'Strategy'
    },
    'trending': {
        intro: "Not sure about trending content?",
        explanation: "Trending content includes sound trends with popular audio clips, challenge participation in viral challenges, hashtag trends with trending topic tags, effect trends using popular video effects, format trends following video style patterns, niche trends for industry-specific content, and seasonal trends for time-sensitive content.",
        color: BRAND_COLOR,
        category: 'Strategy'
    },
    'engagement': {
        intro: "Don't know how to boost engagement?",
        explanation: "Engagement optimization requires clear call-to-action interaction prompts, question stickers to encourage responses, replying to all comments, using duet/stitch to collaborate, community building to foster loyal following, creating response videos to answer follower questions, and interactive content like polls, Q&As, and challenges.",
        color: BRAND_COLOR,
        category: 'Strategy'
    },

    // Content Creation
    'editing': {
        intro: "Want to improve your video editing?",
        explanation: "Professional editing uses CapCut (recommended free tool), jump cuts to maintain viewer attention, smooth transition effects for scene changes, text overlays to highlight key information, music sync with beat-matched editing, color grading for visual consistency, and 1080p minimum export quality.",
        color: BRAND_COLOR,
        category: 'Creation'
    },
    'capcut': {
        intro: "Don't know how to master CapCut?",
        explanation: "CapCut mastery involves using templates for trending edit styles, the effect library for professional transitions, audio editing with voice enhancement tools, speed ramping for dynamic pacing control, green screen for background replacement, text animation for dynamic typography, and export optimization balancing quality vs file size.",
        color: BRAND_COLOR,
        category: 'Tools'
    },
    'hashtags': {
        intro: "Not sure about hashtag strategy?",
        explanation: "Strategic hashtag usage requires a mix strategy of 3-5 popular plus 3-5 niche tags, research tools for hashtag analytics, trending tags that are currently popular, niche tags with industry-specific keywords, branded tags for personal/business use, location tags for geographic targeting, and challenge tags for viral challenge participation.",
        color: BRAND_COLOR,
        category: 'Strategy'
    },

    // Monetization & Analytics
    'monetization': {
        intro: "Want to know about monetization strategies?",
        explanation: "Revenue generation includes Creator Fund for direct TikTok payments, brand partnerships for sponsored content deals, affiliate marketing for product promotion commissions, TikTok Shop for e-commerce integration, live streaming for gift and tip earnings, course creation for educational content sales, and merchandise for personal brand products.",
        color: BRAND_COLOR,
        category: 'Monetization'
    },
    'analytics': {
        intro: "Don't understand TikTok analytics?",
        explanation: "Performance tracking covers video metrics like views, likes, shares, and comments, audience insights showing demographics and behavior, profile analytics for follower growth tracking, engagement rates showing interaction percentages, best posting times based on audience activity patterns, content performance of top-performing videos, and trend analysis for content pattern identification.",
        color: BRAND_COLOR,
        category: 'Analytics'
    },
    'metrics': {
        intro: "Not sure which metrics matter?",
        explanation: "Key performance indicators include completion rate (video watch percentage), engagement rate (interactions per view), follower growth (daily/weekly increases), reach metrics (unique viewer counts), share rate (content virality indicator), comment sentiment (audience feedback analysis), and click-through rates (link/bio engagement).",
        color: BRAND_COLOR,
        category: 'Analytics'
    },

    // Pricing & Account Details
    'pricing': {
        intro: "Want to know our pricing structure?",
        explanation: "Our transparent pricing: US Accounts $200-$500, UK Accounts $150-$200, EU Accounts $200 fixed, Non-TTS Accounts $30. All include fast 24-hour delivery, premium support, 15-day money-back guarantee, and multiple payment methods accepted.",
        color: BRAND_COLOR,
        category: 'Pricing'
    },
    'followers': {
        intro: "Curious about follower count options?",
        explanation: "US Accounts come with 10k, 20k, 30k, or 40k followers in both verified and non-verified options. UK Accounts have 10k followers available in verified and non-verified variants. EU Accounts offer various follower counts with regional optimization included.",
        color: BRAND_COLOR,
        category: 'Pricing'
    },
    'payment': {
        intro: "Don't know our payment methods?",
        explanation: "We accept credit cards (Visa, MasterCard, Amex), PayPal for secure online payments, cryptocurrency (Bitcoin, Ethereum), bank transfers for direct wire transfers, various digital wallets, installment plans for payment splitting, with a 15-day refund policy guarantee period.",
        color: BRAND_COLOR,
        category: 'Pricing'
    },
    'refund': {
        intro: "Want to know about our refund policy?",
        explanation: "We offer a 15-day money-back guarantee covering account issues and technical problems, service problems with quality guarantee, 3-5 business day processing time, refunds to original payment method, with conditions that apply per terms and conditions, plus support assistance before refund processing.",
        color: BRAND_COLOR,
        category: 'Pricing'
    },

    // Support & FAQ
    'faq': {
        intro: "Got questions? Here are the most common ones:",
        explanation: "Are accounts legitimate? Yes, 100% verified. Transfer time? 24 hours after payment. Global access? Yes with custom APK. VPN required? Only for non-verified accounts. Refunds available? 15-day guarantee period. Programs guaranteed? Yes, both TTS & CRP. Technical support? Check #apk-setup-verified channel.",
        color: BRAND_COLOR,
        category: 'Support'
    },
    'support': {
        intro: "Need to know about our customer support?",
        explanation: "We provide 24/7 availability with round-the-clock assistance, dedicated experienced support staff, multiple channels (Discord, Telegram, Email), fast response with average 1-3 hour response time, technical help for setup and troubleshooting, order tracking with real-time status updates, and post-purchase 7-day follow-up support.",
        color: BRAND_COLOR,
        category: 'Support'
    }
};

// Cooldown tracking for keyword responses
const cooldowns = new Map();

// ============================================
// NEW: EMOJI REACTION SYSTEM FOR SERVER OWNER
// ============================================

// Define channel-specific emoji pools (customize for your channels)
const channelEmojiPools = {
    // Welcome section
    'welcome': ['👋', '🎉', '💖', '🤗', '🌟', '✨', '🎊', '💫', '🌈', '😊', '🥳', '🎈', '🎁', '💝'],
    'rules': ['📋', '✅', '👍', '📜', '⚖️', '🛡️', '📖', '✔️', '👌', '💯', '🔒', '📄', '📝', '✍️'],
    'announcements': ['📢', '🔔', '⭐', '🗣️', '📣', '🔊', '📰', '🆕', '🚨', '⚡', '🔥', '💥'],
    'faq': ['❓', '💡', '🤔', '❔', '💭', '🧠', '🔍', '📚', '🎯', '💬', '🗨️', '📖', '🤷', '🔮'],
    
    // Purchase Information
    'how-to-buy': ['🛒', '💳', '📖', '💰', '🛍️', '💵', '💎', '🎯', '📋', '✨', '🔑', '📝', '💳', '🎁'],
    'buy-accounts': ['🛒', '💳', '📖', '💰', '🛍️', '💵', '💎', '🎯', '📋', '✨', '🔑', '📝', '💳', '🎁'],
    
    // Community
    'tiktok-tips': ['📱', '🎵', '💡', '🎬', '🎭', '🎪', '🎨', '🎯', '🚀', '⭐', '🔥', '💫', '✨', '🌟'],
    'growth-strategies': ['📈', '🚀', '⚡', '💪', '🎯', '🔥', '💡', '⭐', '🌟', '💎', '🏆', '👑', '💯', '🎊'],
    
    // Support channels
    'support': ['🎫', '🔧', '⚙️', '🛠️', '💬', '📞', '📧', '🆘', '❓', '💡', '👥', '🎯', '✅', '🤝'],
    'general': ['💬', '😄', '👋', '🎉', '😊', '💫', '⭐', '🌟', '✨', '🎊', '🎈', '💖', '🤗', '😎'],
    
    // Technical channels
    'apk-setup-verified': ['📱', '⚙️', '🔧', '💻', '📲', '🛠️', '⚡', '🔌', '💾', '📡', '🖥️', '⚙️', '🔩', '🎯']
};

// Configuration for emoji reactions
const emojiConfig = {
    minReactions: 3,    // Minimum number of reactions
    maxReactions: 6,    // Maximum number of reactions
    delayBetween: 300   // Delay between reactions (ms)
};

// Helper function to get random emojis from a pool without duplicates
function getRandomEmojis(emojiPool, count) {
    const maxCount = Math.min(count, emojiPool.length);
    const availableEmojis = [...emojiPool];
    const selectedEmojis = [];
    
    for (let i = 0; i < maxCount; i++) {
        const randomIndex = Math.floor(Math.random() * availableEmojis.length);
        selectedEmojis.push(availableEmojis[randomIndex]);
        availableEmojis.splice(randomIndex, 1);
    }
    
    return selectedEmojis;
}

// Function to handle emoji reactions for server owner messages
async function handleEmojiReactions(message) {
    try {
        // Check if message is from server owner
        const guild = message.guild;
        if (!guild || message.author.id !== guild.ownerId) return;

        // Get channel name (normalize it)
        const channelName = message.channel.name
            .toLowerCase()
            .replace(/[^\w\s-]/g, '') // Remove emojis and special characters
            .replace(/[\s-]+/g, '-')  // Replace spaces and multiple dashes with single dash
            .replace(/^-+|-+$/g, ''); // Remove leading/trailing dashes
        
        // Get emoji pool for this channel
        const emojiPool = channelEmojiPools[channelName];
        
        if (emojiPool && emojiPool.length > 0) {
            console.log(`🎯 Server owner message detected in #${message.channel.name}`);
            console.log(`📝 Message: ${message.content.substring(0, 100)}...`);
            
            // Determine random number of reactions to add
            const numReactions = Math.floor(Math.random() * (emojiConfig.maxReactions - emojiConfig.minReactions + 1)) + emojiConfig.minReactions;
            
            // Randomly select emojis from the pool (no duplicates)
            const selectedEmojis = getRandomEmojis(emojiPool, numReactions);
            
            console.log(`🎲 Selected ${selectedEmojis.length} random emojis: ${selectedEmojis.join(' ')}`);
            
            // Add reactions with delay to avoid rate limits
            for (let i = 0; i < selectedEmojis.length; i++) {
                try {
                    await new Promise(resolve => setTimeout(resolve, emojiConfig.delayBetween));
                    await message.react(selectedEmojis[i]);
                    console.log(`✅ Added reaction ${selectedEmojis[i]} (${i + 1}/${selectedEmojis.length})`);
                } catch (reactionError) {
                    console.error(`❌ Failed to add reaction ${selectedEmojis[i]}:`, reactionError.message);
                }
            }
            
            console.log(`🎉 Finished adding ${selectedEmojis.length} random reactions to server owner message in #${message.channel.name}`);
        } else {
            console.log(`ℹ️ No emoji pool configured for channel: #${message.channel.name} (normalized: ${channelName})`);
        }
        
    } catch (error) {
        console.error('❌ Error in emoji reaction handler:', error);
    }
}

// ============================================
// EXISTING KEYWORD DETECTION SYSTEM
// ============================================

client.once('ready', () => {
    console.log(`✅ ${client.user.tag} is online and monitoring for keywords!`);
    console.log(`📝 Monitoring ${Object.keys(keywords).length} keywords`);
    console.log(`🎭 Emoji reaction system loaded for ${Object.keys(channelEmojiPools).length} channels`);
    
    // Set bot presence
    if (config.PRESENCE) {
        client.user.setPresence({
            status: config.PRESENCE.status,
            activities: [{
                name: config.PRESENCE.activity.name,
                type: ActivityType[config.PRESENCE.activity.type]
            }]
        });
    }
});

client.on('messageCreate', async (message) => {
    // Skip if message is from a bot (unless configured to respond to bots)
    if (message.author.bot && !config.RESPOND_TO_BOTS) return;
    
    // Skip if message is from this bot to prevent self-responses
    if (message.author.id === client.user.id) return;
    
    // ============================================
    // FIRST: Handle emoji reactions for server owner
    // ============================================
    await handleEmojiReactions(message);
    
    // ============================================
    // SECOND: Handle keyword detection (existing functionality)
    // ============================================
    
    // Check cooldown for keyword responses
    const userId = message.author.id;
    const now = Date.now();
    const cooldownKey = `${userId}-${message.channel.id}`;
    
    if (cooldowns.has(cooldownKey)) {
        const expirationTime = cooldowns.get(cooldownKey) + config.COOLDOWN_MS;
        if (now < expirationTime) return;
    }
    
    // Find matching keywords in the message
    const messageContent = config.CASE_SENSITIVE ? message.content : message.content.toLowerCase();
    const foundKeywords = [];
    
    for (const [keyword, data] of Object.entries(keywords)) {
        const searchKeyword = config.CASE_SENSITIVE ? keyword : keyword.toLowerCase();
        
        // Check if keyword exists as a whole word
        const regex = new RegExp(`\\b${searchKeyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
        
        if (regex.test(messageContent)) {
            foundKeywords.push({ keyword, data });
            
            // Limit explanations per message
            if (foundKeywords.length >= config.MAX_EXPLANATIONS_PER_MESSAGE) break;
        }
    }
    
    // If keywords found, send AI-style explanations
    if (foundKeywords.length > 0) {
        // Set cooldown
        cooldowns.set(cooldownKey, now);
        
        try {
            if (foundKeywords.length === 1) {
                // Single keyword - send as conversational AI response
                const { keyword, data } = foundKeywords[0];
                const embed = new EmbedBuilder()
                    .setDescription(`**${data.intro}** ${data.explanation}`)
                    .setColor(data.color)
                    .setFooter({ 
                        text: 'Creatok AI • Premium TikTok Solutions • Need more help? Create a ticket!',
                        iconURL: client.user.displayAvatarURL()
                    })
                    .setTimestamp();
                
                await message.reply({ embeds: [embed] });
                console.log(`🤖 Keyword Response: Responded to ${message.author.tag} with "${keyword}"`);
            } else {
                // Multiple keywords - send as comprehensive AI response
                const embed = new EmbedBuilder()
                    .setDescription('I noticed you mentioned several topics! Let me explain each one for you:')
                    .setColor(BRAND_COLOR)
                    .setFooter({ 
                        text: `Creatok AI • Create a ticket for personalized help!`,
                        iconURL: client.user.displayAvatarURL()
                    })
                    .setTimestamp();
                
                foundKeywords.forEach(({ keyword, data }, index) => {
                    // Create conversational response for each keyword
                    const response = `**${data.intro}** ${data.explanation.length > 300 
                        ? data.explanation.substring(0, 300) + '...' 
                        : data.explanation}`;
                    
                    embed.addFields({
                        name: `${index + 1}. ${keyword.toUpperCase()}`,
                        value: `${response}`,
                        inline: false
                    });
                });
                
                // Add AI summary
                embed.addFields({
                    name: 'Summary',
                    value: `I've explained **${foundKeywords.length}** topics for you! Need more specific help? Feel free to ask or create a support ticket.`,
                    inline: false
                });
                
                await message.reply({ embeds: [embed] });
                console.log(`🤖 Keyword Response: Responded to ${message.author.tag} with ${foundKeywords.length} keywords: ${foundKeywords.map(k => k.keyword).join(', ')}`);
            }
        } catch (error) {
            console.error('Error sending AI response:', error);
            
            // AI-style fallback message
            try {
                await message.reply({
                    content: `**Creatok AI Assistant Error**\n\nOops! I detected these keywords: ${foundKeywords.map(k => `\`${k.keyword}\``).join(', ')} but had trouble generating a detailed response.\n\nNo worries though! Create a support ticket and our human team will help you out: **@Creatok-Staff**`
                });
            } catch (fallbackError) {
                console.error('Fallback message also failed:', fallbackError);
            }
        }
    }
});

// Error handling
client.on('error', error => {
    console.error('Discord client error:', error);
});

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('Received SIGINT, shutting down gracefully...');
    client.destroy();
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('Received SIGTERM, shutting down gracefully...');
    client.destroy();
    process.exit(0);
});

// Login with bot token
client.login(process.env.DISCORD_BOT_TOKEN).catch(error => {
    console.error('Failed to login:', error);
    process.exit(1);
});

// Export for potential module use
module.exports = { 
    client, 
    keywords,
    channelEmojiPools,
    emojiConfig,
    getRandomEmojis,
    handleEmojiReactions
};