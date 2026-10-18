export const getTempStatus = (temp) => {
  if (temp > 28) return { label: 'Too High', color: 'high', emoji: '🔴' };
  if (temp < 20) return { label: 'Too Low', color: 'low', emoji: '🔵' };
  return { label: 'Normal', color: 'normal', emoji: '🟢' };
};

export const getHumStatus = (hum) => {
  if (hum > 75) return { label: 'Too High', color: 'high', emoji: '🔴' };
  if (hum < 40) return { label: 'Too Low', color: 'low', emoji: '🔵' };
  return { label: 'Normal', color: 'normal', emoji: '🟢' };
};