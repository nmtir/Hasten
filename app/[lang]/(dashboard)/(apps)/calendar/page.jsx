import CalendarView from './calender-view';
import {
  getCategoriesByUser,
  getTasksByUser,
  getUser,
} from 'config/data.config';

const CalenderPage = async () => {
  const user = await getUser();
  const tasks = await getTasksByUser(user.id);
  const categories = await getCategoriesByUser(user.id);
  return (
    <div>
      <CalendarView events={tasks} boards={categories} />
    </div>
  );
};

export default CalenderPage;
