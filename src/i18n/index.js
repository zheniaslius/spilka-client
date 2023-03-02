import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'hello': 'Hi',
      'thisIs': 'This is audio chat',
      'searching': 'Seaching for someone cool',
      'toStart': 'To start searching speaker press the button',
      'notRecored': 'Conversations are not recorded',
      'learn': 'Learn how',
      'userDisconnected': 'User disconnected',
      'startNewSearch': 'Start new search',
      'micMuted': 'Your mic is muted',
      'description': 'Spilka - voice chat. Speak with random preson from all around the world'
    },
  },
  uk: {
    translation: {
      'hello': 'Привіт',
      'thisIs': 'Це голосовий чат',  
      'searching': 'Шукаємо співрозмовника',
      'toStart': 'Щоб почати пошук співрозмовника натисніть кнопку',
      'notRecored': 'Розмови не записуються',
      'learn': 'Дізнайтесь як',
      'userDisconnected': 'Співрозмовник відключився',
      'startNewSearch': 'Почніть новий пошук',
      'micMuted': 'Ваш мікрофон виключений',
      'description': 'Spilka - голосовий чат. Розмовляйте з незнайомцями на будь які теми'
    },
  },
};

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const lng = timezone === 'Europe/Kiev' ? 'uk' : 'en';

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
  lng,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
