document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-form');
  const submitBtn = document.querySelector('.submit-btn');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      // מקבלים את התאריך של היום
      const today = new Date().toDateString();
      
      // בודקים מה יש בזיכרון המקומי
      let formUsage = JSON.parse(localStorage.getItem('dvirClinicForm')) || {};
      
      // אם התאריך ששמור שונה מהיום, מאפסים את הספירה
      if (formUsage.date !== today) {
        formUsage = { date: today, count: 0 };
      }
      
      // אם המשתמש כבר שלח 2 פעמים או יותר היום
      if (formUsage.count >= 2) {
        e.preventDefault(); // עוצר את שליחת הטופס
        alert("שלחת כבר את המספר המקסימלי של פניות להיום. נשמח לשמוע ממך מחר!");
        
        // משבית את הכפתור כדי לתת חיווי ויזואלי למשתמש
        submitBtn.disabled = true;
        submitBtn.style.backgroundColor = "#ccc";
        submitBtn.style.cursor = "not-allowed";
        return;
      }
      
      // אם הכל תקין, מעלים את הספירה ב-1 ושומרים בזיכרון (הטופס יישלח כרגיל ל-Netlify)
      formUsage.count += 1;
      localStorage.setItem('dvirClinicForm', JSON.stringify(formUsage));
    });
  }
});


document.addEventListener('DOMContentLoaded', () => {
  
  // 1. הגבלת טופס יצירת קשר ל-2 פניות ביום למשתמש
  const form = document.querySelector('.contact-form');
  const submitBtn = document.querySelector('.submit-btn');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      const today = new Date().toDateString();
      let formUsage = JSON.parse(localStorage.getItem('dvirClinicForm')) || {};
      
      if (formUsage.date !== today) {
        formUsage = { date: today, count: 0 };
      }
      
      if (formUsage.count >= 2) {
        e.preventDefault();
        alert("שלחת כבר את המספר המקסימלי של פניות להיום. נשמח לשמוע ממך מחר!");
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.style.backgroundColor = "#ccc";
            submitBtn.style.cursor = "not-allowed";
        }
        return;
      }
      
      formUsage.count += 1;
      localStorage.setItem('dvirClinicForm', JSON.stringify(formUsage));
    });
  }

  // 2. פתיחה וסגירה של שאלות ותשובות (אקורדיון)
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.parentElement.classList.toggle('active');
    });
  });

  // 3. אנימציות בגלילה (הופעת אלמנטים כשהם נכנסים למסך)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { 
      if (entry.isIntersecting) {
        entry.target.classList.add('visible'); 
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

});