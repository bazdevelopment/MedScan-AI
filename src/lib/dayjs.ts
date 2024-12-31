import 'dayjs/locale/en'; // English
import 'dayjs/locale/zh'; // Chinese
import 'dayjs/locale/es'; // Spanish
import 'dayjs/locale/hi'; // Hindi
import 'dayjs/locale/ar'; // Arabic
import 'dayjs/locale/pt'; // Portuguese
import 'dayjs/locale/ru'; // Russian
import 'dayjs/locale/ja'; // Japanese
import 'dayjs/locale/ko'; // Korean
import 'dayjs/locale/de'; // German
import 'dayjs/locale/fr'; // French
import 'dayjs/locale/ro';

import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import weekOfYearSecond from 'dayjs/plugin/weekOfYear';

dayjs.extend(isoWeek);
dayjs.extend(weekOfYearSecond);
dayjs.extend(isSameOrBefore);

/** here you can extend more plugins for dayjs */
export default dayjs;
