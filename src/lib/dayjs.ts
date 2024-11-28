import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/isoWeek';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import weekOfYearSecond from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekOfYear);
dayjs.extend(weekOfYearSecond);
dayjs.extend(isSameOrBefore);

/** here you can extend more plugins for dayjs */
export default dayjs;
