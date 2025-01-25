'use client';
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card';
import { Calender, Mail2, User } from 'components/svg';
import { useUser } from 'provider/userProvider';

const dateConverion = (stringDate) => {
  const dateObj = new Date(stringDate);
  const date = dateObj.toLocaleDateString();
  const time = dateObj.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  return `${date} at ${time}`;
};
const UserInfo = () => {
  const { user } = useUser();
  console.log('user is ::', user);
  const createdAt = dateConverion(user?.createdAt);
  const updatedAt = dateConverion(user?.updatedAt);
  const userInfo = [
    {
      icon: User,
      label: 'Full Name',
      value: `${user?.username} ${user?.name}`,
    },
    {
      icon: Mail2,
      label: 'E-mail',
      value: `${user?.email}`,
    },
    {
      icon: Calender,
      label: 'Joined',
      value: `${createdAt}`,
    },
    {
      icon: Calender,
      label: 'last updated',
      value: `${updatedAt}`,
    },
  ];
  return (
    <Card>
      <CardHeader className="border-none mb-0">
        <CardTitle className="text-lg font-medium text-default-800">
          Information
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <ul className="mt-6 space-y-4">
          {userInfo.map((item, index) => (
            <li key={`user-info-${index}`} className="flex items-center">
              <div className="flex-none  2xl:w-56 flex items-center gap-1.5">
                <span></span>
                <span className="text-sm font-medium text-default-800">
                  {item.label}:
                </span>
              </div>
              <div className="flex-1 text-sm text-default-700">
                &nbsp;{item.value}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default UserInfo;
