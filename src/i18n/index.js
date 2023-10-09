import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'hello': 'Hi',
      'thisIs': 'Meet people from diverse cultures and backgrounds. Expand your knowledge and understanding of the world by talking to individuals from different countries and walks of life.',
      'searching': 'Seaching for someone cool',
      'toStart': 'To start searching speaker press the button',
      'notRecored': 'Conversations are not recorded',
      'userDisconnected': 'User disconnected',
      'startNewSearch': 'Start new search',
      'micMuted': 'Your mic is muted',
      'description': 'Spilka - voice chat. Chat with random person from all around the world'
    },
  },
  uk: {
    translation: {
      'hello': 'Привіт',
      'thisIs': 'Це голосовий чат для людей зі всіх куточків світу. Тут ви можете знайти цікавого співрозмовника або навіть більше.',  
      'searching': 'Шукаємо співрозмовника',
      'toStart': 'Щоб почати пошук співрозмовника натисніть кнопку',
      'notRecored': 'Розмови не записуються',
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
