import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import weekOfYear from 'dayjs/plugin/isoWeek';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import weekOfYearSecond from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekOfYear);
dayjs.extend(weekOfYearSecond);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(customParseFormat);

/** here you can extend more plugins for dayjs */
export default dayjs;
