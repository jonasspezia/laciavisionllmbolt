export const sanitizeFileName = (fileName: string) => {
  let sanitized = fileName.toLowerCase();
  sanitized = sanitized.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  sanitized = sanitized.replace(/[^a-z0-9-]/g, '-');
  sanitized = sanitized.replace(/-+/g, '-');
  sanitized = sanitized.replace(/^-+|-+$/g, '');
  
  if (!sanitized) {
    sanitized = 'video';
  }
  
  return sanitized;
};

export const VIDEO_ALLOWED_TYPES = [
  'video/mp4',
  'video/mpeg',
  'video/mov',
  'video/avi',
  'video/x-flv',
  'video/mpg',
  'video/webm',
  'video/wmv',
  'video/3gpp'
] as const;

export const MAX_VIDEO_SIZE = 2 * 1024 * 1024 * 1024; // 2GB
