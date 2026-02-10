/* AI Mastery Lab — Offline single-page workshop site
   Created by Azhar Said
*/

(() => {
  'use strict';

  // ---------- Utilities ----------
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

  const STORAGE = {
    done: 'aiml_done_v1',
    session: 'aiml_session_prompts_v1',
    scores: 'aiml_scores_v1',
    theme: 'aiml_theme_v1',
    reduceMotion: 'aiml_reduce_motion_v1',
    lastImage: 'aiml_last_image_v1',
  };

  const MEDIA_DIR = 'assets/Images and videos/'; // IMPORTANT: folder name has spaces
  const mediaPath = (file) => encodeURI(MEDIA_DIR + file);

  const VAULT_PROMPTS = {"1.png": "A vibrant, high-energy urban shot of a man with uploaded face as reference standing in front of a colorful, chaotic graffiti wall. He is holding a spray can, having just finished painting a masterpiece. The paint on the wall is actually 3D and \"peeling\" off to reveal a futuristic metal city underneath. The graffiti includes a stylized, wildstyle \"AI TRENDS\" tag. The subject wears a denim jacket covered in paint spots, a beanie, and cargo pants. The lighting is bright sunlight casting hard shadows, highlighting the texture of the brick wall and the spray paint. 8k, photorealistic street art, wide angle.\n\nKeep the face exactly and 100% as in the attached photo", "2.png": "A surreal perspective shot of a giant chessboard stretching to the horizon. The chess pieces are human-sized statues. The player is a colossal man with uploaded face as reference, looming over the board from the sky, his hand reaching down to move a knight. He wears a sharp tuxedo. The \"King\" piece on the board has the \"AI TRENDS\" logo on its base. The atmosphere is tense and foggy, with dramatic thundercloud lighting. 8k, epic scale, cinematic composition.\n\nKeep the face exactly 100% as in attached photo", "3.png": "A hyper detailed cinematic scene featuring use uploaded face 100% as reference as the main hero. The hero is ascending an endless spiral staircase made of aged vellum books. The outfit is a 350gsm mustard-yellow knit sweater with visible wool fibers and dark denim trousers. The environment features a library with infinite height and floating candles casting localized warmth. Lighting features God-rays filtering through high-altitude windows and volumetric dust. Technical specs include sharp 8k resolution and a shallow depth of field. no CGI or 3D graphics or art. use Photoshop manipulation if the scene illogical and imaginary.", "4.png": "A hyper-detailed cinematic scene featuring the uploaded face used 100% as reference as the main hero. The hero stands with a strong, commanding posture while balancing on a levitating sandstone pillar suspended high in the atmosphere.\n\nThe hero wears a heroic 200gsm outfit designed for strength and presence: a heavy, structured long coat with sharp shoulders and reinforced seams, layered over a fitted tactical inner tunic. The outfit includes armored fabric panels on the chest and forearms, a wide utility belt, and rugged, form-fitting pants with realistic creases and weight. The fabric appears durable and battle-ready, subtly reacting to wind and altitude, emphasizing realism and power. The color palette features deep charcoal, muted bronze, and stone-grey tones, enhancing the heroic silhouette against the sky. The environment consists of floating islands with cascading waterfalls that dissolve into mist before reaching the clouds. Dramatic God-rays cut through the atmosphere, with a soft cyan-tinted glow outlining the hero and enhancing depth and scale. Shot on 35mm anamorphic lenses with an ARRI Alexa 65 aesthetic, cinematic contrast, natural grain, and realistic depth of field.\n\nNo CGI, no 3D graphics, no illustration. If the scene is illogical or imaginary, achieve realism using high-end Photoshop photo manipulation and compositing only.", "5.png": "A hyper detailed cinematic scene featuring use uploaded face 100% as reference as the main hero. The hero wields a high-intensity focused plasma core encased in a crystalline refraction chamber that functions as a staff. The outfit is a suit of flexible carbon fiber plates over 350gsm heavy cotton weave with oxidized copper embroidery. The environment is a futuristic Tokyo street with holographic advertisements integrated via photo-compositing. Lighting features a realistic blue glow on the skin from the plasma core and anamorphic blue lens flares. no CGI or 3D graphics or art. use Photoshop manipulation if the scene illogical and imaginary.", "6.png": "A hyper detailed cinematic scene featuring use uploaded face 100% as reference as the main hero. The hero is cautiously exploring a vine-choked stone temple. The outfit is a 350gsm olive drab canvas jacket with hand-stitched reinforced Kevlar panels and distressed topographical leather boots. The environment features damp moss-covered brutalist concrete and biological entities resembling translucent overlapping scales growing from the walls. Lighting features volumetric haze and sharp God-rays piercing the canopy. Shot on 35mm anamorphic lenses with natural film grain. no CGI or 3D graphics or art. use Photoshop manipulation if the scene illogical and imaginary.", "7.png": "A hyper detailed cinematic scene featuring use uploaded face 100% as reference as the main hero. The hero stands defensively with a wide stance on a scorched mountain peak. The outfit is a master-crafted suit of oxidized copper embroidery over 350gsm heavy cotton weave and articulated chrome-plated shoulder guards. The environment is a jagged basalt rock formation with rising sulfur smoke and heat shimmer. Looming above is a massive apex reptilian predator with translucent overlapping scales and wet-look muscle definition, appearing as a physical practical effect. Lighting features high-contrast Rembrandt lighting from the volcanic glow. Shot on 35mm anamorphic lenses with sharp 8k resolution. no CGI or 3D graphics or art. use Photoshop manipulation if the scene illogical and imaginary.", "8.png": "A hyper detailed cinematic scene featuring use uploaded face 100% as reference as the main hero. The hero stands on the prow of a wooden ship facing a massive sea predator. The outfit is a suit of boiled topographical leather with oxidized copper embroidery and a 450gsm heavy cotton cloak. The environment is a turbulent dark ocean with high-fidelity water splashes and a massive apex reptilian predator emerging from the waves. Lighting features dramatic Rembrandt lighting from a stormy sky. Shot on 35mm anamorphic lenses with natural film grain. no CGI or 3D graphics or art. use Photoshop manipulation if the scene illogical and imaginary.", "9.png": "An epic, heroic scene set in the rugged, misty highlands of an ancient fantasy world. The subject, featuring the \"Upload face as reference\", stands atop a mossy boulder, wind whipping through his hair. The lighting is overcast and dramatic, with storm clouds gathering above, providing soft, diffused light that eliminates harsh shadows but enhances mood. Shot with a 24mm lens, the background showcases rolling green hills and distant mountains. He wears a kilt of tartan pattern, leather bracers, and a fur cloak. At his side stands a mythical winged lion, its feathers and fur rendered in excruciating detail. He stands shoulder-to-shoulder with the beast, a true friend of lion. The style combines the grandeur of a cinematic epic with the texture and detail of high-end landscape photography.", "10.png": "A scene of absolute opulence and historical grandeur, reminiscent of a classical oil painting brought to life. The subject, with the face \"[face from reference image]\", sits upon a velvet throne in a dimly lit baroque hall. The lighting is strictly Chiaroscuro, with a single high window casting a beam of golden light that carves his figure out of the encroaching darkness. Captured with an 85mm portrait lens, the focus is intimate and commanding. He wears regal attire inspired by 18th-century nobility: a brocade coat with gold embroidery, a lace cravat, and heavy signet rings. Resting at his feet is a large, majestic lion, calm and loyal, reinforcing the narrative that the king is truly a friend of lion. The textures of the velvet throne, the lion's fur, and the subject's skin are rendered with hyper-realistic precision, blending the drama of Caravaggio with modern 8K photography.", "11.png": "A photorealistic, cinematic medium shot captures a wizard with uploaded face as reference standing in a snow-covered stone courtyard before a majestic gothic castle with towering spires and snow-capped turrets. The subject wears round wire-rimmed glasses, a grey v-neck sweater, a red and gold striped tie, and a flowing black school robe with a crest, holding a large, magnificent snowy owl with piercing yellow eyes on a gloved right hand. A vintage brown leather trunk with brass fittings and \"H.P.\" initials sits on the snowy ground in the immediate foreground. The scene is illuminated by soft, diffuse overcast winter lighting with visible falling snowflakes, featuring high-fidelity textures on the wool, feathers, and ancient stone, 8k resolution, raytracing, and a magical fantasy atmosphere.", "12.png": "A vertical cinematic shot captures a magical encounter in a sun-dappled forest, featuring a young wizard with \"uploaded face as reference\" wearing a black school robe, white shirt, and red-and-gold striped tie, bowing respectfully with a slight smile. To the left, the large, detailed head and neck of a grey Hippogriff dominates the foreground, featuring intricate feathered textures, a sharp beak, and a piercing orange eye. The background consists of towering tree trunks and a dense canopy of bright green leaves filtering natural sunlight, creating a high-contrast, atmospheric woodland scene with photorealistic textures, 8k resolution, and a 35mm focal length aesthetic.", "13.png": "A cinematic medium shot featuring a wizard with uploaded face as reference, wearing round wire-rimmed glasses, a grey v-neck sweater, and a dark open robe with crimson lining and an embroidered chest crest. He holds a wooden wand forward, its tip emitting a brilliant, star-shaped cyan lens flare. The background showcases a towering gothic castle perched on a jagged cliff under a turbulent, dark night sky filled with jagged lightning bolts and heavy storm clouds. The scene utilizes moody teal and blue color grading, volumetric fog, rain textures, and dramatic rim lighting to separate the subject from the background, rendered in photorealistic 8k resolution with a high-contrast movie poster aesthetic.", "14.png": "Cinematic medium close-up of a wizard with uploaded face as reference, thrusting a wooden wand forward with dramatic foreshortening. He wears round wire-rimmed glasses and a dark, heavy-textured hooded robe. The wand tip erupts in a violent stream of golden fire and swirling orange embers, acting as the primary volumetric light source against a moody, dark teal smoky background. High-contrast chiaroscuro lighting illuminates the skin with subsurface scattering. Hyper-realistic digital art style, 8k resolution, intricate particle effects, raytraced reflections, intense atmospheric depth, sharp focus on the eyes.", "15.png": "A cinematic medium shot captures a wizard with uploaded face as reference flying dynamically on a textured wooden broomstick, wearing round wire-rimmed glasses and billowing maroon and gold robes. The figure is suspended mid-air against a backdrop of blurred stone castle architecture and a black iron lamp post. The scene is framed by a heavy foreground bokeh of golden autumn leaves, creating a shallow depth of field. Lighting is soft and natural, evoking an overcast afternoon. Technical specifications include an 85mm focal length, f/1.8 aperture, photorealistic 8k rendering, and high-fidelity cloth physics.", "16.png": "A hyper-realistic, cinematic low-angle shot depicting a high-stakes magical duel amidst gothic castle ruins. On the left, the uploaded face as reference, wearing round glasses and a dark hoodie, lunges forward with a wand, projecting a beam of intense red energy. Opposite him, a pale, bald antagonist in flowing dark emerald robes counters with a jagged green spell. The two energies collide in a violent central burst of sparks and plasma, illuminating the scene with dramatic chiaroscuro lighting and high-contrast teal and orange color grading. The background features a crumbling stone tower against a turbulent, storm-clouded sky. Rendered in 8k with volumetric fog, raytracing, subsurface scattering, and intricate particle details.", "17.png": "A forced perspective shot of the subject (uploaded face as reference) pinching the moon between their thumb and forefinger. The subject stands on a rooftop at night, silhouetted against a dark blue twilight sky. They are wearing a trench coat and fedora. The moon is full and detailed with craters, glowing brightly. The alignment is perfect, making the celestial body look like a glowing coin. Shot with a 200mm telephoto lens to compress the distance between the subject and the moon, making the moon appear large relative to the hand. The lighting is minimal, with the moon itself providing the rim light that outlines the subject's profile and hand. The atmosphere is quiet and mysterious, with a faint glow of city lights at the very bottom of the frame.", "18.png": "A dark cinematic fantasy scene of a powerful fallen angel warrior striding forward with commanding presence. A man (with the physical characteristics of the uploaded image), with striking facial features, glowing red eyes, and an intense expression, wears a long, tattered maroon leather trench coat over a dark green shirt. One arm is entirely mechanical, with steampunk-style metal joints and gears. Enormous, detailed wings, made of dark feathers and mechanical components, extend from his back, encrusted with glowing gears and cores. He walks down a street in a ruined city with soldiers or blurred figures in the background. Dust swirls in the air, dramatic depth of field, and shallow focus create a striking effect. The image features ultra-realistic textures, cinematic lighting, a melancholic atmosphere, an epic movie poster style, 8K resolution, hyper-detail, high contrast, dramatic shadows, Unreal Engine, high-quality visual effects, and a dark fantasy aesthetic.", "19.png": "A hyper-realistic, high-fidelity cinematic portrait captured with an 85mm lens at f/2.8, showcasing a distinguished man with uploaded face as reference seated in profile view at a sun-drenched coastal terrace. The lighting is harsh and direct, typical of high noon, creating strong, dramatic shadows under the brim of his textured beige straw fedora with a black ribbon band. He is dressed in a crisp white linen shirt with an open collar and rolled sleeves, holding a premium cigar to his lips with a relaxed grip, while a luxury wristwatch with a dark face and link bracelet adorns his wrist. In the immediate foreground, a crystal snifter glass containing amber cognac sits on the light-colored table, exhibiting complex raytraced caustics and light refraction on the surface. The background features a vibrant, out-of-focus turquoise ocean with sparkling specular highlights and a clear blue sky, rendered with 8k Octane Render quality, emphasizing subsurface scattering on the skin, intricate beard texture, and photorealistic material properties. Keep the face exactly as in the attached photo", "20.png": "A hyper-realistic, cinematic medium shot captures a stylish gentleman with the **uploaded face as reference**, seated at a small round metallic bistro table on a Parisian terrace. He is dressed in impeccable sartorial attire, wearing a structured navy blue blazer with gold cuff buttons, a white turtleneck sweater, and a maroon silk pocket square, topped with a classic straw boater hat featuring a red and navy grosgrain ribbon. He wears round, wire-rimmed sunglasses with a gradient violet tint and sports a well-groomed full beard. His left hand is raised elegantly, holding a cigar between his fingers, while a long-stemmed glass of red wine and a white ceramic coffee cup rest on the reflective table surface. The background is a soft, creamy bokeh of the Louvre Museum courtyard, blurring the historic stone architecture and the glass pyramid to emphasize the subject. The lighting is soft, diffuse natural daylight, highlighting the tactile textures of the wool suit, the straw hat weave, and the skin, shot on an 85mm lens with high-fidelity 8k resolution, raytraced reflections on the sunglasses and wine glass, and a sophisticated, cosmopolitan atmosphere.", "21.png": "A hyper-realistic, low-angle fashion portrait captured with an 85mm lens at f/1.8 to create a creamy bokeh background of blurred urban architecture, featuring a stylish gentleman with uploaded face as reference. The subject is exuding masculine elegance, puffing on a thick cigar with intricate wisps of volumetric white smoke swirling around the mouth and dark tinted sunglasses. He is dressed in impeccable sartorial attire consisting of a deep burgundy tailored suit, a crisp white dress shirt, and a textured geometric-patterned tie, with a dark navy blue wool overcoat draped effortlessly over his shoulders cape-style. Details include a patterned pocket square, a beaded bracelet on the wrist holding the cigar, and a luxury watch on the other wrist. The lighting is soft, diffused natural daylight, highlighting the texture of the fabrics and the grooming of the slicked-back pompadour hair and beard, rendered in 8k resolution with raytracing and high-fidelity skin textures", "22.png": "Use the attached photo and keep the face exactly as it is.", "23.png": "Ultra-realistic cinematic street portrait. A confident man sitting on the bonnet of a matte black Lamborghini Urus, arms crossed, relaxed but dominant posture. He’s wearing a perfectly tailored black suit with a black shirt, no tie, polished black shoes, and dark sunglasses. Sharp haircut, clean lines, composed expression, quiet gangster confidence. He’s looking slightly off-camera with calm authority. Behind him is a large, hyper-detailed graffiti mural of the same man. The mural clearly mirrors his face, hairstyle, sunglasses, and suit, rendered as a larger-than-life street art portrait. The graffiti version shows him holding a baseball bat over his shoulder, matching his attitude and presence. Bold colours, strong outlines, realistic facial likeness, painted on a raw concrete wall with layered tags, texture, and urban grit. Industrial city setting, daytime, soft natural light. Strong contrast between the refined luxury of the Lamborghini Urus and the raw street art environment. Shot at eye level with a subtle low cinematic angle to emphasise power and status. Photorealistic skin texture, crisp suit fabric, ultra-realistic reflections on the Urus paint, glass, and rims. Shallow depth of field while keeping the mural sharp and recognisable. Editorial street photography meets cinematic realism. High detail, 8K quality, sharp focus, modern urban luxury aesthetic. Use attached photo as a reference and keep the face exactly as it is", "24.png": "A hyper-realistic 8k cinematic shot captures a person dynamically riding a large, vibrant Ikran-like creature through a fantastical alien landscape, rendered with highly detailed textures. The camera adopts a medium shot from a slight low-angle, emphasizing the scale and motion of the subjects against an epic backdrop. The person, with uploaded face as reference, is seen leaning forward with their right arm extended for balance and their left hand gripping brown leather reins, wearing a black tank top adorned with a white circular ouroboros-like graphic, black pants, and crisp white sneakers with a black swoosh. The creature is a magnificent winged reptilian beast, featuring iridescent blue, green, yellow, and orange patterns across its body, intricate scale textures, sharp teeth visible in its open mouth, and piercing yellow eyes, all secured with a brown leather harness. The background reveals a breathtaking vista of majestic floating mountains covered in lush green vegetation, a distant ocean, and an active volcano spewing smoke and glowing lava, all enveloped in a soft, atmospheric haze with subtle bioluminescent elements glowing in the mid-distance. The scene is illuminated by bright, natural daylight, providing soft, cinematic lighting that accentuates depth and detail.", "25.png": "A hyper-realistic 8k wide-shot image, captured with a 35mm lens, featuring a young man standing confidently on a long, empty asphalt road that stretches into the distance, flanked by blurred, densely forested hills under a surreal sky. The camera is positioned at eye-level. The man, standing slightly left of center, wears a light blue sleeveless tank top with a graphic print, dark blue jeans, and dark shoes. He holds a small, dark object in his raised right hand, from which a vibrant plume of glowing cyan-blue smoke dramatically rises. This ethereal smoke ascends and visually connects to a massive, hyper-realistic glowing blue planet/moon dominating the upper center of the frame. This celestial body is partially obscured by dark, wispy, smoke-like clouds that are intensely illuminated with the same brilliant cyan-blue light, extending downwards and merging with the smoke emanating from the character. The sky transitions from a dark, starry expanse around the planet to a hazy light blue near the horizon. The entire scene is bathed in dramatic cinematic lighting, with the intense blue light from the planet casting a subtle, ethereal glow on the character and the surrounding elements, creating a magical and surreal atmosphere. The distant forested hills are rendered with a soft, shallow depth of field, emphasizing the foreground subject and the celestial phenomenon. Highly detailed textures are visible on the road, the character's clothing, and the luminous, wispy smoke. For the character's face, use uploaded face as reference. 2:3r", "26.png": "A hyper-realistic, 8k, cinematic wide-shot captured with a 35mm lens from a slightly low-angle perspective, depicting a dramatic desert scene at dusk. The composition features a person in the foreground, positioned slightly to the right, sitting casually on a textured, earthy brown rock. The person is wearing a short-sleeved button-up shirt with a distinctive black and orange/brown abstract animal print, dark slim-fit pants, and clean white sneakers. They have dark, voluminous hair styled upwards and are wearing round, light blue tinted sunglasses, along with a dark watch on their left wrist. For the character's face, use uploaded face as reference. In the mid-ground, dominating the left and center of the frame, is a massive, crashed passenger airplane, its tail section dramatically angled upwards, partially embedded in the dry, sandy desert ground. The airplane shows signs of damage, with its red engines visible and the registration \"C-AEQ\" faintly visible on its fuselage. The significant scale difference between the foreground person and the colossal, wrecked airplane creates a surreal, post-apocalyptic atmosphere. The scene is bathed in warm, volumetric cinematic lighting, characterized by soft, golden-orange hues emanating from the sunset sky, casting subtle rim lighting on the subject and highlighting the highly detailed texture of the rock and the airplane wreckage. The background consists of a vast, desolate desert landscape under a cloudy sky painted with warm, muted orange and brown tones, creating a sense of isolation and grandeur. 2:3r Use the exact face in the attached photo", "27.png": "A hyper-realistic, 8k, cinematic mid-shot captured at eye-level with a standard lens, depicting a surreal interaction during golden hour. The composition features a person, uploaded face as reference, seated on a stack of two vintage brown leather suitcases on the right side of the frame. The person is wearing a light grey long-sleeve shirt, dark trousers, and brown lace-up boots, leaning forward with both hands gently holding the outstretched front paws of a majestic Bengal tiger. The tiger, positioned on the left, is in an elongated, stretching pose, its body low to the ground, reaching across a dusty, gravelly road to meet the person's hands. This \"Photoshop logic\" creates a fantastical scene where the tiger's body is unnaturally extended for this intimate gesture. The lighting is soft, warm, and diffused, with a strong backlight from the setting sun creating a vibrant golden glow across the entire scene, producing a halo effect on the subjects and a bright, slightly blown-out sky. The background is a shallow depth of field, blurred landscape of warm, golden hues, suggesting an open field or desert at sunset, with a faint, out-of-focus road receding into the distance. Highly detailed textures are visible on the tiger's fur, the person's clothing, and the worn leather of the suitcases, all rendered with exceptional clarity and cinematic quality. 2:3r", "28.png": "A hyper-realistic, 8k, cinematic image captured with a low-angle, slightly wide-angle lens, showcasing a surreal split-level perspective. The scene is dramatically lit with volumetric underwater lighting, featuring soft, ethereal light rays filtering down through the dark blue-green water, contrasting with the darker, moody lighting above the surface. In the foreground, submerged underwater, a person sits cross-legged, looking upwards with an expression of awe and fear, their hands covering their mouth. The person is wearing a dark blue denim shirt and dark pants, with uploaded face as reference. Around them, numerous small bubbles rise, and faint, glowing jellyfish drift, along with a small, colorful tropical fish. The water surface above them is turbulent and disturbed, where the massive, highly detailed head of a Tyrannosaurus Rex emerges, mouth wide open, sharp teeth visible, creating dramatic splashes and ripples. The dinosaur's scales are intricately textured. Above the water, in the background, a dark, blurry, dense primeval forest or jungle is visible, emphasizing the ancient, wild setting. The scale is exaggerated, with the person appearing small and vulnerable beneath the colossal dinosaur. The overall mood is one of suspense and wonder, with highly detailed textures throughout."};

  const toastEl = $('#toast');
  let toastTimer = null;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.style.display = 'block';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.style.display = 'none';
    }, 1400);
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      toast('Copied ✅');
      return true;
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        toast('Copied ✅');
        return true;
      } catch {
        toast('Copy failed');
        return false;
      } finally {
        ta.remove();
      }
    }
  }

  function getTextFromEl(id) {
    const el = document.getElementById(id);
    if (!el) return '';
    return (el.value ?? el.textContent ?? '').toString();
  }

  function setTextToEl(id, text) {
    const el = document.getElementById(id);
    if (!el) return;
    if ('value' in el) el.value = text;
    else el.textContent = text;
  }

  function downloadText(filename, text) {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 250);
    a.remove();
  }

  function safeNow() {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}`;
  }

  // ---------- Session prompts ----------
  function loadSession() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE.session) || '[]');
    } catch {
      return [];
    }
  }
  function saveSession(list) {
    localStorage.setItem(STORAGE.session, JSON.stringify(list));
  }
  function addToSession(text) {
    const t = (text || '').trim();
    if (!t) {
      toast('Nothing to add');
      return;
    }
    const list = loadSession();
    list.unshift({ text: t, at: Date.now() });
    saveSession(list.slice(0, 200));
    toast('Added ✅');
  }

  // ---------- Theme / motion ----------
  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    $('#btnTheme').textContent = theme === 'light' ? '☀️' : '🌙';
  }
  function initTheme() {
    const saved = localStorage.getItem(STORAGE.theme);
    if (saved === 'light' || saved === 'dark') {
      applyTheme(saved);
      return;
    }
    // Default: dark (neon looks better)
    applyTheme('dark');
  }

  function applyReduceMotion(enabled) {
    document.documentElement.dataset.reduceMotion = enabled ? '1' : '0';
    $('#btnReduceMotion').textContent = enabled ? '🧊' : '🌀';
  }
  function initReduceMotion() {
    const saved = localStorage.getItem(STORAGE.reduceMotion);
    applyReduceMotion(saved === '1');
  }

  // ---------- Navigation ----------
  function setActivePage(page) {
    const pages = $$('.page');
    pages.forEach(p => p.classList.toggle('is-active', p.dataset.page === page));

    $$('.nav__btn').forEach(b => b.classList.toggle('is-active', b.dataset.nav === page));
    const app = $('#app');
    if (app) app.focus({ preventScroll: true });

    updateProgress();
  }

  function navTo(page) {
    if (!page) return;
    history.replaceState(null, '', '#' + page);
    setActivePage(page);
  }

  function initNav() {
    $$('.nav__btn').forEach(btn => {
      btn.addEventListener('click', () => navTo(btn.dataset.nav));
    });
    $$('[data-go]').forEach(btn => {
      btn.addEventListener('click', () => navTo(btn.dataset.go));
    });
    const hash = (location.hash || '').replace('#', '');
    const page = hash || 'map';
    setActivePage(page);
  }

  // ---------- Progress bar ----------
  const progressBar = $('#progressBar');
  function updateProgress() {
    const active = $('.page.is-active');
    if (!active || !progressBar) return;

    const scrollTop = window.scrollY;
    const top = active.offsetTop;
    const height = active.scrollHeight;
    const win = window.innerHeight;
    const p = Math.min(1, Math.max(0, (scrollTop - top) / Math.max(1, (height - win))));
    progressBar.style.width = `${Math.round(p * 100)}%`;
  }
  window.addEventListener('scroll', updateProgress, { passive:true });
  window.addEventListener('resize', updateProgress);

  // ---------- Done toggles ----------
  function loadDone() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE.done) || '{}');
    } catch {
      return {};
    }
  }
  function saveDone(obj) {
    localStorage.setItem(STORAGE.done, JSON.stringify(obj));
  }
  function initDone() {
    const done = loadDone();
    $$('[data-done]').forEach((inp) => {
      const key = inp.dataset.done;
      inp.checked = !!done[key];
      inp.addEventListener('change', () => {
        const d = loadDone();
        d[key] = inp.checked;
        saveDone(d);
        toast(inp.checked ? 'Marked done ✅' : 'Unmarked');
      });
    });
  }

  // ---------- Global click actions (Copy / Add) ----------
  function initGlobalActions() {
    document.addEventListener('click', (e) => {
      const t = e.target;
      if (!(t instanceof HTMLElement)) return;

      const copyFrom = t.getAttribute('data-copy-from');
      if (copyFrom) {
        const text = getTextFromEl(copyFrom);
        if (text.trim()) copyText(text);
        else toast('Nothing to copy');
        return;
      }

      const addFrom = t.getAttribute('data-add-from');
      if (addFrom) {
        const text = getTextFromEl(addFrom);
        addToSession(text);
        return;
      }

      const close = t.getAttribute('data-close');
      if (close === 'modal') {
        closeModal();
        return;
      }
    });

    $('#btnDownloadPrompts')?.addEventListener('click', () => {
      const list = loadSession();
      const body = list.map((x, i) => `#${i+1} — ${new Date(x.at).toLocaleString()}\n${x.text}\n`).join('\n' + '-'.repeat(60) + '\n\n');
      const head = `AI Mastery Lab — Session Prompts\nCreated by Azhar Said\nExported: ${new Date().toLocaleString()}\n\n`;
      downloadText(`AI_Mastery_Lab_Prompts_${safeNow()}.txt`, head + (body || '(empty)\n'));
      toast('Download started');
    });

    $('#btnTheme')?.addEventListener('click', () => {
      const current = document.documentElement.dataset.theme || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem(STORAGE.theme, next);
      applyTheme(next);
    });

    $('#btnReduceMotion')?.addEventListener('click', () => {
      const current = localStorage.getItem(STORAGE.reduceMotion) === '1';
      const next = !current;
      localStorage.setItem(STORAGE.reduceMotion, next ? '1' : '0');
      applyReduceMotion(next);
      toast(next ? 'Reduced motion ON' : 'Reduced motion OFF');
    });
  }

  // ---------- Modal ----------
  const modal = $('#modal');
  const modalBody = $('#modalBody');
  function openModal(html) {
    if (!modal || !modalBody) return;
    modalBody.innerHTML = html;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
  }
  function closeModal() {
    if (!modal || !modalBody) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    modalBody.innerHTML = '';
  }
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('is-open')) closeModal();
  });

  function escapeHtml(s) {
    return (s || '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  }

  // ---------- Prompt improver ----------
  function improvePrompt(text, options={}) {
    const t = (text || '').trim();
    if (!t) return '';
    const kind = options.kind || 'general';

    const hasRole = /\b(you are|act as|role:|as an?)\b/i.test(t);
    const hasFormat = /\b(format|output|return|provide|table|json|bullets|steps)\b/i.test(t);
    const hasConstraints = /\b(avoid|do not|don't|must|should|constraints|limit|tone|length)\b/i.test(t);
    const hasAcceptance = /\b(acceptance|success|check|criteria|verify|ensure)\b/i.test(t);

    const assumptions = [];
    if (!hasFormat) assumptions.push('Assumption: A clear, structured output is desired.');
    if (kind === 'video') assumptions.push('Assumption: Keep identity stable and motion smooth (no flicker/warping).');
    if (kind === 'image') assumptions.push('Assumption: Preserve facial identity and composition.');
    const aBlock = assumptions.length ? `\n\n${assumptions.join('\n')}` : '';

    const wrapper = [
      hasRole ? '' : 'You are an expert assistant. Use precise, practical language.',
      '',
      'Objective:',
      '- ' + (options.objective || 'Deliver the best possible result for the request below, with no unnecessary filler.'),
      '',
      'Task:',
      '- ' + t,
      '',
      'Constraints (follow strictly):',
      '- Preserve the user\'s intent. Do not ask questions; make reasonable assumptions and state them.',
      '- If any detail is ambiguous, pick a sensible default and note it briefly.',
      hasConstraints ? '- Respect all constraints already mentioned in the request.' : '- Keep it concise but complete.',
      '',
      'Output format:',
      '- Use a clean structure with headings and bullet points when useful.',
      '',
      'Acceptance criteria:',
      '- The output is actionable and specific (no vague advice).',
      '- The output includes any needed parameters, settings, or copy-paste-ready text.',
    ].filter(Boolean).join('\n') + aBlock;

    return wrapper.trim();
  }

  // ---------- Module 1: Bad vs World‑class ----------
  const examples = {
    meeting: {
      bad: 'summarize this meeting',
      good:
`You are a senior project manager.\n\nObjective: Turn the meeting notes below into a decision-ready summary.\n\nTask:\n1) Summarize the goal and key discussion points (max 6 bullets).\n2) List decisions made (bullet list).\n3) List action items as a table: Owner | Action | Due date | Dependencies.\n4) Highlight open questions / risks.\n\nConstraints:\n- Keep it under 250 words (excluding the action-item table).\n- If a due date is missing, write “TBD”.\n\nMeeting notes:\n[PASTE NOTES HERE]`,
      badResult: 'A short generic summary with missing decisions, unclear owners, and no deadlines.',
      goodResult: 'A crisp bullet summary + a clean action-items table + explicit open questions.'
    },
    email: {
      bad: 'write an email to my team about training',
      good:
`You are a professional corporate communicator.\n\nGoal: Write a clear, friendly email announcing a mandatory refresher training.\n\nInclude:\n- What training is required and why\n- Who must complete it\n- Where to access it\n- Due date\n- A short call-to-action\n\nTone: polite, direct, supportive.\nLength: 120–160 words.\n\nContext:\nTraining: [NAME]\nAudience: [TEAM]\nDue date: [DATE]\nPlatform: [PLATFORM]`,
      badResult: 'A vague email with missing due date, no instructions, and uncertain tone.',
      goodResult: 'A polished email with all required details, clear CTA, and correct length.'
    },
    analysis: {
      bad: 'analyze this dashboard',
      good:
`You are a data analyst supporting a product manager.\n\nObjective: Extract insights and actions from the dashboard.\n\nTask:\n1) Identify the top 3 trends (with numbers).\n2) Explain likely causes (hypotheses).\n3) Recommend 3 actions with expected impact.\n4) List 5 questions we should ask to validate.\n\nConstraints:\n- Use only what is in the dashboard. If something is missing, flag it.\n- Keep it to 1 page.\n\nOutput format:\n- Headings + bullets\n- Add a small table for key metrics\n\nDashboard details:\n[PASTE KPIs / SCREENSHOT NOTES HERE]`,
      badResult: 'A generic “looks good / looks bad” response with no numbers or actions.',
      goodResult: 'A structured insight report with quantified trends, hypotheses, and specific next steps.'
    }
  };

  function initBadVsGood() {
    const sel = $('#exSelect');
    const bad = $('#badPrompt');
    const good = $('#goodPrompt');
    const sim = $('#simResult');
    if (!sel || !bad || !good || !sim) return;

    function applyExample(key) {
      const ex = examples[key] || examples.meeting;
      bad.value = ex.bad;
      good.value = ex.good;
      sim.dataset.bad = ex.badResult;
      sim.dataset.good = ex.goodResult;
      sim.textContent = ex.badResult;
    }
    applyExample(sel.value);

    sel.addEventListener('change', () => applyExample(sel.value));

    function setResult(which) {
      const txt = which === 'good' ? (sim.dataset.good || '') : (sim.dataset.bad || '');
      sim.textContent = txt || '—';
    }

    $$('.seg__btn[data-result]').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.seg__btn[data-result]').forEach(b => b.classList.toggle('is-active', b === btn));
        setResult(btn.dataset.result);
      });
    });
  }

  // ---------- Module 1: R.O.T.T wizard ----------
  function initROTT() {
    const title = $('#rottTitle');
    const hint = $('#rottHint');
    const input = $('#rottInput');
    const out = $('#rottOut');
    const next = $('#rottNext');
    const back = $('#rottBack');
    if (!title || !hint || !input || !out || !next || !back) return;

    const steps = [
      { key:'role',  label:'R = Role', hint:'Who should the AI be? (expertise + perspective)', placeholder:'e.g., product manager, brand strategist, data analyst' },
      { key:'objective', label:'O = Objective', hint:'What outcome do you want?', placeholder:'e.g., create a crisp summary + action plan' },
      { key:'task', label:'T = Task', hint:'What should it do, step-by-step?', placeholder:'e.g., 1) Extract key points 2) List actions 3) Provide risks' },
      { key:'tests', label:'T = Tone / Tests', hint:'Tone, constraints, and acceptance criteria', placeholder:'e.g., professional, max 150 words, include table, no hallucinations' },
    ];
    const state = { role:'', objective:'', task:'', tests:'' };
    let idx = 0;

    function updateOut() {
      const role = state.role?.trim() || 'an expert assistant';
      const objective = state.objective?.trim() || '[objective]';
      const task = state.task?.trim() || '[task steps]';
      const tests = state.tests?.trim() || '[constraints + acceptance criteria]';

      out.value =
`You are ${role}.\n\nObjective:\n- ${objective}\n\nTask (step-by-step):\n- ${task}\n\nConstraints + Acceptance criteria:\n- ${tests}\n\nOutput format:\n- Use clear headings and bullet points.\n- If something is missing, state assumptions briefly.`;
    }

    function render() {
      const s = steps[idx];
      title.textContent = s.label;
      hint.textContent = s.hint;
      input.placeholder = s.placeholder;
      input.value = state[s.key] || '';
      back.disabled = idx === 0;
      next.textContent = idx === steps.length - 1 ? 'Finish' : 'Next';
      $$('.wizdot').forEach((d, i) => d.classList.toggle('is-active', i === idx));
      updateOut();
    }

    function commit() {
      const key = steps[idx].key;
      state[key] = input.value;
      updateOut();
    }

    input.addEventListener('input', commit);

    next.addEventListener('click', () => {
      commit();
      if (idx < steps.length - 1) {
        idx++;
        render();
      } else {
        toast('ROTT prompt ready ✅');
      }
    });

    back.addEventListener('click', () => {
      commit();
      idx = Math.max(0, idx - 1);
      render();
    });

    render();
  }

  // ---------- Module 1: CLEAR generator ----------
  function initCLEAR() {
    const btn = $('#btnGenCLEAR');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const c = getTextFromEl('clearContext').trim();
      const l = getTextFromEl('clearLimits').trim();
      const e = getTextFromEl('clearExamples').trim();
      const a = getTextFromEl('clearAudience').trim();
      const f = getTextFromEl('clearFormat').trim();

      const out =
`Context:\n${c || '[context]'}\n\nLimits / constraints:\n${l || '- [limits]'}\n\nExamples / references:\n${e || '- [examples]'}\n\nAudience:\n${a || '[audience]'}\n\nResponse format:\n${f || '[format]'}\n\nNow produce the best possible output. Do not ask questions; make reasonable assumptions and state them.`;

      setTextToEl('clearOut', out);
      toast('Generated ✅');
    });
  }

  // ---------- Quality meter ----------
  function scorePrompt(prompt) {
    const t = (prompt || '').trim();
    if (!t) return { score: 0, notes: ['Paste a prompt first.'] };

    const checks = [
      { re:/\b(you are|act as|as an?|role:)\b/i, pts: 15, tip:'Add a clear role (expertise + perspective).' },
      { re:/\b(objective|goal|aim|purpose)\b/i, pts: 15, tip:'State the objective explicitly.' },
      { re:/\b(steps?|task|do the following|1\)|2\)|- )\b/i, pts: 15, tip:'Add steps / what to do.' },
      { re:/\b(must|should|avoid|do not|don\'t|constraints|limit|tone|length)\b/i, pts: 15, tip:'Add constraints (length, tone, what to avoid).' },
      { re:/\b(format|output|return|table|json|bullets|headings)\b/i, pts: 15, tip:'Specify an output format.' },
      { re:/\b(acceptance|success|criteria|check|verify|ensure)\b/i, pts: 15, tip:'Add acceptance criteria (what “good” means).' },
      { re:/\b(context|background|given|here\s+is|details)\b/i, pts: 10, tip:'Provide context / inputs.' },
    ];

    let score = 10;
    const notes = [];
    for (const c of checks) {
      if (c.re.test(t)) score += c.pts;
      else notes.push(`• ${c.tip}`);
    }
    score = Math.max(0, Math.min(100, score));
    if (notes.length === 0) notes.push('• Strong prompt. Minor polish: keep it concise and measurable.');

    return { score, notes };
  }

  function initQualityMeter() {
    const inEl = $('#qmIn');
    const scoreEl = $('#qmScore');
    const fillEl = $('#qmFill');
    const fbEl = $('#qmFeedback');
    const outEl = $('#qmOut');
    const scoreBtn = $('#qmScoreBtn');
    const improveBtn = $('#qmImproveBtn');
    const pasteBtn = $('#qmPaste');
    const clearBtn = $('#qmClear');
    if (!inEl || !scoreEl || !fillEl || !fbEl || !outEl || !scoreBtn || !improveBtn) return;

    function applyScore() {
      const {score, notes} = scorePrompt(inEl.value);
      scoreEl.textContent = String(score);
      fillEl.style.width = `${score}%`;
      fbEl.textContent = notes.join('\n');
      return score;
    }

    scoreBtn.addEventListener('click', () => {
      applyScore();
      toast('Scored ✅');
    });

    improveBtn.addEventListener('click', () => {
      const t = inEl.value.trim();
      if (!t) { toast('Paste a prompt first'); return; }
      outEl.value = improvePrompt(t, { kind:'general' });
      applyScore();
      toast('Improved ✅');
    });

    pasteBtn?.addEventListener('click', () => {
      inEl.value = examples.meeting.good.replace('[PASTE NOTES HERE]', '• Budget approved\n• Timeline shifted by 2 weeks\n• Action: update deck');
      applyScore();
    });
    clearBtn?.addEventListener('click', () => {
      inEl.value = '';
      outEl.value = '';
      scoreEl.textContent = '0';
      fillEl.style.width = '0%';
      fbEl.textContent = '';
    });
  }

  // ---------- Module 2: Style transfer demo ----------
  let currentImage = null; // { src, name, img, prompt }
  function initStyleDemo() {
    const dz = $('#dropzone');
    const fi = $('#fileInput');
    const btnVault = $('#btnOpenVault');
    const before = $('#cBefore');
    const after = $('#cAfter');
    const slider = $('#beforeAfter');
    const out = $('#imgPromptOut');
    const improve = $('#btnImproveImgPrompt');

    if (!dz || !fi || !before || !after || !slider || !out || !improve) return;

    btnVault?.addEventListener('click', (e) => {
      e.stopPropagation();
      openVaultPicker();
    });

    dz.addEventListener('click', () => fi.click());
    dz.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fi.click(); }
    });

    dz.addEventListener('dragover', (e) => { e.preventDefault(); dz.style.borderColor = 'rgba(53,255,180,.35)'; });
    dz.addEventListener('dragleave', () => { dz.style.borderColor = ''; });
    dz.addEventListener('drop', (e) => {
      e.preventDefault();
      dz.style.borderColor = '';
      const file = e.dataTransfer?.files?.[0];
      if (file) handleFile(file);
    });
    fi.addEventListener('change', () => {
      const file = fi.files?.[0];
      if (file) handleFile(file);
    });

    $$('.seg__btn[data-style]').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.seg__btn[data-style]').forEach(b => b.classList.toggle('is-active', b === btn));
        redraw();
      });
    });

    slider.addEventListener('input', () => {
      const v = Number(slider.value) || 0;
      after.style.clipPath = `inset(0 ${100 - v}% 0 0)`;
    });

    improve.addEventListener('click', () => {
      const t = out.value.trim();
      if (!t) { toast('Select an image first'); return; }
      out.value = improvePrompt(t, { kind:'image', objective:'Create a high-quality image prompt suitable for style transfer / recreation.' });
      toast('Improved ✅');
    });

    after.style.clipPath = `inset(0 ${100 - Number(slider.value)}% 0 0)`;

    const ctxB = before.getContext('2d');
    const ctxA = after.getContext('2d');

    function drawFit(ctx, img, w, h) {
      ctx.clearRect(0,0,w,h);
      const ir = img.width / img.height;
      const cr = w / h;
      let dw, dh;
      if (ir > cr) { dw = w; dh = w / ir; }
      else { dh = h; dw = h * ir; }
      const dx = (w - dw) / 2;
      const dy = (h - dh) / 2;
      ctx.drawImage(img, dx, dy, dw, dh);
    }

    function getStyle() {
      const active = $('.seg__btn.is-active[data-style]')?.dataset.style || 'cinematic';
      if (active === 'toon') return 'contrast(1.2) saturate(1.4) brightness(1.05) hue-rotate(12deg)';
      if (active === 'soft') return 'contrast(1.05) saturate(1.1) brightness(1.05) blur(0.2px)';
      return 'contrast(1.15) saturate(1.15) brightness(1.02)';
    }

    function redraw() {
      if (!currentImage?.img) {
        ctxB.clearRect(0,0,before.width,before.height);
        ctxA.clearRect(0,0,after.width,after.height);
        ctxB.fillStyle = 'rgba(255,255,255,.08)';
        ctxB.fillRect(0,0,before.width,before.height);
        ctxB.fillStyle = 'rgba(234,243,255,.65)';
        ctxB.font = '700 22px ui-sans-serif, system-ui';
        ctxB.fillText('Select an image (upload or Vault).', 28, 56);
        ctxB.font = '14px ui-sans-serif, system-ui';
        ctxB.fillText('This is a visual simulation — the real power is in the prompt.', 28, 84);
        ctxA.drawImage(before, 0,0);
        return;
      }

      ctxB.filter = 'none';
      drawFit(ctxB, currentImage.img, before.width, before.height);

      ctxA.filter = getStyle();
      drawFit(ctxA, currentImage.img, after.width, after.height);
      ctxA.filter = 'none';
    }

    function handleFile(file) {
      if (!file.type.startsWith('image/')) { toast('Please choose an image'); return; }
      const url = URL.createObjectURL(file);
      loadImage(url, file.name, {
        prompt:
`Create a high-quality, photorealistic or cinematic variation of the attached image.\n\nConstraints:\n- Preserve facial identity, pose, framing, and key background elements.\n- Improve lighting and clarity; keep skin texture natural (no plastic look).\n- Avoid warping, extra limbs, text artifacts, and heavy filters.\n\nOutput:\n- Return ONE final prompt (English).`
      });
    }

    function loadImage(src, name, meta={}) {
      const img = new Image();
      img.onload = () => {
        currentImage = { src, name, img, prompt: meta.prompt || '' };
        localStorage.setItem(STORAGE.lastImage, name);
        out.value = currentImage.prompt || '';
        redraw();
        toast('Image loaded ✅');
      };
      img.onerror = () => toast('Could not load image');
      img.src = src;
    }

    function openVaultPicker() {
      const items = [];
      for (let i=1; i<=28; i++) {
        const file = `${i}.png`;
        const src = mediaPath(file);
        items.push({ file, src });
      }

      const cards = items.map(it => `
        <button class="mediaItem" data-vpick="${it.file}" style="min-height:140px">
          <img src="${it.src}" alt="Vault ${it.file}" loading="lazy" />
          <div class="mediaBadge">${it.file}</div>
        </button>
      `).join('');

      openModal(`
        <h3 style="margin:0 0 10px">Choose an image from the Vault</h3>
        <div class="mediagrid" id="vaultPickerGrid">${cards}</div>
        <div class="muted tiny" style="margin-top:10px">If an item doesn\'t exist, it will disappear automatically.</div>
      `);

      const grid = $('#vaultPickerGrid');
      if (!grid) return;

      $$('img', grid).forEach(img => {
        img.addEventListener('error', () => img.closest('.mediaItem')?.remove());
      });

      $$('[data-vpick]', grid).forEach(btn => {
        btn.addEventListener('click', () => {
          const file = btn.getAttribute('data-vpick');
          if (!file) return;
          const prompt = VAULT_PROMPTS[file] || '';
          loadImage(mediaPath(file), file, { prompt });
          closeModal();
        });
      });
    }

    redraw();

    const last = localStorage.getItem(STORAGE.lastImage);
    if (last && VAULT_PROMPTS[last]) {
      loadImage(mediaPath(last), last, { prompt: VAULT_PROMPTS[last] });
    }
  }

  // ---------- Module 2: Video prompt builder ----------
  function initVideoPrompt() {
    const btn = $('#btnGenVideoPrompt');
    const out = $('#vidOut');
    const improve = $('#btnImproveVidPrompt');
    const play = $('#btnPlayPreview');
    const exportBtn = $('#btnExportShotlist');
    const preview = $('#vidPreview');

    if (!btn || !out || !improve || !play || !exportBtn || !preview) return;

    function generate() {
      const mode = $('#vidMode')?.value || 'kenburns';
      const dur = Number($('#vidDuration')?.value || 6);
      const ar = $('#vidAR')?.value || '9:16';
      const mood = ($('#vidMood')?.value || '').trim();
      const neg = ($('#vidNeg')?.value || '').trim();

      const base = currentImage?.name
        ? `Use the provided image (${currentImage.name}) as the starting frame.`
        : 'Use the provided image as the starting frame.';

      const motion = mode === 'dynamic'
        ? 'Add dynamic but stable camera motion (small dolly + slight handheld micro-movement).'
        : mode === 'subtle'
          ? 'Add subtle cinematic motion (slow push-in, gentle parallax, natural micro-movements).'
          : 'Use a Ken Burns style move (slow zoom + pan) with clean stabilization.';

      const prompt =
`IMAGE→VIDEO PROMPT\n\n${base}\n\nDuration: ${dur} seconds. Aspect ratio: ${ar}.\n\nMotion:\n- ${motion}\n\nStyle / mood:\n- ${mood || 'Cinematic lighting, crisp detail, natural skin tones.'}\n\nQuality constraints (avoid):\n- ${neg || 'No flicker, no face warping, no jitter, no text artifacts, no extra limbs.'}\n\nRules:\n- Keep the subject identity consistent across frames.\n- Keep background coherent; avoid sudden scene cuts.\n- Output should look smooth and realistic.`;

      out.value = prompt;
      toast('Generated ✅');
    }

    btn.addEventListener('click', generate);

    improve.addEventListener('click', () => {
      const t = out.value.trim();
      if (!t) { toast('Generate first'); return; }
      out.value = improvePrompt(t, { kind:'video', objective:'Produce a strong image-to-video prompt with clear motion, constraints, and output expectations.' });
      toast('Improved ✅');
    });

    play.addEventListener('click', () => {
      const dur = Number($('#vidDuration')?.value || 6);
      const ar = $('#vidAR')?.value || '9:16';
      preview.textContent =
`Preview (conceptual):\n- 0–1s: establish frame\n- 1–${Math.max(2, Math.floor(dur*0.6))}s: main move (push/pan)\n- ${Math.max(2, Math.floor(dur*0.6))}–${dur}s: settle + micro-motion\n\nAspect ratio: ${ar}\nTip: keep motion subtle to avoid artifacts.`;
      toast('Preview updated');
    });

    exportBtn.addEventListener('click', () => {
      const t = out.value.trim();
      const shot =
`AI Mastery Lab — Shotlist\nCreated by Azhar Said\n\n${t || '(generate a prompt first)'}\n`;
      downloadText(`AI_Mastery_Lab_Shotlist_${safeNow()}.txt`, shot);
      toast('Shotlist exported');
    });
  }

  // ---------- Module 3: Diagram + website prompt generator ----------
  function initDiagram() {
    const text = $('#diagText');
    if (!text) return;

    const content = {
      html:
`index.html\n\n• Page structure, sections, and accessibility hooks.\n• Navigation links to sections.\n• IDs and data-attributes that JS uses to attach behaviors.`,
      css:
`style.css\n\n• Theme, layout, spacing, typography.\n• Animations / transitions (respect reduce-motion).\n• Responsive grid rules.`,
      js:
`script.js\n\n• All click handlers and interactive logic.\n• LocalStorage state (done, prompts, scores).\n• Media vault building + modal previews.`,
    };

    function set(which) {
      $$('[data-diag]').forEach(b => b.classList.toggle('is-active', b.dataset.diag === which));
      $$('[data-diagcard]').forEach(c => c.classList.toggle('is-active', c.dataset.diagcard === which));
      text.textContent = content[which] || content.html;
    }

    $$('[data-diag]').forEach(btn => btn.addEventListener('click', () => set(btn.dataset.diag)));
    $$('[data-diagcard]').forEach(card => card.addEventListener('click', () => set(card.dataset.diagcard)));

    set('html');
  }

  function initWebsitePrompt() {
    const btn = $('#btnGenWebPrompt');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const goal = getTextFromEl('webGoal').trim() || '[goal]';
      const sections = getTextFromEl('webSections').trim() || '- [sections]';
      const ac = getTextFromEl('webAC').trim() || '- Buttons must work\n- Offline-ready';

      const out =
`You are a senior front-end engineer and UX designer.\n\nGoal:\n- ${goal}\n\nDeliverables:\n- Provide exactly 3 files: index.html, style.css, script.js\n- No external libraries, no build tools\n\nMust-have sections:\n${sections}\n\nAcceptance criteria (strict):\n${ac}\n\nUX rules:\n- Futuristic neon green/blue theme with glass panels\n- Clear navigation between sections\n- Every button must be clickable and do something meaningful\n\nOutput:\n- Return the full code for each file in separate code blocks.`;

      setTextToEl('webOut', out);
      toast('Generated ✅');
    });
  }

  // ---------- Module 4: Media Vault grid ----------
  function initVault() {
    const grid = $('#vaultGrid');
    const promptList = $('#vaultPrompts');
    if (!grid || !promptList) return;

    const tabs = $$('[data-vaulttab]');
    let active = 'photos';

    function buildPhotos() {
      grid.innerHTML = '';
      for (let i=1; i<=28; i++) {
        const file = `${i}.png`;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'mediaItem';
        btn.setAttribute('data-file', file);
        btn.innerHTML = `
          <img src="${mediaPath(file)}" alt="Photo ${file}" loading="lazy" />
          <div class="mediaBadge">${file}</div>
        `;
        const img = btn.querySelector('img');
        img.addEventListener('error', () => btn.remove());
        btn.addEventListener('click', () => {
          const prompt = VAULT_PROMPTS[file] || '';
          openModal(`
            <figure>
              <img src="${mediaPath(file)}" alt="Photo ${file}" />
            </figure>
            <div class="row row--spread" style="margin-top:10px">
              <b>Prompt for ${file}</b>
              <div class="row">
                <button class="iconbtn" id="mCopyPrompt">Copy prompt</button>
                <button class="iconbtn" id="mImprovePrompt">✨ Improve</button>
                <button class="iconbtn" id="mAddPrompt">+ Add</button>
              </div>
            </div>
            <pre id="mPrompt">${escapeHtml(prompt || '(no prompt found)')}</pre>
          `);

          $('#mCopyPrompt')?.addEventListener('click', () => copyText(prompt || ''));
          $('#mAddPrompt')?.addEventListener('click', () => addToSession(prompt || ''));
          $('#mImprovePrompt')?.addEventListener('click', () => {
            const improved = improvePrompt(prompt || '', { kind:'image' });
            const pre = $('#mPrompt');
            if (pre) pre.textContent = improved || '';
          });
        });
        grid.appendChild(btn);
      }
    }

    function buildVideos() {
      grid.innerHTML = '';
      for (let i=1; i<=10; i++) {
        const file = `${i}.mp4`;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'mediaItem';
        btn.setAttribute('data-file', file);
        btn.innerHTML = `
          <video src="${mediaPath(file)}" muted playsinline preload="metadata"></video>
          <div class="mediaBadge">${file}</div>
        `;
        const vid = btn.querySelector('video');
        vid.addEventListener('loadeddata', () => {
          try { vid.currentTime = 0.1; } catch {}
        });
        vid.addEventListener('error', () => btn.remove());
        btn.addEventListener('click', () => {
          openModal(`
            <h3 style="margin:0 0 10px">Video ${file}</h3>
            <video src="${mediaPath(file)}" controls playsinline style="width:100%"></video>
          `);
        });
        grid.appendChild(btn);
      }
    }

    function buildPrompts() {
      promptList.innerHTML = '';
      const keys = Object.keys(VAULT_PROMPTS).sort((a,b) => Number(a) - Number(b));
      for (const k of keys) {
        const card = document.createElement('div');
        card.className = 'promptCard';
        const prompt = VAULT_PROMPTS[k] || '';
        card.innerHTML = `
          <div class="row row--spread">
            <b>${k}</b>
            <div class="row">
              <button class="iconbtn" data-pcopy="${k}">Copy</button>
              <button class="iconbtn" data-padd="${k}">+ Add</button>
            </div>
          </div>
          <pre>${escapeHtml(prompt)}</pre>
        `;
        promptList.appendChild(card);
      }
      $$('[data-pcopy]', promptList).forEach(btn => {
        btn.addEventListener('click', () => {
          const k = btn.getAttribute('data-pcopy');
          const p = (k && VAULT_PROMPTS[k]) ? VAULT_PROMPTS[k] : '';
          copyText(p);
        });
      });
      $$('[data-padd]', promptList).forEach(btn => {
        btn.addEventListener('click', () => {
          const k = btn.getAttribute('data-padd');
          const p = (k && VAULT_PROMPTS[k]) ? VAULT_PROMPTS[k] : '';
          addToSession(p);
        });
      });
    }

    function setTab(which) {
      active = which;
      tabs.forEach(b => b.classList.toggle('is-active', b.dataset.vaulttab === which));
      grid.hidden = which === 'prompts';
      promptList.hidden = which !== 'prompts';

      if (which === 'photos') buildPhotos();
      if (which === 'videos') buildVideos();
      if (which === 'prompts') buildPrompts();
    }

    tabs.forEach(b => b.addEventListener('click', () => setTab(b.dataset.vaulttab)));
    setTab(active);
  }

  // ---------- Module 4: Mission + scoreboard ----------
  const missions = [
    {
      title: 'Summarize meeting notes',
      desc: 'Turn raw notes into decisions, actions, owners, and deadlines.',
      seed:
`You are a senior project manager.\n\nObjective:\n- Summarize the meeting notes into a decision-ready brief.\n\nTask:\n1) 6-bullet summary of key points\n2) Decisions made\n3) Action items table: Owner | Action | Due date | Dependencies\n4) Open questions / risks\n\nConstraints:\n- Max 250 words (excluding the table).\n- If a due date is missing, write “TBD”.\n\nMeeting notes:\n[PASTE NOTES HERE]`
    },
    {
      title: 'Write a training email',
      desc: 'Announce a mandatory training with platform access and due date.',
      seed:
`You are a corporate communicator.\n\nGoal: Write a friendly but direct email announcing mandatory refresher training.\n\nInclude:\n- Training name + why it matters\n- Who must complete it\n- Where to access it\n- Due date\n- Call-to-action\n\nConstraints:\n- 120–160 words\n- Professional, supportive tone\n\nInputs:\nTraining: [NAME]\nTeam: [AUDIENCE]\nPlatform: [PLATFORM]\nDue date: [DATE]`
    },
    {
      title: 'Improve an image prompt',
      desc: 'Make a prompt preserve identity and reduce artifacts.',
      seed:
`You are an expert image prompt engineer.\n\nTask:\n- Rewrite the prompt below to be more specific and more robust.\n\nConstraints (strict):\n- Preserve identity, pose, composition, and lighting cues.\n- Avoid: face warping, extra limbs, text artifacts, plastic skin.\n- Output a single final prompt in English.\n\nOriginal prompt:\n[PASTE PROMPT HERE]`
    },
  ];

  function loadScores() {
    try { return JSON.parse(localStorage.getItem(STORAGE.scores) || '[]'); } catch { return []; }
  }
  function saveScores(list) {
    localStorage.setItem(STORAGE.scores, JSON.stringify(list));
  }
  function renderScores() {
    const box = $('#scoreboard');
    if (!box) return;
    const list = loadScores();
    if (list.length === 0) {
      box.innerHTML = '<div class="muted tiny">No scores yet. Score a prompt to start.</div>';
      return;
    }
    const top = list.slice().sort((a,b) => b.score - a.score).slice(0, 20);
    box.innerHTML = top.map(x => `
      <div class="scoreRow">
        <div>
          <b>${escapeHtml(x.team || 'Unknown team')}</b><br />
          <span>${escapeHtml(x.mission)} • ${new Date(x.at).toLocaleString()}</span>
        </div>
        <div style="font-weight:900">${x.score}</div>
      </div>
    `).join('');
  }

  function initMission() {
    const title = $('#missionTitle');
    const desc = $('#missionDesc');
    const inEl = $('#missionIn');
    const scoreEl = $('#missionScore');
    const fillEl = $('#missionFill');
    const fb = $('#missionFeedback');
    const teamEl = $('#teamName');
    if (!title || !desc || !inEl || !scoreEl || !fillEl || !fb || !teamEl) return;

    let current = 0;

    function applyMission(i) {
      current = i;
      const m = missions[current];
      title.textContent = m.title;
      desc.textContent = m.desc;
      fb.textContent = '';
      scoreEl.textContent = '0';
      fillEl.style.width = '0%';
    }

    function seed() {
      const m = missions[current];
      inEl.value = m.seed;
      toast('Seeded ✅');
    }

    $('#btnNewMission')?.addEventListener('click', () => {
      const i = Math.floor(Math.random() * missions.length);
      applyMission(i);
    });
    $('#btnSeedMission')?.addEventListener('click', seed);

    $('#btnScoreMission')?.addEventListener('click', () => {
      const {score, notes} = scorePrompt(inEl.value);
      scoreEl.textContent = String(score);
      fillEl.style.width = `${score}%`;
      fb.textContent = notes.join('\n');

      const team = (teamEl.value || '').trim() || 'Team';
      const entry = {
        team,
        score,
        mission: missions[current].title,
        at: Date.now()
      };
      const list = loadScores();
      list.unshift(entry);
      saveScores(list.slice(0, 200));
      renderScores();
      toast('Saved ✅');
    });

    $('#btnResetScores')?.addEventListener('click', () => {
      localStorage.removeItem(STORAGE.scores);
      renderScores();
      toast('Reset ✅');
    });

    applyMission(0);
    renderScores();
  }

  // ---------- Magic prompt ----------
  function initMagic() {
    const out = $('#magicPrompt');
    const btn = $('#btnGenMagicPrompt');
    if (!out || !btn) return;

    btn.addEventListener('click', () => {
      out.value =
`You are a senior front-end engineer and workshop facilitator.\n\nGoal: Build a single-page offline workshop website called “AI Mastery Lab”.\n\nDeliverables (strict):\n- Provide exactly 3 files: index.html, style.css, script.js\n- No external libraries, no build tools\n- Must work from local file system (file://)\n\nSections to include:\n1) Prompt Mastery: bad vs world-class prompts + an interactive prompt builder\n2) Photos & Video Prompts: media vault grid + image prompt + video prompt\n3) Website Building: explain HTML/CSS/JS + generator prompt\n4) Scoreboard game: score prompts 0–100 and store scores in localStorage\n\nTheme:\n- Futuristic green/blue neon, glass panels, clean typography\n\nAcceptance criteria:\n- All buttons are clickable and do something meaningful\n- Copy buttons work\n- Media vault images/videos show in a grid and open a modal preview when clicked\n- Clear, stable IDs; no missing DOM selectors\n\nOutput:\n- Return the full code for index.html, style.css, script.js in three separate code blocks.`;
      toast('Generated ✅');
    });
  }

  // ---------- Boot ----------
  function boot() {
    initTheme();
    initReduceMotion();
    initNav();
    initDone();
    initGlobalActions();

    initBadVsGood();
    initROTT();
    initCLEAR();
    initQualityMeter();

    initStyleDemo();
    initVideoPrompt();

    initDiagram();
    initWebsitePrompt();

    initVault();
    initMission();
    initMagic();

    updateProgress();
  }

  document.addEventListener('DOMContentLoaded', boot);
})();
