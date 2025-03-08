type Theme = 'light' | 'dark';

const getThemeStyle = (theme: Theme) => {
  return {
    safeArea: {
      backgroundColor: theme === 'dark' ? '#333' : '#FFFFFF',
    },
    title: {
      color: theme === 'dark' ? '#64B5F6' : '#007BFA',
    },
    headingText: {
      color: theme === 'dark' ? '#E0E0E0' : '#555',
    },
    bodyText: {
      color: theme === 'dark' ? '#A0A0A0' : '#777777',
    },
  };
};

export default getThemeStyle;
