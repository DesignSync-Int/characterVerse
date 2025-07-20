# Commercial-Safe Character Images Guide

## 🏢 Professional/Commercial Use Image Sources

### ✅ **Completely Free for Commercial Use**

#### 1. **Wikimedia Commons**
- **License**: Public Domain / Creative Commons
- **Best For**: Historical figures, mythology, classic literature characters
- **API**: Free, no key required
- **Examples**: Greek gods, Shakespeare characters, historical figures
- **Commercial Use**: ✅ YES (check specific license per image)

#### 2. **Unsplash** 
- **License**: Unsplash License (Free for commercial use)
- **Best For**: High-quality artistic portraits and photos
- **API**: Free (requires account)
- **Setup**: Get key at [unsplash.com/developers](https://unsplash.com/developers)
- **Commercial Use**: ✅ YES

#### 3. **Pixabay**
- **License**: Pixabay License (Free for commercial use)
- **Best For**: Illustrations, cartoon-style art, character designs
- **API**: Free (requires account)
- **Setup**: Get key at [pixabay.com/api/docs](https://pixabay.com/api/docs/)
- **Commercial Use**: ✅ YES

#### 4. **Pexels**
- **License**: Pexels License (Free for commercial use)
- **Best For**: Professional stock photos, portraits
- **API**: Free (requires account)
- **Setup**: Get key at [pexels.com/api](https://www.pexels.com/api/)
- **Commercial Use**: ✅ YES

#### 5. **Generated Avatars (UI Avatars)**
- **License**: No restrictions
- **Best For**: Consistent character avatars, fallback images
- **API**: Free, no key required
- **Commercial Use**: ✅ YES

---

## ❌ **NOT for Commercial Use**

#### TMDB (The Movie Database)
- **License**: Fair use for personal projects only
- **Commercial Use**: ❌ NO - Personal use only
- **Note**: Great for personal projects, but avoid for business/commercial apps

---

## 🚀 **Quick Setup**

### 1. Environment Variables (.env.local)
```bash
# All optional - works with just Wikimedia + Generated avatars
UNSPLASH_ACCESS_KEY=your_unsplash_key_here
PIXABAY_API_KEY=your_pixabay_key_here  
PEXELS_API_KEY=your_pexels_key_here
```

### 2. Get API Keys (All Free)
1. **Unsplash**: [unsplash.com/developers](https://unsplash.com/developers)
   - Sign up → Create app → Copy Access Key
2. **Pixabay**: [pixabay.com/accounts/register](https://pixabay.com/accounts/register)
   - Register → API → Copy API Key
3. **Pexels**: [pexels.com/api](https://www.pexels.com/api/)
   - Sign up → Generate API Key

### 3. Update Images
Visit: `http://localhost:3001/admin/commercial-images`

---

## 📊 **Expected Results**

### With API Keys:
- **Spider-Man**: Artistic superhero illustration from Pixabay
- **Batman**: Dark character art from Unsplash
- **Wonder Woman**: Strong female character from Pexels
- **Goku**: Anime-style art from Pixabay
- **Greek Gods**: Historical images from Wikimedia

### Without API Keys:
- **All Characters**: High-quality generated avatars with consistent styling

---

## ⚖️ **Legal Compliance**

✅ **Safe for**:
- Commercial websites
- Business applications  
- Paid products/services
- Marketing materials
- Professional portfolios

❌ **Avoid**:
- Movie posters (unless from commercial sources)
- Copyrighted character art
- Images without clear licensing
- TMDB images in commercial projects

---

## 💡 **Best Practices**

1. **Always check individual licenses** - Wikimedia images vary
2. **Provide attribution when required** - Our service handles this automatically
3. **Keep attribution data** - Stored in database for compliance
4. **Use fallback avatars** - Ensures every character has an image
5. **Update periodically** - New free images become available

---

## 🎯 **Recommendation**

For **professional/commercial use**:
1. Set up all 3 free APIs (takes 5 minutes)
2. Run the commercial-safe image update
3. Enjoy high-quality, legally-safe character images
4. No ongoing costs or licensing fees!

This approach gives you real character images while staying 100% compliant with commercial use requirements.
