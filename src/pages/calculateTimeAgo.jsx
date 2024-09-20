import { formatDistanceToNow, parseISO } from "date-fns";
import { ar } from "date-fns/locale";

/**
 * Function to calculate how long ago a product was created in Arabic.
 * @param {string} createdAt - ISO 8601 date string of the product's creation time.
 * @returns {string} - A string representing the time ago in Arabic (e.g., "قبل يومين", "قبل 5 ساعات").
 */
const calculateTimeAgo = (createdAt) => {
  if (!createdAt) return "الوقت غير معروف";
  const date = parseISO(createdAt); // Parse the ISO 8601 date string
  return formatDistanceToNow(date, { addSuffix: true, locale: ar }); // Format the time difference in Arabic
};

export default calculateTimeAgo;
